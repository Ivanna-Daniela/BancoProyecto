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
     saveCuenta: async function(req, res) {
        try {
          const { nombre, numero, tipo, estado, contrasenia } = req.body;
      
          // check if cuenta already exists
          const existingCuenta = await Cuenta.findOne({ numero });
          if (existingCuenta) {
            return res.status(404).send({ message: 'Ya existe la cuenta' });
          }
      
          // create a new cuenta object and save to database
          const nuevaCuenta = new Cuenta({
            nombre,
            numero,
            tipo,
            estado,
            contrasenia,
          });
          const cuentaGuardada = await nuevaCuenta.save();
          return res.status(200).send({ cuenta: cuentaGuardada });
        } catch (err) {
          console.error(err);
          return res.status(500).send({ message: 'Error al guardar' });
        }
      }    
    ,
 
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
        Cuenta.findByIdAndDelete(cuentaId,(err,cuentaBorrada)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!cuentaBorrada) return res.status(404).send({message:'No se puede eliminarla cuenta'});
            return res.status(200).send({cuentaBorrada});
        })
    },
    updateCuenta:function(req,res){
        var cuentaId=req.params.id;
        var update=req.body;
        if(cuentaId==null) return res.status(4004).send({message:"La cuenta no existe"});
        Cuenta.findOneAndUpdate({cuentaId},update,{new:true},(err,cuentaActualizada)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!cuentaActualizada) return res.status(404).send({message:'No se puede actualizar cuenta'});
            return res.status(200).send({cuentaActualizada});
        })
    }, 
    transaccion: async function(req, res) {
        var params = req.body;
        var numeroE = params.id_cuentaE;
        var numeroR = params.id_cuentaR;
        var monto = params.monto;
      
        if (!numeroE || !numeroR) {
          return res.status(404).send({ message: "Las cuentas no han sido ingresadas" });
        }
      
        try {
          // Find the sending account
          const cuentaE = await Cuenta.findOne({ numero: numeroE }).exec();
          if (!cuentaE) {
            return res.status(404).send({ message: "La cuenta emisora no existe" });
          }
      
          // Find the receiving account
          const cuentaR = await Cuenta.findOne({ numero: numeroR }).exec();
          if (!cuentaR) {
            return res.status(404).send({ message: "La cuenta receptora no existe" });
          }
      
          // Update account balances
          cuentaE.estado -= monto;
          cuentaR.estado = parseInt(cuentaR.estado) + parseInt(monto);
      
          await cuentaE.save();
          await cuentaR.save();
      
          return res.status(200).send({ message: "Transacción realizada con éxito" });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ message: "Error al realizar la transacción" });
        }
      },
      
    
    
    findCuenta:function(req,res){
        var numero=req.params.numero;
        if(numero==null) return res.status(404).send({message:"La cuenta no existe"});
        Cuenta.find({numero},(err,cuenta)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cuenta) return res.status(404).send({message:'No la existe la cuenta'});
            return res.status(200).send({cuenta});
        })
    },

    returnCuenta:function(req,res){
        var numero=req.params.numero;
        var cuenta1=new Cuenta();

        if(numero==null) return res.status(404).send({message:"La cuenta no existe"});
        Cuenta.find({numero},(err,cuenta)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cuenta) return res.status(404).send({message:'No la existe la cuenta'});
            console.log({cuenta});
            return {cuenta};
            return cuenta;
            this.cuenta1=cuenta;
        })
        console.log("Datos de la cuenta: "+cuenta1);
    }
}
module.exports=controller;