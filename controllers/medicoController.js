const { response } = require('express');
const Medico = require('../models/medicoModel');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}
const crearMedico = async(req, res = response) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {


        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'medico no existe'

            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        return res.json({
            ok: true,
            medico: medicoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarMedico = async(req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'medico no existe'

            });
        }

        await Medico.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Medico Eliminado'

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
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}