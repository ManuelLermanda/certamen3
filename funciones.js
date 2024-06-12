import { getData, save } from "./firestore.js"

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const reserva = {
                run: document.getElementById('run').value,
                nom: document.getElementById('nombre').value.trim(),
                ape: document.getElementById('apellido').value.trim(),
                email: document.getElementById('email').value,
                fono: document.getElementById('telefono').value,
                fum: document.getElementsByName('fumador').value,
                habi: document.getElementById('tipoHabitacion').value,
                fechaIn: document.getElementById('fechaIngreso').value,
                fechaSa: document.getElementById('fechaSalida').value,
                como: document.getElementsByName('comodidiades').value
            }
            save(reserva)
        }
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
            <td>${item.nom}</td>
            <td>${item.ape}</td>
            <td>${item.email}</td>
            <td>${item.fono}</td>
            <td>${item.fum}</td>
            <td>${item.habi}</td>
            <td>${item.fechaIn}</td>
            <td>${item.fechaSa}</td>
            <td>${item.como}</td>
            <td nowrap>
                <button class="btn btn-warning">Editar</button>
                <button class="btn btn-danger">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
    })
})