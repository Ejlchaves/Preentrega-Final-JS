
//Array de instrumentos/productos

let stockInstrumentos = [instrumento1, instrumento2, instrumento3, instrumento4, instrumento5, instrumento6]

//Creacion del Array de carrito
let carritoCompra = []


//Selectores
//----------
const containerProducto = document.querySelector('#containerProducto')
const sectionCarrito = document.querySelector('#sectionCarrito')
const botonCarrito = document.querySelector('#botonCarrito')
const botonPagar = document.querySelector('#botonPagar')
const botonVaciar = document.querySelector('#botonVaciar')
const cantidadInstrumentosCarrito = document.querySelector('#cantidadInstrumentosCarrito')
const importeAPagar = document.querySelector('#importePagar')
//Storage/JSON
//----------

carritoCompra = JSON.parse(localStorage.getItem('carritoCompra')) || []


//Renderizado de productos
//------------------------
const renderizarProductos = () => {
    stockInstrumentos.forEach((instrumento) => {
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
          <button href="./contacto.html" class="card-link botonTienda p-1">Consultar</button>
          <button  class="card-link botonTienda agregarACarrito p-1 m-0" data-id="${instrumento.id}">Agregar a Carrito</button>
        </div>
        `
        containerProducto.append(cardInstrumento)
    })
    document.querySelectorAll('.agregarACarrito').forEach((button) => {
        button.addEventListener('click', agregarInstrumentoACarrito)
        
    })
}

const agregarInstrumentoACarrito = (prodId) => {
    const productoIdElegido = prodId.target.getAttribute("data-id")
    const productoElegido = stockInstrumentos.find((instrumento) => instrumento.id == productoIdElegido)
    carritoCompra.push(productoElegido)
    Toastify({
      text: "Agregas un producto al carrito",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ffd700, #232323)",
      }/* ,
      onClick: function(){} */ // Callback after click
    }).showToast();
    renderizarCarrito()
    
    console.log(carritoCompra)
    
}



const renderizarCarrito = () => {
    const carritoContainer = document.querySelector('#sectionCarrito')
    carritoContainer.innerHTML=''

    carritoCompra.forEach((instrumento) => {
    
      const productoContainer = document.createElement ('div')
        
        productoContainer.classList = ('productoEnCarrito', 'datosCarrito')
        productoContainer.setAttribute('data-id', instrumento.id)
        productoContainer.innerHTML = `
        <div class="datosCarrito">
        <p>ID: ${instrumento.id}</p>
        <p>Producto: ${instrumento.tipo} ${instrumento.marca}</p>
        <p>Cantidad: <span id="cantidad">${instrumento.cantidad}</span></p>
        <p>Precio: $${instrumento.precio}</p>
        <button onclick = "eliminarInstrumentoDeCarrito (${instrumento.id})" class="botonEliminar" data-id="${instrumento.id}">Eliminar</button>
        </div>
        `
        carritoContainer.append(productoContainer)
        localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra))
        
    })
    cantidadInstrumentosCarrito.innerText = carritoCompra.length
    importeAPagar.innerText = carritoCompra.reduce((acc, instrumento) => acc + instrumento.precio, 0)

}

  

const eliminarInstrumentoDeCarrito = (instrumentoId) => {
  const productoElegido = carritoCompra.find((instrumento) => instrumento.id == instrumentoId)
  const indice = carritoCompra.indexOf(productoElegido)
  carritoCompra.splice(indice, 1)
  Toastify({
    text: "Eliminaste un producto del carrito",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #ffd700, #232323)",
    }/* ,
    onClick: function(){} */ // Callback after click
  }).showToast();
  console.log(carritoCompra)
  renderizarCarrito()
}

botonVaciar.addEventListener('click', () => {
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
      carritoCompra.length = 0;
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
})


//Ejecucion de la funcion
renderizarProductos()



const mostrarTotal = () => {
        const total = 0
        total = carritoCompra.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)
        alert(`El total de tu compra es de ${total}`)
    
}


