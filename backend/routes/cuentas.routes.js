'use strict'
var express=require('express');
var router=express.Router();
var cuentasRouter = require('../controllers/cuentas.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de home
router.get('/inicio',cuentasRouter.getInicio);

router.post('/guardar-cuenta',cuentasRouter.saveCuenta);

router.get('/cuentas',cuentasRouter.getCuenta);

router.get('/cuentas/:id',cuentasRouter.getCuentas);

router.put('/editar/:id',cuentasRouter.updateCuenta);

router.delete('/borrar/:id',cuentasRouter.deleteCuenta);



module.exports=router; 