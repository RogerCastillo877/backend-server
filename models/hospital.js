const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    name: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
//  To change name of collection
// }, { collection: 'hospitales });

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Hospital', HospitalSchema );