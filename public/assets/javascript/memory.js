// ******************************* On stock les éléments dont on a besoin ********************
const section = document.querySelector(".memorySection");

// ************************** On déclare nos variables ************************************
var blocked = false;
let gameStarted = false;

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
  const cardData = getData(); // On récupère le tableau des cartes, et on le stock dans cardData
  cardData.sort(() => Math.random() - 0.5); // Mélange le tableau de façon aléatoire
  return cardData;
};

// ************************ On génère les cartes côté HTML ******************************
const cardGenerator = () => {
  const cardData = randomize();

  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    face.src = item.imgSrc; // Dans l'attribut src="" de la balise img, on place la propriété imgSrc de notre objet
    card.setAttribute("name", item.name);

    // Pour chaque carte, nous avons créé ceci:
    //<div class="card">
    //  <img class="face" src="assets/images/avocat.png">
    //  <div class="back">
    //  </div>
    //</div>

    card.addEventListener("click", (e) => {
      if (!blocked) {
        // quand on clic sur une carte, on ajoute la classe 'toggleCard'
        card.classList.toggle("toggleCard");
        card.style.pointerEvents = "none";
        checkCards(e);
      } else {
        console.log("clics bloqués");
      }
    });
  });
};

// ***************** on check les cartes *********************
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  if (flippedCards.length === 2) {
    blocked = true;
    setTimeout(() => (blocked = false), 1100);
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
          card.removeAttribute("style");
        }, 1100);
      });
    }
  }

  if (toggleCard.length === 28) {
    win();
  }
};

// ********************************* Fonction qui permet de recommencer à la fin d'une partie ****************************
const restart = () => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";

  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    setTimeout(() => {
      cards[index].removeAttribute("style");
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.removeAttribute("style");
    }, 1100);
  });
};

const win = () => {
    newGame = false;
  setTimeout(() => {
    alert("GG well played !");
    if (confirm("Voulez vous rejouer ?")) {
      restart();
      timerGenerator();
    } else {
      window.location.href = "menu";
    }
  }, 1100);
};

const loose = () => {
    newGame = false;
    blocked = true;
    setTimeout(() => {
        alert("You loose...");
        if (confirm("Voulez vous rejouer ?")) {
            timerHidden();
            restart();
        } else {
          window.location.href = "menu";
        }
      }, 1100);
}
