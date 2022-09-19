<?php

namespace App\Controllers;

use App\Models\Memory\MemoryManager;
use Exception;

class MemoryController
{
    private $memoryManager;

    public function __construct()
    {
        // Dans mon constructeur, j'instancie le manager pour pouvoir utiliser ses méthodes et récupérer des données en base de données
        $this->memoryManager = new MemoryManager();
    }

    // J'appelle la vue du memory
    public function newGame()
    {
        $navHidden = true;
        require __DIR__.'/../Views/memory/memory.view.php';
    }

    public function addScores()
    {
        // Ces headers rajoute des entêtes à la requête HTTP, pour "prévenir" que nous allons utiliser du json et la méthode POST
        // Ils ne changent pas grand chose en local
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");

        try {

            // Je reprends le schéma d'une API REST, ce n'est pas nécessaire ici, mais un peu de révision ne fait pas de mal !
            // Dans une API REST, quand on ajoute des données en base de données, la norme veut qu'on utilise la méthode POST
            // Donc je commence par vérifier si la méthode utilisée est bien POST
            if ($_SERVER['REQUEST_METHOD'] === "POST") {
                // je récupère le json envoyé en POST, et je le transforme en objet PHP
                $data = json_decode(file_get_contents("php://input"));
                // J'appelle la méthode du manager qui ajoute les informations en base de données
                $result = $this->memoryManager->addScoresDB($data->pseudo, $data->score);
                // Si l'ajout a bien fonctionné...
                if ($result) {
                    // Je renvoie le code http 201, plus un message de succès
                    http_response_code(201);
                    echo json_encode(["message" => "success"]);
                } else {
                    // Si non, je créé une erreur
                    throw new Exception("Erreur lors de l'envoie de la requete");
                }
            } else {
                // Si la méthode n'est pas POST, je renvoie le code http 405 et un message d'erreur
                http_response_code(405);
                echo json_encode(["message" => "La méthode n'est pas autorisée"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function displayScores()
    {
        $navHidden = false;
        $scores = $this->memoryManager->getScoresDB();
        require __DIR__.'/../Views/memory/scores.view.php';
    }

    public function getScores()
    {
        // Ici même chose que les headers de la méthode précédente, mais pour la méthode GET
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET");

        if ($_SERVER['REQUEST_METHOD'] == 'GET') {

            // J'appelle la méthode du manager qui récupère les infos en base de données
            $scores = $this->memoryManager->getScoresDB();

            // J'initialise un tableau vide + un compteur que je vais utiliser pour afficher des index à partir de 1 et non de 0
            $tab = [];
            $count = 1;

            // Pour chaque valeur récupérée, j'incrémente mon tableau d'un tableau contenant les données
            foreach ($scores as $value) {
                $tab[$count] = [
                    "id" => $value->getId_memory(),
                    "pseudo" => $value->getPseudo(),
                    "score" => $value->getTimeLeft(),
                ];
                $count++;
            }
            // J'y ajoute aussi un petit tableau contenant le message success
            $tab['message'] = "success";
            // J'appelle la méthode sendJson qui va envoyer ces données au FRONT
            $this->sendJson($tab);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    // Cette méthode renvoie le code http 200, convertit les données en json et l'envoie à la partie FRONT
    public function sendJson($data)
    {
        http_response_code(200);
        echo json_encode($data);
    }
}
