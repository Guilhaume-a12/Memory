<?php
namespace App\Models;

use PDO;

abstract class Model
{
    private $pdo;
    private $config;
    
    private function setDB() {
        $config = $this->config();
        $this->pdo = new PDO("mysql:host=".$config['DB_HOST'].";dbname=".$config['DB_NAME'].";charset=utf8",$config['DB_USER'],$config['DB_PASSWORD']);
        // $this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
    }

    private function config() {
        $this->config = parse_ini_file(__DIR__."../../config.ini");
        return $this->config;
    }

    protected function getDB() {
        if ($this->pdo == null) {
            $this->setDB();
        }
        return $this->pdo;
    }
}