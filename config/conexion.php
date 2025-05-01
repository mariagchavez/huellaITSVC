<?php
class DatabaseDB{
    private $host = "localhost";
    private $dbname = "huelllaitsvc";
    private $user = "root";
    private $password = "";

    public function __construct(){
    
    }

    protected function conexionDB(){
        try{
            $pdo = new PDO("mysql:host=$this->host; dbname=$this->dbname", $this->user, $this->password);
            return $pdo;
        } catch (PDOException $e){
            echo "Error: " . $e->getMessage();
        }
    }
}
?>