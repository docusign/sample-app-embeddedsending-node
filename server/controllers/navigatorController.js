const createPrefixedLogger = require('../utils/logger');
const logger = createPrefixedLogger('[NavigatorController]');

const getData = async (req, res, next) => {
  try {
    // Get token based on auth method
    const token = req.user?.accessToken || req.session?.accessToken;
    console.log('Access Token:', token);
    const data = {
      status: 'success',
      message: 'Access token retrieved successfully',
      token: token || 'No token available'
    };
    res.json(data);
  } catch (error) {
    logger.error('Error in getData:', error);
    next(error);
  }
};

module.exports = {
  getData
};