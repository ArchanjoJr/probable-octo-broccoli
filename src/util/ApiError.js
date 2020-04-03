/** Class representing a Error of the Api Type. */
module.exports = class ApiError extends Error {
  /**
   * @description Creates a new Error
   * @param {String} message - SPECIFIC MESSAGE OF THE ERROR
   * @param {Number} status - STATUS OF THE CODE ERROR
   */
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};
