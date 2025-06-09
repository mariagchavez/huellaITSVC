<?php
require_once '../../config/conexion.php';

class EventosModel extends DatabaseDB {
    private $nombre_evento;
    private $hora_inicio;
    private $hora_tolerancia;
    private $hora_salida;
    private $fecha_evento;
    private $area_evento;
    private $asistentes_evento;
    private $codigo_evento;

    public function __construct($paquete = null){
        parent::__construct();
        $this->nombre_evento = $paquete['nombre_evento'] ?? null;
        $this->hora_inicio = $paquete['hora_programada'] ?? null;
        $this->hora_tolerancia = $paquete['hora_tolerancia'] ?? null;
        $this->hora_salida = $paquete['hora_salida'] ?? null;
        $this->fecha_evento = $paquete['fecha_evento'] ?? null;
        $this->area_evento = $paquete['area_evento'] ?? null;
        $this->asistentes_evento = $paquete['rol'] ?? null;
        $this->codigo_evento = $paquete['codigo_evento'] ?? null;
    }

    public function mostrarEventoss(){
        try {
            $sql = "SELECT horario_eventos.nombre_evento AS NombreEvento, 
                           horario_eventos.fecha AS FechaEvento, 
                           horario_eventos.hora_programada_E AS HoraProgramada,
                           horario_eventos.hora_salida_E AS HoraSalida, 
                           horario_eventos.hora_tolerancia AS HoraTolerancia, 
                           horario_eventos.area AS AreaEvento, 
                           rol_usuario.descripcion AS Rol,
                           rol_usuario.id_rol AS IdRol,
                           horario_eventos.codigo_eventos AS CodigoEvento
                    FROM horario_eventos
                    INNER JOIN rol_usuario ON horario_eventos.id_rol = rol_usuario.id_rol";
            $execute = $this->conexionDB()->query($sql);
            return ["estado" => true, "Eventos" => $execute->fetchAll(PDO::FETCH_ASSOC)];
        } catch (Exception $e) {
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }

    private function generarCodigoEvento($longitud = 6) {
        return strtoupper(substr(bin2hex(random_bytes($longitud)), 0, $longitud));
    }

    public function verAsistentes(){
        try {
            $sql = "SELECT id_rol, descripcion FROM rol_usuario WHERE descripcion != 'ADMINISTRADOR'";
            $execute = $this->conexionDB()->query($sql);
            return ["estado" => true, "Asistentes" => $execute->fetchAll(PDO::FETCH_ASSOC)];
        } catch(PDOException $e){
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }

    public function InsertarEvento() {
        try {
            if (empty($this->asistentes_evento) || !is_array($this->asistentes_evento)) {
                return ["estado" => false, "error" => "Debe seleccionar al menos un rol válido"];
            }

            $sql = "INSERT INTO horario_eventos 
                    (nombre_evento, hora_programada_E, hora_salida_E, hora_tolerancia, fecha, area, id_rol, codigo_eventos)
                    VALUES (:nombre_evento, :hora_inicio, :hora_salida, :hora_tolerancia, :fecha_evento, :area_evento, :id_rol, :codigo_eventos)";
            $stmt = $this->conexionDB()->prepare($sql);

            $codigo = $this->generarCodigoEvento();

            foreach ($this->asistentes_evento as $id_rol) {
                if (!is_numeric($id_rol)) {
                    continue;
                }
                $stmt->execute([
                    ':nombre_evento' => $this->nombre_evento,
                    ':hora_inicio' => $this->hora_inicio,
                    ':hora_salida' => $this->hora_salida,
                    ':hora_tolerancia' => $this->hora_tolerancia,
                    ':fecha_evento' => $this->fecha_evento,
                    ':area_evento' => $this->area_evento,
                    ':id_rol' => $id_rol,
                    ':codigo_eventos' => $codigo
                ]);
            }
            return ["estado" => true, "mensaje" => "Evento insertado correctamente con código aleatorio"];
        } catch (Exception $e) {
            return ["estado" => false, "Error capturada" => $e->getMessage()];
        }
    }

    public function actualizarEvento() {
    try {
        $sql = "UPDATE horario_eventos SET 
                nombre_evento = :nombre_evento,
                hora_programada_E = :hora_inicio,
                hora_salida_E = :hora_salida,
                hora_tolerancia = :hora_tolerancia,
                fecha = :fecha_evento,
                area = :area_evento,
                id_rol = :id_rol
                WHERE codigo_eventos = :codigo_evento";
        
        $stmt = $this->conexionDB()->prepare($sql);
        
        $stmt->execute([
            ':nombre_evento' => $this->nombre_evento,
            ':hora_inicio' => $this->hora_inicio,
            ':hora_salida' => $this->hora_salida,
            ':hora_tolerancia' => $this->hora_tolerancia,
            ':fecha_evento' => $this->fecha_evento,
            ':area_evento' => $this->area_evento,
            ':id_rol' => $this->asistentes_evento,
            ':codigo_evento' => $this->codigo_evento
        ]);
        
        return ["estado" => true, "mensaje" => "Evento actualizado correctamente"];
    } catch (Exception $e) {
        return ["estado" => false, "Error capturada" => $e->getMessage()];
    }
}

public function eliminarEvento($codigo_evento) {
    try {
        $sql = "DELETE FROM horario_eventos WHERE codigo_eventos = :codigo_evento";
        $stmt = $this->conexionDB()->prepare($sql);
        $stmt->execute([':codigo_evento' => $codigo_evento]);
        
        return ["estado" => true, "mensaje" => "Evento eliminado correctamente"];
    } catch (Exception $e) {
        return ["estado" => false, "Error capturada" => $e->getMessage()];
    }
}
}
?>
