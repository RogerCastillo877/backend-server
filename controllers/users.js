const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req, res) => {

    const users = await User.find({}, 'nombre email role google');
    
    res.json({
        ok:true,
        users
    });
}

const createUser = async(req, res = response) => {
  
    const { email, password } = req.body;    

    try {

        const emailExist = await User.findOne({ email });

        if( emailExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const user = new User( req.body );

        //  Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password );

        await user.save();

        res.json({
            ok:true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar logs'
        })
    }    
}

module.exports = {
    getUsers,
    createUser
}