<?php

namespace App\Models\Memory;

use App\Models\Model;
use App\Models\Memory\MemoryClass as Memory;
use PDO;

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

    public function getScoresDB()
    {
        $sql = "SELECT * FROM scores ORDER BY score DESC";
        $stmt = $this->getDB()->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        if ($data) {
            foreach($data as $score) {
                $scores[] = new Memory($score->id_scores,$score->pseudo,$score->score);
            }
            return $scores;
        } else {
            return null;
        }
    }

}