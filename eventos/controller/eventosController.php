<?php
require_once '../model/eventosModel.php';
require_once '../../helpers/convertidorJSON.php';

class EventosController extends EventosModel {
    private $peticion = null;

    public function __construct($peticion = null, $paquete = null){
        parent::__construct($paquete);
        $this->peticion = $peticion;
    }

    public function Peticiones(){
        switch($this->peticion){
            case 'All_Eventos':
                echo $this->MostrarEventos();
                break;
            case 'All_Asistentes':
                echo $this->MostrarAsistentes();
                break;
            case 'Insertar_Evento':
                echo $this->InsertEventos();
                break;
            default:
                echo convertidorJSON(["estado" => false, "MSG" => "Peticion no encontrada"]);
        }
    }

    public function MostrarEventos(){
        $mostrar = $this->mostrarEventoss();
        $respuesta = $mostrar["estado"]
            ? ["estado" => true, "MSG" => "Eventos encontrados", "datos" => $mostrar["Eventos"]]
            : ["estado" => false, "MSG" => "Error al encontrar los eventos", "Error" => $mostrar["Error captura"]];
        return convertidorJSON($respuesta);
    }

    public function MostrarAsistentes(){
        $mostrar = $this->verAsistentes();
        $respuesta = $mostrar["estado"]
            ? ["estado" => true, "MSG" => "Asistentes encontrados", "datos" => $mostrar["Asistentes"]]
            : ["estado" => false, "MSG" => "Error al encontrar los asistentes", "Error" => $mostrar["Error captura"]];
        return convertidorJSON($respuesta);
    }

    public function InsertEventos() {
    $mostrar = $this->InsertarEvento();
    
    if ($mostrar["estado"]) {
        $respuesta = ["estado" => true, "MSG" => "Evento insertado con roles exitosamente"];
    } else if (isset($mostrar["error"])) {
        $respuesta = ["estado" => false, "MSG" => $mostrar["error"]];
    } else if (isset($mostrar["Error capturada"])) {
        $respuesta = ["estado" => false, "MSG" => "Error inesperado", "error" => $mostrar["Error capturada"]];
    } else {
        $respuesta = ["estado" => false, "MSG" => "Ocurrió un error inesperado"];
    }

    return convertidorJSON($respuesta);
}







}

$peticion = $_POST['peticion'] ?? null;
$paquete = $_POST['paquete'] ?? null;
$eventosController = new EventosController($peticion, $paquete);
$eventosController->Peticiones();

?>