timerHidden();

// button.addEventListener('click', () => {

//   cardGenerator();
//   timerGenerator();

//   button.remove();

//   const progressInner = document.querySelector('.progress-inner');
//   const span = document.querySelector('span');

//   defaultP.innerHTML = "C'EST PARTI !";

//   var countDown = setInterval(() => {
//     interval--;

//     let progressWidth = interval / 120 * 100;

//     if (interval > 60) {
//       progressInner.style.background = "green";
//     } else if (interval > 40) {
//       progressInner.style.background = "yellow";
//     } else if (interval > 20) {
//       progressInner.style.background = "orange";
//     } else {
//       progressInner.style.background = "red";
//     }

//     if (interval > 110) {
//       progressInner.style.width = progressWidth + "%";
//       span.innerHTML = interval + "s";
//     } else {
//       clearInterval(countDown);
//       progressInner.style.width = "0%";
//       span.innerHTML = "Game Over";
//       loose();
//     }
//   }, 1000);

//   setTimeout(() => defaultP.innerHTML = "Trouvez tous les doubles !", 2000);
//   setTimeout(() => defaultP.innerHTML = "Déjà une minute, attention !", 60000);
// })


