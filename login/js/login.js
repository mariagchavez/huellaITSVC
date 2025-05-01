import {validarLogin} from '../hooks/peticiones.js';
import { getValuesLogin } from '../hooks/getValues.js';

$('#Login').on('click', ()=>{
    let datos = getValuesLogin();
    validarLogin(datos);
    $('#usuario, #contrasena').val('');
});