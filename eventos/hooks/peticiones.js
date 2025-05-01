import { mesajes } from "../../hooks/mensajes.js";
import { FilasTablaEventos } from "./getValues.js";

export const mostrarDatosTabla = () => {
    $.ajax({
        url: "../controller/eventosController.php",
        method: "POST", 
        data: { peticion: "All_Eventos" },
        dataType: "json",
        cache: false,
        success: function(respuesta){
            let tabla = $("#dataTableAddEventos").DataTable();
            if ($.fn.DataTable.isDataTable("#dataTableAddEventos")){
                tabla.clear().destroy();
            }
            if (respuesta.estado){
                let filas = respuesta.datos.map(evento => FilasTablaEventos(evento)).join('');
                $('#mostrarE').html(filas);

                $("#dataTableAddEventos").DataTable({
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
                    },
                    responsive: true,  
                    pageLength: 10
                });
            }else{
                mesajes(respuesta,false);
            }
        },
        error: function(xhr, status, error){
            console.error('Error en AJAX', status, error);
            console.log('Respuesta del servidor:', xhr.responseText);
            mesajes({estado:false,mensaje:"Error al cargar datos"},true);
        }
    });
};