<?php

namespace App\Controllers;

use App\Models\Memory\MemoryManager;
use Exception;

class MemoryController
{
    private $memoryManager;

    public function __construct()
    {
        $this->memoryManager = new MemoryManager();
    }

    public function newGame()
    {
        $navHidden = true;
        require '../app/Views/memory/memory.view.php';
    }

    public function addScores()
    {
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");

        try {

            if ($_SERVER['REQUEST_METHOD'] === "POST") {
                $data = json_decode(file_get_contents("php://input"));
                $result = $this->memoryManager->addScoresDB($data->pseudo, $data->score);
                if ($result) {
                    http_response_code(201);
                    echo json_encode(["message" => "success"]);
                } else {
                    throw new Exception("Erreur lors de l'envoie de la requete");
                }
            } else {
                http_response_code(405);
                echo json_encode(["message" => "La méthode n'est pas autorisée"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function scores()
    {
        // afficher scores
    }
}
