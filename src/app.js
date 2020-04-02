const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const api = require('./routes');
const {
  MONGO_API_URL,
  MONGO_CONFIG,
} = require('./config');

const app = express();

// use all request body into a json
app.use(bodyParser.urlencoded({ extended: false }));

// only accept JSON as body
app.use(bodyParser.json({
  type: '*/json'
}));

mongoose.connect(MONGO_API_URL, MONGO_CONFIG, (MongoError) => {
  if(MongoError) throw MongoError;
  console.debug('CONNECTED WITH MONGODB');
})

// add cors
app.use(cors());


// api routes
app.use('/api', api);

// function that show all routes of the api
const routes = [];
// console.log(api.stack)
// api.stack.forEach(obj => {
//   const routeInfo = {
//     endpoint: obj.route.path,
//     method: obj.route.stack[0].method
//   }
//   routes.push(routeInfo);
// });

module.exports = {
  app,
  routes
};