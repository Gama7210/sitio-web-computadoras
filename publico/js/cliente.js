// Ejemplo funciones fetch
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = '/vistas/cliente/catalogo.html';
  }
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  login();
});

// Similar para registro, fetchCatalogo, etc.
async function fetchCatalogo() {
  const res = await fetch('/api/cliente/catalogo', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const productos = await res.json();
  const container = document.getElementById('productos');
  productos.forEach(p => {
    const card = `<div class="col-md-4">
      <div class="card animate__animated animate__fadeIn">
        <img src="${p.imagen || '/imagenes/default.jpg'}" class="card-img-top producto-img">
        <div class="card-body">
          <h5>${p.nombre}</h5>
          <p>Precio: $${p.precio}</p>
          <a href="/vistas/cliente/detalle-producto.html?id=${p._id}" class="btn btn-primary">Ver Detalle</a>
        </div>
      </div>
    </div>`;
    container.innerHTML += card;
  });
}

// Agrega más funciones para otras acciones