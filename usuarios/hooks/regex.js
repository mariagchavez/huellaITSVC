export const ValidarClaveIdentificacion = (input) => {
    let inputV = input.value;
    const validacion = /^[A-Z0-9]{3,8}$/;
    let msjerror='';
    if(!validacion.test(inputV)){
        msjerror = "Debe contener entre 3 y 8 caracteres";
    }  
    if(input.id == "clave_identificacion"){
        $('#clave_identificacionError').text(msjerror)
    }
}

