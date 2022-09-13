<?php

// On require autoload.php afin de pouvoir utiliser l'autoloader fourni par composer
require "../vendor/autoload.php";

// On récupère la racine du nom du 'site', ça nous sera utile pour le chargement d'image par exemple, pour trouver le bon chemin facilement
define("ROOT", str_replace("index.php", "", (isset($_SERVER['HTTPS']) ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']));


try {
    if (empty($_GET['url'])) {
        // Si $_GET['url'] est vide, on affiche la page par défaut
    } else {
        // On récupère les paramètres entrés dans l'url entre chaque '/'
        $url = explode("/", filter_var($_GET['url']), FILTER_SANITIZE_URL);

        switch($url[0]) {
            case "menu":
                // on appelle la vue du menu principal
                break;
            default:
                // si aucune url correspond, on catch une erreur 
        }
    }
} catch (Exception $e) {
    // Erreur 404, c'est ici qu'on l'appelle en cas d'url inexistante
}