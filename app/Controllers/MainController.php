<?php
namespace App\Controllers;

// Le MainController est la pour les méthodes qui ne sont pas liées à une entité, comme un utilisateur, un article, etc...
class MainController 
{
    // Cette méthode appelle simplement la vue du menu principal
    // la variables $navHidden est la tout simplement pour savoir si je dois cacher ou afficher la navbar
    public function menu()
    {
        $navHidden = false;
        require __DIR__.'/../Views/memory/home.view.php';
    }
}