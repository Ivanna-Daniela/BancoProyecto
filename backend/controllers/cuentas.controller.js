'use strict'
var Cuenta=require('../models/cuenta');
var Transaccion=require('../models/transaccion');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/cuenta');

var controller={
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2<h1>"
        );
    },
    saveCuenta:function(req,res){
        
        var cuenta=new Cuenta();
        //para tomar datos de la pagina
        var params=req.body;
        cuenta.nombre=params.nombre;
        cuenta.numero=params.numero;
        cuenta.tipo=params.tipo;
        cuenta.estado=params.estado;
        cuenta.contrasenia=params.contrasenia;
        //metodo para guardar en la base de datos
        cuenta.save((err,cuentaGuardada)=>{
            if(err) return res.status(500).send({message:"Error al guardar"});
            if(!cuentaGuardada) return res.status(404).send({message:'No se ha guardado la cuenta'});
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
    }, 
    transaccion:function(req,res){
        var cuentaId=req.params.id;
        var update=req.body;
        var cuenta=new Cuenta();
        //para tomar datos de la pagina
        var params=req.body;
        cuenta.nombre=params.nombre;
        cuenta.numero=params.numero;
        cuenta.tipo=params.tipo;
        cuenta.estado=params.estado;
        cuenta.contrasenia=params.contrasenia;
        if(cuentaId==null) return res.status(4004).send({message:"La cuenta no existe"});
        Cuenta.findByIdAndUpdate(cuentaId,update,{new:true},(err,cuentaActualizada)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!cuentaActualizada) return res.status(404).send({message:'No se puede actualizar cuenta'});
            return res.status(200).send({cuentaActualizada});
        })
    },
    
    /*findCuenta:function(req,res){
        var numero=req.params.numero;

        if(numero==null) return res.status(404).send({message:"La cuenta no existe"});
        Cuenta.find({numero},(err,cuenta)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cuenta) return res.status(404).send({message:'No la existe la cuenta'});
            return res.status(200).send({cuenta});
        })
    },*/
    findCuenta:function(req,res){
        var numero=req.params.numero;
        var cuenta1=new Cuenta();

        if(numero==null) return res.status(404).send({message:"La cuenta no existe"});
        Cuenta.find({numero},(err,cuenta)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cuenta) return res.status(404).send({message:'No la existe la cuenta'});
            console.log({cuenta});
            return {cuenta};
            this.cuenta1=cuenta;
        })

        console.log("Datos de la cuenta: "+cuenta1);
    }
   
}
module.exports=controller;