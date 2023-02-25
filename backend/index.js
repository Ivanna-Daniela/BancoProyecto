'use strict'
var mongoose=require('mongoose');
var port='3700';
mongoose.promise=global.Promise;
mongoose.set("strictQuery",false);
var app=require('./app');
//mongoose.connect('mongodb://127.0.0.1:27017/cuentas')
mongoose.connect('mongodb+srv://admin:1234@clusterbanking.dn1i3su.mongodb.net/?retryWrites=true&w=majority')
 
.then(()=>{
    console.log("Conexion establecida con la BDD")
    app.listen(port,()=>{
        console.log("conexion establecida en el url: localhost:3700");
    })
})
.catch(err=>console.log(err))
