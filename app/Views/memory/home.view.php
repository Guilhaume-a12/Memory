<?php ob_start(); ?>
<!-- ob_start met en attente la partie vue qui suit -->
<section class="container text-center">
    <div class="row d-flex justify-content-center">
        <div class="col-6 menuBg border border-dark">
            <h1 class="my-5">O'Memory</h1>
            <ul class="pt-4">
                <!-- la constante ROOT est donc déclarée dans l'index.php (le routeur) 
                elle aide le href à trouver le chemin exact sans créer de bug -->
                <li><a href="<?= ROOT ?>new" class="btn rounded mb-2">Nouvelle partie</a></li>
                <li><a href="#" class="btn rounded mb-2">Scores*</a></li>
                <li><a href="#" class="btn rounded mb-2">Crédits*</a></li>
            </ul>
            <small>*Ces liens sont en construction</small>
        </div>
    </div>
</section>

<?php
// Cette variable est utilisée dans le template, dans la balise title dans le head de notre HTML
$titre = "O'Memory menu principal";

// ob_get_clean nous permet de récupérer la partie html ci-dessus, qui est délicatement rangée dans $content
// Cela nous permettra d'afficher cette vue, ou l'on souhaite dans le template en affichant $content
// Sinon elle serait affichée au dessus de notre template vu qu'il est require tout en bas de la page
$content = ob_get_clean(); 

// On appelle le template, on utilise __DIR__, c'est une bonne pratique,
// cela contient le chemin exact du dossier dans lequel nous somme, c'est une constante magique
require_once __DIR__."/../template/template.view.php"; 