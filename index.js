const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config')

// Create server with express
const app = express();

// DataBase
dbConnection();

// Routes
app.get( '/', (req, res) => {
    
    res.json({
        ok:true,
        msg: 'Hola...'
    })
});

app.listen( process.env.PORT, () => {
    
})