const docusign = require('docusign-esign');
const config = require('../config');
const restApi = docusign.ApiClient.RestApi;

class RequestUtils {
  static setBaseArgs(req) {
    return {
      basePath: restApi.BasePath[config.restApiEnv],
      accessToken: req?.user?.accessToken || req?.session?.accessToken,
      accountId: req.session.accountId,
    };
  }
}

module.exports = RequestUtils;
