
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {
    const query = {estado:true}
    const {limite=5, desde=0} = req.query;
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
       total,
       usuarios

    });
}

const usuariosPost = async (req = request, res = response) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar BD
    await usuario.save();
    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    
    // ELIMINAR DEFINITIVIO
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    

    res.json(usuario);
}

const usuariosPut = async (req= request, res = response) => {

    const { id } = req.params;
    const { password, google, ...resto } = req.body;

    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id , resto);
    res.json({
        msg: 'PUT API',
        resto
    })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}