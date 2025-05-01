export const getValuesLogin = ()=>{
    let usuario = $("#usuario").val();
    let password = $("#contrasena").val();
    let login = {
        "usuario":usuario,
        "password":password
    };
    return login;
}