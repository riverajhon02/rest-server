
const jwt = require('jsonwebtoken');

const generarJWT = (uid ='')=>{

    const payload = {uid};
    return new Promise((resolve ,  reject)=>{

      

        jwt.sign(payload,  process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        }, (error ,  token)=>{
    
            if(error){
                console.log(error);
                reject('No se pudo generar JWT');
            }else{
                resolve(token);
            }
        }
        )

    })

   



}

module.exports ={

    generarJWT
}