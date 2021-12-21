const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
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

        // Generate Token
        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
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