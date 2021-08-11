#!/bin/sh
. /usr/share/libubox/jshn.sh

TIMEOUT=30
IP='192.168.9.163'
PORT=3001
known_mac_addr="/etc/macfilter_client/known_mac_addr"
log="/etc/macfilter_client/log.txt"
#Database department ID
DEPARTMENT_ID='60daba810749b827e0cb8448'

while true
do
	response=$(curl --location --request GET "http://$IP:$PORT/api/router/devices/$DEPARTMENT_ID" \
	--header 'Authorization: Basic a2FyYWt1dHNAZmFyYmV4LmNvbS51YToxMjM=' | jq -r '.devices')
	
	if [ -f /etc/firewall.user ]; then
		rm /etc/firewall.user
	fi

	count=$(echo $response | grep -i -o "mac" | wc -l )

	i=0; while [ $i -lt $count ]; do

			test=$(echo $response | jq '.['$i'] | {mac, allowed}')

			json_load "$test"

			json_select

			json_get_var mac mac

			json_get_var allowed allowed

			# check if the mac is in known devices list
			
			grep -iq "$mac" "$known_mac_addr"

			unknown_mac_addr=$?

			if [ "$unknown_mac_addr" -ne 0 ]; then

				msg="Device was added from web. MAC: $mac"
  				
				echo `date` $msg >> $known_mac_addr

			fi

			echo "`date` Device with mac: $mac - allowed: $allowed" >> $log

			if [ $allowed -eq 0 ]; then

					echo "iptables -A INPUT -m mac --mac-source $mac -j DROP" >> /etc/firewall.user

					echo "iptables -A FORWARD -m mac --mac-source $mac -j DROP" >> /etc/firewall.user
			fi

			i=$(($i + 1))
	
	done
    /etc/init.d/firewall restart
    sleep $TIMEOUT

    echo -e "\n" >> $log
done
