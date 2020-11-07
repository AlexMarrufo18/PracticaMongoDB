const { response } = require('express');
const Paciente = require('../models/pacienteModel');

const getPacientes = async(req, res = response) => {

    const pacientes = await Paciente.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        pacientes
    });
}
const crearPaciente = async(req, res = response) => {
    const uid = req.uid;

    const paciente = new Paciente({
        usuario: uid,
        ...req.body
    });

    try {

        const pacienteDB = await paciente.save();
        res.json({
            ok: true,
            paciente: pacienteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarPaciente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({
                ok: true,
                msg: 'Paciente no existe'

            });
        }

        const cambiosPaciente = {
            ...req.body,
            usuario: uid
        }

        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, cambiosPaciente, { new: true });

        return res.json({
            ok: true,
            paciente: pacienteActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarPaciente = async(req, res = response) => {
    const id = req.params.id;

    try {

        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({
                ok: true,
                msg: 'Paciente no existe'

            });
        }

        await Paciente.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Paciente Eliminado'

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
    getPacientes,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
}