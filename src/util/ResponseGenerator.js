const { HTTP_STATUS } = require('../enum');
const Loggly = require('./Loggy');

const logger = new Loggly();
/** Class responsible for the response of the api`s */
module.exports = class ResponseGenerator {

  /**
   * @description Creates a new Generic Response
   * @param {Number} status - STATUS OF THE RESPONSE
   * @param {Object} message - STRING OR OBJECT TO BE RETURNED
   * @param {Express.Response} Response - EXPRESS DEFAULT CLASS OF RESPONSE
   */

  static GenericResponse(status, message, Response) {
    return Response.status(status).json(message);
  }

  /**
   * @description Creates a new Generic Response OF ERROR
   * @param {Error} Error - ERROR
   * @param {Express.Response} Response - EXPRESS DEFAULT CLASS OF RESPONSE
   */

  static ErrorResponse(Error, Response) {
    logger.log('error', { message: Error.message, stack: Error.stack });
    if (Error.status) return Response.status(Error.status).json({ Error: Error.message });
    return Response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ Error: Error.message });
  }
};
