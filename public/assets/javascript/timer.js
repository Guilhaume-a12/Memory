// Je stocke l'élément HTML qui possède l'attribut class="timer"
const timerDiv = document.querySelector(".timer");

// Je déclare des variables que j'utiliserai plus tard dans le code
// Je les déclare avec "let" car elles ont pour but d'être modifiées
// Le terme "const", empêche la modification contrairement à "let"
let interval = 120;
let newGame = true;
let blocked = false;
let gameStarted = false;

// ********************** Fonction qui va générer notre timer côté HTML *******************************
const timerGenerator = () => {
  // Je créé des éléments HTML
  const title = document.createElement("h1");
  const paragraph = document.createElement("p");
  const span = document.createElement("span");
  const progress = document.createElement("div");
  const progressInner = document.createElement("div");

  // Je créé l'attribut class 
  progress.classList = "progress";
  progressInner.classList = "progress-inner";

  // Je place ces éléments dans la div stockée dans timerDiv
  // A l'aide d'appendChild, qui met l'élément ciblé après le dernier enfant
  // Par exemple, ligne 28, le h1 est placé en tant que dernier enfant dans la div stockée dans la contante timerDiv
  timerDiv.appendChild(title);
  timerDiv.appendChild(paragraph);
  timerDiv.appendChild(progress);
  progress.appendChild(progressInner);

  // Je créé le contenu de certains éléments HTML (h1,p et span)
  title.innerHTML = "O'Memory";
  paragraph.innerHTML = "Temps restant: ";
  // Je place le span à la fin du paragraphe
  paragraph.appendChild(span);
  span.innerHTML = interval + "s";
};

// ********************** Fonction qui va cacher le timer et afficher le bouton pour démarrer la partie *******************************
const timerHidden = () => {
    // Je modifie la variable gameStarted à false, je l'utilise pour savoir si la partie a commencé ou non
    gameStarted = false;
    
    // Tant qu'il y a un premier enfant dans la div, je le supprime
    // Ici je supprime le timer pour le cacher quand la partie n'a toujours pas démarrée
  while (timerDiv.firstChild) {
    timerDiv.removeChild(timerDiv.firstChild);
  }

  // Je créé un bouton en html et je lui donne l'attribut class="btn-start"
  // Ce bouton nous permettra de lancer la partie grace à l'addEventListener
  const button = document.createElement("button");
  button.classList = "btn-start";

  // Je créé un paragraph
  const defaultP = document.createElement("p");
  // Je lui donne l'attribut class="defaultP"
  defaultP.classList = "defaultP";

  // Je met ces deux éléments html dans la div
  timerDiv.appendChild(defaultP);
  timerDiv.appendChild(button);

  // Si la variable newGame est true, j'appelle la fonction getScores()
  if (newGame) {
    getScores();
  }

  // Je créé le contenu HTML de defaultP et button
  defaultP.innerHTML = "Nouvelle partie, appuyez sur START pour commencer";
  button.innerHTML = "START";

  // Je met un addEventListener sur le bouton créé précédemment
  // Grace à lui, on déclenchera un évènement quand on cliquera dessus
  button.addEventListener("click", () => {
    // Je passe la variale gameStarted à true, elle me sera utile pour confirmer que la partie a bien démarré
    gameStarted = true;
    // Je passe la variable blocked à false pour autoriser les clics
    blocked = false;
    // J'appelle la fonction timerStart()
    timerStart();
  });
};

// ********************** Fonction qui affiche et lance le timer *******************************
const timerStart = () => {
  // Je stocke les éléments HTML dont je vais avoir besoin
  // Je les récupère grace a document.querySelector(), je précise entre les parenthèses l'attribut class des éléments à récupérer
  // J'aurait pu cibler un id en remplaçant le "." par un "#"
  const scoresDiv = document.querySelector(".scores");
  const button = document.querySelector(".btn-start");
  const defaultP = document.querySelector(".defaultP");

  // J'initialise la variable interval à 120
  // Je vais utiliser cette variable pour le décompte de 120 secondes donc je dois la remettre à 120 avant de lancer une nouvelle partie
  interval = 120;

  // Si c'est la première partie, donc si la variable newGame est a true
  // J'appelle cardGenerator pour créer les cartes
  // Si ce n'est pas la première partie, pas besoin de les générer elles le sont déjà
  if (newGame) {
    cardGenerator();
  }

  // J'appelle timerGenerator pour recréer le timer
  timerGenerator();

  // Si c'est la première partie, je supprime la div qui contient les scores
  // Je l'affiche seulement pour la première partie, pas besoin de la supprimer si ce n'est plus la première
  if (newGame) {
    scoresDiv.remove();
  }

  // Je supprime le bouton car la partie commence
  button.remove();

  // Je récupère des éléments HTML
  const progressInner = document.querySelector(".progress-inner");
  const span = document.querySelector("span");

  // Je modifie le contenue HTML de defaultP afin de CRIER le TOP DEPART !
  // Utilité 0, mais ambiance garantie.
  defaultP.innerHTML = "C'EST PARTI !";

  // ********************** Fonction qui va créer l'animation liée au décompte *******************************
  // La fonction setInterval me permet d'éxécuter du code à interval régulier
  // Ici je l'initialise a 1000, le code va donc s'éxécuter toutes les secondes
  // Toutes les secondes, et on fait un décompte... ingénieux n'est ce pas ?
  let countDown = setInterval(() => {
    // Je décrémente la variable (qui est initialisée a 120) de 1, toutes les secondes grace au setInterval()
    interval--;

    // Ici je convertis 120 en 100%, ce sera utile pour qu'à chaque seconde, pendant 120 secondes,
    // un pourcentage proportionnel à 1 seconde sur 120 soit retiré
    // J'utiliserai ce 100% pour la valeur initiale de la width de la barre de progression
    // De ce fait, chaque seconde, elle diminuera de façon proportionnelle
    let progressWidth = (interval / 120) * 100;

    // En fonction de la valeur d'interval, j'affiche la barre de progression d'une couleur différente
    // Plus la valeur d'interval est élevé, plus la barre est verte, plus la valeur diminue, plus la barre est rouge
    // Pour changer la couleur, je place un attribut style directement par javascript
    if (interval > 60) {
      progressInner.style.background = "green";
    } else if (interval > 40) {
      progressInner.style.background = "yellow";
    } else if (interval > 20) {
      progressInner.style.background = "orange";
    } else {
      progressInner.style.background = "red";
    }

    //  Si la valeur d'interval est supérieur à 0, j'affiche la barre de progression et l'animation continue
    if (interval > 0) {
      // C'est ici que chaque seconde, je change la valeur de la width de la barre de progression
      progressInner.style.width = progressWidth + "%";
      // Ici je modifie le contenu pour qu'on puisse voir le nombre de secondes restantes exact
      span.innerHTML = interval + "s";
    } else {
      // Si la valeur d'interval n'est plus supérieur à 0
      // J'annule le setInterval à l'aide de clearInterval() avec en paramètre, la référence du setInterval
      // Ici c'est countDown, le nom de la variable dans laquelle il est créé
      clearInterval(countDown);
      // Je passe la width de la barre de progression à 0%
      progressInner.style.width = "0%";
      // J'affiche Game Over quand le décompte est arrivé à 0
      span.innerHTML = "Game Over";
      // J'appelle la fonction loose(), celle qui fait mal au coeur quand on est joueur !
      loose();
    }
    // Si gameStarted est false, c'est que la partie est terminée, j'annule donc le setInterval()
    if (!gameStarted) {
        clearInterval(countDown);
      }
  }, 1000);

};
