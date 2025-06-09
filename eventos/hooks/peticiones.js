import { mesajes } from "../../hooks/mensajes.js";
import { FilasTablaEventos } from "./getValues.js";

export const mostrarDatosTabla = () => {
    $.ajax({
        url: "../controller/eventosController.php",
        method: "POST",
        data: { peticion: "All_Eventos" },
        dataType: "json",
        cache: false,
        success: function (respuesta) {
            if ($.fn.DataTable.isDataTable("#dataTableAddEventos")) {
                $('#dataTableAddEventos').DataTable().clear().destroy();
            }

            if (respuesta.estado) {
                let filas = respuesta.datos.map(evento => FilasTablaEventos(evento)).join('');
                $('#mostrarE').html(filas);

                $("#dataTableAddEventos").DataTable({
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
                    },
                    responsive: true,
                    pageLength: 10
                });
            } else {
                mesajes(respuesta, false);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en AJAX:', status, error);
            console.log('Respuesta del servidor:', xhr.responseText);
            mesajes({ estado: false, mensaje: "Error al cargar datos" }, true);
        }
    });
};

export const mostrarAsistentes = () => {
    $.ajax({
        url: "../controller/eventosController.php",
        method: "POST",
        data: { peticion: "All_Asistentes" },
        dataType: "json",
        success: function (respuesta) {
            if (respuesta.estado) {
                $('#asistentes').empty();
                respuesta.datos.forEach(asistente => {
                    $('#asistentes, #asistentesAct').append(
                        `<option value="${asistente.id_rol}">${asistente.descripcion}</option>`
                    );
                });
            } else {
                mesajes(respuesta, false);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", error);
            mesajes({ estado: false, mensaje: "Error al obtener asistentes" }, true);
        }
    });
};

export const insertarEventos = (datos) => {
    $.ajax({
        url: "../controller/eventosController.php",
        method: "POST",
        data: { peticion: "Insertar_Evento", paquete: datos },
        dataType: "json",
        success: function (respuesta) {
            mesajes(respuesta, false);
            mostrarDatosTabla(); // recargar solo si se inserta correctamente
        },
        error: function (xhr, status, error) {
            console.error('Error en AJAX:', status, error);
            console.log('Respuesta del servidor:', xhr.responseText);
            mesajes({ estado: false, mensaje: "Error al insertar evento" }, true);
        }
    });
};

export const actualizarEventos = (datos) => {
    $.ajax({
        url: "../controller/eventosController.php",
        method: "POST",
        data: { peticion: "Actualizar_Evento", paquete: datos },
        dataType: "json",
        success: function (respuesta) {
            mesajes(respuesta, false);
            mostrarDatosTabla();
        },
        error: function (xhr, status, error) {
            console.error('Error en AJAX:', status, error);
            console.log('Respuesta del servidor:', xhr.responseText);
            mesajes({ estado: false, mensaje: "Error al actualizar evento" }, true);
        }
    });
};

export const eliminarEvento = (CodigoEvento) => {
    console.log("Código a eliminar:", CodigoEvento); // Verifica que recibes el código
    $.ajax({
        url: "../controller/eventosController.php",
        method: "POST",
        data: { 
            peticion: "Eliminar_Evento", 
            CodigoEvento: CodigoEvento 
        },
        dataType: "json",
        success: function (respuesta) {
            mesajes(respuesta, false);
            mostrarDatosTabla();
        },
        error: function (xhr, status, error) {
            console.error('Error en AJAX:', status, error);
            console.log('Respuesta del servidor:', xhr.responseText);
            mesajes({ 
                estado: false, 
                mensaje: "Error al eliminar evento: " + error 
            }, true);
        }
    });
};



