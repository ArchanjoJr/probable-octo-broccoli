/* eslint-disable no-underscore-dangle */
// rule ignore because if we use this.instance we get into a infinite loop with axios own instance
const axios = require('axios');
/**
 *
 * @type {CatsApi}
 * @description - classe de api
 * @constructor - instancia uma api em axios com api key
 *
 */
module.exports = class CatsApi {
  constructor() {
    const { CATS_API_KEY, API_URL } = process.env;
    this._instance = axios.create({
      baseURL: API_URL,
      config:
        {
          headers: {
            'x-api-key': CATS_API_KEY,
          },
        },
    });
  }

  /**
   * @description RETORNA TODAS AS RACAS DE API-CATS
   * @returns {Promise} com responta da requisicao /breeds
   */
  getAllBreeds() {
    return this._instance.get('/breeds');
  }


  /**
   * @description RETORNA AS FOTOS DA API-CATS
   * @param {Object} options - opcoes de requisicao, EX: HEADERS, QUERY_PARAMS E ETC...
   * @param {Number} limit - quantidade de itens a serem retornados, Default: 1
   * @returns {Promise} com responta da requisicao /images/search
   */
  getPhoto(options = {}, limit = 1) {
    return this._instance.get('/images/search', {
      params: {
        limit,
        ...options,
      },
    });
  }
};
