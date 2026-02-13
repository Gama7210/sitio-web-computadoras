const Producto = require('../modelos/Producto');
const Pedido = require('../modelos/Pedido');

// Ver catálogo → SOLO productos activos
exports.verCatalogo = async (req, res) => {
  try {
    const productos = await Producto.find({ activo: true }).sort({ creadoEn: -1 });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener catálogo' });
  }
};

// Ver detalle de un producto → SOLO si está activo
exports.verDetalle = async (req, res) => {
  try {
    const producto = await Producto.findOne({ _id: req.params.id, activo: true });
    
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado o inactivo' });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener producto' });
  }
};

// Crear pedido (protegido)
exports.realizarPedido = async (req, res) => {
  try {
    const { productos, total } = req.body;

    // Validación básica (puedes expandir)
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ msg: 'El pedido debe tener productos' });
    }

    const pedido = new Pedido({
      usuario: req.usuario.id,
      productos,
      total,
      estatus: 'pendiente'
    });

    await pedido.save();
    res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear pedido' });
  }
};

// Ver mis pedidos (protegido)
exports.verPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id })
      .populate('productos.producto')
      .sort({ creadoEn: -1 });

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener pedidos' });
  }
};