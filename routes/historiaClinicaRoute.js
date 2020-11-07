const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getHistoriaClinicas,
    crearHistoriaClinica,
    actualizarHistoriaClinica,
    eliminarHistoriaClinica
} = require('../controllers/historiaClinicaController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getHistoriaClinicas, );


router.post('/', [
        validarJWT,
        check('servicio', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('paciente', 'El id del paciente debe ser valido').isMongoId(),
        validarCampos
    ],
    crearHistoriaClinica);

router.put('/:id', [
        validarJWT,
        check('servicio', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('paciente', 'El id del paciente debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarHistoriaClinica);

router.delete('/:id', validarJWT, eliminarHistoriaClinica);



module.exports = router; //para exportar