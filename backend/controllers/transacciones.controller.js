'use strict'
var Cuenta=require('../models/cutransaccionenta');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/transaccion');
var controller={
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2<h1>"
        );
    },
    saveCuenta:function(req,res){
        
        var transaccion=new Transaccion();
        //para tomar datos de la pagina
        var params=req.body;
        transaccion.fecha=transaccion.fecha,
        transaccion.monto=transaccion.monto,
        transaccion.id_cedulaE=transaccion.id_cedulaE,
        transaccion.id_cuentaE=transaccion.id_cuentaE,
        transaccion.id_cedulaR=transaccion.id_cedulaR,
        transaccion.id_cuentaR=transaccion.id_cuentaR
        //metodo para guardar en la base de datos
        cuenta.save((err,cuentaGuardada)=>{
            if(err) return res.status(500).send({message:"Error al guardar"});
            if(!cuentaGuardada) return res.status(404).send({message:'No se ha guardado la ceunta'});
            return res.status(200).send({cuenta:cuentaGuardada});
        })
    },
 
    getCuentas:function(req,res){
        Cuenta.find({}).sort().exec((err,cuentas)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cuentas) return res.status(404).send({message:'No existen cuentas'});
            return res.status(200).send({cuentas});
        })
    },
    getCuenta:function(req,res){
        var cuentaId=req.params.id;
        if(cuentaId==null) return res.status(4004).send({message:"La cuenta no existe"});
        Cuenta.findById(cuentaId,(err,cuenta)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cuenta) return res.status(404).send({message:'No la existe la cuenta'});
            return res.status(200).send({cuenta});
        })
    },
    deleteCuenta:function(req,res){
        var cuentaId=req.params.id;
        if(cuentaId==null) return res.status(4004).send({message:"La cuenta no existe"});
        Cuenta.findByIdAndRemove(cuentaId,(err,cuentaBorrada)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!cuentaBorrada) return res.status(404).send({message:'No se puede eliminarla cuenta'});
            return res.status(200).send({cuentaBorrada});
        })
    },
    updateCuenta:function(req,res){
        var cuentaId=req.params.id;
        var update=req.body;
        if(cuentaId==null) return res.status(4004).send({message:"La cuenta no existe"});
        Cuenta.findByIdAndUpdate(cuentaId,update,{new:true},(err,cuentaActualizada)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!cuentaActualizada) return res.status(404).send({message:'No se puede actualizar cuenta'});
            return res.status(200).send({cuentaActualizada});
        })
    }

    
}
module.exports=controller;