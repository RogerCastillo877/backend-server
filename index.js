const express = require('express');
const { dbConnection } = require('./database/config')

const app = express();

dbConnection();
//  MEAN_USER - Roger
//  vmPB4WenxuasVDAM - VHIYlZqexcqhpYmt
// Routes
app.get( '/', (req, res) => {
    
    res.json({
        ok:true,
        msg: 'Hola...'
    })
});

app.listen( 3000, () => {
    
})