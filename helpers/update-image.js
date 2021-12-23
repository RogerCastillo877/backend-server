const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospital');

const deleteImage = ( path ) => {
    if( fs.existsSync( path) ) {
        fs.unlinkSync( path );
    }
}

const updateImage = async( type, id, fileName ) => {

    let pathOld = '';
    
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById( id );
            if( !doctor ) {
                console.log('No es un médico por id');
                return false;
            }
            
            pathOld = `./uploads/doctors/${ doctor.img }`;

            deleteImage( pathOld );

            doctor.img = fileName;
            await doctor.save();
            return true;
        break;
        case 'hospitals':
            const hospital = await Hospital.findById( id );
            if( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }
            
            pathOld = `./uploads/hospitals/${ hospital.img }`;

            deleteImage( pathOld );

            hospital.img = fileName;
            await hospital.save();
            return true;
        break;
        case 'users':
            const user = await User.findById( id );
            if( !user ) {
                console.log('No es un usuario por id');
                return false;
            }
            
            pathOld = `./uploads/users/${ user.img }`;

            deleteImage( pathOld );

            user.img = fileName;
            await user.save();
            return true;
        break;
    
        default:
        break;
    }
}

module.exports = {
    updateImage
}