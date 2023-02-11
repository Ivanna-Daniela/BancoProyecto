'use strict'
var Pelicula=require('../models/cuenta');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/cuenta');
var controller={
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2<h1>"
        );
    },
    saveCuenta:function(req,res){
        //llama al elemento de base de datos, crea un elemento vacio que tiene las propiedades de la pelicula
        var cuenta=new Cuenta();
        //para tomar datos de la pagina
        var params=req.body;
        pelicula.nombre=params.nombre;
        pelicula.tipo=params.tipo;
        pelicula.cedula=params.cedula;
        pelicula.estado=params.estado;
        pelicula.contrsenia=params.contrsenia;
        //metodo para guardar en la base de datos
        cuenta.save((err,cuentaGuardada)=>{
            if(err) return res.status(500).send({message:"Error al guardar"});
            if(!cuentaGuardada) return res.status(404).send({message:'No se ha guardado la ceunta'});
            return res.status(200).send({cuenta:cuentaGuardada});
        })
    },
    //recuperar todas las peliculas
    getPeliculas:function(req,res){
        Pelicula.find({}).sort().exec((err,peliculas)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!peliculas) return res.status(404).send({message:'No existen peliculas'});
            return res.status(200).send({peliculas});
        })
    },
    getPelicula:function(req,res){
        var peliculaId=req.params.id;
        if(peliculaId==null) return res.status(4004).send({message:"La pelicula no existe"});
        Pelicula.findById(peliculaId,(err,pelicula)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!pelicula) return res.status(404).send({message:'No la pelicula'});
            return res.status(200).send({pelicula});
        })
    },
    deletePelicula:function(req,res){
        var peliculaId=req.params.id;
        if(peliculaId==null) return res.status(4004).send({message:"La pelicula no existe"});
        Pelicula.findByIdAndRemove(peliculaId,(err,peliculaBorrada)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!peliculaBorrada) return res.status(404).send({message:'No se puede eliminarla pelicula'});
            return res.status(200).send({peliculaBorrada});
        })
    },
    updatePelicula:function(req,res){
        var peliculaId=req.params.id;
        var update=req.body;
        if(peliculaId==null) return res.status(4004).send({message:"La pelicula no existe"});
        Pelicula.findByIdAndUpdate(peliculaId,update,{new:true},(err,peliculaActualizada)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!peliculaActualizada) return res.status(404).send({message:'No se puede actualizar pelicula'});
            return res.status(200).send({peliculaActualizada});
        })
    },
    uploadImage:function(req,res){
        var peliculaId=req.params.id;
        var fileName="Imagen no subida";

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Pelicula.findByIdAndUpdate(peliculaId,{imagen:fileName},{new:true},(err,peliculaActualizada)=>{
                    if (err) return res.status(500).send({message:"La imagen no se ha subido"});
                    if(!peliculaActualizada) return res.status(404).send({message:'La pelicual no existe y no se subio la imagen'});
                    return res.status(200).send({pelicula:peliculaActualizada});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:"La extension no es valida"});
                })
            }

        }else{
            return res.status(200).send({message:fileName});

        }

    },
    getImage:function(req,res){
        var file=req.params.imagen;
        var path_file="./uploads/"+file;
        fs.exists(path_file,(exists)=>{
            if(exists) {
                return res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:"No existe la imagen"});
            }
        });
    }
    
}
module.exports=controller;