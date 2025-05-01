import { mesajes } from "../../hooks/mensajes.js";
import {FilasTablaUsuarios} from "./getValues.js"

export const mostrarCarreras = () =>{
$.ajax({
    url: "../controller/usuariosController.php",
    method: "POST",
    data: {peticion: "All_Carreras"},
    dataType: "json",
    success:function(respuesta){
        if(respuesta.estado){
            respuesta.Carreras.forEach(carreras => {
                $('#carrera, #carreraAct').append(`<option value="${carreras.clave_carrera}">${carreras.descripcion}</option>`);
            });
        }else {
            mesajes(respuesta,false);
        }
    },
    error: function (xhr, status, error) {
        console.error("Error en la solicitud AJAX:", error);
        mesajes(respuesta,true);
    }
})};

export const mostrarCargos = () =>{
    $.ajax({
        url: "../controller/usuariosController.php",
        method: "POST",
        data: {peticion: "All_Cargo"},
        dataType: "json",
        success:function(respuesta){
            if(respuesta.estado){
                respuesta.Cargos.forEach(cargos => {
                    $('#cargo, #cargoAct').append(`<option value="${cargos.descripcion}">${cargos.usuario}</option>`);
                });
            }else{
                mesajes(respuesta,false);
            }
        }, 
        error:function(xhr, status, error){
            console.error("Error en la solicitus AJAX: ",error);
            mesajes(respuesta,true);
        }
    })
}

export const insertarUsuario = (datos) =>{
    $.ajax({
        url: "../controller/usuariosController.php",
        method: "POST",
        data: {peticion: "Insert_Usuario", paquete: datos},
        dataType: "json",
        success: function(respuesta){
            $('#clave_identificacion, #nombre, #apellido_paterno, #apellido_materno, #correo, #sexo, #cargo, #carrera').val('');
            mesajes(respuesta,false);
            $('.modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            mostrarDatosTabla();
        },
        error: function(xhr, status, error){
            console.error('Error:', status);
            mesajes(respuesta,true)
        }
    });
};

export const mostrarDatosTabla = () => {
    $.ajax({
        url: "../controller/usuariosController.php",
        method: "POST",
        data: { peticion: "All_usuarios" },
        dataType: "json",
        cache: false, 
        success: function(respuesta) {
            let tabla = $("#dataTableUsuarios").DataTable();
            if ($.fn.DataTable.isDataTable("#dataTableUsuarios")) {
                tabla.clear().destroy();
            }
            if (respuesta.estado) {
                let filas = respuesta.datos.map(usuario => FilasTablaUsuarios(usuario)).join('');
                $('#mostrar').html(filas);
                
                $("#dataTableUsuarios").DataTable({
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
        error: function(xhr, status, error) {
            console.error('Error en AJAX', status);
            mesajes({ estado: false, mensaje: "Error al cargar datos" }, true);
        }
    });
};

export const actualizarUsuarios = (datos) => {
    console.log(datos);
    $.ajax({
        url: "../controller/usuariosController.php",
        method: "POST", 
        data: { peticion: "Actualizar_usuario", paquete:datos},
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            mesajes(respuesta,false);
            $('.modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            mostrarDatosTabla();
        },
        error:function(xhr, status, error){
            console.error('Error en AJAX: ', status);
            mesajes(respuesta,true);
        }
    })
}

export const eliminarUsuario = (clave_identificacion) => {
    console.log(clave_identificacion);
    $.ajax({
        url: "../controller/usuariosController.php",
        method: "POST",
        data: { peticion: "Eliminar_Usuario", paquete: {clave_identificacion: clave_identificacion}},
        dataType: "json",
        success: function(respuesta) {
            mesajes(respuesta,false);
            mostrarDatosTabla();
        },
        error:function(xhr, status, error) {
            console.error('Error en AJAX:', status);
            mesajes(respuesta,true);
        }
    });
}   