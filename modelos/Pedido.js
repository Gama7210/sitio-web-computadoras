const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, required: true, min: 1 }
  }],
  total: { type: Number, required: true },
  estatus: {
    type: String,
    enum: ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);