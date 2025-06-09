import { mesajes } from "../../../hooks/mensajes.js";
import { FilasTablaAsistencia } from "./getValues.js";

export const mostrarDatosTabla = () => {
    $.ajax({
        url: "../controller/asitenciaController.php",
        method: "POST",
        data: { peticion: "All_Asistencias" },
        dataType: "json",
        cache: false,
        success: function(respuesta){
            console.log("Respuesta:", respuesta);

            if ($.fn.DataTable.isDataTable("#dataTableAsistencias")){
                $('#dataTableAsistencias').DataTable().clear().destroy();
            }

            if (respuesta.estado){
                let filas = respuesta.Asistencias.map(evento => FilasTablaAsistencia(evento)).join('');
                $('#mostrarAsistencias').html(filas); // <tbody id="mostrarAsistencias">

                $("#dataTableAsistencias").DataTable({
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
        error: function(xhr, status, error){
            console.error('Error en AJAX:', status, error);
            console.log('Respuesta del servidor:', xhr.responseText);
            mesajes({ estado: false, mensaje: "Error al cargar asistencias" }, true);
        }
    });
};