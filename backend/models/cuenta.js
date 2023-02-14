//au=yuda a mapear la base de datos
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var cuentaSchema = Schema({
    nombre:String,
    numero:String,
    tipo:String,
    estado:Number,
    contrasenia:String,
    cliente:String
});

module.exports=mongoose.model('Cuenta', cuentaSchema);
