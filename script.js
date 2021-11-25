const rick = document.querySelector('.walk-2', '.walk-1');
const doJump = document.querySelector('.jump');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyDown(event) {
  if (event.keyCode === 32 && !isJumping)  jump();
}

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    setTimeout(() => {
      document.getElementById('rick').style.visibility = 'visible';
    }, 430);
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 300) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 100) {
          clearInterval(downInterval);
          document.getElementById('doJump').style.visibility = 'hidden';
          isJumping = false;
        } else {
          position -= 20;
          document.getElementById('doJump').style.visibility = 'visible';
          document.getElementById('doJump').style.bottom = position + 'px';
        }
      }, 25);
    } else {
      position += 20;
      document.getElementById('rick').style.visibility = 'hidden';
      document.getElementById('doJump').style.visibility = 'visible';
      document.getElementById('doJump').style.bottom = position + 'px';
      handleKeyUp;
    }
  }, 20);
}

let difficultyIncreaseAmnt = 2000;
let difficultyIncreaseSpd = 8;

function createEnemy() {
  const enemy = document.createElement('div');
  let enemyPosition = 1400;
  let randomTime = Math.round(Math.random() * 2000);
  console.log(difficultyIncreaseSpd)

  enemy.classList.add('enemy');
  enemy.style.left = 1400 + 'px';
  background.appendChild(enemy);

  let leftInterval = setInterval(() => {
    enemy.style.left = enemyPosition + 'px';

    if (enemyPosition < -130) {
      clearInterval(leftInterval);
      background.removeChild(enemy);
    } else if (enemyPosition > 60 && enemyPosition < 130 && position < 130) {
      clearInterval(leftInterval);
      document.body.innerHTML =
        '<div class="game-over"><img id="test" src="img/killed.png"><a class="btn-restart" onclick="location.reload()">Play again</a></div>';
    } 

    enemyPosition -= difficultyIncreaseSpd;
  }, 20);

  setTimeout(createEnemy, randomTime+difficultyIncreaseAmnt);
  if (difficultyIncreaseAmnt >= 505) difficultyIncreaseAmnt -= Math.round(Math.random() * 500);
  difficultyIncreaseSpd += Number((Math.random()).toFixed(2));
}

createEnemy();

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
