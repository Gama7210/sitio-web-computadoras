const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('┌──────────────────────────────────────┐');
    console.log('│  ✅  MongoDB Atlas conectado exitosamente  │');
    console.log('└──────────────────────────────────────┘');
  } catch (error) {
    console.error('┌─────────────────────────────────────────────┐');
    console.error('│  ❌  Error al conectar con MongoDB Atlas    │');
    console.error('│  Revisa tu MONGO_URI en el archivo .env     │');
    console.error(error.message);
    console.error('└─────────────────────────────────────────────┘');
    process.exit(1);
  }
};

module.exports = conectarDB;