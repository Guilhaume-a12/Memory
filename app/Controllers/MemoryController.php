<?php

namespace App\Controllers;

class MemoryController
{
    public function newGame()
    {
        $navHidden = true;
        require '../app/Views/memory/memory.view.php';
    }
}