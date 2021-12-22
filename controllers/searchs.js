const { response } = require('express');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctors');

const getTodo = async(req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    const [ users, doctors, hospitals ] = await Promise.all([
        User.find({ nombre: regex }),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex }),
    ])

    res.json({
        ok: true,
        users,
        hospitals,
        doctors
    })
}

const getDocumentCollection = async(req, res = response) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    let data =[];

    switch (table) {
        case 'doctors':
            data = await Doctor.find({ name: regex })
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex })
                                .populate('user', 'name img');
            break;
        case 'users':
            data = await User.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser users/doctors/hospitals'
            });

    }
    
    res.json({
        ok: true,
        result: data
    });   
}

module.exports = {
    getTodo,
    getDocumentCollection
}