const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontend } = require("../helpers/menu-frontend");

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
            token,
            menu: getMenuFrontend( userDB.role )
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try {
        
        const { name, email, picture } = await googleVerify( googleToken );

        const userDB = await User.findOne({ email });
        let user;

        if( !userDB ) {
            // If user wasn't create
            user = new User({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //  Created user
            user = userDB;
            user.google = true;
        }

        //  Save in DB
        await user.save()

        //  Generate TOKEN - JWT
        const token = await generateJWT( user.id );
        
        res.json({
            ok: true,
            token,
            menu: getMenuFrontend( user.role )
        })

    } catch (error) {
 
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //  Generate TOKEN - JWT
    const token = await generateJWT( uid );

    //  Get User by UID
    const user = await User.findById( uid );

    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFrontend( user.role )
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}