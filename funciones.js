import { edit, getData, remove, save, selectOne } from "./firestore.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', () => {

    document.querySelectorAll('.form-control, .form-check-input').forEach(item => {
        verificar(item.id);
    })

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
        }

        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(reserva)
        } else {
            edit(id, reserva)
            id = 0
        }
        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
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
        document.querySelectorAll('.btn-danger').forEach(btn => {
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
                    if (result.isConfirmed) {
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
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const reserva = await selectOne(btn.id)
                const e = reserva.data()
                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nombre
                document.getElementById('apellido').value = e.apellido
                document.getElementById('email').value = e.email
                document.getElementById('telefono').value = e.telefono
                // obtener valores de radios
                const radioFumador = document.querySelector(`input[name="fumador"][value="${e.fumador}"]`)
                if (radioFumador) {
                    radioFumador.checked = true
                }
                document.getElementById('tipoHabitacion').value = e.tipoHabitacion
                document.getElementById('fechaIngreso').value = e.fechaIngreso
                document.getElementById('fechaSalida').value = e.fechaSalida
                // obtener valores de checkboxes
                const comodidadesCheckboxes = document.querySelectorAll('input[name="comodidades"]');
                comodidadesCheckboxes.forEach(cb => {
                    cb.checked = e.comodidades.includes(cb.value)
                })
                
                document.getElementById('btnGuardar').value = 'Editar'
                document.getElementById('run').readOnly = true
                id = reserva.id
            })
        })
    })
})
