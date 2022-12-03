let stage = new createjs.Stage("demoCanvas");
let huebirdSpriteSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["spritesheets.png"], 
    "frames": [[3,3,840,721,0,0,0],[3,3,840,721,0,0,0],[3,3,840,721,0,0,0],[843,3,840,721,0,0,0],[1683,3,840,721,0,0,0],[2523,3,840,721,0,0,0],[3363,3,840,721,0,0,0],[4203,3,840,721,0,0,0],[5043,3,840,721,0,0,0],[5883,3,840,721,0,0,0],[6723,3,840,721,0,0,0],[3,724,840,721,0,0,0],[843,724,840,721,0,0,0],[1683,724,840,721,0,0,0],[2523,724,840,721,0,0,0],[3363,724,840,721,0,0,0],[4203,724,840,721,0,0,0],[5043,724,840,721,0,0,0],[5883,724,840,721,0,0,0],[3,3,840,721,0,0,0],[3,3,840,721,0,0,0],[3,3,840,721,0,0,0],[6723,724,822,719,0,0,0],[6723,1443,822,719,0,0,0],[3,1445,822,719,0,0,0],[825,1445,822,719,0,0,0],[1647,1445,822,719,0,0,0],[2469,1445,822,719,0,0,0],[3291,1445,822,719,0,0,0],[4113,1445,822,719,0,0,0],[4935,1445,822,719,0,0,0],[5757,1445,822,719,0,0,0],[6579,2162,822,719,0,0,0],[3,2164,822,719,0,0,0],[825,2164,822,719,0,0,0],[1647,2164,822,719,0,0,0],[2469,2164,822,719,0,0,0],[3291,2164,822,719,0,0,0],[4113,2164,822,719,0,0,0],[4935,2164,822,719,0,0,0],[5757,2164,822,719,0,0,0],[6579,2881,822,719,0,0,0],[3,2883,822,719,0,0,0],[825,2883,822,719,0,0,0],[1647,2883,822,719,0,0,0],[2469,2883,822,719,0,0,0],[3291,2883,822,719,0,0,0],[4113,2883,822,719,0,0,0],[4935,2883,822,719,0,0,0],[5757,2883,822,719,0,0,0],[6579,3600,822,719,0,0,0],[3,3602,822,719,0,0,0],[825,3602,822,719,0,0,0],[1647,3602,822,719,0,0,0],[2469,3602,822,719,0,0,0],[3291,3602,822,719,0,0,0],[4113,3602,822,719,0,0,0],[4935,3602,822,719,0,0,0],[5757,3602,822,719,0,0,0],[6579,4319,822,719,0,0,0],[3,4321,822,719,0,0,0],[825,4321,822,719,0,0,0],[1647,4321,822,719,0,0,0],[2469,4321,822,719,0,0,0],[3291,4321,822,719,0,0,0],[4113,4321,822,719,0,0,0],[4935,4321,822,719,0,0,0],[5757,4321,822,719,0,0,0],[6579,5038,822,719,0,0,0],[6579,5038,822,719,0,0,0]],
    "animations": {
        "idle": [0,21],
        "rightPrepare": [22,30, "rightStop"],
        "rightStop":[30],
        "rightStep": [35,44, "leftPrepare"],
        "leftPrepare": [46,54, "leftStop"],
        "leftStop":[54],
        "leftStep": [59, 68, "rightPrepare"]
    }
});

let huebird = new createjs.Sprite(huebirdSpriteSheet, "idle");

let grass = new createjs.Shape();
grass.graphics.beginFill("#348C31").drawRect(0, 0, 1500, 1300);
/*/let line1 = new createjs.Shape();
line1.graphics.beginFill("#000000").drawRect(0, 300, 1500, 10);
let line2 = new createjs.Shape();
line2.graphics.beginFill("#000000").drawRect(500, 0, 10, 1500);/*/

let introText = new createjs.Text("Press W", "50px Times New Roman");

let allFlowers = [];
for (let i = 0; i < 150; i++){
    allFlowers.push(new createjs.Shape());
    allFlowers[i].globalX = Math.random()*1500;
    allFlowers[i].globalY = Math.random()*1300;
    allFlowers[i].graphics.beginFill("#FFA500").drawCircle(allFlowers[i].globalX, allFlowers[i].globalY, 20);
    //allFlowers[i].graphics.beginFill("#FFFFFF").drawCircle(allFlowers[i].globalX, allFlowers[i].globalY, 10);
}


let keysPressed = {};
let firstMove = true;

function init() {

    huebird.x = 300;
    huebird.y = 400;

    introText.x = 750;
    introText.y = 100;

    createjs.Ticker.addEventListener("tick", buttonPress);
    createjs.Ticker.addEventListener("tick", stageUpdate);
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    stage.addChild(grass);
    //stage.addChild(line1,line2)
    for (let i = 0; i < allFlowers.length; i++){
        stage.addChild(allFlowers[i]);
    }
    stage.addChild(huebird);
    stage.addChild(introText);
    stage.update();
}

function stageUpdate(e){
    stage.update(e);
}


function keysDown(event)
{
    keysPressed[event.keyCode] = true;
}
function keysUp(event)
{
    keysPressed[event.keyCode] = false;
}

function buttonPress(e){
    if (keysPressed['87']){
        if (huebird.currentAnimation == "idle")
        {
            huebird.gotoAndPlay("rightPrepare");
            tweenFlowers();
        }
           
        if (huebird.currentAnimation == "rightStop")
        {
            huebird.gotoAndPlay("rightStep");
            tweenFlowers();
        }
        if (huebird.currentAnimation == "leftStop")
        {
            huebird.gotoAndPlay("leftStep");
            tweenFlowers();
        }      
    }
}

function tweenFlowers() {
    for (let i = 0; i < allFlowers.length; i++){
        if (firstMove){
            createjs.Tween.get(allFlowers[i]).to({x:allFlowers[i].x - 40, y:allFlowers[i].y -60},250)
            allFlowers[i].globalX -= 40;
            allFlowers[i].globalY -= 60; 
            stage.removeChild(introText);
        } else{
            allFlowers[i].x-=20;
            allFlowers[i].y-=40;
            createjs.Tween.get(allFlowers[i]).wait(350).to({x:allFlowers[i].x - 40, y:allFlowers[i].y -60},250);
            allFlowers[i].globalX -= 60;
            allFlowers[i].globalY -= 100; 
        }     
        console.log(allFlowers[i].globalX, allFlowers[i].globalY);
    }
    firstMove = false;
    relocation();
}

function relocation(){ //this code doesnt work. Basically its supposed to move the flower to the bottom right edge of the screen when it crosses y=0 / x=0
    for (let i = 0; i <allFlowers.length; i++){
        if (allFlowers[i].globalX < 0){
            allFlowers[i].globalX = 1500;
            createjs.Tween.get(allFlowers[i], {override: true})
            .to({x:1500},0);
        }
        if (allFlowers[i].globalY < 0){
            allFlowers[i].globalY = 1300
            createjs.Tween.get(allFlowers[i], {override: true})
            .to({y:1300},0);

        }
    }
}