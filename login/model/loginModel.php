<?php
require_once '../../config/conexion.php';

class ValidarLoginModel extends DatabaseDB {
    private $usuario;
    private $contrasena;
    
    public function __construct($paquete = null) {
        parent::__construct(); 
        $this->usuario = $paquete['usuario'] ?? null;
        $this->contrasena = $paquete['password'] ?? null;       
    }

    public function ValidarLogin() {
        try {
            $sql = "SELECT * FROM rol_usuario WHERE usuario = :usuario AND contrasena = :contrasena AND descripcion= 'ADMINISTRADOR'";
            $execute = $this->conexionDB()->prepare($sql);
            $execute->execute([
                ':usuario' => $this->usuario,
                ':contrasena' => $this->contrasena
            ]);
            $resultado = $execute->fetch(PDO::FETCH_ASSOC);
            if (!$resultado) {
                return ["estado" => false, "mensaje" => "Usuario o contraseña incorrectos"];
            }
            return ["estado" => true, "resultado" => $resultado];
        } catch (PDOException $e) {
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }
   
}

?>