//producto.HTML
const productos = [
    { id: "GA001", categoria: "Guitarra Acústica", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", precio: 129990, stock: 8, descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para principiantes", imagen: "img/productos/ga001.jpg" },
    { id: "GE001", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Stratocaster", marca: "Squier", modelo: "Affinity Strat", precio: 249990, stock: 5, descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS.", imagen: "img/productos/ge001.jpg" },
    { id: "BA001", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico 4 Cuerdas", marca: "Squier", modelo: "Affinity PJ", precio: 299990, stock: 5, descripcion: "Pickup PJ, cuerpo álamo, mástil arce.", imagen: "img/productos/ba001.jpg" },
    { id: "BT003", categoria: "Baterías", nombre: "Caja Snare 14\"", marca: "Pearl", modelo: "STE1450", precio: 89990, stock: 4, descripcion: "Acero, 14x5 pulgadas, 10 tensores.", imagen: "img/productos/bt003.jpg" },
    { id: "TC001", categoria: "Teclados y Pianos", nombre: "Teclado Digital 61 teclas", marca: "Yamaha", modelo: "PSR-E373", precio: 249990, stock: 4, descripcion: "61 teclas sensibles al tacto, 622 voces.", imagen: "img/productos/tc001.jpg" },
    { id: "AM002", categoria: "Amplificadores", nombre: "Amplificador Guitarra 40W", marca: "Marshall", modelo: "MG40GFX", precio: 299990, stock: 3, descripcion: "40W, 4 canales, efectos digitales integrados.", imagen: "img/productos/am002.jpg" },
    { id: "MI001", categoria: "Micrófonos", nombre: "Micrófono Dinámico Cardioide", marca: "Shure", modelo: "SM58", precio: 149990, stock: 8, descripcion: "Estándar de la industria para voz en vivo.", imagen: "img/productos/mi001.jpg" },
    { id: "PE001", categoria: "Pedales de Efectos", nombre: "Pedal Distorsión", marca: "Boss", modelo: "DS-1", precio: 79990, stock: 7, descripcion: "Clásico pedal de distorsión, 3 controles.", imagen: "img/productos/pe001.jpg" },
    { id: "AC005", categoria: "Accesorios", nombre: "Capotraste Guitarra", marca: "Dunlop", modelo: "Trigger", precio: 12990, stock: 15, descripcion: "Capotraste de resorte, compatible con 6 cuerdas.", imagen: "img/productos/ac005.jpg" },
    { id: "ES001", categoria: "Estudio y Grabación", nombre: "Interfaz de Audio 2x2 USB", marca: "Focusrite", modelo: "Scarlett Solo", precio: 149990, stock: 4, descripcion: "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.", imagen: "img/productos/es001.jpg" }
];

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 });
}

function renderizarProductos(listaProductos, contenedorId) {

    const contenedor = document.getElementById("productos-container");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        const articulo = document.createElement("article");
        articulo.className = "producto-article";
        articulo.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre} ${producto.marca}">
         <h3>${producto.nombre}</h3>
         <p class="brand">${producto.marca} ${producto.modelo}</p>
         <p class="price">${formatearPrecio(producto.precio)}</p>
         <a href="detalle-producto.html?id=${producto.id}" class="btn-secondary">Ver detalle</a>
         <button class="btn-add-article" data-id="${producto.id}">Añadir</button>`;
        
        contenedor.appendChild(articulo);
    });
}

//Detalle Producto
function renderizarDetalleProducto() {
    const contenedor = document.getElementById("detalle-container");
    if (!contenedor) return;

    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get("id");
    const producto = productos.find(p => p.id === idProducto);

    if (!producto) {
        contenedor.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }
    
    contenedor.innerHTML = `
    <div class="detalle-imagen">
      <img src="${producto.imagen}" alt="${producto.nombre} ${producto.marca}">
    </div>
    <div class="detalle-info">
      <p class="detalle-categoria">${producto.categoria}</p>
      <h1>${producto.nombre}</h1>
      <p class="brand">${producto.marca} ${producto.modelo}</p>
      <p class="price-large">${formatearPrecio(producto.precio)}</p>
      <p class="detalle-descripcion">${producto.descripcion}</p>
      <p class="detalle-stock">Stock disponible: ${producto.stock} unidades</p>
      <button class="btn-add-article" data-id="${producto.id}">Añadir al carrito</button>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(productos, "productos-container");
    renderizarDetalleProducto();
});