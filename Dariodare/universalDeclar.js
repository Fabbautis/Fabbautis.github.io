let stage = new createjs.Stage("demoCanvas");


let canvas = document.getElementById('demoCanvas');


let context = canvas.getContext('2d');


let health = document.getElementById('health');
let scoreHTML = document.getElementById('score');

let gameBorder = new createjs.Bitmap("border.png");
    gameBorder.crossOrigin = "Anonymous";
let background = new createjs.Bitmap('sus.png');
    background.crossOrigin = "Anonymous";


let minigameObjects = [
    {name: 'Fill', function: 'fillStart()', background: "Fill/background.png", number: 1},
    {name: 'Kill', function: 'killStart()', background: "Kill/background.png", number: 2},
    {name: 'Strum', function: 'strumStart()', background: "Strum/background.png", number: 3},
]


let gameOverSfxGood = [
    '320652__rhodesmas__success-02.wav',
    '320657__rhodesmas__level-up-03.wav',
    '320672__rhodesmas__win-01.wav',
    '320776__rhodesmas__action-02.wav',
    '321262__rhodesmas__coins-purchase-02.wav'
]
let gameOverSfxBad = [
    '322895__rhodesmas__disconnected-01.wav',
    '380265__rhodesmas__alert-02.wav',
    '380277__rhodesmas__alert-04.wav',
]
let gameOverSfxPath = 'Audio/rhodesman/';
let gameOverSfx = new Audio();


let backgroundMusicOptions = [
    '1037421_URBAN-CELERY.mp3',
    '1100571_decay.mp3',
    '1064418_vix.mp3',
    '1113343_CYBERCONXTRUCT.mp3',
    '1022229_03-friend-or-foe---matthie.mp3',
    '1105612_stalemate.mp3',
]
let backgroundMusicPath = 'Audio/matthieumusic/'
let backgroundMusic = new Audio();


let keysPressed = {};
let gameOver = false;

let globalTimer; 
let timeStarted; //Variable used to see how much time passed since the minigame started
let timeInMinigame;

let gamesWon = 0;
let gamesPassed = -1;
let difficulty = 0;

createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
createjs.Ticker.framerate = 24;

createjs.Ticker.on ('tick', function () {globalTimer = Math.floor(createjs.Ticker.getTime()/1000);});


function keysDown(event)
{
    keysPressed[event.keyCode] = true;
}
function keysUp(event)
{
    keysPressed[event.keyCode] = false;
}

function winLoseSFX(status) {
    if (status == 'lose')
    {
        let gameOverSfxBadPath = gameOverSfxPath + gameOverSfxBad[Math.floor(Math.random()*gameOverSfxBad.length)];
        gameOverSfx.src = gameOverSfxBadPath;
    }

    if (status == 'win') 
    {
        let gameOverSfxGoodPath = gameOverSfxPath + gameOverSfxGood[Math.floor(Math.random()*gameOverSfxGood.length)];
        gameOverSfx.src = gameOverSfxGoodPath;
    }
    
        gameOverSfx.play();  
}

function returnHome(status){
    gamesPassed++;
    switch (status)
    {
        case 'win':
            gamesWon++;
            scoreHTML.innerHTML = parseInt(gamesWon);
        break;
        case 'lose':
            health.innerText = parseInt(health.innerText)-1;
        break;
    }

    if (gamesPassed ==5) {
        difficulty = 1;
    }
    if (gamesPassed ==10) {
        difficulty = 2;
    }
    stage.removeAllChildren();

    backgroundMusic.pause();
    stage.update();
    elevatorStart(status);
}

function playMusic(elevator){
    let musicToPlay;
    let randomizer2 = Math.floor(Math.random()*(backgroundMusicOptions.length-2));
    if (!elevator) {
        musicToPlay = backgroundMusicPath + backgroundMusicOptions[randomizer2];
    } else {
        musicToPlay = backgroundMusicPath + backgroundMusicOptions[backgroundMusicOptions.length-2];
    }
    backgroundMusic.src = musicToPlay;
    backgroundMusic.volume = 0.4;
    backgroundMusic.playbackRate = 1.01 + 0.01 * gamesPassed 
    if (backgroundMusic.playbackRate >= 1.5) {
        backgroundMusic.playbackRate = 1.5;
    }
    backgroundMusic.addEventListener('ended', function () {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    })
    backgroundMusic.play();
}