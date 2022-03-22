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
    "frames": [[3,3,1092,576,0,573.65,280],[1095,3,1092,576,0,573.65,280],[2187,3,1092,576,0,573.65,280],[3,579,1092,576,0,573.65,280],[1095,579,1092,576,0,573.65,280],[2187,579,1092,576,0,573.65,280],[3,1155,1092,576,0,573.65,280],[3,1731,1092,576,0,573.65,280],[3,2307,1092,576,0,573.65,280],[3,2883,1092,576,0,573.65,280],[3,3459,1092,576,0,573.65,280],[1095,1155,1092,576,0,573.65,280],[2187,1155,1092,576,0,573.65,280],[1095,1731,1092,576,0,573.65,280],[2187,1731,1092,576,0,573.65,280],[1095,2307,1092,576,0,573.65,280],[1095,2883,1092,576,0,573.65,280],[1095,3459,1092,576,0,573.65,280],[2187,2307,1092,576,0,573.65,280],[2187,2883,1092,576,0,573.65,280]],
    "animations": {
        "idle": 0, 
        "walkcycle": [1,19, "walkcycle", 0.8],
    }
});

let player = new createjs.Sprite(playerSheet, "idle");
player.name = 'player'
let playerTween;
let playerHP = 10;
let playerSpeed = 20;

let dragon = new createjs.Sprite(dragonSheet, "walkcycle");
dragon.name = 'dragon'
let dragonTween;
let dragonDirection ='';
let dragonSpeed = 15;
let dragonStepsNumber = 20;
let dragonSteps = dragonStepsNumber;
let dragonDirectionArray = [
    'left',
    'right',
    'up',
    'down'
];

function killStart() {
    background.image.src = minigameObjects[1].background;
    gameOver = false;
    
    //background location / scaling
    background.x = -50;
    background.y = 0;
    background.scaleX = 0.8;
    background.scaleY = 0.8;
    


    //randomize a dragon location
    dragon.x = Math.floor(Math.random()*450) + 600; 
    dragon.y = Math.floor(Math.random()*385) + 200;
    dragon.scaleX = 0.6;
    dragon.scaleY = 0.6;
    dragon.alpha = 1;
    dragonTween = createjs.Tween.get(dragon, {paused:true}) 
        .set({scaleX:0.6, scaleY: 0.6, alpha:1})
        .to({scaleX:0.4, scaleY: 0.4}, 600, createjs.Ease.quadOut)
        .wait(50)
        .to({scaleX:1, scaleY: 1, alpha:0}, 1200, createjs.Ease.cubicIn)
    dragon.gotoAndPlay('walkcycle');
    
    //player placement
    player.x = 100;
    player.y = Math.floor(Math.random()*600) + 100;
    player.scaleX = 0.45;
    player.scaleY = 0.45;
    player.rotation = 100;    
    player.direction = 0;
    player.alpha = 1;
    playerTween = createjs.Tween.get(player, {paused:true}) 
                    .to({rotation:720, scaleX: 0.55, scaleY: 0.55}, 1000, createjs.Ease.cubicInOut)
                    .wait(400)
                    .to({rotation:-1080, scaleX:0.05, scaleY: 0.05}, 600, createjs.Ease.cubicIn)
                    .set({alpha:0})   

    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);
    stage.addEventListener("stagemousemove", rotationStuff);
    stage.addEventListener('mousedown', () => {if (!gameOver){player.gotoAndPlay("attack")}});

    stage.addChild(background);
    stage.addChild(player);
    stage.addChild(dragon);
    stage.addChild(gameBorder);
    playMusic();
    stage.update();   

    createjs.Ticker.addEventListener("tick", killTick);
    createjs.Ticker.addEventListener("tick", checkCollision);
    createjs.Ticker.addEventListener("tick", dragonMovement);
}

function dragonMovement (){
    if (!gameOver){
        let rect = new createjs.Rectangle(600, 200, 1050, 585);
        switch (dragonDirection) { //edge detection. Change direction of dragon so it doesnt walk out of bounds
            case 'left':
                dragon.x-=dragonSpeed;

                if (dragon.x < rect.x)
                   changeDragonDirection(dragonDirection, true);
                break;
            case 'right':
                dragon.x+=dragonSpeed;

                if (dragon.x > rect.width)
                    changeDragonDirection(dragonDirection, true);
                break;
            case 'up':
                dragon.y -=dragonSpeed

                if (dragon.y < rect.y)
                    changeDragonDirection(dragonDirection, true);
                break;
            case 'down':
                dragon.y +=dragonSpeed;

                if (dragon.y > rect.height)
                    changeDragonDirection(dragonDirection, true);
                break;
            default:
                dragon.x+=dragonSpeed;
                dragon.rotation = 180;
        }
        if (dragonSteps <=0){ //change direction after a certain number of steps
            changeDragonDirection('', false)
        }
        dragonSteps--;
        }
}

function changeDragonDirection (oldDirection, edge) {
    if (edge == false){
        dragonDirection = dragonDirectionArray[Math.floor(Math.random()*dragonDirectionArray.length)]
    } else {
        let newDragonDirectionArray = dragonDirectionArray.filter(word => word != oldDirection)
        dragonDirection = newDragonDirectionArray[Math.floor(Math.random()*dragonDirectionArray.length)]
    }
    switch (dragonDirection){
        case 'left':
            dragon.rotation = 0;
        break;
        case 'right':
            dragon.rotation = 180;
        break;
        case 'up':
            dragon.rotation = 90;
        break;
        case 'down':
            dragon.rotation = 270;
        break;
    } 
    dragonSteps = dragonStepsNumber;
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

function rotationStuff(event){
    //rotation
    let dx = event.stageX - player.x;  
	let dy = event.stageY - player.y;
	player.direction = Math.atan2(dy, dx);

}

function killTick (event) {
    timeInMinigame = globalTimer - timeStarted;
    console.log(timeInMinigame);
    if (!gameOver){ //Basically if the game isn't over, then dont move or rotate the player
        console.log('kill minigame isn\'t over');
        directionalMovement();
        player.rotation = (player.direction * 180 / Math.PI) +67.5;
    }

    stage.update(event);

    //timer if you run out of time
    if (!gameOver){
        if ((timeInMinigame) >= 6){
            killWinLose('lose', false)
        }
    }
    
}

function checkCollision() {
    let leftX = player.x - player.regX + 5;
    let leftY = player.y - player.regY + 5;
    let playerPoints = [
        new createjs.Point(leftX, leftY),
        new createjs.Point(leftX + player.hitArea - 10, leftY),
        new createjs.Point(leftX, leftY + player.hitArea - 10),
        new createjs.Point(leftX + player.hitArea - 10, leftY + player.hitArea - 10)
    ];

    for (let i = 0; i < playerPoints.length; i++) {
        let objects = stage.getObjectsUnderPoint(playerPoints[i].x, playerPoints[i].y);
        if (objects.filter((object) => object.name == "dragon").length > 0) {
            if (!gameOver){
                if (player.currentAnimation != 'attack'){
                    playerHP --;
                    if (playerHP <= 0){
                        killWinLose('lose', true);
                    }
                }
                else {
                    killWinLose('win', true);
                }
            }        
        return;
        }
    }
}

function killWinLose(status, runAnimation){
    stage.removeEventListener("stagemousemove", rotationStuff);
    stage.removeEventListener('mousedown', () => {if (!gameOver){player.gotoAndPlay("attack")}});
    
    createjs.Ticker.removeEventListener("tick", checkCollision);
    createjs.Ticker.removeEventListener("tick", dragonMovement);
    gameOver = true;
    if (status == 'lose' && runAnimation == true)
    {
        stage.removeChild(dragon);
        stage.removeChild(background);

        let deathBackground = new createjs.Shape();
        deathBackground.graphics.beginFill('#000000').drawRect(0,0,1400,800)
        stage.addChildAt(deathBackground, 0);

        player.rotation = 0;
        playerTween.paused = false;

    }
    if (status == 'win' && runAnimation == true)
    {
        dragon.gotoAndPlay('idle');  
        dragonTween.paused = false;
    }
    if (runAnimation == false){ //Immediately go home because time ran out
        returnHome(status);
        createjs.Ticker.removeEventListener("tick", killTick);
        return;
    }
    backgroundMusic.volume = 0.6;

    setTimeout(()=> {winLoseSFX(status);}, 2000)
    setTimeout(() => {createjs.Ticker.removeEventListener("tick", killTick); returnHome(status);}, 2500);
}