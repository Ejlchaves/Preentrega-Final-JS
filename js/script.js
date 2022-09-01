
//Array de instrumentos/productos
//-------------------------------

let stockInstrumentos = []

//Creacion del Array de carrito
//-----------------------------
let carritoCompra = []


//Selectores
//----------
const containerProducto = document.querySelector('#containerProducto')
const sectionCarrito = document.querySelector('#sectionCarrito')
const botonCarrito = document.querySelector('.botonCarrito')
const botonPagar = document.querySelector('#botonFinalizar')
const botonVaciar = document.querySelector('#botonVaciar')
const cantidadInstrumentosCarrito = document.querySelector('#cantidadInstrumentosCarrito')
const importeAPagar = document.querySelector('#importePagar')
const botonBuscar = document.querySelector('#btnSearch')
let searchBar = document.querySelector('#searchBar')

//Storage/JSON
//------------

carritoCompra = JSON.parse(localStorage.getItem('carritoCompra')) || []


//Funciones
//------------------------

//Renderizado de Productos
const renderizarProductos = (array) => {
    containerProducto.innerHTML = ''
    array.forEach((instrumento) => {
        const cardInstrumento = document.createElement('div')
        cardInstrumento.classList.add('card', 'producto', 'col-sm-12', 'col-md-6', 'col-lg-4', 'm-2', 'style="width:18rem;')
        cardInstrumento.setAttribute('data-id', instrumento.id)
        cardInstrumento.innerHTML = `
        <img src="${instrumento.img}" class="card-img-top" alt="${instrumento.tipo}">
        <div class="card-body text-card-body">
          <h5 class="card-title">${instrumento.tipo}</h5>
          <p class="card-text lead">${instrumento.detalle}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Modelo: ${instrumento.marca}</li>
          <li class="list-group-item">Condición: ${instrumento.condicion}</li>
          <li class="list-group-item">Precio: $${instrumento.precio}</li>
        </ul>
        <div class="card-body">
          <button  class="card-link botonTienda p-1"><a href="./contacto.html">Consultar</a></button>
          <button  class="card-link botonTienda agregarACarrito p-1 m-0" data-id="${instrumento.id}">Agregar a Carrito</button>
        </div>
        `
        containerProducto.append(cardInstrumento)
    })
    document.querySelectorAll('.agregarACarrito').forEach((button) => {
        button.addEventListener('click', agregarInstrumentoACarrito)
        
    })
}

//Agregar instrumentos al Carrito
const agregarInstrumentoACarrito = (prodId) => {
      const productoIdElegido = prodId.target.getAttribute("data-id")
      const cantidadNueva = carritoCompra.some((prod) => prod.id == productoIdElegido)
        if(cantidadNueva) {
          const cantidadFinal = carritoCompra.map((prod) => {
            if(prod.id == productoIdElegido) {
              prod.cantidad++
            }
        })
      } else {
          const productoElegido = stockInstrumentos.find((instrumento) => instrumento.id == productoIdElegido)
          carritoCompra.push(productoElegido)
      }
      Toastify({
        text: "Agregas un producto al carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #232323, #04f404)",
        }
      }).showToast();
      renderizarCarrito()
}

//Renderizar el Carrito de Compras
const renderizarCarrito = () => {
    const carritoContainer = document.querySelector('#sectionCarrito')
    carritoContainer.innerHTML=''
    carritoCompra.forEach((instrumento) => {
      const productoContainer = document.createElement ('div')
            productoContainer.classList = ('productoEnCarrito', 'datosCarrito')
            productoContainer.setAttribute('data-id', instrumento.id)
            productoContainer.innerHTML = `
            <div class="datosCarrito">
            <p>Producto: ${instrumento.tipo} ${instrumento.marca}</p>
            <img src="${instrumento.img}" class="imgCarrito" alt="${instrumento.tipo}">
            <p>ID: ${instrumento.id}</p>
            <p>Cantidad: <span id="cantidad">${instrumento.cantidad}</span></p>
            <button onclick = "eliminarInstrumentoDeCarrito (${instrumento.id})" class="botonEliminar" data-id="${instrumento.id}"><img src="../img/iconoEliminar.png" class="iconoBorrar" alt=""></button>
            <p>Precio: $${instrumento.precio}</p>
            </div>
            `
        carritoContainer.append(productoContainer) 
    })
    cantidadInstrumentosCarrito.innerText = carritoCompra.length
    importeAPagar.innerText = carritoCompra.reduce((acc, instrumento) => acc + (instrumento.precio * instrumento.cantidad), 0)
    localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra))
}

//Eliminar Instrumentos del Carrito
const eliminarInstrumentoDeCarrito = (instrumentoId) => {
  const productoElegido = carritoCompra.find((instrumento) => instrumento.id == instrumentoId)
  const indice = carritoCompra.indexOf(productoElegido)
  if(productoElegido.cantidad >= 1) {
      productoElegido.cantidad = 1
      carritoCompra.splice(indice, 1)
} 
  Toastify({
    text: "Eliminaste un producto del carrito",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #232323, #ff0000)",
    }
  }).showToast();
  renderizarCarrito()
}

//Busqueda para Searchbar
const busquedaProducto = () => {
  const productoBuscado = searchBar.value.toLowerCase()
  const busquedaRealizada = stockInstrumentos.filter((productos) => productos.tipo.toLowerCase().includes(productoBuscado))
  renderizarProductos(busquedaRealizada);
}

//Vaciar Carrito de compra
const vaciarCarrito = () => {
  if(carritoCompra.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Carrito Vacio!',
      text: 'No tienes instrumentos en tu carrito!',
      background: '#232323',
      color: '#fff',
      confirmButtonColor: '#ffd700',
    })
  } else {
  Swal.fire({
    title: 'Esta seguro de vaciar su carrito?',
    text: "Todos los productos se eliminaran!",
    icon: 'warning',
    showCancelButton: true,
    background: '#232323',
    color: '#fff',
    confirmButtonColor: '#ffd700',
    cancelButtonColor: '#000',
    confirmButtonText: 'Si, vaciar carrito!'
  }).then((result) => {
    if (result.isConfirmed) {
      carritoCompra.forEach((prod) => {
          prod.cantidad = 1 ;
          carritoCompra = [];
      })
      renderizarCarrito()
      Swal.fire({
        title: 'Carrito vacio!',
        text: 'Eliminaste todos los productos de tu carrito',
        icon: 'success',
        background: '#232323',
        color: '#fff',
        confirmButtonColor: '#ffd700'
      })
    }
  })
}}

//Finalizar Compra
const finalizarCompra = () => {
  if(carritoCompra.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Carrito Vacio!',
      text: 'No tienes instrumentos en tu carrito!',
      background: '#232323',
      color: '#fff',
      confirmButtonColor: '#ffd700',
    })
  } else {
  Swal.fire({
    title: 'Esta seguro de finalizar su compra?',
    text: "Se enviaran la informacion del pago por mail",
    icon: 'warning',
    showCancelButton: true,
    background: '#232323',
    color: '#fff',
    confirmButtonColor: '#ffd700',
    cancelButtonColor: '#000',
    confirmButtonText: 'Finalizar compra!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Compra Finalizada!',
        text: 'Realizaste con exito la compra de tus instrumentos',
        icon: 'success',
        background: '#232323',
        color: '#fff',
        confirmButtonColor: '#ffd700'
      })
        carritoCompra.forEach((prod) => {
            prod.cantidad = 1 ;
            carritoCompra = [];
        })
      renderizarCarrito()
    }
  })
}}
//Obtener productos de forma asincronica
const getProductosApi = async () => {
  const response = await fetch('../JSON/productos.json')
  const data = await response.json()
  stockInstrumentos = data
  renderizarProductos(stockInstrumentos)
}

//Eventos
//-------
botonVaciar.addEventListener('click', vaciarCarrito)
botonPagar.addEventListener('click', finalizarCompra)
botonBuscar.addEventListener('click', busquedaProducto)
botonCarrito.addEventListener('click', renderizarCarrito)

//Ejecucion
//----------
getProductosApi()
