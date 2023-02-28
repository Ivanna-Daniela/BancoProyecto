'use strict'
var express=require('express');
var router=express.Router();
var clientesRouter = require('../controllers/clientes.controllers');
var userRouter =  require ('../controllers/usuario.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de home
router.get('/inicioC',clientesRouter.getInicioC);
//guardar cuenta
router.post('/guardarCliente',clientesRouter.saveCliente);
//ver cuentas
router.get('/clientes',clientesRouter.getClientes);
//ver cuenta
router.get('/cliente/:id',clientesRouter.getCliente);
//editar cuenta
router.put('/editarCliente/:id',clientesRouter.updateCliente);
//borrar cuenta
router.delete('/borrarCliente/:id',clientesRouter.deleteCliente);
//buscar cuenta
router.get('/encontrarCliente/:numero',clientesRouter.findCliente);

router.post('/emailCliente', clientesRouter.sendEmail);
//signin 
router.post('/signin', clientesRouter.signin);
//sigin
router.get('/uniqueuser3/:numero',userRouter.getUser);





module.exports=router; 