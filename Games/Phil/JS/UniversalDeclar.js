//Make the canvas the full screen of the HTML block (which for this instance, is the size of the entire window)
let gameStage = new createjs.Stage("canvas");
let canvas = document.getElementById('canvas');

let keysPressed  = {};
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let bg = new createjs.Shape()
    bg.graphics.beginFill("#222222").drawRect(0,0,canvas.width, canvas.height);

   
function init(){
    philModel.x = canvas.width/2;
    philModel.y = canvas.height/2;

    gameStage.addChild(bg);
    gameStage.addChild(philModel);
    phil = new Player(25, 100, philModel)
    gameStage.update();

    createjs.Ticker.addEventListener("tick", () => phil.playerMovement());
    gameStage.addEventListener("stagemousemove", rotatePlayer);
    gameStage.addEventListener("click", createProjectile)
    createjs.Ticker.addEventListener("tick",update);
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);
}

function keysDown(event)
{
    keysPressed[event.keyCode] = true;
}
function keysUp(event)
{
    keysPressed[event.keyCode] = false;
}

function update(event){
    gameStage.update()
    updateBullets(event)
}

function rotatePlayer(event){
    phil.playerRotation(event)
}