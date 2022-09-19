<?php
// Les namespaces (ou espace de nom), définissent un nom de "package" qu'on pourra charger automatiquement
// à l'aide d'un système d'autoloading (fourni par composer dans ce projet)
// "App" fait référence au dossier app, c'est configuré ainsi dans le fichier composer.json, et Models fait référence au dossier Models
// Ces termes sont séparés par des "\"
// Sur des petits projets, on ne voit pas forcément l'intérêt. 
// Mais imaginons que nous ayons énormément de classes différentes,
// en temps normal, deux classes du même nom créeraient un conflit, mais pas en utilisant les namespaces
namespace App\Models; 

// "use" permet d'importer une classe d'un autre dossier
// Ici PDO existe déjà en PHP, alors on met directement PDO sans "chemin", PHP comprend qu'il faut le chercher directement à la racine
use PDO;

// Cette classe n'a pas pour but d'être instanciée, on utilise donc abstract qui empêche une classe de l'être
// Mais certaines de ses méthodes pourront être utilisées dans les classe qui hériteront de Model
abstract class Model
{
    // Je déclare les propiétés (attributs) de la classe en private, ce qui empêche de les utiliser à l'extérieur de la classe
    // On devra créer des méthodes qui le feront pour nous, comme les Getters
    private $pdo;
    private $config;
    
    // Je créé un Setter, c'est une méthode qui permet de modifier un attribut privé de la classe
    // Ici je modifie "private $pdo" en y affectant une nouvelle instance de PDO
    // PDO est une interface qui nous permet d'accéder à une base de données et est fourni avec PHP
    // Je passe les informations nécessaires pour me connecter à ma base de données, dans les paramètres de PDO
    private function setDB() {
        $config = $this->config();
        $this->pdo = new PDO("mysql:host=".$config['DB_HOST'].";dbname=".$config['DB_NAME'].";charset=utf8",$config['DB_USER'],$config['DB_PASSWORD']);
    }

    // Cette méthode (oui, une fonction dans une classe est une "méthode"), récupère les informations liées à la base de données
    // dans un fichier "config.ini" via la fonction PHP parse_ini_file()
    private function config() {
        $this->config = parse_ini_file(__DIR__."../../config.ini");
        return $this->config;
    }

    // Je créé un Getter, c'est une méthode qui permet d'utiliser un attribut privé, pour l'afficher par exemple
    // ce Getter me permettra d'utiliser PDO dans mes méthodes qui enverront les requêtes SQL
    protected function getDB() {
        if ($this->pdo == null) {
            $this->setDB();
        }
        return $this->pdo;
    }
}