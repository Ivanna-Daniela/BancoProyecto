'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var contactoSchema = Schema({
    numero:String,
    nombre:String,
    cliente:String
});

module.exports=mongoose.model('Contacto', contactoSchema);