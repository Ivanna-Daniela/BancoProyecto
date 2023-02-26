//au=yuda a mapear la base de datos
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var cuentaSchema = Schema({
    numero:Number,
    nombre:String,
    tipo:String,
    saldo:Number,
    cliente:String,
    estado:String,
    limiteDiario:Number
});

module.exports=mongoose.model('Cuenta', cuentaSchema);
