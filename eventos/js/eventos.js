import { mostrarDatosTabla, mostrarAsistentes, insertarEventos, actualizarEventos, eliminarEvento } from "../hooks/peticiones.js";
import { getValuesInsertarEvento, llenarInputUpdateEvento, getValuesUpdateEvento } from "../hooks/getValues.js";

$(document).ready(() => {
    mostrarDatosTabla();
    mostrarAsistentes();

    $('#ModalguardarEvento').on('shown.bs.modal', function () {
        mostrarAsistentes();
        $('#asistentes').select2({
            dropdownParent: $('#ModalguardarEvento'),
            placeholder: "Selecciona quienes asistirán",
            allowClear: true
        });
    });

    $('#guardarEvento').on('click', () => {
        let datos = getValuesInsertarEvento();
        insertarEventos(datos);
    });
});

$(document).on('click', '.btn-actualizar', (event) => {
    llenarInputUpdateEvento(event);
});

$('#guardarEventoActualizar').on('click', () => {
    let datos = getValuesInsertarEvento();
    mostrarDatosTabla();
});

$(document).on("click", ".btn-eliminar", function () {
    let codigo_evento = $(this).data("codigoevento"); // Asegúrate que el atributo data coincide
    console.log("Intentando eliminar:", codigo_evento);
    
    Swal.fire({
        title: '¿Eliminar evento?',
        text: 'Se eliminará permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((res) => {
        if (res.isConfirmed) {
            eliminarEvento(codigo_evento);
        }
    });
});