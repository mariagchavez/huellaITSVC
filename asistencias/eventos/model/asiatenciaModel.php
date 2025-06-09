<?php
require_once '../../../config/conexion.php';

class AsistenciaModel extends DatabaseDB {

    public function __construct($paquete = null){
        parent::__construct();
    }

    public function obtenerAsistenciasDetalladas() {
    try {
        $sql = "SELECT 
                    p.clave_identificacion AS ClaveIdentificacion,
                    CONCAT(p.nombre, ' ', p.ape_paterno, ' ', p.ape_materno) AS NombreCompleto,
                    r.descripcion AS Usuario,
                    e.fecha AS Fecha,
                    e.hora_programada_E AS HoraIngresoEvento,
                    '' AS HoraIngreso, -- valor vacío si no existe
                    e.hora_salida_E AS HoraSalidaEvento,
                    c.clave_carrera AS Carrera
                FROM personas p
                LEFT JOIN carreras c ON p.id_carrera = c.id_carrera
                INNER JOIN rol_usuario r ON p.id_rol = r.id_rol
                INNER JOIN horario_eventos e ON p.id_rol = e.id_rol";
        
        $execute = $this->conexionDB()->query($sql);
        return ["estado" => true, "Asistencias" => $execute->fetchAll(PDO::FETCH_ASSOC)];
    } catch (Exception $e) {
        return ["estado" => false, "MSG" => "Error al encontrar los eventos", "Error" => $e->getMessage()];
    }
}

}
?>
