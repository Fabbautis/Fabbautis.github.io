let handSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Strum/rightHand.png"],
    "frames": [[3,3,1185,1495,0,280.4,187.6],[3,1498,1185,1495,0,280.4,187.6],[1188,3,1185,1495,0,280.4,187.6],[2373,3,1185,1495,0,280.4,187.6],[2373,3,1185,1495,0,280.4,187.6],[1188,1498,1185,1495,0,280.4,187.6],[1188,1498,1185,1495,0,280.4,187.6],[3,3,1185,1495,0,280.4,187.6]],
    "animations": {
        "idle": 3, 
        "up": [4,7, "down", 1 + .15*difficulty],
        "down": [0,2,"idle", 1+ .15*difficulty],
    }
});

let stringSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Strum/string.png"],
    "frames": [[3,3,1482,729,0,20.95,706.3],[1485,3,1482,729,0,20.95,706.3],[2967,3,1482,729,0,20.95,706.3],[4449,3,1482,729,0,20.95,706.3],[5931,3,1482,729,0,20.95,706.3],[3,732,1482,729,0,20.95,706.3],[1485,732,1482,729,0,20.95,706.3],[2967,732,1482,729,0,20.95,706.3],[4449,732,1482,729,0,20.95,706.3],[5931,732,1482,729,0,20.95,706.3],[3,1461,1482,729,0,20.95,706.3],[3,1461,1482,729,0,20.95,706.3],[1485,1461,1482,729,0,20.95,706.3],[1485,1461,1482,729,0,20.95,706.3],[2967,1461,1482,729,0,20.95,706.3],[2967,1461,1482,729,0,20.95,706.3],[2967,1461,1482,729,0,20.95,706.3],[4449,1461,1482,729,0,20.95,706.3],[4449,1461,1482,729,0,20.95,706.3],[5931,1461,1482,729,0,20.95,706.3],[3,2190,1482,729,0,20.95,706.3],[1485,2190,1482,729,0,20.95,706.3],[2967,2190,1482,729,0,20.95,706.3],[2967,2190,1482,729,0,20.95,706.3],[4449,2190,1482,729,0,20.95,706.3],[4449,2190,1482,729,0,20.95,706.3],[5931,2190,1482,729,0,20.95,706.3],[3,2919,1482,729,0,20.95,706.3],[3,2919,1482,729,0,20.95,706.3],[1485,2919,1482,729,0,20.95,706.3],[1485,2919,1482,729,0,20.95,706.3],[1485,2919,1482,729,0,20.95,706.3],[2967,2919,1482,729,0,20.95,706.3],[2967,2919,1482,729,0,20.95,706.3],[2967,2919,1482,729,0,20.95,706.3],[4449,2919,1482,729,0,20.95,706.3],[4449,2919,1482,729,0,20.95,706.3],[4449,2919,1482,729,0,20.95,706.3],[4449,2919,1482,729,0,20.95,706.3]],
    "animations": {
        "idle": 0, 
        "play": [1,6, "idle", 1 + .15*difficulty],
        "break": [7,38, 'breakidle', 1 + .15*difficulty],
        'breakidle': 38,
    }
});

let circleString = new createjs.Shape();
let numberString = new createjs.Text("", "80px Arial", "#CD7F64")
let body = new createjs.Bitmap("Strum/body.png");
let guitar = new createjs.Bitmap("Strum/guitar.png");
let hand = new createjs.Sprite(handSheet, "idle");

let allStrings = [];

let canStrum;
let stringToPress;
let strumsLeft;

function strumStart() {
    background.image.src = minigameObjects[2].background;
    gameOver = false;
    canStrum = true;
    strumsLeft = 4 + difficulty;
    
    //background location / scaling
    background.x = 0;
    background.y = 0;
    background.scaleX = 0.8;
    background.scaleY = 0.8;

    //body stuff
    body.scaleX = 0.55;
    body.scaleY = 0.6;
    body.x = -250;
    body.y = -420;

    //guitar
    guitar.scaleX = 0.55;
    guitar.scaleY = 0.55;
    guitar.x = 0;
    guitar.y = -375;
    guitar.rotation = 0;
    
    //strumming hand
    hand.x = -100; 
    hand.y = -150;
    hand.scaleX = 0.7;
    hand.scaleY = 0.7;

    //string placement
    for (let i = 0; i< 4; i++) {
        allStrings.push(new createjs.Sprite(stringSheet, "idle"))
        allStrings[i].scaleX = 1;
        allStrings[i].scaleY = 1;
        allStrings[i].rotation = 0 - 0.5*i;
        allStrings[i].x = 310 + 10*i;
        allStrings[i].y = 510 + 35*i;
        allStrings[i].addEventListener('click', stringClick(i));
    }
    
    circleString.graphics.setStrokeStyle(12,"round").beginStroke("#651531");
    circleString.graphics.beginFill("#4A1524").drawCircle(1100,550, 100);
    
    numberString.x = circleString.graphics.command.x -(circleString.graphics.command.radius/4);
    numberString.y = circleString.graphics.command.y -(circleString.graphics.command.radius/3);

    
    changeStringNumber(true);
    stage.addChild(background);
    stage.addChild(body);
    stage.addChild(guitar);
    
    for (let i = 0; i < 4; i++)
        stage.addChild(allStrings[i])
    
    stage.addChild(hand);
    stage.addChild(circleString);
    stage.addChild(numberString);
    stage.addChild(gameBorder);

    playMusic();
    
    stage.update();   
    
    createjs.Ticker.addEventListener('tick', strumTick);
}

function strumTick(event){
    stage.update(event);
}

function stringClick(stringClicked){
    return function (){
        if (canStrum) {
            hand.gotoAndPlay("up");
            let guitarInitialRotate = guitar.rotation
            createjs.Tween.get(guitar)
                .to({rotation: guitarInitialRotate - 0.6}, 50-7*difficulty, createjs.Ease.quadIn())
                .to({rotation: guitarInitialRotate}, 100, createjs.Ease.quadOut())
            if (stringClicked == stringToPress-1){
                strumsLeft--;
                allStrings[stringClicked].gotoAndPlay("play");
                changeStringNumber(true);
            } else {
                allStrings[stringClicked].gotoAndPlay('break');
                canStrum = false;
                changeStringNumber(false);
            }
            console.log(strumsLeft);
        }
    }
}

function changeStringNumber(status){
    if (status == true){
        switch (strumsLeft){
            case 6:
                circleString.graphics.setStrokeStyle(12,"round").beginStroke("#430725");
                circleString.graphics.beginFill("#260515").drawCircle(1100,550, 100);  
                break;
            case 5:
                circleString.graphics.setStrokeStyle(12,"round").beginStroke("#550E2C");
                circleString.graphics.beginFill("#3B0C1E").drawCircle(1100,550, 100);  
                break;
            case 4:
                circleString.graphics.setStrokeStyle(12,"round").beginStroke("#651531");
                circleString.graphics.beginFill("#4A1524").drawCircle(1100,550, 100);  
                break;
            case 3:
                circleString.graphics.setStrokeStyle(12,"round").beginStroke("#7D1E3F");
                circleString.graphics.beginFill("#5D1B2E").drawCircle(1100,550, 100);  
                break;
            case 2:
                circleString.graphics.setStrokeStyle(12,"round").beginStroke("#96294F");
                circleString.graphics.beginFill("#702339").drawCircle(1100,550, 100);  
                break;
            case 1:
                circleString.graphics.setStrokeStyle(12,"round").beginStroke("#A73E59");
                circleString.graphics.beginFill("#873244").drawCircle(1100,550, 100); 
                break;
            default:
                stage.removeChild(numberString);
                stage.removeChild(circleString);
                canStrum = false;
                winLoseSFX('win');
                setTimeout(function () {
                    allStrings.length = 0;
                    createjs.Ticker.removeEventListener('tick', strumTick);
                    returnHome('win');
                }, 1500)
        }
    
    stringToPress = Math.floor(Math.random()*allStrings.length) + 1;
    numberString.text = stringToPress;
    }

    if (status == false){
        stage.removeChild(numberString);
        stage.removeChild(circleString);
        winLoseSFX('lose');
        setTimeout(function () {
            allStrings.length = 0;
            createjs.Ticker.removeEventListener('tick', strumTick);
            returnHome('lose');
        }, 1500)
    }
    stage.update()
}