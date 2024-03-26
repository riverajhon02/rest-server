
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.usuariosPath = '/api/usuarios';

         //Midelwares
         this.midelwares();
         
        //Rutas
        this.routes();

       

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
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