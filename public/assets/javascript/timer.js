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

const timerHidden = () => {
    // Je modifie la variable gameStarted à false, je l'utilise pour savoir si la partie a commencé ou non
    gameStarted = false;
    
    // Tant qu'il y a un premier enfant dans la div, je le supprime
    // Ici je supprime le timer pour le cacher quand la partie n'a toujours pas démarrée
  while (timerDiv.firstChild) {
    timerDiv.removeChild(timerDiv.firstChild);
  }

  // Je créé un bouton en html et je suis donne l'attribut class="btn-start"
  // Ce bouton nous permettra de lancer la partie grace à l'addEventListener
  const button = document.createElement("button");
  button.classList = "btn-start";

  
  const defaultP = document.createElement("p");
  defaultP.classList = "defaultP";

  timerDiv.appendChild(defaultP);
  timerDiv.appendChild(button);

  if (newGame) {
  getScores();
  }

  defaultP.innerHTML = "Nouvelle partie, appuyez sur START pour commencer";
  button.innerHTML = "START";

  button.addEventListener("click", () => {
    gameStarted = true;
    blocked = false;
    timerStart();
  });
};

const timerStart = () => {
  const scoresDiv = document.querySelector(".scores");
    const button = document.querySelector(".btn-start");
  const defaultP = document.querySelector(".defaultP");
  interval = 120;

  if (newGame) {
    cardGenerator();
  }

  timerGenerator();

  if (newGame) {
  scoresDiv.remove();
  }

  button.remove();

  const progressInner = document.querySelector(".progress-inner");
  const span = document.querySelector("span");

  defaultP.innerHTML = "C'EST PARTI !";

  let countDown = setInterval(() => {
    interval--;

    let progressWidth = (interval / 120) * 100;

    if (interval > 60) {
      progressInner.style.background = "green";
    } else if (interval > 40) {
      progressInner.style.background = "yellow";
    } else if (interval > 20) {
      progressInner.style.background = "orange";
    } else {
      progressInner.style.background = "red";
    }

    if (interval > 0) {
      progressInner.style.width = progressWidth + "%";
      span.innerHTML = interval + "s";
    } else {
      clearInterval(countDown);
      progressInner.style.width = "0%";
      span.innerHTML = "Game Over";
      loose();
    }
    if (!gameStarted) {
        clearInterval(countDown);
      }
  }, 1000);

};
