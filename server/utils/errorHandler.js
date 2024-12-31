class ErrorHandler {
  /**
   * @param {import('winston').Logger} logger
   */
  constructor(logger) {
    this.logger = logger;
  }

  handleErrorResponse(error, res) {
    this.logger.error(`handleErrorResponse: ${error}`);
    const errorCode = error?.response?.statusCode || 500;
    const errorMessage = error?.response?.body?.message || 'An unexpected error occurred';

    if (errorCode === 403) {
      res.status(403).send({ err: error, errorMessage, errorInfo: 'Contact Support to enable this Feature' });
      return;
    }

    res.status(errorCode).send({ err: error, errorMessage, errorInfo: null });
  }
}

module.exports = ErrorHandler;
