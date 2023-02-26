//au=yuda a mapear la base de datos
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var cuentaSchema = Schema({
    numero:Number,
    nombre:String,
    tipo:String,
    estado:Number,
    cliente:String,
    limiteDiario:Number
});

module.exports=mongoose.model('Cuenta', cuentaSchema);
