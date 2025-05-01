import { mostrarCarreras, mostrarCargos, insertarUsuario, mostrarDatosTabla, actualizarUsuarios, eliminarUsuario} from "../hooks/peticiones.js";
import { getValuesInsertarUser, llenarInputUpdate, getValuesUpdateUsuarios} from "../hooks/getValues.js";
import { ValidarClaveIdentificacion} from "../hooks/regex.js"

$(document).ready(() => {
    mostrarDatosTabla();
    mostrarCarreras();
    mostrarCargos();
    $('#guardar').on('click', () => {
        $('#guardarUser').modal('show');
        let datos = getValuesInsertarUser();
        insertarUsuario(datos);
        mostrarDatosTabla();
    });
});

$('.regex').on('keyup',function (){
    ValidarClaveIdentificacion(this);
});

$(document).on('click','.btn-actualizar', (event) => {
    llenarInputUpdate(event);
})

$('#guardarActualizar').on('click', () => {
    $('#modalActualizar').modal('show');
    let datos = getValuesUpdateUsuarios();
    actualizarUsuarios(datos);
    mostrarDatosTabla();
});

$(document).on('click', '.btn-eliminar', function () {
    let clave = $(this).data('clave_identificacion');

    Swal.fire({
        title: '¿Eliminar usuario?',
        text: 'Se eliminara permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((res) => {
        if (res.isConfirmed) {
            eliminarUsuario(clave);
        }
    });
});

