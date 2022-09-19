<?php ob_start(); ?>

<div class="scores">
    <h1>Top 10</h1>
    <ul>
        <?php
            foreach($scores as $score) {
        ?>
            <li><p><?=$score->getPseudo()?></p><span><?=$score->getTimeLeft()?></span></li>
        <?php
            }
        ?>
    </ul>
</div>

<?php
$titre = "O'Memory nouvelle partie";
$scripts = ['timer','memory','index'];
$content = ob_get_clean();
require_once __DIR__."/../template/template.view.php"; // On appelle le template