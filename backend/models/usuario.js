'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var usuarioSchema = Schema({
    nombre:String,
    contrasenia:String,
    rol:String,
    identificador:Number,
    imagen:String
});

module.exports=mongoose.model('Cuenta', cuentaSchema);
