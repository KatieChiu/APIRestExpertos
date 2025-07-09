// routes/detalleRecepcionRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/detalleRecepcionController');

router.post('/',
  body('numero_orden').notEmpty().withMessage('Número de orden obligatorio'),
  body('recepciones.*.codigo_producto').notEmpty().withMessage('El código del producto es obligatorio'),
  body('recepciones.*.cantidad_recibida').isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),
  body('recepciones.*.fecha_recepcion').isDate().withMessage('La fecha de emisión debe ser una fecha válida'),
  controlador.guardar
);

module.exports = router;

//Erick Blanco