const { response } = require('express');
const HistoriaClinica = require('../models/historiaClinicaModel');

const getHistoriaClinicas = async(req, res = response) => {
    const historiaClinicas = await HistoriaClinica.find().
    populate('usuario', 'nombre img').
    populate('paciente', 'nombre');

    res.json({
        ok: true,
        historiaClinicas
    });
}
const crearHistoriaClinica = async(req, res = response) => {
    const uid = req.uid;

    const historiaClinicas = new HistoriaClinica({
        usuario: uid,
        ...req.body
    });

    try {

        const historiaClinicaDB = await historiaClinicas.save();
        res.json({
            ok: true,
            historiaClinicas: historiaClinicaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarHistoriaClinica = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const historiaClinicas = await HistoriaClinica.findById(id);
        if (!historiaClinicas) {
            return res.status(404).json({
                ok: true,
                msg: 'HistoriaClinica no existe'

            });
        }

        const cambiosHistoriaClinica = {
            ...req.body,
            usuario: uid
        }

        const historiaClinicaActualizado = await HistoriaClinica.findByIdAndUpdate(id, cambiosHistoriaClinica, { new: true });

        return res.json({
            ok: true,
            historiaClinicas: historiaClinicaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarHistoriaClinica = async(req, res = response) => {
    const id = req.params.id;

    try {

        const historiaClinica = await HistoriaClinica.findById(id);
        if (!historiaClinica) {
            return res.status(404).json({
                ok: true,
                msg: 'HistoriaClinica no existe'

            });
        }

        await HistoriaClinica.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'HistoriaClinica Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getHistoriaClinicas,
    crearHistoriaClinica,
    actualizarHistoriaClinica,
    eliminarHistoriaClinica
}