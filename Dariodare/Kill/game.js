let playerSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Kill/player.png"],
    "frames": [[3,3,238,280,0,75.35,184.6],[241,3,238,280,0,75.35,184.6],[479,3,238,280,0,75.35,184.6],[717,3,238,280,0,75.35,184.6],[3,283,238,280,0,75.35,184.6],[241,283,238,280,0,75.35,184.6],[479,283,238,280,0,75.35,184.6],[3,3,238,280,0,75.35,184.6]],
    "animations": {
        "idle": 0, 
        "attack": [1,6, "idle", 0.75],
    }
});

let dragonSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Kill/dragon.png"],
    "frames": [[3,3,1092,576,0,-363.7,8.7],[1095,3,1092,576,0,-363.7,8.7],[2187,3,1092,576,0,-363.7,8.7],[3,579,1092,576,0,-363.7,8.7],[1095,579,1092,576,0,-363.7,8.7],[2187,579,1092,576,0,-363.7,8.7],[3,1155,1092,576,0,-363.7,8.7],[3,1731,1092,576,0,-363.7,8.7],[3,2307,1092,576,0,-363.7,8.7],[3,2883,1092,576,0,-363.7,8.7],[3,3459,1092,576,0,-363.7,8.7],[1095,1155,1092,576,0,-363.7,8.7],[2187,1155,1092,576,0,-363.7,8.7],[1095,1731,1092,576,0,-363.7,8.7],[2187,1731,1092,576,0,-363.7,8.7],[1095,2307,1092,576,0,-363.7,8.7],[1095,2883,1092,576,0,-363.7,8.7],[1095,3459,1092,576,0,-363.7,8.7],[2187,2307,1092,576,0,-363.7,8.7],[1095,3,1092,576,0,-363.7,8.7]],
    "animations": {
        "idle": 0, 
        "walkcycle": [1,19, "walkcycle", 0.8],
    }
});

let player = new createjs.Sprite(playerSheet, "idle");
let dragon = new createjs.Sprite(dragonSheet, "idle");


function killStart() {
    background.image.src = minigameObjects[1].background;

    gameOver = false;
    isOverPitcher = false;
    dummyFlag = true;
    waitToWin = false;
    lastTimer = undefined;
    TimePitcherStart = 0;
    timePassed= 0;
    timeInPitcher = 0;
    pitcherChangeTime = 1.5;
    createjs.Ticker.reset();
    createjs.Ticker.addEventListener("tick", killTick);
    
    
    //background location / scaling
    background.x = -50;
    background.y = 0;
    background.scaleX = 0.8;
    background.scaleY = 0.8;
    


    //randomize a dragon location
    dragon.x = Math.floor(Math.random()*380) + 400;
    dragon.y = Math.floor(Math.random()*640);
    dragon.scaleX = 0.6;
    dragon.scaleY = 0.6;

    //player placement
    player.x = 100;
    player.y = 100;
    player.scaleX = 0.45;
    player.scaleY = 0.45;
    player.rotation = 100;    
    player.direction = 0;

    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);
    stage.addEventListener("stagemousemove", rotationStuff);
    stage.addEventListener('mousedown', attackFunction);

    stage.addChild(background);
    stage.addChild(player);
    stage.addChild(dragon);
    stage.addChild(gameBorder);
    backgroundMusic.currentTime = 6.3;
    backgroundMusic.play();
    stage.update();
}


function directionalMovement(event) {
    //I would make this a switch but then that means only one direction is possible at a time

    if (keysPressed['87']||keysPressed['38'])
        player.y -= playerSpeed;
    else 
        player.y -= 0;

    if (keysPressed['83'] ||keysPressed['40'])
        player.y += playerSpeed;
    else 
        player.y += 0;

    if (keysPressed['65'] ||keysPressed['37'])
        player.x -= playerSpeed;
    else 
        player.x -= 0;

    if (keysPressed['68'] ||keysPressed['39'])
        player.x += playerSpeed;
    else 
        player.x += 0;

}

function attackFunction(event){
    player.gotoAndPlay("attack");
}

function rotationStuff(event){
    //rotation
    let dx = event.stageX - player.x;  
	let dy = event.stageY - player.y;
	player.direction = Math.atan2(dy, dx);

}

function killTick (event) {
    directionalMovement();
    player.rotation = (player.direction * 180 / Math.PI) +67.5;

    stage.update(event);

    //temporary endgame code
    if (Math.floor(createjs.Ticker.getTime()/1000) >= 6){
        stage.removeChild(background);
        stage.removeChild(player);
        stage.removeChild(dragon);
        stage.removeChild(gameBorder);
        
        backgroundMusic.pause();
        stage.update();
        init();
    }
    
}