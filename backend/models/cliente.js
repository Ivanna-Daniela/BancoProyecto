'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var clienteSchema = Schema({
    numero:Number,
    nombre:String,
    apellido:String,
    telefono:Number,
    password:Number
});

module.exports=mongoose.model('Cliente', clienteSchema);