//au=yuda a mapear la base de datos
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//Se va a generar una coleccion en la base de datos pelicula que va a tener estos campos
var cuentaSchema = Schema({
    nombre:String,
    tipo:String,
    cedula:Number,
    estado:Number,
    contrasenia:String
});

module.exports=mongoose.model('Cuenta', cuentaSchema);
