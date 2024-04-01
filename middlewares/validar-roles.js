const { response } = require("express")


const esAdminRole = (req , res = response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se intenta verificar role sin validar token'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){

        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede realizar esto`
        })

    }

    next();


}

const tieneRol=(...roles)=>{

    return (req, res, next) =>{

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se intenta verificar role sin validar token'
            });
        }

        console.log(req.usuario.rol);

        if( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `Se requiere alguno de estos roles ${roles}`
            });

           
        }
        

        next();
    }

 
    

}

module.exports ={
    esAdminRole,
    tieneRol
}