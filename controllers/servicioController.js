const { response } = require('express');
const Servicio = require('../models/servicioModel');

const getServicios = async(req, res = response) => {

    const servicios = await Servicio.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        servicios
    });
}
const crearServicio = async(req, res = response) => {
    const uid = req.uid;

    const servicios = new Servicio({
        usuario: uid,
        ...req.body
    });

    try {

        const servicioDB = await servicios.save();
        res.json({
            ok: true,
            servicios: servicioDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarServicio = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const servicio = await Servicio.findById(id);
        if (!servicio) {
            return res.status(404).json({
                ok: true,
                msg: 'Servicio no existe'

            });
        }

        const cambiosServicio = {
            ...req.body,
            usuario: uid
        }

        const servicioActualizado = await Servicio.findByIdAndUpdate(id, cambiosServicio, { new: true });

        return res.json({
            ok: true,
            servicio: servicioActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarServicio = async(req, res = response) => {
    const id = req.params.id;

    try {

        const servicio = await Servicio.findById(id);
        if (!servicio) {
            return res.status(404).json({
                ok: true,
                msg: 'Servicio no existe'

            });
        }

        await Servicio.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Servicio Eliminado'

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
    getServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
}