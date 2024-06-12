
const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">Debe completar este campo para continuar.</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''


        if (id == 'fechaIngreso') {
            const fecha = new Date(input.value)
            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0);
            if (fecha < hoy) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha ingresada es inválida.</span>'
            }
        }
        if (id == 'fechaSalida'){
            const fechaIngreso = (document.getElementById('fechaIngreso').value);
            const fechaSalida = (input.value);
            if(fechaSalida < fechaIngreso){
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La fecha de salida no puede ser anterior a la de fecha entrada.</span>'
            }
        }
        if (id == 'run') {
            if (!validaRun(input.value)){
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido.</span>'
            }
        }
        if (id == 'email') {
            if (!validaEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto.</span>'
            }
        }
    }
}

const opcionesRadio = document.querySelectorAll('input[name="fumador"]');

opcionesRadio.forEach(opcion => {
    opcion.addEventListener('change', () => {
        opcionesRadio.forEach(opcion => {
            if (opcion.checked && opcion.classList.contains('is-valid')) {
                opcion.classList.remove('is-valid');
            }
        });
    });
});

opcionesRadio.forEach(opcion => {
    opcion.addEventListener('change', () => {
        opcionesRadio.forEach(opcion => {
            if (opcion.checked && opcion.validity.valid) {
                opcion.classList.add('is-valid');
            } else {
                opcion.classList.remove('is-valid');
            }
        });
    });
});




const validaEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!formato.test(email))
        return false
    return true
}

const validaRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') //split separa en run en dos antes del guión y despues
            const digv = tmp[1] //dígito verificador
            const rut = tmp[0]//parte númerica
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}


const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //volver a la normalidad run y btnGuardar
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}