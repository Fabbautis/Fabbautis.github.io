let stage = new createjs.Stage("demoCanvas");

let canvas = document.getElementById('demoCanvas');

let context = canvas.getContext('2d');

let health = document.getElementById('health')

let gameBorder = new createjs.Bitmap("border.png");
    gameBorder.crossOrigin = "Anonymous";

let background = new createjs.Bitmap('sus.png');
    background.crossOrigin = "Anonymous";

let minigameObjects = [
    {name: 'Fill', function: 'fillStart()', background: "Fill/background.png", music: 'Fill/zmbgroov.wav', number: 1},
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

let gameOverSfxPath = 'SFX/rhodesman/';

let gameOverSfx = new Audio();

let backgroundMusic = new Audio('Fill/zmbgroov.wav');

let keysPressed = {};

let gameOver = false;

let playerSpeed = 20;




function keysDown(event)
{
    keysPressed[event.keyCode] = true;
}
function keysUp(event)
{
    keysPressed[event.keyCode] = false;
}