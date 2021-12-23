const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");
const res = require('express/lib/response');

const fileUpload = ( req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    //  Validate type
    const validTypes = [ 'hospitals', 'doctors', 'users' ];
    if( !validTypes.includes(type) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital valido'
        })
    }

    //  Validate file exist
    if( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        })
    }

    //  Process image
    const file = req.files.image;

    const cutName = file.name.split('.');
    const fileExtension = cutName[ cutName.length - 1 ];

    const validExtension = [ 'png', 'jpg', 'jpeg', 'gif' ];
    if( !validExtension.includes( fileExtension ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        })
    }

    //  Generate File Name
    const fileName = `${ uuidv4() }.${ fileExtension }`;

    // Path to save image
    const path = `./uploads/${ type }/${fileName}`;

    // Move image
    file.mv(path, (err) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //  To update DataBase
        updateImage( type, id, fileName );
        
        res.json({
            ok: true,
            msg: 'Archivo cargado',
            fileName
        });
    });
};

const returnImage = ( req, res = response ) => {

    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ photo }` );

    //  Deafault Image
    if( fs.existsSync(pathImg) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }
}

module.exports = {
    fileUpload,
    returnImage
}