/*
    Route: '/api/doctors'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validator-field');

const { validateJWT } = require('../middlewares/validate-jwt');
const { getDoctors, createDoctor, updateDoctors, deleteDoctors, getDoctorById } = require('../controllers/doctors');

const router = Router();

router.get( '/', getDoctors );

router.post( '/',
    [
        validateJWT,
        check('name', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        // check('user', 'El usuario es necesario').not().isEmpty(),
        validatorFields
    ],
    createDoctor
);

router.put('/:id', 
    [
        validateJWT,
        check('name', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validatorFields
    ],
    updateDoctors
);

router.delete('/:id', 
    validateJWT,
    deleteDoctors
);

router.get('/:id', 
    validateJWT,
    getDoctorById
);

module.exports = router;