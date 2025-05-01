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
        <td>${BtnActualizar()}</td>
        <td>${BtnEliminar()}</td>
        }</td>
    </tr>`;
}
const BtnEliminar = (clave_identificacion) => {
    return `<button class="btn btn-danger btn-eliminar" data-clave_identificacion="${clave_identificacion}"><i class="fas fa-trash"></i></button>`;
};

const BtnActualizar = () => {
    return `<button class="btn btn-warning btn-actualizar" data-bs-toggle="modal" data-clave_carrera="" data-bs-target="#modalActualizar"><i class="fa-solid fa-pen-to-square"></i></button>`;
};