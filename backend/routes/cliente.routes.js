'use strict'
var express=require('express');
var router=express.Router();
var clientesRouter = require('../controllers/clientes.controllers');
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
router.put('/editarCliente/:id',clientesRouter.updateCuenta);
//borrar cuenta
router.delete('/borrarCliente/:id',clientesRouter.deleteCliente);
//buscar cuenta
router.get('/encontrarCliente/:numero',clientesRouter.findCliente);





module.exports=router; 