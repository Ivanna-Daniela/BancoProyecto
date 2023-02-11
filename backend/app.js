'use strict'
var express=require('express');
var podyParser=require('body-parser');
const bodyParser = require('body-parser');
var app=express();
//var peliculasRoutes=require('./routes/peliculas.routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Autorization,X-API-KEY,X-Request-With,Content-Type,Accept,Access-Control-Allow,Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
});

//rutas
/*app.get('/',(req,res)=>
    {
        res.status(468).send(
            "<h1>Hola</h1>"
        )
    }
)*/
//app.use('/', peliculasRoutes);
module.exports=app;