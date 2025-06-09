export const FilasTablaAsistencia = (asistencia) => {
    return `
    <tr>
        <td>${asistencia.ClaveIdentificacion}</td>
        <td>${asistencia.NombreCompleto}</td>
        <td>${asistencia.Usuario}</td>
        <td>${asistencia.Fecha}</td>
        <td>${asistencia.HoraIngresoEvento}</td>
        <td>${asistencia.HoraIngreso}</td>
        <td>${asistencia.HoraSalidaEvento}</td>
        <td>${asistencia.Carrera}</td>
    </tr>`;
};
