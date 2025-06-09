<?php
require_once '../model/asiatenciaModel.php';
require_once '../../../helpers/convertidorJSON.php';

class EventosController extends AsistenciaModel {
    private $peticion = null;

    public function __construct($peticion = null, $paquete = null){
        parent::__construct($paquete);
        $this->peticion = $peticion;
    }

    public function Peticiones(){
        switch($this->peticion){
            case 'All_Asistencias':
                echo $this->MostrarEventos();
                break;
            default:
                echo convertidorJSON(["estado" => false, "MSG" => "Peticion no encontrada"]);
        }
    }

    public function MostrarEventos(){
    $mostrar = $this->obtenerAsistenciasDetalladas();
    $respuesta = $mostrar["estado"]
        ? ["estado" => true, "MSG" => "Eventos encontrados", "Asistencias" => $mostrar["Asistencias"]] // ← ojo, debe ser Asistencias
        : ["estado" => false, "MSG" => "Error al encontrar los eventos", "Error" => $mostrar["Error"] ?? "Error desconocido"]; // ← evitamos acceso no definido
    return convertidorJSON($respuesta);
}

}

$peticion = $_POST['peticion'] ?? null;
$paquete = $_POST['paquete'] ?? null;
$eventosController = new EventosController($peticion, $paquete);
$eventosController->Peticiones();

?>