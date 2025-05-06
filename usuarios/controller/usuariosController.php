<?php
require_once '../model/usuariosModel.php';
require_once '../../helpers/convertidorJSON.php';

class UsuariosController extends UsuariosModel{
    private $peticion = null;
    public function __construct($peticion = null, $paquete = null){
        parent::__construct($paquete);
        $this->peticion = $peticion;
    }

    public function Peticiones(){
        switch($this->peticion){
            case 'All_Carreras':
                return $this->MostrarCarreras();
            case 'All_CarrerasAct':
                return $this->MostrarCarrerasAct();
            case 'All_Cargo':
                return $this->MostrarCargos();
            case 'Insert_Usuario':
                return $this->InsertUsuarios();
            case 'All_usuarios':
                return $this->MostrarUser();
            case 'Actualizar_usuario':
                return $this->UpdateUsuario();
            case 'Eliminar_Usuario':
                return $this->DeleteUsuario();
            default:
                return convertidorJSON(["estado" => false, "MSG" => "Peticion no encontrada"]);
        }
    }

    public function MostrarCarreras(){
        $mostrar = $this->verCarreras();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Carreras encontradas", "Carreras" => $mostrar["Carreras"]];
        }else{
            $respuesta = ["estado" => false, "MSG" => "Error al encontrar las carreras", "Error" => $mostrar["Error captura"]];
        }
        return convertidorJSON($respuesta);
    }

    public function MostrarCarrerasAct(){
        $mostrar = $this->verTodasLasCarreras();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Carreras encontradas", "Carreras" => $mostrar["Carreras"]];
        }else{
            $respuesta = ["estado" => false, "MSG" => "Error al encontrar las carreras", "Error" => $mostrar["Error captura"]];
        }
        return convertidorJSON($respuesta);
    }

    public function MostrarCargos(){
        $mostrar = $this->verCargos();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Cargos encontrados", "Cargos" => $mostrar["Cargos"]];
        }else{
            $respuesta = ["estado" => false, "MSG" => "Error al encontrar los cargos", "Error" => $mostrar["Error captura"]];
        }
        return convertidorJSON($respuesta);
    }

    public function InsertUsuarios(){
        $mostrar = $this->InsertarUsuarios();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Usuario registrado exitosamente"];
        }else if($mostrar["Error"]){
            $respuesta = ["estado" => false, "MSG" => $mostrar["Error"]];
        }else if($mostrar["Error capturada"]){
            $respuesta = ["estado" => false, "MSG" => "Error inesperado", "error" => $mostrar["Error capturada"]];
        }else {
            $respuesta = ["estado" => false, "MSG" => "Ocurrio un error inesperado"];
        }
        return convertidorJSON($respuesta);
    }

    public function MostrarUser(){
        $mostrar = $this->mostrarUsuarios();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Usuarios encontrados", "datos" => $mostrar["Usuarios"]];
        }else{
            $respuesta = ["estado" => false, "MSG" => "Usuarios no encontrados", "error" => $mostrar["Error captura"]];
        }
        return convertidorJSON($respuesta);
    }

    public function UpdateUsuario(){
        $mostrar = $this->ActualizarUsuarios();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Usuario actualizado exitosamente"];
        }else if($mostrar["Error"]){
            $respuesta = ["estado" => false, "MSG" => $mostrar["Error"]];
        }else if($mostrar["mensaje"]){
            $respuesta = ["estado" => false, "MSG" => $mostrar["mensaje"]];
        }else if($mostrar["Error capturada"]){
            $respuesta = ["estado" => false, "MSG" => "Error inesperado", "error" => $mostrar["Error capturada"]];
        }else {
            $respuesta = ["estado" => false, "MSG" => "Ocurrio un error inesperado"];
        }
        return convertidorJSON($respuesta);
    }

    public function DeleteUsuario(){
        $mostrar = $this->EliminarUsuario();
        if($mostrar["estado"]){
            $respuesta = ["estado" => true, "MSG" => "Usuario eliminado exitosamente"];
        }else if($mostrar["Error"]){
            $respuesta = ["estado" => false, "MSG" => $mostrar["Error"]];
        }else if($mostrar["Error capturada"]){
            $respuesta = ["estado" => false, "MSG" => "Error inesperado", "error" => $mostrar["Error capturada"]];
        }else {
            $respuesta = ["estado" => false, "MSG" => "Ocurrio un error inesperado"];
        }
        return convertidorJSON($respuesta);
    }
}

$peticion = $_POST['peticion'] ?? null;
$paquete = $_POST['paquete'] ?? null;
$usuariosController = new UsuariosController($peticion, $paquete);
$usuariosController->Peticiones();

?>