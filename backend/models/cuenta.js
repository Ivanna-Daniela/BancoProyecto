//au=yuda a mapear la base de datos
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var cuentaSchema = Schema({
    nombre:String,
    numero:Number,
    tipo:String,
    estado:Number,
    contrasenia:String,
    cliente:mongoose.Types.ObjectId
});

module.exports=mongoose.model('Cuenta', cuentaSchema);
