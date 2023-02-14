'use strict'
var express=require('express');
var router=express.Router();
var cuentasRouter = require('../controllers/cuentas.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de home
router.get('/inicio',cuentasRouter.getInicio);

router.post('/guardar-cuenta',cuentasRouter.saveCuenta);

router.get('/cuentas',cuentasRouter.getCuentas);

router.get('/cuenta/:id',cuentasRouter.getCuenta);

router.put('/editar/:id',cuentasRouter.updateCuenta);

router.delete('/borrar/:id',cuentasRouter.deleteCuenta);

router.get('/encontrar/:numero',cuentasRouter.findCuenta);

router.post('/transaccion',cuentasRouter.transaccion);



module.exports=router; 