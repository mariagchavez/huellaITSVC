<?php 
require_once '../../config/conexion.php';

class UsuariosModel extends DatabaseDB{
    private $clave_identificacion;
    private $nombre;
    private $apellido_paterno;
    private $apellido_materno;
    private $correo;
    private $sexo;
    private $cargo;
    private $carrera;

    public function __construct($paquete = null){
        parent::__construct(); 
        $this->clave_identificacion = $paquete['clave_identificacion'] ?? null;
        $this->nombre = $paquete['nombre'] ?? null;
        $this->apellido_paterno = $paquete['apellido_paterno'] ?? null;
        $this->apellido_materno = $paquete['apellido_materno'] ?? null;
        $this->correo = $paquete['correo'] ?? null;
        $this->sexo = $paquete['sexo'] ?? null;
        $this->cargo = $paquete['cargo'] ?? null;
        $this->carrera = $paquete['carrera'] ?? null;        
    }

    public function mostrarUsuarios(){
        try{
            $sql = "SELECT 
                        personas.clave_identificacion AS Matricula, 
                        personas.nombre AS Nombre, 
                        personas.ape_paterno AS ApellidoPA, 
                        personas.ape_materno AS ApellidoMA, 
                        personas.sexo AS Sexo, 
                        personas.correo AS Correo, 
                        carreras.clave_carrera AS Carrera, 
                        rol_usuario.descripcion AS Rol
                    FROM personas
                    LEFT JOIN carreras ON personas.id_carrera = carreras.id_carrera
                    INNER JOIN rol_usuario ON personas.id_rol = rol_usuario.id_rol;";
            
            $execute = $this->conexionDB()->query($sql);
            $respuesta = $execute->fetchAll(PDO::FETCH_ASSOC);
            return ["estado" => true, "Usuarios" => $respuesta];
        } catch (Exception $e) {
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }
    
    
    public function verCarreras(){
        try{
            $sql = "SELECT clave_carrera, descripcion FROM carreras WHERE carreras.clave_carrera != 'Personal';";
            $execute = $this->conexionDB()->query($sql);
            $respuesta = $execute->fetchAll(PDO::FETCH_ASSOC);
            return ["estado" => true, "Carreras" => $respuesta];
        }catch(PDOException $e){
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }

    public function verTodasLasCarreras(){ 
        try {
            $sql = "SELECT clave_carrera, descripcion FROM carreras";
            $execute = $this->conexionDB()->query($sql);
            $respuesta = $execute->fetchAll(PDO::FETCH_ASSOC);
            return ["estado" => true, "Carreras" => $respuesta];
        } catch(PDOException $e){
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }
    

    public function verCargos(){
        try{
            $sql = "SELECT descripcion, usuario FROM rol_Usuario WHERE descripcion != 'ADMINISTRADOR'";
            $execute = $this->conexionDB()->query($sql);
            $respuesta = $execute->fetchAll(PDO::FETCH_ASSOC);
            return ["estado"=>true, "Cargos" => $respuesta];
        }catch(PDOException $e){
            return ["estado" => false, "Error captura" => $e->getMessage()];
        }
    }

    public function obtenerIdCarreras(){
        $sql = "SELECT id_carrera FROM carreras WHERE clave_carrera = :carrera;";
        $execute = $this->conexionDB()->prepare($sql);
        $execute->execute([
            ':carrera' => $this->carrera
        ]);
        $respuesta = $execute->fetch(PDO::FETCH_ASSOC);
        return $respuesta['id_carrera'] ?? null;
    }

    public function obtenerIdCargos(){
        $sql = "SELECT id_rol FROM rol_usuario WHERE descripcion = :cargo;";
        $execute = $this->conexionDB()->prepare($sql);
        $execute->execute([
            ':cargo' => $this->cargo
        ]);
        $respuesta = $execute->fetch(PDO::FETCH_ASSOC);
        return $respuesta['id_rol'] ?? null;
    }

    public function InsertarUsuarios(){
        try{
            $id_carrera = $this->obtenerIdCarreras();
            $id_cargo = $this->obtenerIdCargos();
            if (!$id_carrera) {
                $consulta = $this->conexionDB()->prepare("SELECT id_carrera FROM carreras WHERE clave_carrera = 'Personal' LIMIT 1;");
                $consulta->execute();
                $resultado = $consulta->fetch(PDO::FETCH_ASSOC);
                if ($resultado) {
                    $id_carrera = $resultado['id_carrera'];
                } else {
                    return ["estado" => false, "Error" => "No se encontró la carrera 'Personal'"];
                }
            }
            if(!$id_cargo){
                return ["estado" => false, "Error" => "Cargno no existente"];
            }

            $sql = "INSERT INTO personas (clave_identificacion, nombre, ape_paterno, ape_materno, sexo, correo, id_carrera, id_rol)
                    VALUES (:clave_identificacion, :nombre, :apellido_paterno, :apellido_materno, :sexo, :correo, :id_carrera, :id_cargo);";
            $execute = $this->conexionDB()->prepare($sql);
            $execute->execute([
                ':clave_identificacion' => $this->clave_identificacion,
                ':nombre' => $this->nombre,
                ':apellido_paterno' => $this->apellido_paterno,
                ':apellido_materno' => $this->apellido_materno,
                ':sexo' => $this->sexo,
                ':correo' => $this->correo,
                ':id_carrera' => $id_carrera,
                ':id_cargo' => $id_cargo
            ]);

            return ["estado" => true, "MSG" => "Usuario registrado exitosamente"];
        }catch(Exception $e){
            return ["estado" => false, "Error capturada" => $e->getMessage()];
        }
    }

    public function obtenerIdUsuarios(){
        try{
            $sql = "SELECT id_persona FROM personas WHERE clave_identificacion = :clave_identificacion;";
            $execute = $this->conexionDB()->prepare($sql);
            $execute->execute([
                ':clave_identificacion' => $this->clave_identificacion
            ]);
            $respuesta = $execute->fetch(PDO::FETCH_ASSOC);
            return $respuesta['id_persona'] ?? null;
        }catch(Exception $e){
            return ["estado" => false, "Error capturada" => $e->getMessage()];
        }
    }

    public function ActualizarUsuarios(){
        try{
            $id_carrera = $this->obtenerIdCarreras();
            $id_cargo = $this->obtenerIdCargos();
            if(!$id_carrera){
                return ["estado" => false, "Error" => "Carrera no existente"];
            }
            if(!$id_cargo){
                return ["estado" => false, "Error" => "Cargno no existente"];
            }
            $id_usuario = $this->obtenerIdUsuarios();
            if(!$id_usuario){
                return ["estado" => false, "Error" => "Usuario no existente"];
            }
            $sql = "UPDATE personas SET clave_identificacion = :clave_identificacion ,nombre = :nombre, ape_paterno = :apellido_paterno, ape_materno = :apellido_materno, sexo = :sexo, correo = :correo, id_carrera = :id_carrera, id_rol = :id_cargo WHERE id_persona = :id_usuario;";
            $execute = $this->conexionDB()->prepare($sql);
            $execute->execute([
                ':clave_identificacion' => $this->clave_identificacion ?: null,
                ':nombre' => $this->nombre ?: null,
                ':apellido_paterno' => $this->apellido_paterno ?: null,
                ':apellido_materno' => $this->apellido_materno ?: null,
                ':sexo' => $this->sexo ?: null,
                ':correo' => $this->correo ?: null,
                ':id_carrera' => $id_carrera ?: null,
                ':id_cargo' => $id_cargo ?: null,
                ':id_usuario' => $id_usuario
            ]);
            return ["estado" => true, "MSG" => "Usuario actualizado exitosamente"];
            
        }catch(Exception $e){
            return ["estado" => false, "Error capturada" => $e->getMessage()];
        }
    }

    public function eliminarUsuario(){
        try{
            $sql = "DELETE FROM personas WHERE clave_identificacion = :clave_identificacion;";
            $execute = $this->conexionDB()->prepare($sql);
            $execute->execute([
                ':clave_identificacion' => $this -> clave_identificacion
            ]);
            return ["estado" => true, "MSG" => "Usuario eliminado exitosamente"];
        }catch(Exception $e){
            return ["estado" => false, "Error capturada" => $e->getMessage()];
        }
    }
}
?>