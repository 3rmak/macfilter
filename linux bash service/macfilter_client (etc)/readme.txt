##########################################################
#######################   README   #######################
##########################################################

# Install stage
Install jq package from opkg
Copy "macfilter_client" folder into /etc. Grand access 755
Move service script into /etc/init.d/macfilter_client . And chmod +x

# dhcp-script
Add detect_new_device.sh script path to the end of a dhcp config file /etc/dnsmasq.conf like:

	dhcp-script=/etc/macfilter_client/detect_new_device.sh

# Config
Into config file "detect_new_device.sh" and "get_script.sh" put server IP, server PORT, database department ID...
Chmod 777 to "detect_new_device.sh" , "get_script.sh" and "known_mac_addr"

# Run
/etc/init.d/macfilter_client start
/etc/init.d/macfilter_client enable
