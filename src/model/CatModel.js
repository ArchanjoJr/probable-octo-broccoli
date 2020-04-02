const {Schema, model}  = require('mongoose');
// schema cat for mongoose
const CatSchema = new Schema({
  id: String,
  name: String,
  origin: String,
  breed: String,
  temperament: [String],
  description: String,
  photos: [String]
});

module.exports = new model('CatModel', CatSchema);