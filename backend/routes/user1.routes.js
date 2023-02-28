'use strict'
var express=require('express');
var router=express.Router();
var userRouter = require('../controllers/usuario.controller');
var multiparty=require('connect-multiparty');
const user = require('../models/user');
//router.get('/uniqueuser/:usuario',userRouter.getUser);
router.get('/uniqueuser', userRouter.getUser);
console.log("Estoy en rutas");
module.exports=router; 