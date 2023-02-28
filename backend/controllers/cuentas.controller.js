'use strict'
var Cuenta=require('../models/cuenta');
var Cliente=require('../models/cliente');
var nodemailer = require('nodemailer');
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
        const { nombre,tipo, saldo, cliente, limiteDiario } = req.body;
    
        // check if cliente exists
        const existingCliente = await Cliente.findOne({ numero: cliente });
        if (!existingCliente) {
          return res.status(404).send({ message: 'El cliente no existe' });
        }
    
        // generate a unique cuenta number
        const latestCuenta = await Cuenta.findOne({}, {}, { sort: { 'numero': -1 } });
        let numero;
        if (latestCuenta && latestCuenta.numero !== undefined) {
         numero = latestCuenta.numero + 1;
        } else {
         const cuentaCount = await Cuenta.countDocuments();
        numero = cuentaCount + 1;
        }
        let estado = "Activo";
        // create a new cuenta object and save to database
        const nuevaCuenta = new Cuenta({
          numero,
          nombre,
          tipo,
          saldo,
          cliente: existingCliente.numero,
          limiteDiario,
          estado
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
        var numero=req.params.numero;
        var update=req.body;
        if(numero==null) return res.status(4004).send({message:"La cuenta no existe"});
        Cuenta.findOneAndUpdate(numero,update,{new:true},(err,cuentaActualizada)=>{
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
          cuentaE.saldo -= monto;
          cuentaR.saldo = parseInt(cuentaR.saldo) + parseInt(monto);
      
          await cuentaE.save();
          await cuentaR.save();
      
          return res.status(200).send({ message: "Transacción realizada con éxito" });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ message: "Error al realizar la transacción" });
        }
      },
      findCuentas:function(req,res){
          var cliente=req.params.cliente;
          if(cliente==null) return res.status(404).send({message:"No se ha ingresado bien el CI"});
          Cuenta.find({cliente}).sort().exec((err,cuentas)=>{
              if(err) return res.status(500).send({message:"Error al recuperar los datos"});
              if(!cuentas) return res.status(404).send({message:'No existe'});
              return res.status(200).send({cuentas});
          })
      },
    
    
    findCuenta:function(req,res){
        var numero=req.params.numero;
        if(numero==null) return res.status(404).send({message:"La cuenta no existe"});
        Cuenta.find({numero},(err,cuenta)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cuenta) return res.status(404).send({message:'No  existe la cuenta'});
            return res.status(200).send({cuenta});
        })
    },

    sendEmail: async function(req, res) {
      try {
        const { to, codigo, name } = req.body;
    
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'proyectobanco23@gmail.com',
            pass: 'cudjssnyqoioxqem'
          }
        });
    
        const emailTemplate = `
          <html>
            <head>
              <style>
                /* Add your email styles here */
              </style>
            </head>
            <body>
              <p>Estimada/o ${name},</p>
              <p>El codigo para poder realizar su transaccion es ${codigo}.</p>
            </body>
          </html>
        `;
    
        const mailOptions = {
          from: 'proyectobanco23@gmail.com',
          to: to,
          subject: 'Clave de seguridad',
          html: emailTemplate
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent: ${info.messageId}`);
        return res.status(200).send({ message: 'Email sent successfully' });
      } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error sending email' });
      }
    },
    
    findCuentabyCliente:function(req,res){
      var cliente=req.params.cliente;
      if(cliente==null) return res.status(404).send({message:"No se ha ingresado bien el CI"});
      Cuenta.find({cliente},(err,cuenta)=>{
          if(err) return res.status(500).send({message:"Error al recuperar los datos"});
          if(!cuenta) return res.status(404).send({message:'No existe'});
          return res.status(200).send({cuenta});
      })
  },

  findClienteByCuenta: function(req, res) {
    var cuentaNumero = req.params.numero;
  
    if (cuentaNumero == null) {
      return res.status(404).send({message: "No se ha ingresado bien el número de cuenta"});
    }
  
    // Find the corresponding cuenta object in the database
    Cuenta.findOne({numero: cuentaNumero}, function(err, cuenta) {
      if (err) {
        return res.status(500).send({message: "Error al recuperar los datos de la cuenta"});
      }
  
      if (!cuenta) {
        return res.status(404).send({message: "No se ha encontrado la cuenta"});
      }
  
      // Retrieve the cliente parameter of the cuenta object
      var clienteNumero = cuenta.cliente;
  
      // Find the corresponding cliente object in the database
      Cliente.findOne({numero: clienteNumero}, function(err, cliente) {
        if (err) {
          return res.status(500).send({message: "Error al recuperar los datos del cliente"});
        }
  
        if (!cliente) {
          return res.status(404).send({message: "No se ha encontrado el cliente"});
        }
  
        // Return the cliente object
        return res.status(200).send({cliente});
      });
    });
  },
  


}
module.exports=controller;