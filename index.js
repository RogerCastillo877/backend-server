const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config')

//  Create server with express
const app = express();

//  Config CORS
app.use(cors())

// Read and Parse of body
app.use(express.json() );

//  DataBase
dbConnection();

//  Routes
app.use('/api/users', require('./routes/users'))

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})