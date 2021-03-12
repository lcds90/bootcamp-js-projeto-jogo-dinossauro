const dino = document.querySelector(".dino");
const bg = document.querySelector(".background");
let pos = 0;
let score = 0;
let gameOver = false;
let isJumping = false;

document.addEventListener("DOMContentLoaded", function () {
document.querySelector(".dino").style.display = 'none'
document.querySelector('#play').addEventListener('click', function(){
    main()

})
});

function main(){
document.querySelector("#soundtrack").play()
document.querySelector(".dino").style.display = 'block'
document.querySelector("#play").style.display = 'none'
    createCactus();
    document.addEventListener("keyup", handleKeyUp);
}

function handleKeyUp(event) {
  // https://keycode.info/

  switch (event.keyCode) {
    case 32:
      if (!isJumping) {
        jump();
      }
      break;

    default:
      break;
  }
}

function jump() {
  isJumping = true;
  let interval = setInterval(() => {
    if (pos >= 250) {
      clearInterval(interval);
      let down = setInterval(() => {
        if (pos <= 0) {
          clearInterval(down);
          isJumping = false;
        } else pos -= 20;
        dino.style.bottom = pos + "px";
      }, 10);
    } else {
      pos += 20;
      dino.style.bottom = pos + "px";
    }
  }, 10);
}

function createCactus() {
  let cactus = document.createElement("div");
  let cactusPos = 2000;
  let randomTime = Math.random() * 10000;
  cactus.classList.add("cactus");
  cactus.style.left = 2000 + "px";
  bg.appendChild(cactus);

  let left = setInterval(() => {
    if (cactusPos < -60) {
      clearInterval(left);
      bg.removeChild(cactus);
      score++;
    } else if (cactusPos > 0 && cactusPos < 60 && pos < 60) {
        bg.removeChild(cactus);
        document.body.innerHTML = `<h1 class="game-over">Fim do jogo. Pontuação: ${score}</h1>`;
      setTimeout(()=> {
          window.location.reload()
      }, 3500)
      //   gameOver = true;
    } else {
      cactusPos -= 10;
      cactus.style.left = cactusPos + "px";
    }
  }, 15);

  setTimeout(createCactus, randomTime);
}
