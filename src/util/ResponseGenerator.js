const {HTTP_STATUS} = require('../enum');

module.exports = class ResponseGenerator {
  static GenericResponse(status, message, Response) {
    return Response.status(status).json(message);
  }
  static ErrorResponse(Error, Response) {
    console.error(Error);
    if (Error.status) return Response.status(Error.status).json({ Error: Error.message });
    return Response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ Error: Error.message });
  }
}