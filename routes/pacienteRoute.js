/*
    Pacientes
    ruta: /api/Pacientes
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getPacientes,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
} = require('../controllers/pacienteController');


const router = Router();

router.get('/', getPacientes);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Paciente es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearPaciente);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Paciente es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPaciente);

router.delete('/:id',
    validarJWT,
    eliminarPaciente);



module.exports = router; //para exportar