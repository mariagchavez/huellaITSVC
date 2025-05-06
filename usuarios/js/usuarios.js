import { mostrarCarreras, mostrarCargos, insertarUsuario, mostrarDatosTabla, actualizarUsuarios, eliminarUsuario, mostrarCarrerasAct} from "../hooks/peticiones.js";
import { getValuesInsertarUser, llenarInputUpdate, getValuesUpdateUsuarios} from "../hooks/getValues.js";
import { ValidarClaveIdentificacion, ValidadNombreCompleto, ValidarCorreo, ValidadSelect, ValidarBtnInsert, ValidarCargo, ValidarBtnActualizar} from "../hooks/regex.js"

$(document).ready(() => {
    mostrarDatosTabla();
    mostrarCarreras();
    mostrarCarrerasAct();
    mostrarCargos();
    $('#guardar').on('click', () => {
    $('#carrera').parent().show();
    $('#carrera').val('');
    $('#carrera').removeClass('is-invalid is-valid');
    $('#guardarUser').modal('show');
        let datos = getValuesInsertarUser();
        insertarUsuario(datos);
        $('.regex').val('').removeClass('is-invalid is-valid');
        $('.regex').each(function () {
            if ($(this).is('select')) {
                ValidadSelect(this);
            }
        });
        mostrarDatosTabla();
        ValidarBtnInsert();
    });

    $('.regex').on('keyup',function (){
        ValidarClaveIdentificacion(this);
        ValidadNombreCompleto(this);
        ValidarCorreo(this);
        ValidarBtnInsert();
    });
    
    $('.regex').on('change',function (){
        ValidadSelect(this);
        ValidarBtnInsert();
    });

    $('.regex').each(function () {
        if ($(this).is('select')) {
            ValidadSelect(this);
        }
    });

    $('#cargo').on('change', function () {
        ValidarCargo(this);
    });
    
    ValidarBtnInsert();
    ValidarBtnActualizar();
});

$(document).on('click','.btn-actualizar', (event) => {
    llenarInputUpdate(event);
})

$('#guardarActualizar').on('click', () => {
    $('#modalActualizar').modal('show');
    let datos = getValuesUpdateUsuarios();
    actualizarUsuarios(datos);
    mostrarDatosTabla();

    $('.regex').on('keyup',function (){
        ValidarClaveIdentificacion(this);
        ValidadNombreCompleto(this);
        ValidarCorreo(this);
        ValidarBtnInsert();
    });
    
    ValidarBtnActualizar();

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

