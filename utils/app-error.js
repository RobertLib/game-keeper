class AppError extends Error {
  /**
   * @param {string} message
   * @param {number} [status]
   * @param {Record<string, string>} [errors]
   */
  constructor(message, status, errors) {
    super(message);

    this.status = status;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
