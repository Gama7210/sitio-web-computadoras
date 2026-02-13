const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  imagen: { type: String },
  descripcion: { type: String },
  ram: { type: String },
  almacenamiento: { type: String },
  procesador: { type: String },
  activo: { type: Boolean, default: true },   // ← NUEVO: para inactivar
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', productoSchema);