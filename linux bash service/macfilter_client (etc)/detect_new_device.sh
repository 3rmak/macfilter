#!/bin/sh

# script to detect new dhcp lease

# this will be called by dnsmasq everytime a new device is connected
# with the following arguments
# $1 = add | old
# $2 = mac address
# $3 = ip address
# $4 = device name

known_mac_addr="/etc/macfilter_client/known_mac_addr"
IP='192.168.9.163'
PORT=3001

#Database department ID
DEPARTMENT_ID='60daba810749b827e0cb8448'

# check if the mac is in known devices list
grep -iq "$2" "$known_mac_addr"
unknown_mac_addr=$?

echo "$1"

if [ "$1" == "add" ] && [ "$unknown_mac_addr" -ne 0 ]; then
  msg="New device on `uci get system.@system[0].hostname` $*"
  echo `date` $msg >> $known_mac_addr

  echo "adding"
  curl --location --request POST "http://$IP:$PORT/api/router/devices" \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "department": "'"$DEPARTMENT_ID"'",
    "type": "Other",
    "owner": "Karakuts",
    "mac": "'"$2"'",
    "allowed": false,
    "comment": "'"$4"'"
  }'>>log.txt
fi
