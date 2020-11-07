const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
} = require('../controllers/medicoController');


const router = Router();

router.get('/', getMedicos);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Medico es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearMedico);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Medico es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarMedico);

router.delete('/:id',
    validarJWT,
    eliminarMedico);



module.exports = router;