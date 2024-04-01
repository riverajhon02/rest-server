const Role = require("../models/role");
const Usuario = require("../models/usuario");


const esRolValido = async(rol='') =>{
    const existeRole = await Role.findOne({rol});

    if(!existeRole){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const existeEmail = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El Correo ${correo}  esta registrado en la BD`);
    }

}

const UsuarioPorID = async(id='')=>{
    const existeUsuario = await Usuario.findOne({id});
    if(!existeUsuario){
        throw new Error(`El id no existe en Database - ${id}`);
    }

}

module.exports = {
    esRolValido,
    existeEmail,
    UsuarioPorID
}