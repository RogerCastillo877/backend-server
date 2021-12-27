/*
    Route: '/api/hospitals'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validator-field');

const { validateJWT } = require('../middlewares/validate-jwt');
const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitals');

const router = Router();

router.get( '/', getHospitals );

router.post( '/',
    [
        validateJWT,
        check('name', 'El nombre del hospital es necesario').not().isEmpty(),
        validatorFields
    ],
    createHospitals
);

router.put( '/:id',
    [
        validateJWT,
        check('name', 'El nombre del hospital es necesario').not().isEmpty(),
        validatorFields
    ],
    updateHospitals
);

router.delete( '/:id',
    validateJWT,
    deleteHospitals
);

module.exports = router;