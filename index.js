const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config')

//  Create server with express
const app = express();

//  Config CORS
app.use(cors())

//  DataBase
dbConnection();

//  Routes
app.get( '/', (req, res) => {
    
    res.json({
        ok:true,
        msg: 'Hola...'
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})