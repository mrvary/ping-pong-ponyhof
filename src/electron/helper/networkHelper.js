/**
 * @author Marco Goebel
 */

const os = require("os");

/**
 * Get host ip address of os
 * @access public
 * @returns {*}
 */
function getIpAddress() {
  let ipAddress = getInterfaceByName("Ethernet") || getInterfaceByName("WLAN");
  if (!ipAddress) {
    throw new Error("ip address could not be determined");
  }

  return ipAddress;
}

/**
 * Get host ip address from the network interface driver
 * @access private
 * @param name
 * @returns {null}
 */
function getInterfaceByName(name) {
  const iFaces = os.networkInterfaces();
  const netInterface = Object.keys(iFaces).filter(dev => dev === name);

  if (netInterface.length === 0) {
    // Review: Perhaps it is better to throw an exception here
    return null;
  }

  let address = null;
  const adapter = netInterface[0];
  iFaces[adapter].forEach(details => {
    if (details.family === "IPv4" && details.internal === false) {
      address = details.address;
    }
  });

  return address;
}

module.exports = {
  getIpAddress
};
