/*
    Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser } = require('../controllers/users');

const router = Router();

router.get( '/', getUsers );

router.post( '/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
],
createUser
);

module.exports = router;