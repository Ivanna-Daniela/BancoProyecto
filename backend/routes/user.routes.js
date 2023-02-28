const {Router} = require('express');

const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');
var userRouter = require('../controllers/usuario.controller');
var multiparty=require('connect-multiparty');
router.get('/',(req,res)=> res.send('Hello world'))

router.post('/signup', async (req,res)=>{
    const { usuario, password, numero } = req.body;
    const newUser = new User({usuario, password, numero});
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token}); 
});

router.post('/signin', async (req, res)=>{
    const { usuario, password, numero} = req.body;
    const user = await User.findOne({usuario});
    if (!user) return res.status(401).send("El usuario no existe");
    if (user.password !== password) return res.status(401).send('Contraseña Incorrecta');
    const token = jwt.sign({_id: user._id}, 'secretkey');
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
    res.send(req.userId);
});



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
router.get('/uniqueuser', userRouter.getUser);

module.exports=router;