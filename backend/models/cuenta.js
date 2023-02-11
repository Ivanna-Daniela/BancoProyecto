//au=yuda a mapear la base de datos
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var cuentaSchema = Schema({
    nombre:String,
    numero:String,
    tipo:String,
    cedula:Number,
    estado:Number,
    contrasenia:String
});

module.exports=mongoose.model('Cuenta', cuentaSchema);
