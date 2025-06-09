export const FilasTablaEventos = (evento) => {
    return `
    <tr>
        <td>${evento.NombreEvento}</td>
        <td>${evento.FechaEvento}</td>
        <td>${evento.HoraProgramada}</td>
        <td>${evento.HoraSalida}</td>
        <td>${evento.HoraTolerancia}</td>
        <td>${evento.AreaEvento}</td>
        <td>${evento.Rol}</td>
        <td>${evento.CodigoEvento}</td>
        <td>${BtnActualizar(evento.IdRol)}</td>
        <td>${BtnEliminar(evento.CodigoEvento)}</td>
        }</td>
    </tr>`;
}
const BtnEliminar = (CodigoEvento) => {
    return `<button class="btn btn-danger btn-eliminar" data-codigoevento="${CodigoEvento}">
                <i class="fas fa-trash"></i>
            </button>`;
};

const BtnActualizar = (idRol) => {
    return `<button class="btn btn-warning btn-actualizar" data-bs-toggle="modal" data-clave_rol="${idRol}" data-bs-target="#ModalActualizarEvento"><i class="fa-solid fa-pen-to-square"></i></button>`;
};


export const getValuesInsertarEvento = () => {
    let nombre_evento = $("#nombre_evento").val();
    let fecha_evento = $("#fecha").val();
    let hora_programada = $("#ingreso").val();
    let hora_salida = $("#salida").val();
    let hora_tolerancia = $("#tolerancia").val();
    let area_evento = $("#area").val();
    let rol = $("#asistentes").val();

    let evento = {
        "nombre_evento": nombre_evento,
        "fecha_evento": fecha_evento,
        "hora_programada": hora_programada,
        "hora_salida": hora_salida,
        "hora_tolerancia": hora_tolerancia,
        "area_evento": area_evento,
        "rol": rol
    }
    return evento;
}

export const llenarInputUpdateEvento = (event) => {
    const btn = event.currentTarget;
    let fila = $(btn).closest('tr');

    let nombre_evento = fila.find('td:nth-child(1)').text();
    let fecha_evento = fila.find('td:nth-child(2)').text();
    let hora_programada = fila.find('td:nth-child(3)').text();
    let hora_salida = fila.find('td:nth-child(4)').text();
    let hora_tolerancia = fila.find('td:nth-child(5)').text();
    let area_evento = fila.find('td:nth-child(6)').text();
    let id_rol = $(btn).data("clave_rol");
    let codigo_evento = fila.find('td:nth-child(8)').text();

    $("#nombre_eventoAct").val(nombre_evento);
    $("#fechaAct").val(fecha_evento);
    $("#ingresoAct").val(hora_programada);
    $("#salidaAct").val(hora_salida);
    $("#toleranciaAct").val(hora_tolerancia);
    $("#areaAct").val(area_evento);
    $("#asistentesAct").val(id_rol);
    $("#codigoEvento").val(codigo_evento);  
    
}

export const getValuesUpdateEvento = () => {
    let nombre_evento = $("#nombre_eventoAct").val();
    let fecha_evento = $("#fechaAct").val();
    let hora_programada = $("#ingresoAct").val();
    let hora_salida = $("#salidaAct").val();
    let hora_tolerancia = $("#toleranciaAct").val();
    let area_evento = $("#areaAct").val();
    let id_rol = $("#asistentesAct").val();

    let evento = {
        "nombre_evento": nombre_evento,
        "fecha_evento": fecha_evento,
        "hora_programada": hora_programada,
        "hora_salida": hora_salida,
        "hora_tolerancia": hora_tolerancia,
        "area_evento": area_evento,
        "id_rol": id_rol
    }
    return evento;
}