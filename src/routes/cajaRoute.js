
const express = require('express');
const router = express.Router();

const { obtenerSaldoCaja } = require('../controllers/cajaController');


router.get('/', obtenerSaldoCaja);

module.exports = router;
