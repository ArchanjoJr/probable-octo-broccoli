const { CatModel } = require('../model');
const { HTTP_STATUS } = require('../enum');
const { ResponseGenerator } = require('../util');
const { Loggly } = require('../util');

const logger = new Loggly();

/**
 * @description list all cats breeds
 * @param {Express.Request} Request - EXPRESS DEFAULT REQUEST OBJECT
 * @param {Express.Response} Response - EXPRESS DEFAULT RESPONSE OBJECT
 */

const getAllBreeds = async (Request, Response) => {
  try {
    const query = { id: { $exists: true } };
    const breeds = await CatModel.find(query, '-_id id name');
    logger.log('debug', { query, breeds });
    return ResponseGenerator.GenericResponse(HTTP_STATUS.OK, breeds, Response);
  } catch (Error) {
    return ResponseGenerator.ErrorResponse(Error, Response);
  }
};

/**
 * @description get all the breed info
 * @param {Express.Request} Request - EXPRESS DEFAULT REQUEST OBJECT
 * @param {Express.Response} Response - EXPRESS DEFAULT RESPONSE OBJECT
 */

const getBreed = async (Request, Response) => {
  try {
    const { params: { breedId: id } } = Request;
    const query = { id };
    const breeds = await CatModel.findOne(query);
    logger.log('debug', { query, breeds, id });
    return ResponseGenerator.GenericResponse(HTTP_STATUS.OK, breeds, Response);
  } catch (Error) {
    return ResponseGenerator.ErrorResponse(Error, Response);
  }
};

/**
 * @description list all  breeds with a specific temperament
 * @param {Express.Request} Request - EXPRESS DEFAULT REQUEST OBJECT
 * @param {Express.Response} Response - EXPRESS DEFAULT RESPONSE OBJECT
 */

const getBreedBytemperament = async (Request, Response) => {
  try {
    const { params: { temperament } } = Request;
    const query = { temperament: { $in: [temperament] } };
    const breeds = await CatModel.find(query, '-_id id name');
    logger.log('debug', { query, breeds, temperament });
    return ResponseGenerator.GenericResponse(HTTP_STATUS.OK, breeds, Response);
  } catch (Error) {
    return ResponseGenerator.ErrorResponse(Error, Response);
  }
};

/**
 * @description list all cats breeds by a specific origin
 * @param {Express.Request} Request - EXPRESS DEFAULT REQUEST OBJECT
 * @param {Express.Response} Response - EXPRESS DEFAULT RESPONSE OBJECT
 */

const getBreedByOrigin = async (Request, Response) => {
  try {
    const { params: { origin } } = Request;
    const query = { origin: { $in: [origin] } };
    const breeds = await CatModel.find(query, '-_id id name');
    logger.log('debug', { query, breeds, origin });
    return ResponseGenerator.GenericResponse(HTTP_STATUS.OK, breeds, Response);
  } catch (Error) {
    return ResponseGenerator.ErrorResponse(Error, Response);
  }
};

module.exports = {
  getAllBreeds,
  getBreed,
  getBreedBytemperament,
  getBreedByOrigin,
};
