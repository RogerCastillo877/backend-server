const { response } = require('express');
const Doctor = require('../models/doctors');

const getDoctors = async(req, res = response) => {

    const doctors = await Doctor.find()
                                .populate('user', 'name img')
                                .populate('hospital', 'name img')

    res.json({
        ok: true,
        doctors
    })
}

const createDoctor = async(req, res = response) => {

    const uid = req.uid;
    const doctor = new Doctor({
        user: uid,
        ...req.body
    });
    
    try {

        const doctorDB = await doctor.save();

        res.json({
            ok: true,
            doctor: doctorDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const updateDoctors = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateDoctors'
    })
}
const deleteDoctors = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteDoctors'
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctors,
    deleteDoctors
}