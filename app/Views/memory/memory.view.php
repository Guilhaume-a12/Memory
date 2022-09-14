<?php ob_start(); ?>
<div class="container">
<section class="memorySection mt-5"></section>
</div>

<?php
$titre = "O'Memory nouvelle partie";
$script = true;
$content = ob_get_clean();
require_once "../app/Views/template/template.view.php";