<?php
namespace App\Controllers;

// Le MainController est la pour les méthodes qui ne sont pas liées à une entité, comme un utilisateur, un article, etc...
class MainController 
{
    // Cette méthode appelle simplement la vue du menu principal
    public function menu()
    {
        $navHidden = false;
        require '../app/Views/memory/home.view.php';
    }
}