
const response = require('express');

const usuariosGet = (req, res = response) => {

    const {q, nombre="No_name", apikey, page=1, limit} = req.query;

    res.json({
        ok: true,
        msg: 'GET API',
        q,
        nombre

    })
};

const usuariosPost = (req, res = response) => {
    const {nombre,edad} = req.body;

    res.json({
        msg: 'POST API',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {

    const {id} = req.params;

    res.json({
        ok: true,
        msg: 'DELETE API',
        id
    });
}

const usuariosPut = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'PUT API'
    })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}