<?php ob_start(); ?> <!-- ob_start met en attente la partie vue qui suit -->

<div class="row d-flex justify-content-center mt-5">
    <div class="col-6 menuBg border border-dark">
        <ul>
            <li><a href="<?=ROOT?>new" class="btn rounded mb-2">Nouvelle partie</a></li>
            <li><a href="#" class="btn rounded mb-2">Scores</a></li>
            <li><a href="#" class="btn rounded mb-2">Crédits</a></li>
        </ul>
    </div>
</div>


<?php
$titre = "O'Memory menu principal";
$content = ob_get_clean(); // ob_get_clean nous permet de récupérer la partie html ci-dessus, qui est délicatement rangée dans $content
require_once "../app/Views/template/template.view.php"; // On appelle le template