<?php
require_once '../../config/conexion.php';

class EventosModel extends DatabaseDB{
    private $nombre_evento;
    private $hora_inicio;
    private $hora_tolerancia;
    private $hora_salida;
    private $fecha_evento;
    private $area_evento;
    private $asistentes_evento;

    public function __construct($paquete = null){
        parent::__construct(); 
        $this->nombre_evento = $paquete['nombre_evento'] ?? null;
        $this->hora_inicio = $paquete['hora_inicio'] ?? null;
        $this->hora_tolerancia = $paquete['hora_tolerancia'] ?? null;
        $this->hora_salida = $paquete['hora_salida'] ?? null;
        $this->fecha_evento = $paquete['fecha_evento'] ?? null;
        $this->area_evento = $paquete['area_evento'] ?? null;
        $this->asistentes_evento = $paquete['asistentes_evento'] ?? null;        
    }

    public function mostrarEventoss(){
        try{
            $sql= "SELECT horario_eventos.nombre_evento As NombreEvento, horario_eventos.fecha AS FechaEvento, horario_eventos.hora_programada_E AS HoraProgramada,
                horario_eventos.hora_salida_E AS HoraSalida, horario_eventos.hora_tolerancia AS HoraTolerancia, horario_eventos.area AS AreaEvento, 
                rol_usuario.descripcion AS Rol
                FROM horario_eventos
                INNER JOIN rol_usuario ON horario_eventos.id_rol = rol_usuario.id_rol;";
            $execute = $this->conexionDB()->query($sql);
            $respuesta = $execute->fetchAll(PDO::FETCH_ASSOC);
            return ["estado" => true, "Eventos" => $respuesta];
        }catch (Exception $e){
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }
}
?>