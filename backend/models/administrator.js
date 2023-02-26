const {Schema, model} = require('mongoose');

const administratorSchema = new Schema({
  email: String,
  password: String
},{
  timestamps:true
});

module.exports = model('Administrator', administratorSchema);