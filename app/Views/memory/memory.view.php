<?php ob_start(); ?>

<p class="test">NOUVELLE PARTIE</p>

<?php
$titre = "O'Memory nouvelle partie";
$content = ob_get_clean();
require_once "../app/Views/template/template.view.php";