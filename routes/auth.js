

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { loginPost } = require('../controllers/auth');
const router = Router();


router.post('/login',[
    check('correo', 'correo obligatorio').isEmail(),
    check('password', 'password obligatoria').not().isEmpty(),
    validarCampos
],loginPost);




module.exports = router;
