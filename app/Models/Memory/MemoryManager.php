<?php

namespace App\Models\Memory;

use App\Models\Model;

class MemoryManager extends Model{

    public function addScoresDB($pseudo,$timeLeft)
    {
        $sql ="INSERT INTO scores (pseudo, score) VALUES (:pseudo, :score)";
        $stmt = $this->getDB()->prepare($sql);
        $result = $stmt->execute([
            ":pseudo" => $pseudo,
            ":score" => $timeLeft
        ]);
        return $result;
    }

}