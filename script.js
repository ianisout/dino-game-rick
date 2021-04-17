const rick = document.querySelector('.walk-2', '.walk-1');
const doJump = document.querySelector('.jump');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;



function handleKeyDown(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
};

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        let upInterval = setTimeout(() => {
            document.getElementById('rick').style.visibility='visible';
        }, 430);
    }
};

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 250) {  //stops it from taking off
            clearInterval(upInterval);

            //going down
            let downInterval = setInterval(() =>{
                if (position <= 0 ) { // stops it from going to hell
                    clearInterval(downInterval);
                    isJumping = false;
                    document.getElementById('doJump').style.visibility='hidden';
                } else {
                    position -= 80;
                    document.getElementById('doJump').style.visibility='visible';
                    document.getElementById('doJump').style.bottom = position + 'px';
                }
            }, 25);

        } else {
            //going up
            position += 20;
            document.getElementById('rick').style.visibility='hidden';
            document.getElementById('doJump').style.visibility='visible';
            document.getElementById('doJump').style.bottom = position + 'px';
            handleKeyUp;
        };
    }, 25);
}

function createCactus() {
    const cactus = document.createElement('div'); // creates div on html
    let cactusPosition = 900; // cactus position
    let randomTime = Math.round(Math.random() * 6000);

    cactus.classList.add('cactus'); // class of div cactus
    cactus.style.left = 900 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -80) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 10 && cactusPosition < 80 && position < 80) {
            //game over

            clearInterval(leftInterval);
            document.body.innerHTML = '<div class="game-over"><img src="killed.png"></div>';
        } else {
            cactusPosition -= 7; //could change difficulty
        }
    },20);

    setTimeout(createCactus, randomTime); //sending random cactuses into the game
}

createCactus();

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
