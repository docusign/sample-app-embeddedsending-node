const resolveAuthController = require("../utils/authControllerResolver");

function authMiddleware(req, res, next) {
  const dsAuth = resolveAuthController(req);
  if (!dsAuth) {
    req.logger.info(`[${req.originalUrl}] Cannot resolve auth method, returns 401`);
    return res.status(401).send();
  }

  const isTokenValid = dsAuth.checkToken(req);
  if (!isTokenValid) {
    req.logger.info(`[${req.originalUrl}] Access token expired or doesn't exist, returns 401`);
    dsAuth.internalLogout(req, res, next);
    res.status(401).send();
    return;
  }
  next();
}

module.exports = authMiddleware;
