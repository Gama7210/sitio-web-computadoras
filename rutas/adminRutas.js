const express = require('express');
const router = express.Router();

const { verificarToken, esAdmin } = require('../middleware/auth');
const {
  agregarProducto,
  editarProducto,
  eliminarProducto,
  verTodosPedidos,
  cambiarEstatusPedido,
  verTodosUsuarios,
  obtenerReportes,
  verProductos   // ← esta línea es clave
} = require('../controladores/adminControlador');

// Protege rutas
router.use(verificarToken, esAdmin);

// Productos CRUD
router.post('/productos', agregarProducto);
router.put('/productos/:id', editarProducto);
router.delete('/productos/:id', eliminarProducto);
router.get('/productos', verProductos);  // ← ahora sí está importado

// Otras rutas (pedidos, usuarios, reportes)
router.get('/pedidos', verTodosPedidos);
router.put('/pedidos/:id/estatus', cambiarEstatusPedido);
router.get('/usuarios', verTodosUsuarios);
router.get('/reportes', obtenerReportes);

module.exports = router;