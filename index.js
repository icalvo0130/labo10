class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'pendiente';
    }

    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}

const tareas = [];

const inputTarea = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('agregar-tarea');
const listaPendientes = document.getElementById('lista-pendientes');
const listaHaciendo = document.getElementById('lista-haciendo');
const listaCompletadas = document.getElementById('lista-completadas');

btnAgregar.addEventListener('click', function() {
    const nombreTarea = inputTarea.value;
    if (nombreTarea.trim() !== '') {
        const nuevaTarea = new Tarea(nombreTarea);
        tareas.push(nuevaTarea);
        actualizarInterfaz();
        inputTarea.value = '';
    }
});

function actualizarInterfaz() {
    listaPendientes.innerHTML = '';
    listaHaciendo.innerHTML = '';
    listaCompletadas.innerHTML = '';

    tareas.forEach((tarea, indice) => {
        const li = document.createElement('li');
        li.textContent = tarea.nombre;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '✖';
        btnEliminar.classList.add('eliminar');
        btnEliminar.addEventListener('click', function() {
            eliminarTarea(indice);
        });

        if (tarea.estado === 'pendiente') {
            const btnMoverHaciendo = document.createElement('button');
            btnMoverHaciendo.textContent = '→';
            btnMoverHaciendo.addEventListener('click', function() {
                cambiarEstadoTarea(indice, 'haciendo');
            });
            li.appendChild(btnMoverHaciendo);
            li.appendChild(btnEliminar);
            listaPendientes.appendChild(li);

        } else if (tarea.estado === 'haciendo') {
            const btnMoverPendiente = document.createElement('button');
            btnMoverPendiente.textContent = '←';
            btnMoverPendiente.addEventListener('click', function() {
                cambiarEstadoTarea(indice, 'pendiente');
            });

            const btnMoverCompletado = document.createElement('button');
            btnMoverCompletado.textContent = '→';
            btnMoverCompletado.addEventListener('click', function() {
                cambiarEstadoTarea(indice, 'completada');
            });

            li.appendChild(btnMoverPendiente);
            li.appendChild(btnMoverCompletado);
            li.appendChild(btnEliminar);
            listaHaciendo.appendChild(li);

        } else if (tarea.estado === 'completada') {
            li.appendChild(btnEliminar);
            listaCompletadas.appendChild(li);
        }
    });
}

function cambiarEstadoTarea(indice, nuevoEstado) {
    tareas[indice].cambiarEstado(nuevoEstado);
    actualizarInterfaz();
}

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    actualizarInterfaz();
}
