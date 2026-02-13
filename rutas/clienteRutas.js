const express = require('express');
const router = express.Router();

const { verificarToken } = require('../middleware/auth');  // Si no lo tienes, puedes comentarlo temporalmente

// Importa las funciones del controlador (ajusta nombres si los cambiaste)
const {
  verCatalogo,
  verDetalle,
  realizarPedido,
  verPedidos
} = require('../controladores/clienteControlador');

// Rutas públicas (no requieren token)
router.get('/catalogo', verCatalogo);
router.get('/producto/:id', verDetalle);

// Rutas protegidas (requieren token de cliente)
router.post('/pedido', verificarToken, realizarPedido);
router.get('/pedidos', verificarToken, verPedidos);

module.exports = router;