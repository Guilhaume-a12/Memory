const timerDiv = document.querySelector(".timer");

let interval = 120;
let newGame = true;

const timerGenerator = () => {
  const title = document.createElement("h1");
  const paragraph = document.createElement("p");
  const span = document.createElement("span");
  const progress = document.createElement("div");
  const progressInner = document.createElement("div");

  progress.classList = "progress";
  progressInner.classList = "progress-inner";

  timerDiv.appendChild(title);
  timerDiv.appendChild(paragraph);
  timerDiv.appendChild(progress);
  progress.appendChild(progressInner);

  title.innerHTML = "O'Memory";
  paragraph.innerHTML = "Temps restant: ";
  paragraph.appendChild(span);
  span.innerHTML = interval + "s";
};

const timerHidden = () => {

  while (timerDiv.firstChild) {
    timerDiv.removeChild(timerDiv.firstChild);
  }

  const button = document.createElement("button");
  button.classList = "btn-start";

  const defaultP = document.createElement("p");
  defaultP.classList = "defaultP";

  timerDiv.appendChild(defaultP);
  timerDiv.appendChild(button);

  defaultP.innerHTML = "Nouvelle partie, appuyez sur START pour commencer";
  button.innerHTML = "START";

  button.addEventListener("click", () => {
    blocked = false;
    timerStart();
  });
};

const timerStart = () => {
    const button = document.querySelector(".btn-start");
const defaultP = document.querySelector(".defaultP");
  interval = 120;

  if (newGame) {
    cardGenerator();
  }

  timerGenerator();

  button.remove();

  const progressInner = document.querySelector(".progress-inner");
  const span = document.querySelector("span");

  defaultP.innerHTML = "C'EST PARTI !";

  var countDown = setInterval(() => {
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

    if (interval > 110) {
      progressInner.style.width = progressWidth + "%";
      span.innerHTML = interval + "s";
    } else {
      clearInterval(countDown);
      progressInner.style.width = "0%";
      span.innerHTML = "Game Over";
      loose();
    }
  }, 1000);
};
