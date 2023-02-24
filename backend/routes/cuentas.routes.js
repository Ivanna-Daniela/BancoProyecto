'use strict'
var express=require('express');
var router=express.Router();
var cuentasRouter = require('../controllers/cuentas.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de home
router.get('/inicio',cuentasRouter.getInicio);
//guardar cuenta
router.post('/guardar-cuenta',cuentasRouter.saveCuenta);
//ver cuentas
router.get('/cuentas',cuentasRouter.getCuentas);
//ver cuenta
router.get('/cuenta/:id',cuentasRouter.getCuenta);
//editar cuenta
router.put('/editar/:numero',cuentasRouter.updateCuenta);
//borrar cuenta
router.delete('/borrar/:id',cuentasRouter.deleteCuenta);
//buscar cuenta
router.get('/encontrar/:numero',cuentasRouter.findCuenta);

router.post('/transaccion',cuentasRouter.transaccion);

router.post('/emailCuenta', cuentasRouter.sendEmail);

//login


//logout



module.exports=router; 