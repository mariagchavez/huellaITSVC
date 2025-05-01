import {mesajes} from '../../hooks/mensajes.js';

export const validarLogin = (datos) => {
    console.log(datos);
    $.ajax({
        url: "../controller/loginController.php",
        method: "POST",
        data: {
            peticion: "ValidarLogin",
            paquete: datos
        },
        dataType: "json",
        success: function (respuesta) {
            mesajes(respuesta, false);
            if (respuesta.estado) { 
                setTimeout(() => {
                    window.location.href = "../../menus/menu.html";
                }, 2000);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', status);
            mesajes({ mensaje: "Error en la solicitud" }, true);
        }
    });
};
