const express = require('express');
const metrics = require('express-metrics');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');

const api = require('./routes');
const {
  MONGO_API_URL,
  MONGO_CONFIG,
  METRICS_OPTIONS,
} = require('./config');

const app = express();

// use all request body into a json
app.use(bodyParser.urlencoded({ extended: false }));

// only accept JSON as body
app.use(bodyParser.json({
  type: '*/json',
}));
// adding metrics server
app.use(metrics(METRICS_OPTIONS));
// adding middleware logs to all requests
app.use(logger('dev'));
mongoose.connect(MONGO_API_URL, MONGO_CONFIG, (MongoError) => {
  if (MongoError) throw MongoError;
  console.debug('CONNECTED WITH MONGODB');
});

// add cors
app.use(cors());


// api routes
app.use('/api', api);

module.exports = {
  app,
};
