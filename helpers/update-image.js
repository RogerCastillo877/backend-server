const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospital');

const updateImage = async( type, id, fileName ) => {
    
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById( id );
            if( !doctor ) {
                console.log('No es un médico por id');
                return false;
            }
            
            const pathOld = `./uploads/doctors/${ doctor.img }`;

            if( fs.existsSync( pathOld) ) {
                //  Delete Image
                fs.unlinkSync( pathOld );
            }
            doctor.img = fileName;
            await doctor.save();
            return true;
        break;
        case 'hospitals':
            
        break;
        case 'users':
            
        break;
    
        default:
        break;
    }
}

module.exports = {
    updateImage
}