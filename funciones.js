import { edit, getData, remove, save, selectOne } from "./firestore.js"
//variable que contiene el id del documento 
let id = 0
//addEventListener permite ejecutar la función cuando se haga click 
document.getElementById('btnGuardar').addEventListener('click', () => {
    // Verificar todos los elementos con form-control y form-check-input
    document.querySelectorAll('.form-control, .form-check-input').forEach(item => {
        verificar(item.id);
    });

    // Verificar si existen estilos en rojo (is-invalid)
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const reserva = {
            run: document.getElementById('run').value,
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            fumador: document.querySelector('input[name="fumador"]:checked') ? document.querySelector('input[name="fumador"]:checked').value : null,
            tipoHabitacion: document.getElementById('tipoHabitacion').value,
            fechaIngreso: document.getElementById('fechaIngreso').value,
            fechaSalida: document.getElementById('fechaSalida').value,
            comodidades: Array.from(document.querySelectorAll('input[name="comodidades"]:checked')).map(cb => cb.value)
        };

        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(reserva);
        } else {
            edit(id, reserva);
            id = 0;
        }
        limpiar();
    }
})

//DOMContentLoaded es una evento que se activa al recargar la página
window.addEventListener('DOMContentLoaded', () => {
    //función que recibe los datos de la db 
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            //data trae todos los valores de los documentos de la base datos
            const item = doc.data()

            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>${item.email}</td>
            <td>${item.telefono}</td>
            <td>${item.fumador}</td>
            <td>${item.tipoHabitacion}</td>
            <td>${item.fechaIngreso}</td>
            <td>${item.fechaSalida}</td>
            <td>${item.comodidades}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificar en que botón se hizo click
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    //entra si presionamos eliminar
                    if (result.isConfirmed) {
                        //invocamos la función que permite eliminar el documento, enviando el id
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado!",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //recorrer todos los botones editar para seleccionar el registro
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //async y await permite esperar una respuesta de la función para continuar con el código 
            btn.addEventListener('click', async () => {
                //ejecutamos la consulta que retorna el documento pasando el id como parametro
                const reserva = await selectOne(btn.id)
                //capturamos los valores del documento
                const e = reserva.data()
                //pasar valores a los inputs
                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nombre
                document.getElementById('apellido').value = e.apellido
                document.getElementById('email').value = e.email
                document.getElementById('telefono').value = e.telefono
                document.getElementsByid('fumador').value = e.fumador
                document.getElementById('tipoHabitacion').value = e.tipoHabitacion
                document.getElementById('fechaIngreso').value = e.fechaIngreso
                document.getElementById('fechaSalida').value = e.fechaSalida
                document.getElementsByid('comodidades').value = e.comodidades
                //cambiar el botón a editar
                document.getElementById('btnGuardar').value = 'Editar'
                //solo lectura el run
                document.getElementById('run').readOnly = true
                //asignar el id del documento 
                id = reserva.id
            })
        })
    })
})
