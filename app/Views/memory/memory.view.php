<?php ob_start(); ?>
<!-- Cette div contiendra notre timer -->
<div class="container timer">
    <!-- <p class="defaultP">Nouvelle partie, appuyez sur START pour commencer</p>

    <button class="btn-start">START</button> -->
</div>

<!-- Cette section contiendra le jeu du mémory qui sera créé à l'aide de javascript -->
<section class="memorySection"></section>


<?php
$titre = "O'Memory nouvelle partie";
$scripts = ['timer','memory','index'];
$content = ob_get_clean();
require_once "../app/Views/template/template.view.php"; // On appelle le template