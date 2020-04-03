/* eslint-disable no-console */
const loggly = require('node-loggly-bulk');

const { LOGGLY_OPTIONS } = require('../config');

/** Class for a log example. */
module.exports = class Loggly {
  constructor() {
    this.logger = loggly.createClient(LOGGLY_OPTIONS);
  }
  /**
   * @description Creates a new Log
   * @param {String} level - level of the log - default: info, allowed-values[error, debug, info]
   * @param {Object} message - Object or message to be logged.
   */

  log(level, message) {
    switch (level) {
      case 'error':
        console.error(message);
        break;
      case 'debug':
        console.debug(message);
        break;
      case 'info':
        console.dir(message, { depth: null, colors: true });
        break;
      default:
        console.log(message);
    }
    this.logger.log({ level, ...message }, (err, results) => {
      if (err) {
        console.error('error at submitting to loggly');
      } else if (results && results.response && results.response === 'ok') {
        console.log('logged successfully');
      } else {
        console.log('not successfully logged');
      }
    });
  }
};
