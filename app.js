const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');

const app = express();

// Conectar a MongoDB
conectarDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/auth', require('./rutas/authRutas'));
app.use('/api/admin', require('./rutas/adminRutas'));
app.use('/api/cliente', require('./rutas/clienteRutas'));

// Servir archivos estáticos (css, js, imágenes)
app.use(express.static(path.join(__dirname, 'publico')));

// Servir la carpeta vistas (muy importante)
app.use('/vistas', express.static(path.join(__dirname, 'vistas')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas/index.html'));
});

// Para cualquier otra ruta no API, sirve index.html (opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});