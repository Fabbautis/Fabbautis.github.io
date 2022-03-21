let stage = new createjs.Stage("demoCanvas");


let canvas = document.getElementById('demoCanvas');


let context = canvas.getContext('2d');


let health = document.getElementById('health');

let gameBorder = new createjs.Bitmap("border.png");
    gameBorder.crossOrigin = "Anonymous";
let background = new createjs.Bitmap('sus.png');
    background.crossOrigin = "Anonymous";


let minigameObjects = [
    {name: 'Fill', function: 'fillStart()', background: "Fill/background.png", number: 1},
    {name: 'Kill', function: 'killStart()', background: "Kill/background.png", number: 2},
    {name: 'Fill', function: 'fillStart()', background: "Fill/background.png", number: 3},
    {name: 'Kill', function: 'killStart()', background: "Kill/background.png", number: 4},
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
    '1100571_decay.mp3', //Will probably have this track be exclusive to the guitar microgame
    '1105612_stalemate.mp3',
    '1113343_CYBERCONXTRUCT.mp3',
]
let backgroundMusicPath = 'Audio/matthieumusic/'
let backgroundMusic = new Audio();


let keysPressed = {};
let gameOver = false;


createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
createjs.Ticker.framerate = 24;


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
    switch (status)
    {
        case 'win':
            console.log('good job');
        break;
        case 'lose':
            health.innerText = parseInt(health.innerText)-1;
        break;
    }
    stage.removeAllChildren(background);
    
    backgroundMusic.pause();
    stage.update();
    init();
}

function playMusic(){
    let musicToPlay = backgroundMusicPath + backgroundMusicOptions[Math.floor(Math.random()*backgroundMusicOptions.length)];
    backgroundMusic.src = musicToPlay;
    backgroundMusic.volume = 0.4;
    backgroundMusic.play();
}