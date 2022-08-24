// Creacion de Objetos

class Instrumentos {
    constructor (id, tipo, marca, cantidad, precio, condicion, img, detalle) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca;
        this.cantidad = cantidad;
        this.precio = precio;
        this.condicion = condicion;
        this.img = img;
        this.detalle = detalle
    }
}

const instrumento1 = new Instrumentos (001, "Guitarra Electrica", "Fender x33", 1, 24000, "Nuevo", "../img/tienda1.jpg","Guitarra electrica fender stratocaster, color negro incluye púas y estuche.")
const instrumento2 = new Instrumentos (002, "Ukelele", "KOALA V5", 1, 4500, "Nuevo", "../img/tienda2.jpg","Ukelele soprano acustico y satinado, incluye estuche. Ideal para principiantes " )
const instrumento3 = new Instrumentos (003, "Maracas", "TumTum 2", 1, 2000, "Usado", "../img/tienda3.jpg", "Maracas Artesanales Bolivianas, confeccionadas en madera de jacaranda." )
const instrumento4 = new Instrumentos (004, "Organo", "Yamaha", 1,  33000, "Nuevo", "../img/tienda5.jpg", "Organo Profesional con sensibilidad en teclas. Atril y estuche incluidos.")
const instrumento5 = new Instrumentos (005, "Bateria", "VOX XRP", 1, 27000, "Usado", "../img/tienda6.jpg", "Bateria VOX de 4 cuerpos para jazz/blues realizada en materiales de calidad")
const instrumento6 = new Instrumentos (006, "Tuba", "Parquer BTC 20", 1, 250000, "Nuevo", "../img/tienda7.jpg","Tuba profesional con 3 valvulas y detalles en bronce, incluye estuche y correa." )