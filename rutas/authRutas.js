const express = require('express');
const router = express.Router();

// Importa las funciones EXACTAS del controlador
const { registrar, login } = require('../controladores/authControlador');

// Rutas
router.post('/registrar', registrar);
router.post('/login', login);

module.exports = router;