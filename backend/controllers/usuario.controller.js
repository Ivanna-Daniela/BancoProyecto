'use strict'
var Usuario=require('../models/user');
var controller={
    saveUsuario:function(req,res){
        var usuario=new Usuario();
        var params=req.body;
        usuario.nombre=params.nombre;
        usuario.contrasenia=params.contrasenia;
        usuario.rol=params.rol;
        usuario.identificador=params.identificador;
        usuario.imagen=null;

        usuario.save((err,usuarioGuardado)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!usuarioGuardado) return res.status(404).send({message:'No se ha guardado el usuario'});
            return res.status(200).send({usuario:usuarioGuardado});
        })

    },
    login:function(req,res){
        var user=req.body.user;
        var password=req.body.password;
        var session=req.session;

        if(user==null || password==null) return res.status(404).send({message:'Datos incorrectos'});
        Usuario.findOne({user,password},(err,usuario)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!usuario) return res.status(404).send({message:'Usuario o constraseña incorrectos'});
            if(user==usuario.user && password==usuario.password){
                session.req.session;
                session.user=req.body.user;
                res.send(`Bienvenido <a href=\'/logout'> Logout</a>`);
            }
        })
    },
    logout:function(req,res){
        req.session.destroy();
        res.redirect('/inicio');
    },
    
    getUser:function(req,res){
        var UserId=req.body.usuario;
        console.log("Estoy en usuario controller");
        if(UserId==null) return res.status(404).send({message:"El user no existe"});
        User.findOne(UserId,(err,user)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!user) return res.status(404).send({message:'No existe el user'});
            return res.status(200).send({user});
        })
    },

}
module.exports=controller;