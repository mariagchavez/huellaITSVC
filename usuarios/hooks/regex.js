export const ValidarBtnInsert = () => {
    let errores = $('#clave_identificacionError').text() || $('#nombreError').text() || $('#apellido_paternoError').text() || $('#apellido_maternoError').text() || $('#correoError').text() || $('#sexoError').text() || $('#cargoError').text() || $('#carreraError').text();
    let inputsVacios = $('#clave_identificacion').val().trim() == "" || $('#nombre').val().trim() == "" || $('#apellido_paterno').val().trim() == "" || $('#apellido_materno').val().trim() == "" || $('#correo').val().trim() == "";
    let haySelectInvalido = $('.regex.is-invalid').length > 0;

    if (errores || inputsVacios || haySelectInvalido) {
        $('#guardar').prop('disabled', true);
    } else {
        $('#guardar').prop('disabled', false);
    }
}
export const ValidarBtnActualizar = () => {
    let errores = $('#clave_identificacionActError').text() || $('#nombreActError').text() || $('#apellido_paternoActError').text() || $('#apellido_maternoActError').text() || $('#correoActError').text() || $('#sexoActError').text() || $('#cargoActError').text() || $('#carreraActError').text();

    if (errores) {
        $('#guardarActualizar').prop('disabled', true);
    } else {
        $('#guardarActualizar').prop('disabled', false);
    }
}

export const ValidarClaveIdentificacion = (input) => {
    let inputV = input.value;
    const validacion = /^[A-Z0-9]{3,9}$/;
    let msjerror='';
    if(!validacion.test(inputV)){
        msjerror = "Debe contener entre 3 y 8 caracteres";
    }  
    if(input.id == "clave_identificacion"){
        $('#clave_identificacionError').text(msjerror)
    }
    else if(input.id == "clave_identificacionAct"){
        $('#clave_identificacionActError').text(msjerror)
    }
}
export const ValidadNombreCompleto = (input) =>{
    let inputV = input.value;
    const validacion = /^[A-ZÑÁÉÍÓÚa-zñáéíóú]+(\s[A-ZÑÁÉÍÓÚa-zñáéíóú]+)*$/;    
    let msjerror='';
    if(!validacion.test(inputV)){
        msjerror = "El nombre no es valido";
    }  
    if(input.id == "nombre"){
        $('#nombreError').text(msjerror)
    }else if(input.id == "apellido_paterno"){
        $('#apellido_paternoError').text(msjerror)
    }else if(input.id == "apellido_materno"){
        $('#apellido_maternoError').text(msjerror)
    }

    if(input.id == "nombreAct"){
        $('#nombreActError').text(msjerror)
    }else if(input.id == "apellido_paternoAct"){
        $('#apellido_paternoActError').text(msjerror)
    }else if(input.id == "apellido_maternoAct"){
        $('#apellido_maternoActError').text(msjerror)
    }   
}
export const ValidarCorreo = (input) =>{
    let inputV = input.value;
    const validacion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let msjerror='';
    if(!validacion.test(inputV)){
        msjerror = "El correo no es valido";
    }  
    if(input.id == "correo"){
        $('#correoError').text(msjerror)
    }

    else if(input.id == "correoAct"){
        $('#correoActError').text(msjerror)
    }
}
export const ValidadSelect = (input) => {    
    if (input.selectedIndex == 0) {
        $(input).addClass('is-invalid');
    } else {
        $(input).removeClass('is-invalid');
    }
    ValidarBtnInsert(); 
}
export const ValidarCargo = (input) => {
    let valor = input.value;
    if (valor !== 'Alumno' && valor !== 'Docente') {
        $('#grupo-carrera').hide();
        $('#carrera').val('').removeClass('is-invalid is-valid');
    } else {
        $('#grupo-carrera').show();
    }
    ValidarBtnInsert();
}