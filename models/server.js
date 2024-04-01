
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.usuariosPath = '/api/usuarios';
        this.loginPath = '/api/auth'

        // Concectar a Base de datos

        this.conectarDB();

         //Midelwares
         this.midelwares();
         
        //Rutas
        this.routes();

       

    }

    async conectarDB(){
        await  dbConection();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.loginPath, require('../routes/auth'));
    }

    midelwares() {
        //Directorio Publico
        this.app.use(express.static('public'))

        //CORS
        this.app.use(cors());

        //Lectura y Parseo Body}

        this.app.use(express.json());

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });

    }

}

module.exports = Server;