<?php ob_start(); ?>
<!-- Cette div contiendra notre timer -->
<div class="container timer"></div>

<!-- Cette div contiendra les scores -->
<!-- <div class="scores">
    <h1>Top 10</h1>
    <ul>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
    </ul>
</div> -->

<!-- Cette section contiendra le jeu du mémory qui sera créé à l'aide de javascript -->
<!-- <section class="memorySection"></section> -->


<?php
$titre = "O'Memory nouvelle partie";
$scripts = ['timer','memory','index'];
$content = ob_get_clean();
require_once __DIR__."/../template/template.view.php"; // On appelle le template