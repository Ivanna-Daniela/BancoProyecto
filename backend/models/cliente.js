'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var clienteSchema = Schema({
    numero:Number,
    nombre:String,
    apellido:String,
    telefono:Number,
    password:Number,
    correo:String
});

module.exports=mongoose.model('Cliente', clienteSchema);
