/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validatorFields } = require('../middlewares/validator-field');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validatorFields
    ],
    login
)
router.post('/google',
    [
        check('token', 'El token de google es obligatoria').not().isEmpty(),
        validatorFields
    ],
    googleSignIn
)

module.exports = router;