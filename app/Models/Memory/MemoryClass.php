<?php

namespace App\Models\Memory;

class MemoryClass
{
    // Je déclare directement mes attributs privés dans les paramètres du constructeur, cette syntaxe est arrivée avec PHP 8
    // La méthode __construct(), se lance automatique au début de chaque instanciation, on appelle ça une méthode magique
    public function __construct(
        private int $id_memory,
        private string $pseudo,
        private int $timeLeft
    ) {
    }

    // ici ceux sont mes getters, ils me permettent d'accéder aux attributs privés depuis l'extérieur de cette classe
    // Pour me protéger des failles xss, je return les données dans un htmlspecialchars()
    public function getPseudo()
    {
        return htmlspecialchars($this->pseudo);
    }

    public function getTimeLeft()
    {
        return htmlspecialchars($this->timeLeft);
    }

    public function getId_memory()
    {
        return htmlspecialchars($this->id_memory);
    }
}
