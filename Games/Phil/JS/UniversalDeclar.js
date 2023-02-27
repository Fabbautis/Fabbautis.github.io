//Make the canvas the full screen of the HTML block (which for this instance, is the size of the entire window)
let gameStage = new createjs.Stage("canvas");
let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let keysPressed  = {}; //see keys up / down function

let bg = new createjs.Shape()
    bg.graphics.beginFill("#222222").drawRect(0,0,canvas.width, canvas.height);
    bg.aName = 'background'


let environmentWalls = [];//Dynamically create a border wall around the playspace
let wallThickness = 100;//Set a univeral wall thickness.
//this will also help set up a invisible rectangle thatll prevent the player / bullets from walking offscreen (see walkspace declaration)
for (let i = 0; i < 4; i++){
    environmentWalls.push(new createjs.Shape()) //each of the four walls are set up dynamically, only using 0, canvas width, and height
    switch (i) {
        case 0://x,y,width,height
            environmentWalls[i].graphics.beginFill("#DDDDDD").drawRect(0,0, canvas.width, wallThickness);
        break;
        case 1:
            environmentWalls[i].graphics.beginFill("#DDDDDD").drawRect(canvas.width-wallThickness,0, wallThickness, canvas.height);
        break;
        case 2:
            environmentWalls[i].graphics.beginFill("#DDDDDD").drawRect(0,canvas.height-wallThickness, canvas.width, wallThickness);
        break;
        case 3:
            environmentWalls[i].graphics.beginFill("#DDDDDD").drawRect(0,0, wallThickness, canvas.height);
        break;
        default:
            environmentWalls[i].graphics.beginFill("#AAAAAA").drawRect((canvas.width/2)-50, (canvas.height/2)-50, wallThickness,wallThickness);
    }
    environmentWalls[i].aName = 'environment wall '+i
}

let walkspace = new createjs.Rectangle(wallThickness, wallThickness, canvas.width-wallThickness, canvas.height-wallThickness);
    walkspace.aName = 'walkspace';

let testCollide = new createjs.Shape()
    testCollide.graphics.beginFill("#888888").drawRect(0,0,30,80);
    testCollide.x = 500;
    testCollide.y = 500;
    testCollide.isEnemy = true;
    testCollide.aName = 'test';

   
function init(){
    philModel.x = canvas.width/2;
    philModel.y = canvas.height/2;

    gameStage.addChild(bg);

    for (let i = 0; i < environmentWalls.length; i++){
        gameStage.addChild(environmentWalls[i])
    }
    gameStage.addChild(testCollide);
    gameStage.addChild(philModel);

    phil = new Player(25, 100, philModel);
    toolEquipped = new Tool("torch");
    gameStage.update();

    createjs.Ticker.addEventListener("tick", () => phil.playerMovement());
    gameStage.addEventListener("stagemousemove", rotatePlayer);
    gameStage.addEventListener("click", shoot)
    createjs.Ticker.addEventListener("tick",update);
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keypress", toolEquipped.swapTool);
    window.addEventListener("keyup", keysUp);
}

function keysDown(event)//when a key is pressed, mark its keycode and set it as true or false.
//Then somewhere else in the code I can just check this array to see if the keycode is true or false for input.
{
    keysPressed[event.keyCode] = true;
}
function keysUp(event)
{
    keysPressed[event.keyCode] = false;
}

function update(event){
    gameStage.update()
    toolEquipped.updateBullets();
    phil.playerCollision();
}

function rotatePlayer(event){
    phil.playerRotation(event)
}
function shoot(event){
    toolEquipped.createProjectile(toolEquipped.model, event)
}

