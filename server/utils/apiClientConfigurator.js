const docusignEsign = require('docusign-esign');

class ApiClientConfigurator {
  static dsApiClient = new docusignEsign.ApiClient();

  /**
   * Configures the API client with basePath and accessToken.
   * @param {{ basePath: string, accessToken: string }} args - The API client configuration arguments.
   */
  static configureApiClient(args) {
    const { basePath, accessToken } = args;
    this.dsApiClient.setBasePath(basePath);
    this.dsApiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
  }
}

module.exports = ApiClientConfigurator;
