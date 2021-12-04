#!/bin/sh
. /usr/share/libubox/jshn.sh

############### SETUP STAGE ##############

TIMEOUT=30
known_mac_addr="/etc/macfilter_client/known_mac_addr"
log="/etc/macfilter_client/log.txt"
IP='192.168.9.163'
PORT=3001

#Database department ID
DEPARTMENT_ID='60daba810749b827e0cb8448'
AUTH_TOKEN='Basic a2FyYWt1dHNAZmFyYmV4LmNvbS51YToxMjM='

############### SETUP END ###############

while true
do
	response=$(curl --location --request GET "http://$IP:$PORT/api/devices/router/$DEPARTMENT_ID" \
	--header "Authorization: Basic $AUTH_TOKEN" | jq -r '.devices')

	if [ -f /etc/firewall.user ]; then
		rm /etc/firewall.user
	fi

	count=$(echo $response | grep -i -o "mac" | wc -l )

	new_known_mac_addr=""

	i=0; while [ $i -lt $count ]; do

			test=$(echo $response | jq '.['$i'] | {mac, allowed}')

			json_load "$test"

			json_select

			json_get_var mac mac

			json_get_var allowed allowed

			# check if the mac is in known devices list

			if ! [ -f $known_mac_addr ]; then

				touch $known_mac_addr

				echo -e "Init data from web:\n $(echo $response | jq '.[] | mac')" >> $known_mac_addr

			fi

			grep -iq "$mac" "$known_mac_addr"

			unknown_mac_addr=$?

			if [ "$unknown_mac_addr" -ne 0 ]; then

				msg="Device was added from web. MAC: $mac"

				echo `date` $msg >> $known_mac_addr

			fi

			new_known_mac_addr=$(echo -e "$new_known_mac_addr\n $(cat "$known_mac_addr" | grep $mac)" )

			echo "`date` Device with mac: $mac - allowed: $allowed" >> $log

			if [ $allowed -eq 0 ]; then

					echo "iptables -A INPUT -m mac --mac-source $mac -j DROP" >> /etc/firewall.user

					echo "iptables -A FORWARD -m mac --mac-source $mac -j DROP" >> /etc/firewall.user
			fi

			i=$(($i + 1))

	done

	echo -e "$new_known_mac_addr" > "$known_mac_addr"
    	/etc/init.d/firewall restart
	sleep $TIMEOUT

    	echo -e "\n" >> $log
done
