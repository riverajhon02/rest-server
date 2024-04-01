

const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const {validarCampos, validarJWT ,esAdminRole, tieneRol} = require('../middlewares')
const { esRolValido, existeEmail, UsuarioPorID } = require('../helpers/db-validators');

const router = Router();


router.get('/',usuariosGet  );

router.put('/:id',[
    check('id', 'No es un ID valido de Mongoose').isMongoId(),
    check('id').custom(UsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos

],usuariosPut  );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Password debe contener mas de 6 caaracteres').isLength({min:6}),
    check('correo', 'Esto no es un correo valido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(esRolValido),
    // check('rol', 'Esto no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
],usuariosPost  );


router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE','NOSE_ROlE'),
    check('id' , 'no es un ID valido').isMongoId(),
    check('id').custom(UsuarioPorID)
],usuariosDelete  );



module.exports = router;
