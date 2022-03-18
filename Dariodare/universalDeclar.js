let stage = new createjs.Stage("demoCanvas");

let canvas = document.getElementById('demoCanvas');

let context = canvas.getContext('2d');

let health = document.getElementById('health')

let gameBorder = new createjs.Bitmap("../border.png");
    gameBorder.crossOrigin = "Anonymous";

let background = new createjs.Bitmap('sus.png');
    background.crossOrigin = "Anonymous";


let minigameObjects = [
    {name: 'Fill', function: 'fillStart()', background: "Fill/background.png", number: 1},
    {name: 'Kill', function: 'killStart()', background: "Kill/background.png", number: 2},
    {name: 'Fill', function: 'fillStart()', background: "Fill/background.png", number: 3},
    {name: 'Kill', function: 'killStart()', background: "Kill/background.png", number: 4},
]


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