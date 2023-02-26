const {Router} = require('express');
const router = Router();

const Admin = require('../models/administrator');

const jwt = require('jsonwebtoken');

router.get('/',(req,res)=> res.send('Hello world'))

router.post('/signup', async (req,res)=>{
    const { email, password } = req.body;
    const newAdmin = new Admin({email, password});
    await newAdmin.save();
    const token = jwt.sign({_id: newAdmin._id}, 'secretkey');
    res.status(200).json({token}); 
});

router.post('/signin', async (req, res)=>{
    const { email, password} = req.body;
    const admin = await Admin.findOne({email});
    if (!admin) return res.status(401).send("El correo no existe");
    if (admin.password !== password) return res.status(401).send('Contraseña Incorrecta');
    const token = jwt.sign({_id: admin._id}, 'secretkey');
    return res.status(200).json({token});
});
//datos publicos
router.get('/tasks', (req, res)=>{
    res.json([
        {
            _id: 1,
            name: 'Tarea uno',
            description: 'lorem ipsum',
            date: '2023-02-25T00:27:20.601+00:00'
        },
        {
            _id: 2,
            name: 'Tarea dos',
            description: 'lorem ipsum',
            date: '2023-02-25T00:27:20.601+00:00'
        },
        {
            _id: 3,
            name: 'Tarea tres',
            description: 'lorem ipsum',
            date: '2023-02-25T00:27:20.601+00:00'
        }
    ])
});
//datos privados
router.get('/private-tasks', verifyToken, (req, res)=>{
    res.json([
        {
            _id: 1,
            name: 'Tarea uno',
            description: 'lorem ipsum',
            date: '2023-02-25T00:27:20.601+00:00'
        },
        {
            _id: 2,
            name: 'Tarea dos',
            description: 'lorem ipsum',
            date: '2023-02-25T00:27:20.601+00:00'
        },
        {
            _id: 3,
            name: 'Tarea tres',
            description: 'lorem ipsum',
            date: '2023-02-25T00:27:20.601+00:00'
        }
    ])
});
router.get('/profile', verifyToken, (req, res)=>{
    res.send(req.adminId);
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
    req.adminId = payload._id;
    next();
}