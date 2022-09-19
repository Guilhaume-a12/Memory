<?php ob_start(); ?>

<section class="container text-center">
    <div class="row d-flex justify-content-center">
        <div class="col-6 menuBg border border-dark">
            <h1 class="my-5">Erreur 404</h1>
            <p><?=$message?></p>
            <p>Venez plutôt faire une partie de memory !</p>

            <a href="<?= ROOT ?>new" class="btn btn-outline-dark rounded mb-2">Nouvelle partie</a>
        </div>
    </div>
</section>

<?php
$titre = "O'Memory nouvelle partie";
$scripts = ['timer','memory','index'];
$content = ob_get_clean();
require_once __DIR__."/../template/template.view.php"; // On appelle le template