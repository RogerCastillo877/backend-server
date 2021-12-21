/*
    Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validator-field');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', validateJWT, getUsers );

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validatorFields,
    ],
    createUser
);

router.put('/:id', 
    [
        validateJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validatorFields,
    ],
    updateUser
);

router.delete('/:id', 
    validateJWT,
    deleteUser
);

module.exports = router;