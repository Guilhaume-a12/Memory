// ******************************* On stock les éléments dont on a besoin ********************
const body = document.querySelector("body");
const section = document.querySelector(".memorySection");


// ************************ On génère les données des cartes en objet *************************
const getData = () => [
  { imgSrc: "assets/images/avocat.png", name: "avocat" },
  { imgSrc: "assets/images/banane.png", name: "banane" },
  { imgSrc: "assets/images/citron.png", name: "citron" },
  { imgSrc: "assets/images/fraise.png", name: "fraise" },
  { imgSrc: "assets/images/goyave.png", name: "goyave" },
  { imgSrc: "assets/images/kiwi.png", name: "kiwi" },
  { imgSrc: "assets/images/lananas.png", name: "lananas" },
  { imgSrc: "assets/images/mangue.png", name: "mangue" },
  { imgSrc: "assets/images/melon.png", name: "melon" },
  { imgSrc: "assets/images/noix-de-coco.png", name: "noix-de-coco" },
  { imgSrc: "assets/images/orange.png", name: "orange" },
  { imgSrc: "assets/images/pasteque.png", name: "pasteque" },
  { imgSrc: "assets/images/peche.png", name: "peche" },
  { imgSrc: "assets/images/pomme.png", name: "pomme" },
  { imgSrc: "assets/images/avocat.png", name: "avocat" },
  { imgSrc: "assets/images/banane.png", name: "banane" },
  { imgSrc: "assets/images/citron.png", name: "citron" },
  { imgSrc: "assets/images/fraise.png", name: "fraise" },
  { imgSrc: "assets/images/goyave.png", name: "goyave" },
  { imgSrc: "assets/images/kiwi.png", name: "kiwi" },
  { imgSrc: "assets/images/lananas.png", name: "lananas" },
  { imgSrc: "assets/images/mangue.png", name: "mangue" },
  { imgSrc: "assets/images/melon.png", name: "melon" },
  { imgSrc: "assets/images/noix-de-coco.png", name: "noix-de-coco" },
  { imgSrc: "assets/images/orange.png", name: "orange" },
  { imgSrc: "assets/images/pasteque.png", name: "pasteque" },
  { imgSrc: "assets/images/peche.png", name: "peche" },
  { imgSrc: "assets/images/pomme.png", name: "pomme" },
];

// ***************************** On randomise le tableau de nos carte, on le "mélange" ****************************
const randomize = () => {
  // Je récupère le tableau des cartes, et je le stocke dans cardData
  const cardData = getData(); 

  // Je mélange le tableau de façon aléatoire à laide de sort()
  cardData.sort(() => Math.random() - 0.5); 

  // Je return cardData pour pouvoir le réutiliser plus tard
  return cardData;
};

// ************************ On génère les cartes côté HTML ******************************
const cardGenerator = () => {
  // J'appelle randomize(), fonction créée ligne 39, pour récupérer les cartes mélangées
  const cardData = randomize();

  // Je créé une section (html) et je la stocke
  const section = document.createElement("section");
  // J'y ajoute la classe .memorySection
  section.classList = "memorySection";
  // Je la place à la fin de notre body
  body.appendChild(section);

  // A l'aide d'un foreach, j'effectue des instructions pour chaque cartes de cadrData
  cardData.forEach((item) => {

    // Je créé les éléments html
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    // J'y ajoute une classe
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    // J'ajoute ces éléments dans la section créée précédemment
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    // Dans l'attribut src="" de la balise img, on place la propriété imgSrc de notre objet
    face.src = item.imgSrc; 
    // Je créé l'attibut name dans la div de chaque cartes, avec le nom de la carte correspondante configuré dans l'objet
    card.setAttribute("name", item.name);

    // Pour chaque carte, j'ai créé ceci:
    //<div class="card">
    //  <img class="face" src="assets/images/avocat.png">
    //  <div class="back">
    //  </div>
    //</div>

    // Je créé un evenement au clic sur chaque carte grace à addEventListener()
    // Le premier paramètre "click" précise qu'il se déclenche au clic de la souris,
    // et le deuxième paramètre est une fonction fléchée qui se déclenchera au clic
    card.addEventListener("click", (e) => {

      // Tant que blocked est false, j'autorise les clics sinon je les bloque
      if (!blocked) {
        // quand je clique sur une carte, j'ajoute la classe 'toggleCard'
        card.classList.toggle("toggleCard");

        // je mets également un attribut style avec pointerEvents à "none" pour empêcher le clic seulement sur la carte en question
        card.style.pointerEvents = "none";

        // J'appelle cette fonction pour checker les cartes
        // je fais passer "e", qui contient la carte sur laquelle j'ai cliqué
        checkCards(e);
      } else {
        // Si blocked est true, j'affiche dans la console "clics bloqués"
        console.log("clics bloqués");
      }
    });
  });
};

// ***************** on check les cartes *********************
const checkCards = (e) => {
  // Je stocke la carte sur laquelle j'ai cliqué
  const clickedCard = e.target;

  // J'y ajoute la classe "flipped", cette classe nous servira à checker si on a une ou deux cartes retournées
  clickedCard.classList.add("flipped");

  // je stocke les cartes avec la classe "flipped" et celles avec la classe "toggleCard"
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  // je checke si j'ai deux cartes avec la classe "flipped"
  if (flippedCards.length === 2) {

    // je passe blocked à true pour bloquer les clics
    blocked = true;

    // Je débloque les clics dans après 1 seconde, grace à setTimeout qui permet d'effectuer des taches avec un délai, 1000 correspond à 1 seconde
    setTimeout(() => (blocked = false), 1000);

    // Je vérifie si les deux cartes avec "flipped" correspondent
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      //Si oui...
      // J'affiche dans la console que ça match
      console.log("match");

      // Pour chacune de ces cartes, je supprime la classe flipped et j'empêche de cliquer dessus
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      // Si non...
      // J'affiche dans la console "wrong"
      console.log("wrong");

      // Pour chacune d'entre elles, j'eblève la classe flipped, et j'autorise à nouveau les clics en enlevant l'attribut style
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
          card.removeAttribute("style");
        }, 1100);
      });
    }
  }

  // Je vérifie si toutes les cartes sont retournées
  if (toggleCard.length === 28) {
    // Si oui, j'appelle la fonction win()
    win();
  }
};

// ********************************* Fonction qui permet de recommencer à la fin d'une partie ****************************
const restart = () => {
  // Je stocke la section qui contient toutes les cartes
  const section = document.querySelector(".memorySection");

  // Je bloque les clics
    blocked = true;

  // Je mélange à nouveau les cartes, mais je n'affiche pas encore les changements
  // Si j'affichais de suite ces changements, nous les verrions avant l'animation des cartes qui se retournent
  let cardData = randomize();

  // je stocke les élément html qui contiennent les cartes
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");

  // Je bloque tous les clics
  section.style.pointerEvents = "none";

  // Pour chaque carte, j'effectue les instructions suivantes:
  cardData.forEach((item, index) => {

    // Tout d'abord, je retire la classe toggleCard, ce qui va lancer l'animation
    cards[index].classList.remove("toggleCard");

    // 1 secondes après, je débloque les clics (pour chaque carte, mais aussi de toute la section (quand on aime la sécurité, on ne compte pas !)), 
    // et je redéfini l'attribut "src" des images ainsi que "name"
    setTimeout(() => {
      cards[index].removeAttribute("style");
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.removeAttribute("style");
    }, 1100);
  });
};

// **************************** Fonction appelée en cas de victoire :) **********************************
const win = () => {
  // Je passe la variable newGame à False, pour indique au programme que les prochaines parties ne sont pas les premières
    newGame = false;

  // 1 seconde après que toutes les cartes soient retournées, j'annonce la victoire vie une alert(),
  // ensuite j'appelle la fontion addScore, qui va demander le pseudo du joueur (via prompt()) 
  // puis envoyer le score côté BACKEND pour l'ajouter en BAse de Données.
  // Ensuite je demande, grace à confirm(), si l'utilisateur veut rejouer ou pas
  // Si oui, j'appelle restart() et timerHidden()
  // Si non, je renvoie tout simplement sur le menu principal.
  setTimeout(() => {
    alert("GG well played !");
    addScore(prompt('Entrez votre pseuso pour enregistrer votre score'),interval);
    if (confirm("Voulez vous rejouer ?")) {
      restart();
      timerHidden();
    } else {
      window.location.href = "menu";
    }
  }, 1000);
};

// **************************** Fonction appelée en cas de défaite :'( **********************************
const loose = () => {
  // Je passe la variable newGame à False, pour indique au programme que les prochaines parties ne sont pas les premières
    newGame = false;

  // Je bloque les clics
    blocked = true;

  // 1 seconde après, j'annonce la défaite, et comme pour win(), je demande si il souhaite rejouer
  // La suite est la même que pour win()
    setTimeout(() => {
        alert("You loose...");
        if (confirm("Voulez vous rejouer ?")) {
            timerHidden();
            restart();
        } else {
          window.location.href = "menu";
        }
      }, 1000);
}

// **************************** Fonction qui envoie le score à la partie BACKEND **********************************
// je fais passer deux paramètre: pseudo et timeLeft
// pseudo contiendra le pseudo entré par l'utilisateur et timeLeft le temps qui lui resté en guise de score
const addScore = (pseudo,timeLeft) => {

  // je créé un objet score, qui contiendra les deux paramètres
    let score = {
        pseudo: pseudo,
        score: timeLeft
    }

  // Je créé un fetch vers l'url prévu, côté back, pour ajouter un nouveau score en Base de Données
  // Cela me permet d'échanger des données avec le serveur, mais de façon asynchrone 
    fetch("add-score", {
      // Je définie la méthode, POST dans ce cas précis
        method:"POST",
      // Je passe l'objet créé en une chaine de caractères JSON
        body:JSON.stringify(score)
    })

  // .then attend la réponse du serveur, et renvoie un objet promise (promesse). 
  // Cette promesse peut être en attente, tenue ou rompue en cas d'erreur
    .then((response) => {

      // Je vérifie si il n'y a pas eu d'erreur en vérifiant le code HTTP renvoyé par le serveur
      // 201 est un code qui confirme un ajout de données, donc je check si nous avons bien ce code
        if (response.status === 201) {
          // Si oui, je confirme à l'utilisateur que l'opération est un succès
            alert('Votre score a bien été ajouté');
        }
        // Je return les données récupérées en JSON
        return response.json();
    })

    .then((response) => {
      // Si dans les données que je renvoie depuis le BACKEND il n'y a pas le message "success"
      // alors c'est qu'il y a une erreur côté BACKEND et je créé donc une erreur
        if (response.message !== "success") {
            throw new Error(response.message);
        }
        // Si je n'ai pas eu d'erreur jusqu'ici, j'affiche dans la console le message success
        console.log(response);
    })

    // Si j'ai créé une erreur via "throw new Error()", le code s'arrête est passe directement dans cette partie
    // J'affiche alors l'erreur dans la console
    .catch(err => {
        alert(err);
        console.log(err);
    })
}

// **************************** Fonction qui va récupérer les scores côté BACKEND pour les utiliser côté FRONTEND **********************************

// Dans cette fonction, je vais récupérer les données des scores de notre base de données, 
// puis créer l'affichage pour ces données
const getScores = () => {

  // Je créé des éléments HTML
  const scoresDiv = document.createElement("div");
  const title = document.createElement("h1");
  const ul = document.createElement("ul");

  // J'ajoute l'attribut class "scores" à la div
  scoresDiv.classList = "scores";
  // J'ajoute cette div à la fin du body
  body.appendChild(scoresDiv);

  // Je rajoute ces éléments HTML dans la div créé précédemment
  scoresDiv.appendChild(title);
  scoresDiv.appendChild(ul);

  // J'ajoute du contenu HTML dans la balise h1
  title.innerHTML = "Top 10";

// Comme le fetch précédent, mais avec la méthode GET cette fois ci
  fetch("get-scores", {
      method:"GET",
  })

  .then((response) => {
    console.log(response.status);
    // 200 est un code HTTP de confirmation, c'est celui de base pour confirmer le succès de l'opération
    // aussi appelé 200 OK
    // Donc si c'est bien 200, je return les données récupérées en JSON
      if (response.status === 200) {
          return response.json();
      }  
  })

  .then((response) => {
  // Les scores récupérés, je fini de créer l'affichage
  // Je créé donc une boucle pour créer 10 li dans la balise ul
  // Dans chaque li, j'y met une balise p et span, qui contiendront le pseudo et le score
    for(let i = 1; i <= 10; i++) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const p = document.createElement("p");

      ul.appendChild(li);
      li.appendChild(p);
      li.appendChild(span);
      p.innerHTML = i+". "+response[i].pseudo+" ";
      span.innerHTML = response[i].score;
    }
      
      if (response.message !== "success") {
          throw new Error(response.message);
      }
  })

  .catch(err => {
      alert(err);
      console.log(err);
  })
}