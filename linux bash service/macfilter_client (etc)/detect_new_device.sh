#!/bin/sh

# script to detect new dhcp lease

# this will be called by dnsmasq everytime a new device is connected
# with the following arguments
# $1 = add | old
# $2 = mac address
# $3 = ip address
# $4 = device name

############### SETUP STAGE ##############

known_mac_addr="/etc/macfilter_client/known_mac_addr"
IP='192.168.9.163'
PORT=3001

#Database department ID
DEPARTMENT_ID='60daba810749b827e0cb8448'
AUTH_TOKEN='Basic a2FyYWt1dHNAZmFyYmV4LmNvbS51YToxMjM='
NACH_ROP='Karakuts'

############### SETUP END ###############

# check if the mac is in known devices list
grep -iq "$2" "$known_mac_addr"
unknown_mac_addr=$?

echo "$1"

if [ "$1" == "add" ] && [ "$unknown_mac_addr" -ne 0 ]; then
  msg="New device on `uci get system.@system[0].hostname` $*"
  echo `date` $msg >> $known_mac_addr

  echo "adding"
  curl --location --request POST "http://$IP:$PORT/api/devices/router" \
  --header 'Content-Type: application/json' \
  --header "Authorization: Basic $AUTH_TOKEN" \
  --data-raw '{
    "department": "'"$DEPARTMENT_ID"'",
    "type": "Other",
    "owner": "'"$NACH_ROP"'",
    "mac": "'"$2"'",
    "allowed": false,
    "comment": "'"$4"'"
  }'>>log.txt

  # adding rules to iptables
  echo "iptables -A INPUT -m mac --mac-source $2 -j DROP" >> /etc/firewall.user
  echo "iptables -A FORWARD -m mac --mac-source $2 -j DROP" >> /etc/firewall.user

  /etc/init.d/firewall restart
fi
