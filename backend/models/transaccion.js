'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var transaccionSchema = Schema({
    Fecha:String,
    monto:Number,
    id_cedulaE:String,
    id_cuentaE:String,
    id_cedulaR:String,
    id_cuentaR:String
});

module.exports=mongoose.model('Transaccion', transaccionSchema);