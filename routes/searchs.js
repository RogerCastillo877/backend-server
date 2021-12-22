/*
    Route: 'api/todo/:search'
*/
const { Router } = require('express');
const { getTodo, getDocumentCollection } = require('../controllers/searchs');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/:search', validateJWT, getTodo );
router.get( '/collection/:table/:search', validateJWT, getDocumentCollection );

module.exports = router;