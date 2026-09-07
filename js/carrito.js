function obtenerCarrito(){
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {

    const producto = productos.find(p => p.id === idProducto);
    if(!producto) return;

    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(item => item.id === idProducto);

    if(productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({id:producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1});
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

function contarProductosCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("carrito-count");
    if (contador) {
        contador.textContent = contarProductosCarrito();
    }
}

document.addEventListener("click", (evento) => {
    if(evento.target.classList.contains("btn-add-article")) {
        const idProducto = evento.target.dataset.id;
        agregarAlCarrito(idProducto);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});
