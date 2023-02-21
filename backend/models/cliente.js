'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var clienteSchema = Schema({
    numero:String,
    nombre:String,
    apellido:String,
    telefono:Number,
    password:String,
    correo:String
});

module.exports=mongoose.model('Cliente', clienteSchema);
