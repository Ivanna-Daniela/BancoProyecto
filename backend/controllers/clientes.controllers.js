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
          const { numero, nombre, apellido, telefono, correo } = req.body;
      
          // Generate a random 4-digit numeric password
          const password = Math.floor(1000 + Math.random() * 9000).toString();
      
          const existingCliente = await Cliente.findOne({ numero });
          if (existingCliente) {
            return res.status(404).send({ message: 'Ya existe el Cliente' });
          }
      
          // create a new client object and save to database
          const nuevoCliente = new Cliente({
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
        Cliente.find({}).sort().exec((err,clientes)=>{
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
    updateCliente:function(req,res){
        var clienteId=req.params.id;
        var update=req.body;
        if(clienteId==null) return res.status(4004).send({message:"La cliente no existe"});
        Cliente.findOneAndUpdate({clienteId},update,{new:true},(err,clienteActualizado)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!clienteActualizado) return res.status(404).send({message:'No se puede actualizar cliente'});
            return res.status(200).send({clienteActualizado});
        })
    }, 

    findCliente:function(req,res){
        var numero=req.params.numero;
        if(numero==null) return res.status(404).send({message:"No se ha ingresado bien el CI"});
        Cliente.find({numero},(err,cliente)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cliente) return res.status(404).send({message:'No la existe el cliente'});
            return res.status(200).send({cliente});
        })
    }

}
module.exports=controller;