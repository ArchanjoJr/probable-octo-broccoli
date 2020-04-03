const { Schema, model: Model } = require('mongoose');
// schema cat for mongoose
const CatSchema = new Schema({
  id: String,
  name: String,
  origin: String,
  breed: String,
  temperament: [String],
  description: String,
  photos: [String],
});

module.exports = new Model('CatModel', CatSchema);
