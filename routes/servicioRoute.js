const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} = require('../controllers/servicioController');


const router = Router();

router.get('/', getServicios);


router.post('/', [
        validarJWT,
        check('tipo', 'El tipo del Servicio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearServicio);

router.put('/:id', [
        validarJWT,
        check('tipo', 'El tipo del Servicio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarServicio);

router.delete('/:id',
    validarJWT,
    eliminarServicio);



module.exports = router;