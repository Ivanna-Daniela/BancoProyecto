const {Schema, model} = require('mongoose');

const empleadoSchema = new Schema({
  email: String,
  password: String
},{
  timestamps:true
});

module.exports = model('Empleado', empleadoSchema);