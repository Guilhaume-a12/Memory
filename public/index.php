<?php

// On require autoload.php afin de pouvoir utiliser l'autoloader fourni par composer
require __DIR__."/../vendor/autoload.php";

// On "appelle" le MainController pour pouvoir l'utiliser dans notre routeur, sous l'alias Main
use App\Controllers\MainController as Main;
// On "appelle" le MemoryController pour pouvoir l'utiliser dans notre routeur, sous l'alias Memory
use App\Controllers\MemoryController as Memory;

// On instancie le MainController et le MemoryController
$mainController = new Main();
$memoryController = new Memory();

// On récupère la racine du nom du 'site', cela nous sera utile pour le chargement d'image par exemple ou les href, pour trouver le bon chemin facilement
define("ROOT", str_replace("index.php", "", (isset($_SERVER['HTTPS']) ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']));


try {
    if (empty($_GET['url'])) {
        // Si $_GET['url'] est vide, on affiche la page par défaut à l'aide de la méthode menu() du MainController
        $mainController->menu();
    } else {
        // On récupère les paramètres entrés dans l'url entre chaque '/'
        $url = explode("/", filter_var($_GET['url']), FILTER_SANITIZE_URL);

        switch($url[0]) {
            case "menu":
                // on appelle la vue du menu principal
                $mainController->menu();
                break;
            case "new":
                // on appelle la vue d'une nouvelle partie
                $memoryController->newGame();
                break;
            case "add-score":
                // on ajoute les scores en base de données
                $memoryController->addScores();
                break;
            case "display-scores":
                // afficher les scores dans une page
                $memoryController->displayScores();
                break;
            case "get-scores":
                // On récupère les scores de la base de données
                $memoryController->getScores();
                break;
            default:
                // si aucune url correspond, on catch une erreur avec un message
                throw new Exception('Erreur 404, la page que vous recherchez n\'existe pas...');
        }
    }
} catch (Exception $e) {
    // Erreur 404, c'est ici qu'on utilise la méthode qui appelle la vue de l'erreur 404 en cas de mauvaise url
    // Je récupère le message d'erreur grace à la méthode d'Exception, getMessage()
    $msg = $e->getMessage();
    $mainController->error404($msg);
}