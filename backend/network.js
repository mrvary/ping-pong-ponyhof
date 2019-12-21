const os = require('os');

function getIpAddress() {
  let ipAddress = getIpAddressByAdapterName('Ethernet');
  if (!ipAddress) {
    ipAddress = getIpAddressByAdapterName('WLAN');
  }

  if (!ipAddress) {
    throw new Error('ip address could not be determined');
  }

  return ipAddress;
}

function getIpAddressByAdapterName(name) {
  const ifaces = os.networkInterfaces();
  const netInterface = Object.keys(ifaces).filter(dev => dev === name)

  if (netInterface.length === 0) {
    return;
  }

  let address;
  const adapter = netInterface[0];
  ifaces[adapter].filter(details => {
    if (details.family === 'IPv4' && details.internal === false) {
      address = details.address;
    }
  });

  return address;
}

module.exports = {
  getIpAddress
}