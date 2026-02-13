const Producto = require('../modelos/Producto');
const Pedido = require('../modelos/Pedido');
const Usuario = require('../modelos/Usuario');

// Agregar producto
exports.agregarProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: 'Error' });
  }
};

// Editar producto
exports.editarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: 'Error' });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error' });
  }
};

// Gestionar pedidos (ver, cambiar estatus)
exports.verTodosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('usuario').populate('productos.producto');
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: 'Error' });
  }
};

exports.cambiarEstatusPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estatus: req.body.estatus }, { new: true });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ msg: 'Error' });
  }
};

// Administrar usuarios
exports.verTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ rol: 'cliente' });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ msg: 'Error' });
  }
};

// Reportes básicos (ejemplo: ventas totales)
exports.obtenerReportes = async (req, res) => {
  try {
    const ventas = await Pedido.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);
    const productosVendidos = await Pedido.aggregate([
      { $unwind: '$productos' },
      { $group: { _id: '$productos.producto', count: { $sum: '$productos.cantidad' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).populate('_id');
    const inventarioBajo = await Producto.find({ stock: { $lt: 10 } });

    res.json({ ventas: ventas[0]?.total || 0, productosVendidos, inventarioBajo });
  } catch (error) {
    res.status(500).json({ msg: 'Error' });
  }
};

// Ver todos los productos (nuevo)
exports.verProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ creadoEn: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};