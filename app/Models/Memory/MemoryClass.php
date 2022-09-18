<?php

namespace App\Models\Memory;

class MemoryClass
{
    public function __construct(
        private int $id_memory,
        private string $pseudo,
        private int $timeLeft
    ) {
    }

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
