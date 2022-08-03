// Creacion de Objetos

class Instrumentos {
    constructor (tipo, marca, precio, condicion) {
        this.tipo = tipo;
        this.marca = marca;
        this.precio = precio;
        this.condicion = condicion;
    }
}

const instrumento1 = new Instrumentos ("Guitarra Electrica", "Fender", 24000, "Nuevo")
const instrumento2 = new Instrumentos ("Ukelele", "KOALA", 4500, "Nuevo")
const instrumento3 = new Instrumentos ("Maracas", "TumTum", 2000, "Usado")
const instrumento4 = new Instrumentos ("Organo", "Yamaha", 33000, "Nuevo")
const instrumento5 = new Instrumentos ("Bateria", "VOX", 27000, "Usado")
const instrumento6 = new Instrumentos ("Tuba", "Parquer", 250000, "Nuevo")

//Creacion del Array de carrito

let carritoCompra = []

//Solicitud de acceso al bucle

const eleccionDeInstrumentos = () => {
    let cliente = prompt("Desea comenzar a comprar en la tienda? SI/NO").toLowerCase()


while (cliente == "si") {
    let productoElegido = prompt("Por favor, elija el instrumento que desea agregar al carrito: Guitarra Electrica, Ukelele, Maracas, Organo, Bateria, Tuba").toLowerCase()

    switch(productoElegido) {
        case 'guitarra electrica':
            alert("Seleccionaste Guitarra Electrica")
            carritoCompra.push(instrumento1)
            console.log(("Seleccionaste Guitarra Electrica"))
            break;
        case 'ukelele':
            alert("Seleccionaste Ukelele")
            carritoCompra.push(instrumento2)
            console.log(("Seleccionaste Ukelele"))
            break;
        case 'maracas':
            alert("Seleccionaste Maracas")
            carritoCompra.push(instrumento3)
            console.log(("Seleccionaste Maracas"))
            break;
        case 'organo':
            alert("Seleccionaste Organo Yamaha")
            carritoCompra.push(instrumento4)
            console.log(("Seleccionaste Organo Yamaha"))
            break;
        case 'bateria':
            alert("Seleccionaste Bateria")
            carritoCompra.push(instrumento5)
            console.log(("Seleccionaste Bateria"))
            break;
        case 'tuba':
            alert("Seleccionaste Tuba")
            carritoCompra.push(instrumento6)
            console.log(("Seleccionaste Tuba"))
            break;
        default:
            alert("El instrumento ingresado no esta disponible")
    }


    cliente = prompt("Desea continuar comprando en la tienda? SI/NO").toLowerCase()
}


}

//Ejecucion de la funcion

eleccionDeInstrumentos()

const total = carritoCompra.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)

alert("El valor total de tu compra es de $" + total);
console.log("El valor total de tu compra es de $" + total);