const bcrypt = require("bcryptjs");
const { response } = require("express");
const User = require("../models/user");

const login = async( req, res = response) => {

    const { email, password } = req.body;

    try {
        
        //  Verify email
        const userDB = await User.findOne({ email });
        
        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hay un dato incorrecto'
            })
        }

        //  Verify Passaword
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "Un dato es incorrecto"
            })
        }

        res.json({
            ok: true,
            msg: 'Correcto'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

module.exports = {
    login
}