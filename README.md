# O'Memory

<img src="public/assets/images/lananas.png">

Vous rêviez de découvrir comment coder l'emblématique jeu du Mémory ?? 
Je l'ai fait pour vous !

Laissez moi vous expliquer comment le projet est organisé dans les grandes lignes. Pour plus de détails, 
le code est rempli de commentaires.

Sur ce projet, qui est ni plus ni moins le jeu du Mémory, vous allez découvrir le modèle MVC (qui est le design pattern le plus utilisé, mais qui est loin d'être le seul), diverses méthodes et logiques algorythmiques pour le côté frontend par le biais de nombreux commentaires directement dans le code.

## ✅ Requis

- Un environnement de travail comme WAMP, LAMP ou XAMPP
- Le projet doit être installé dans un virtual host qui cible le dossier public
- Beaucoup d'amour et un ordinateur

## 🚀 Technologies

- PHP
- Javascript
- SCSS
- Composer
- Npm

## Le modèle MVC ok, mais c'est quoi concrètement ?

Le modèle MVC (Models Views Controllers) est donc l'un des nombreux "design pattern". Pour faire plus simple, c'est une façon de structurer son code.

Nous allons mettre 3 dossiers distincts: "Models/", "Views/" et "Controllers/".

### Models

Dans le dossier Models, nous allons ranger tout les fichiers qui vont gérer les données. 

- Le fichier Model qui contient la classe Model. Cette classe a pour but de gérer la connexion avec la Base de Données via PDO.
- Les fichiers de nos classes comme dans notre cas, MemoryClass.php qui contient la classe Memory.
- Les fichiers de nos Managers. Les Managers vont traiter es données, c'est eux qui communiquent avec la Base de Données.

### Views

Dans le dossier Views, on mettra tous les fichiers contenant nos vues, avec le moins de php possible.

### Controllers

Ce dossier contiendra tout nos contrôleurs. Ceux sont les contrôleurs qui gèrent le traitement du code, il pilote le tout. Ils sont appelés par le routeur et s'occupent du reste, la sécurité, ils appellent le Manager lié aux données dont il a besoin, il appelle la vue...

### Routeur

Dans le modèle MVC, nous avons également un routeur qui recevra la requête HTTP envoyé par l'utilisateur, et appellera le contrôleur nécessaire.
Pour toujours passer par le routeur, on utilise un fichier .htaccess pour réécrire l'url, et en plus c'est SEO friendly !

