// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners

eventListenes();
function eventListenes() {

    // Agregar Tweet
    formulario.addEventListener('submit', agregarTweet);

    // Documento Listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];

        crearHTML();
    });
}

// Funciones

function agregarTweet(e) {
    e.preventDefault();
    
    // TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    // Validacion
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Agregar al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Crear el HTML
    crearHTML();

    // Reciciar el Formulario
    formulario.reset();
}

function mostrarError(error) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar Alerta despues de segundos
    setTimeout( () => {
        mensajeError.remove();
    }, 3000);

}

function limpiarError() {

}

function crearHTML() {

    limpiarHTML();

    if(tweets.length) {

        tweets.forEach( tweet => {

            // Agregar un boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Funcion Boton
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear HTML
            const li = document.createElement('LI');
            li.innerText = tweet.tweet;

            // Asignar Boton
            li.appendChild(btnEliminar);

            // Agregar a Listado de Tweets
            listaTweets.appendChild(li);
        });

    }

    sincronizarStorage();

}

function limpiarHTML() {

    while(listaTweets.firstChild) {

        listaTweets.removeChild(listaTweets.firstChild);

    }

}

function sincronizarStorage() {

    localStorage.setItem('tweets', JSON.stringify(tweets));

}

function borrarTweet(id) {

    tweets  = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
    
}