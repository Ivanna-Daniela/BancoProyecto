'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var transaccionSchema = Schema({
    Fecha:String,
    monto:Number,
    id_cedulaE:Number,
    id_cuentaE:Number,
    id_cedulaR:Number,
    id_cuentaR:Number
});

module.exports=mongoose.model('Transaccion', transaccionSchema);