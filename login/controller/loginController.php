<?php
require_once '../model/loginModel.php';
require_once '../../helpers/convertidorJSON.php';

class ValidarLoginController extends ValidarLoginModel {
    private $peticion = null;

    public function __construct($peticion = null, $paquete = null) {
        parent::__construct($paquete);
        $this->peticion = $peticion;
    }

    public function Peticiones() {
        switch ($this->peticion) {
            case 'ValidarLogin':
                return $this->ValidarLoginn();
            default:
                return convertidorJSON(["estado" => false, "mensaje" => "Petición no válida"]);
        }
    }

    public function ValidarLoginn() {
        $validar = $this->ValidarLogin();
    
        if ($validar["estado"] && !empty($validar["resultado"])) {
            $respuesta = [ "estado" => true, "mensaje" => "Credenciales válidas", "usuario" => $validar["resultado"] // Retorna los datos del usuario
            ];
        } else {
            $respuesta = [ "estado" => false,"mensaje" => $validar["mensaje"] ?? "Credenciales incorrectas" ];

            if (isset($validar["Error captura"])) {
                $respuesta["error"] = $validar["Error captura"];
            }
        }

        return convertidorJSON($respuesta);
    }
}

$peticion = $_POST['peticion'] ?? null;
$paquete = $_POST['paquete'] ?? null;
$login = new ValidarLoginController($peticion, $paquete);
echo $login->Peticiones();