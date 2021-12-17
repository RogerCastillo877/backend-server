const express = require('express');

const app = express();

// Routes
app.get( '/', (req, res) => {
    
    res.json({
        ok:true,
        msg: 'Hola...'
    })
});

app.listen( 3000, () => {
    
})