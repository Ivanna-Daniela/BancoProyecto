const {Router} = require('express');
const router = Router();

const Cliente = require('../models/cliente');

const jwt = require('jsonwebtoken');

router.get('/',(req,res)=> res.send('Hello world'))

router.post('/signin2', async (req, res)=>{
    const { numero, password} = req.body;
    const cliente = await Cliente.findOne({numero});
    if (!cliente) return res.status(401).send("Numero de cedula no se encuentra registrado");
    if (cliente.password !== password) return res.status(401).send('Contraseña Incorrecta');
    const token = jwt.sign({_id: cliente._id}, 'secretkey');
    return res.status(200).json({token});
});
   
router.get('/profile', verifyToken, (req, res)=>{
    res.send(req.userId);
})

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token == 'null'){
        return res.status(401).send('Unauthorize Request');
    }
    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}