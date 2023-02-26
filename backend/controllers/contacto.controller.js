'use strict'
var Contacto=require('../models/contacto');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/contacto');

var controller={
    getInicioC:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2<h1>"
        );
    },
    saveContacto: async function(req, res) {
        try {
          const { numero, nombre, cliente } = req.body;
     
          const existingContacto = await Contacto.findOne({ numero });
          if (existingContacto) {
            return res.status(404).send({ message: 'Ya existe el Contacto' });
          }

          const nuevoContacto = new Contacto({
            numero,
            nombre,
            cliente,
          });
          const contactoGuardado = await nuevoContacto.save();
          return res.status(200).send({ contacto: contactoGuardado });
        } catch (err) {
          console.error(err);
          return res.status(500).send({ message: 'Error al guardar' });
        }
      }
      
    ,
 
    getContactos:function(req,res){
        Contacto.find({}).sort().exec((err,contactos)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!contactos) return res.status(404).send({message:'No existen contactos'});
            return res.status(200).send({contactos});
        })
    },
    getContacto:function(req,res){
        var contactoId=req.params.id;
        if(contactoId==null) return res.status(4004).send({message:"El contacto no existe"});
        Contacto.findById(contactoId,(err,contacto)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!contacto) return res.status(404).send({message:'No existe el contacto'});
            return res.status(200).send({contacto});
        })
    },

    findContacto:function(req,res){
        var numero=req.params.numero;
        if(numero==null) return res.status(404).send({message:"No se ha ingresado bien el CI"});
        Contacto.find({numero},(err,contacto)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!contacto) return res.status(404).send({message:'No la existe el contacto'});
            return res.status(200).send({contacto});
        })
    }

}
module.exports=controller;