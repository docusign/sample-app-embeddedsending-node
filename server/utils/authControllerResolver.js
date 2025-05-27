const ACGController = require("../controllers/acgController");
const JwtController = require("../controllers/jwtController");
const { BackendRoute, AuthMethod } = require("../constants");

const resolveAuthController = req => {
  if (req.session.authMethod === AuthMethod.JWT || req.url.startsWith(`${BackendRoute.AUTH}/jwt`)) {
    return new JwtController();
  }
  if (req.session.authMethod === AuthMethod.ACG || req.url.startsWith(`${BackendRoute.AUTH}/passport`)) {
    return new ACGController();
  }
  return null;
};

module.exports = resolveAuthController;
