<?php ob_start(); ?>

<!-- Cette div contiendra notre timer -->
<div class="container timer"></div>

<?php
$titre = "O'Memory nouvelle partie";
$scripts = ['timer','memory','index'];
$content = ob_get_clean();
require_once __DIR__."/../template/template.view.php"; // On appelle le template