export const globalProp = "version-1.2.3.3";

export const appConfig = {
  setClientIpAddress: (ipAddress) => localStorage.setItem('clientIpAddress', ipAddress),
  getClientIpAddress: () => localStorage.getItem('clientIpAddress'),
  setAuthenticationToken: (token) => localStorage.setItem('token', token),
  getAuthenticationToken: () => localStorage.getItem('token'),
  removeAuthenticationToken: () => localStorage.removeItem('token'),
}

export const endpointConfig = {
  database: {
    host: 'localhost',
    port: 3000,
  },
  server: {
    host: 'localhost',
    port: 8081,
  },
  getUrl: function (host, port) {
    return `http://${host}:${port}`;
  },
  getDatabaseUrl: function () {
    return endpointConfig.getUrl(endpointConfig.database.host, endpointConfig.database.port)
  },
  getServerUrl: function () {
    return endpointConfig.getUrl(endpointConfig.server.host, endpointConfig.server.port)
  }

}
