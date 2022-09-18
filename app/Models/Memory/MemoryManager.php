<?php
// Dans ce namespace, je rajoute Memory à la fin car nous somme dans le dossier Memory
namespace App\Models\Memory;

use App\Models\Model;
use App\Models\Memory\MemoryClass as Memory;
use PDO;

// J'utilise "extends" pour que ma classe hérite de Model
// ça me permettra d'utiliser certaines méthodes de Model directement dans cette classe
class MemoryManager extends Model{

    // Je créé une méthode "public", ce qui permet de l'utiliser à l'extérieur de la classe
    // Cette méthode permet d'envoyer des données en base de données
    public function addScoresDB($pseudo,$timeLeft)
    {
        // Je créé ma requête sql, pour insérer des données dans la table "scores" et dans les champs "pseudo" et "score"
        // ":pseudo" et ":score" sont des paramètres nommés, ils ont un peu la même fonction que des paramètres dans une fonction, ils attendent de recevoir des infos
        // Je les bind aux variables dans la méthode execute(), toute cette partie est importante pour se protéger des injections sql
        $sql ="INSERT INTO scores (pseudo, score) VALUES (:pseudo, :score)";
        // J'utilise $this->getDB(), qui est une méthode héritée de Model, "$this" fait référence à la classe
        // cette méthode me permet d'utiliser la méthode prepare() de PDO, qui nous protège des injections sql
        $stmt = $this->getDB()->prepare($sql);
        $result = $stmt->execute([
            ":pseudo" => $pseudo,
            ":score" => $timeLeft
        ]);
        // Je return le résultat, pour que le contrôleur qui appellera cette méthode puisse l'utiliser
        return $result;
    }

    public function getScoresDB()
    {
        $sql = "SELECT * FROM scores ORDER BY score DESC LIMIT 10";
        // Ici pas de variable qui vient de l'extérieur donc pas de risque d'injection sql
        // donc j'utilise query() qui éxécute directement la requête sans la préparer
        $stmt = $this->getDB()->query($sql);
        // fetchAll récupère tout les résultats trouvés, sous forme d'objet car j'ai mis PDO::FETCH_OBJ en paramètre
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        // Si j'ai bien récupéré des données...
        if ($data) {
            // Je créé un objet à l'aide de ma classe Memory, pour chaque résultat, que je stocke dans un tableau, puis je return ce tableau
            foreach($data as $score) {
                $scores[] = new Memory($score->id_scores,$score->pseudo,$score->score);
            }
            return $scores;
        } else {
            // Si non, je return null
            return null;
        }
    }

}