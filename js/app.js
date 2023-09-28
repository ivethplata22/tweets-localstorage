// Variables

const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tweets');
let tareas = [];

// Eventos

formulario.addEventListener('submit', agregarTarea);

document.addEventListener('DOMContentLoaded', () => {

    tareas = JSON.parse( localStorage.getItem('tareas') ) || [];

    crearHTML();

});

// Funciones Eventos

function agregarTarea(e) {

    e.preventDefault();

    const tarea = document.querySelector('#tweet').value.trim();

    if(tarea === '') {

        mostrarError('Agrega un tweet');
        return;

    }

    const nuevaTarea = {
        id: Date.now(),
        tarea
    }
    
    tareas = [...tareas, nuevaTarea];

    crearHTML();

    formulario.reset();

}

// Funciones

function mostrarError(mensaje) {

    limpiarError();

    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(error);

    setTimeout( () => {
        error.remove();
    }, 3000);

}

function limpiarError() {

    const errors = document.querySelectorAll('.error');

    for( const error of errors ) {
        error.remove();
    }

}

function crearHTML() {

    limpiarHTML();

    tareas.forEach( tarea => {

        // Boton Eliminar
        const btnEliminar = document.createElement('A');
        btnEliminar.textContent = 'X';
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.onclick = () => {
            eliminarTarea(tarea.id);
        }

        // Li para el listado
        const li = document.createElement('LI');

        li.textContent = tarea.tarea;

        li.appendChild(btnEliminar);

        listaTareas.appendChild(li);

    });

    sincronizarStorage();

}

function limpiarHTML() {

    while(listaTareas.firstChild) {
        listaTareas.removeChild( listaTareas.firstChild );
    }

}

function sincronizarStorage() {

    localStorage.setItem('tareas', JSON.stringify(tareas));

}

function eliminarTarea(id) {
    
    tareas = tareas.filter( tarea => tarea.id !== id );

    crearHTML();

}