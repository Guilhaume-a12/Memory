<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $titre ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <link rel="stylesheet" href="<?= ROOT ?>assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" defer></script>
    <!-- Si la variable $scripts est initialisée, je créé une boucle foreach pour la parcourir
        Elle contient le nom de chaque fichier javascript, 
        et pour chacun d'entre eux, je créé la balise script pour les lier à mon HTML -->
    <?php
    if (isset($scripts)) {
        foreach ($scripts as $script) {
    ?>
            <!-- D'habitude, les balises scripts sont à la fin du body
            Dans mon cas, pour simplifier des fonctionnalités javascript
            j'ai décidé de les placer dans le head avec l'attribut "defer",
            grâce à lui, ces scripts seront interprétés après le chargement de la page -->
            <script src="<?= ROOT ?>assets/javascript/<?= $script ?>.js" defer></script>
    <?php
        }
    }
    ?>
</head>

<body>
    <?php
    // Si $navHidden est false, j'affiche la partie HTML contenue dans ce "if", sinon je ne l'affiche pas
    // Je me sers de cette condition pour cacher la navbar pendant la partie de mémory
    if (!$navHidden) {
    ?>
        <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="<?= ROOT ?>menu">O'Memory</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link active" href="<?= ROOT ?>menu">Menu principal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="<?= ROOT ?>display-scores">Scores</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    <?php
    }
    ?>

    <!-- Comme le template est require sur les différentes vues, on peut utiliser la variable $content
        pour afficher notre vue à cette endroit précis du template -->
    <?= $content ?>

</body>

</html>