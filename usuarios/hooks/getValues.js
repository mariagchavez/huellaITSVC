export const getValuesInsertarUser = () =>{
    let clave_identidicacion =$("#clave_identificacion").val();
    let nombre = $("#nombre").val();
    let apellido_paterno = $("#apellido_paterno").val();
    let apellido_materno = $("#apellido_materno").val();
    let correo = $("#correo").val();
    let sexo = $("#sexo").val();
    let cargo = $("#cargo").val();
    let carrera = $("#carrera").val();
    let usuarios={
        "clave_identificacion":clave_identidicacion,
        "nombre":nombre,
        "apellido_paterno":apellido_paterno,
        "apellido_materno":apellido_materno,
        "correo":correo,
        "sexo":sexo,
        "cargo":cargo,
        "carrera":carrera
    }
    return usuarios;
}

export const FilasTablaUsuarios = (usuario) => {
    return `
    <tr>
        <td>${usuario.Matricula}</td>
        <td>${usuario.Nombre}</td>
        <td>${usuario.ApellidoPA}</t>
        <td>${usuario.ApellidoMA}</td>
        <td>${usuario.Correo}</td>
        <td>${usuario.Sexo}</td>
        <td>${usuario.Rol}</td>
        <td>${usuario.Carrera}</td>
        <td>${BtnActualizar(usuario.clave_carrera)}</td>
        <td>${BtnEliminar(usuario.Matricula)}</td>
        <td>${BtnHuella()}</td>
        )}</td>
    </tr>`;
}
const BtnEliminar = (clave_identificacion) => {
    return `<button class="btn btn-danger btn-eliminar" data-clave_identificacion="${clave_identificacion}"><i class="fas fa-trash"></i></button>`;
};

const BtnActualizar = () => {
    return `<button class="btn btn-warning btn-actualizar" data-bs-toggle="modal" data-clave_carrera="" data-bs-target="#modalActualizar"><i class="fa-solid fa-pen-to-square"></i></button>`;
};

const BtnHuella = () => {
    return `<button class="btn btn-primary btn-huella" data-bs-toggle="modal" data-bs-target="#modalHuella"><i class="fas fa-fingerprint"></i></button>`;
}

export const llenarInputUpdate = (event) =>{
    const btn = event.currentTarget;
    let fila = $(btn).closest('tr');

    let matricula = fila.find('td:nth-child(1)').text();
    let nombre = fila.find('td:nth-child(2)').text();
    let ape_paterno = fila.find('td:nth-child(3)').text();
    let ape_materno = fila.find('td:nth-child(4)').text();
    let correo = fila.find('td:nth-child(5)').text();
    let sexo = fila.find('td:nth-child(6)').text();
    let cargo = fila.find('td:nth-child(7)').text();
    let carrera = fila.find('td:nth-child(8)').text();

    $('#clave_identificacionAct').val(matricula);
    $('#nombreAct').val(nombre);
    $('#apellido_paternoAct').val(ape_paterno);
    $('#apellido_maternoAct').val(ape_materno);
    $('#correoAct').val(correo);
    $('#sexoAct').val(sexo);
    $('#cargoAct').val(cargo)
    $('#carreraAct').val(carrera);
}

export const getValuesUpdateUsuarios = () =>{
    let clave_identidicacion =$("#clave_identificacionAct").val();
    let nombre = $("#nombreAct").val();
    let apellido_paterno = $("#apellido_paternoAct").val();
    let apellido_materno = $("#apellido_maternoAct").val();
    let correo = $("#correoAct").val();
    let sexo = $("#sexoAct").val();
    let cargo = $("#cargoAct").val();
    let carrera = $("#carreraAct").val();
    let usuarios={
        "clave_identificacion":clave_identidicacion,
        "nombre":nombre,
        "apellido_paterno":apellido_paterno,
        "apellido_materno":apellido_materno,
        "correo":correo,
        "sexo":sexo,
        "cargo":cargo,
        "carrera":carrera
    }
    return usuarios;
}
