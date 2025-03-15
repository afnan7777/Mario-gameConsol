// Elemen DOM
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const startBtn = document.getElementById('start-btn');
const worldSelect = document.getElementById('world-select');
const world1Btn = document.getElementById('world1-btn');
const world1_2Btn = document.getElementById('world1-2-btn');
const world1_3Btn = document.getElementById('world1-3-btn');
const world1_4Btn = document.getElementById('world1-4-btn');
const quitBtn = document.getElementById('quit-btn');
const mario = document.getElementById('mario');
const goomba = document.getElementById('goomba');
const koopa = document.getElementById('koopa');
const pipe = document.getElementById('pipe');
const hole = document.getElementById('hole');
const coin = document.getElementById('coin');
const mushroom = document.getElementById('mushroom');
const brick = document.getElementById('brick');
const castle = document.getElementById('castle');
const block = document.getElementById('block');
const jumpSound = document.getElementById('jump-sound');
const coinSound = document.getElementById('coin-sound');
const powerupSound = document.getElementById('powerup-sound');
const gameoverSound = document.getElementById('gameover-sound');
const backgroundMusic = document.getElementById('background-music');

// Variabel game
let marioPosition = 50;
let goombaPosition = 500;
let koopaPosition = 700;
let coinCollected = false;
let mushroomCollected = false;
let currentWorld = 1;
let currentStage = 1;
let gameInterval;

// Tampilkan pilihan world saat tombol Start Game diklik
startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    worldSelect.classList.remove('hidden');
});

// Pilih World 1-1
world1Btn.addEventListener('click', () => {
    currentWorld = 1;
    currentStage = 1;
    startGame();
});

// Pilih World 1-2
world1_2Btn.addEventListener('click', () => {
    currentWorld = 1;
    currentStage = 2;
    startGame();
});

// Pilih World 1-3
world1_3Btn.addEventListener('click', () => {
    currentWorld = 1;
    currentStage = 3;
    startGame();
});

// Pilih World 1-4
world1_4Btn.addEventListener('click', () => {
    currentWorld = 1;
    currentStage = 4;
    startGame();
});

// Quit Game
quitBtn.addEventListener('click', () => {
    alert('Terima kasih sudah main!');
    window.close();
});

// Start Game
function startGame() {
    menu.classList.add('hidden');
    game.classList.remove('hidden');
    worldSelect.classList.add('hidden');

    // Mainkan lagu background
    backgroundMusic.play();

    // Set background sesuai stage
    const stageElement = document.getElementById('stage');
    if (currentStage === 1) {
        stageElement.className = 'grassland';
    } else if (currentStage === 2) {
        stageElement.className = 'underground';
    } else if (currentStage === 3) {
        stageElement.className = 'water-world';
    } else if (currentStage === 4) {
        stageElement.className = 'castle';
    }

    // Reset posisi karakter
    marioPosition = 50;
    mario.style.left = marioPosition + 'px';
    goombaPosition = 500;
    goomba.style.right = goombaPosition + 'px';
    koopaPosition = 700;
    koopa.style.right = koopaPosition + 'px';

    // Mulai game loop
    gameInterval = setInterval(gameLoop, 50);
}

// Game Loop
function gameLoop() {
    checkGoomba();
    checkKoopa();
    checkPipe();
    checkHole();
    checkCoin();
    checkMushroom();
    checkBrick();
    checkBlock();
    checkCastle();
}

// Fungsi untuk cek tabrakan dengan Goomba
function checkGoomba() {
    const marioRect = mario.getBoundingClientRect();
    const goombaRect = goomba.getBoundingClientRect();

    if (
        marioRect.right > goombaRect.left &&
        marioRect.left < goombaRect.right &&
        marioRect.bottom > goombaRect.top &&
        marioRect.top < goombaRect.bottom
    ) {
        gameOver();
    }
}

// Fungsi untuk cek tabrakan dengan Koopa
function checkKoopa() {
    const marioRect = mario.getBoundingClientRect();
    const koopaRect = koopa.getBoundingClientRect();

    if (
        marioRect.right > koopaRect.left &&
        marioRect.left < koopaRect.right &&
        marioRect.bottom > koopaRect.top &&
        marioRect.top < koopaRect.bottom
    ) {
        gameOver();
    }
}

// Fungsi untuk cek tabrakan dengan Pipe
function checkPipe() {
    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    if (
        marioRect.right > pipeRect.left &&
        marioRect.left < pipeRect.right &&
        marioRect.bottom > pipeRect.top
    ) {
        gameOver();
    }
}

// Fungsi untuk cek tabrakan dengan Hole
function checkHole() {
    const marioRect = mario.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    if (
        marioRect.right > holeRect.left &&
        marioRect.left < holeRect.right &&
        marioRect.bottom > holeRect.top
    ) {
        gameOver();
    }
}

// Fungsi untuk cek tabrakan dengan Coin
function checkCoin() {
    const marioRect = mario.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();

    if (
        marioRect.right > coinRect.left &&
        marioRect.left < coinRect.right &&
        marioRect.bottom > coinRect.top &&
        marioRect.top < coinRect.bottom
    ) {
        if (!coinCollected) {
            coinCollected = true;
            coin.style.display = 'none';
            playCoinSound();
        }
    }
}

// Fungsi untuk cek tabrakan dengan Mushroom
function checkMushroom() {
    const marioRect = mario.getBoundingClientRect();
    const mushroomRect = mushroom.getBoundingClientRect();

    if (
        marioRect.right > mushroomRect.left &&
        marioRect.left < mushroomRect.right &&
        marioRect.bottom > mushroomRect.top &&
        marioRect.top < mushroomRect.bottom
    ) {
        if (!mushroomCollected) {
            mushroomCollected = true;
            mushroom.style.display = 'none';
            playPowerupSound();
        }
    }
}

// Fungsi untuk cek tabrakan dengan Brick
function checkBrick() {
    const marioRect = mario.getBoundingClientRect();
    const brickRect = brick.getBoundingClientRect();

    if (
        marioRect.right > brickRect.left &&
        marioRect.left < brickRect.right &&
        marioRect.bottom > brickRect.top &&
        marioRect.top < brickRect.bottom
    ) {
        brick.style.display = 'none';
    }
}

// Fungsi untuk cek tabrakan dengan Block
function checkBlock() {
    const marioRect = mario.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();

    if (
        marioRect.right > blockRect.left &&
        marioRect.left < blockRect.right &&
        marioRect.bottom > blockRect.top &&
        marioRect.top < blockRect.bottom
    ) {
        coin.style.display = 'block';
        coin.style.left = blockRect.left + 'px';
        coin.style.bottom = blockRect.bottom + 20 + 'px';
        playCoinSound();
    }
}

// Fungsi untuk cek tabrakan dengan Castle
function checkCastle() {
    const marioRect = mario.getBoundingClientRect();
    const castleRect = castle.getBoundingClientRect();

    if (
        marioRect.right > castleRect.left &&
        marioRect.left < castleRect.right &&
        marioRect.bottom > castleRect.top &&
        marioRect.top < castleRect.bottom
    ) {
        alert('Selamat! Mario sampai di Castle!');
        resetGame();
    }
}

// Game Over
function gameOver() {
    clearInterval(gameInterval);
    playGameoverSound();
    alert('Game Over!');
    resetGame();
}

// Reset Game
function resetGame() {
    menu.classList.remove('hidden');
    game.classList.add('hidden');
    worldSelect.classList.add('hidden');
    coinCollected = false;
    mushroomCollected = false;
    coin.style.display = 'block';
    mushroom.style.display = 'block';
    brick.style.display = 'block';
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// Fungsi untuk mainkan suara
function playJumpSound() {
    jumpSound.currentTime = 0;
    jumpSound.play();
}

function playCoinSound() {
    coinSound.currentTime = 0;
    coinSound.play();
}

function playPowerupSound() {
    powerupSound.currentTime = 0;
    powerupSound.play();
}

function playGameoverSound() {
    gameoverSound.currentTime = 0;
    gameoverSound.play();
}

// Kontrol Mario
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        marioPosition += 10;
        mario.style.left = marioPosition + 'px';
    } else if (event.key === 'ArrowLeft') {
        marioPosition -= 10;
        mario.style.left = marioPosition + 'px';
    } else if (event.key === ' ') {
        jump();
    }
});

// Lompat
function jump() {
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            fall();
        } else {
            jumpHeight += 5;
            mario.style.bottom = 100 + jumpHeight + 'px';
        }
    }, 20);
    playJumpSound();
}

// Jatuh setelah lompat
function fall() {
    let fallHeight = 100;
    const fallInterval = setInterval(() => {
        if (fallHeight <= 0) {
            clearInterval(fallInterval);
        } else {
            fallHeight -= 5;
            mario.style.bottom = 100 + fallHeight + 'px';
        }
    }, 20);
}