//Apartado CONTACTO.HTML
const formularioContacto = document.querySelector('formularioContacto')
const nombreFormulario = document.querySelector('#nombreF')
const apellidoFormulario = document.querySelector('#apellidoF')
const celularFormulario = document.querySelector('#celularF')
const enviarFormulario = document.querySelector('#enviarFormulario')
const textoFormulario = document.querySelector('#textoFormulario')

//Funciones Formulario de CONTACTO.HTML

const formularioEnviado = () => {
  if (nombreFormulario != '' && apellidoFormulario != '' && textoFormulario.value != '') {
    Swal.fire(
      `${nombreFormulario.value} ${apellidoFormulario.value} gracias por enviar el formulario`,
      'Nos pondremos en contacto contigo a la brevedad!',
      'success'
    )
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes completar todos los campos!'
    })
  }
} 

//Evento
enviarFormulario.addEventListener('click', formularioEnviado)