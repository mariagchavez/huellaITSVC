<?php
require_once '../model/eventosModel.php';
require_once '../../helpers/convertidorJSON.php';

class EventosController extends EventosModel{
    private $peticion = null;
    public function __construct($peticion = null, $paquete = null){
        parent::__construct($paquete);
        $this->peticion = $peticion;
    }

    public function Peticiones(){
        switch($this->peticion){
            case 'All_Eventos':
                return $this->MostrarEventos();
            default:
                return convertidorJSON(["estado" => false, "MSG" => "Peticion no encontrada"]);
        }
    }

    public function MostrarEventos(){
        $mostrar = $this->mostrarEventoss();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Eventos encontrados", "datos" => $mostrar["Eventos"]];
        }else{
            $respuesta = ["estado" => false, "MSG" => "Error al encontrar los eventos", "Error" => $mostrar["Error captura"]];
        }
        return convertidorJSON($respuesta);
    }
        

}

$peticion = $_POST['peticion'] ?? null;
$paquete = $_POST['paquete'] ?? null;
$eventosController = new EventosController($peticion, $paquete);
$eventosController->Peticiones();
?>