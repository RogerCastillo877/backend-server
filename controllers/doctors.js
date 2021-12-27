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

const updateDoctors = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const doctor = await Doctor.findById( id );
        
        if( !doctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            })
        }

        const changesDoctor = {
            ...req.body,
            user: uid
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate( id, changesDoctor, { new: true})

        res.json({
            ok: true,
            doctor: updatedDoctor
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        })
    }
}

const deleteDoctors = async(req, res = response) => {
    
    const id = req.params.id;

    try {

        const doctor = await Doctor.findById( id );
        
        if( !doctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            })
        }

        await Doctor.findOneAndDelete( id )
        
        res.json({
            ok: true,
            msg: 'Médico borrado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        })
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctors,
    deleteDoctors
}