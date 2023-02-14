'use strict'
var Cliente=require('../models/cliente');
var Transaccion=require('../models/transaccion');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/cliente');

var controller={
    getInicioC:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2<h1>"
        );
    },
     saveCliente: async function(req, res) {
        try {
          const { numero, nombre, apellido, telefono, password, correo } = req.body;
      
          // check if cuenta already exists
          const existingCliente = await Cliente.findOne({ numero });
          if (existingCliente) {
            return res.status(404).send({ message: 'Ya existe el Cliente' });
          }
      
          // create a new cuenta object and save to database
          const nuevoCliente = new Cuenta({
            numero,
            nombre,
            apellido,
            telefono,
            password,
            correo,
          });
          const clienteGuardado = await nuevoCliente.save();
          return res.status(200).send({ cliente: clienteGuardado });
        } catch (err) {
          console.error(err);
          return res.status(500).send({ message: 'Error al guardar' });
        }
      }    
    ,
 
    getClientes:function(req,res){
        Cuenta.find({}).sort().exec((err,clientes)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!clientes) return res.status(404).send({message:'No existen clientes'});
            return res.status(200).send({clientes});
        })
    },
    getCliente:function(req,res){
        var clienteId=req.params.id;
        if(clienteId==null) return res.status(4004).send({message:"El cliente no existe"});
        Cliente.findById(clienteId,(err,cliente)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cliente) return res.status(404).send({message:'No existe el cliente'});
            return res.status(200).send({cliente});
        })
    },
    deleteCliente:function(req,res){
        var clienteId=req.params.id;
        if(clienteId==null) return res.status(4004).send({message:"El cliente no existe"});
        Cliente.findByIdAndDelete(clienteId,(err,clienteBorrado)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!clienteBorrado) return res.status(404).send({message:'No se puede eliminar el cliente'});
            return res.status(200).send({clienteBorrado});
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

    findCliente:function(req,res){
        var numero=req.params.numero;
        if(numero==null) return res.status(404).send({message:"No se ha ingresado bien el CI"});
        Cuenta.find({numero},(err,cliente)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cliente) return res.status(404).send({message:'No la existe el cliente'});
            return res.status(200).send({cliente});
        })
    }

}
module.exports=controller;