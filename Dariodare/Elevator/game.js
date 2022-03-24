let frameSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Elevator/frame.png"],
    "frames": [[3,3,699,862,0,-612.65,-149.55],[3,865,699,862,0,-612.65,-149.55],[702,3,699,862,0,-612.65,-149.55]],
    "animations": {
        "idle": 0, 
        "win": 1,
        "lose": 2,
    }
});

let torchSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Elevator/torch.png"],
    "frames": [[3,3,327,616,0,205,541.85],[3,619,327,616,0,205,541.85],[3,1235,327,616,0,205,541.85],[3,1235,327,616,0,205,541.85],[3,1851,327,616,0,205,541.85],[3,2467,327,616,0,205,541.85],[3,3083,327,616,0,205,541.85],[330,3,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1851,327,616,0,205,541.85],[330,2467,327,616,0,205,541.85],[330,3083,327,616,0,205,541.85],[3,1851,327,616,0,205,541.85],[3,1851,327,616,0,205,541.85],[3,3,327,616,0,205,541.85],[3,3,327,616,0,205,541.85],[3,3,327,616,0,205,541.85],[657,3,327,616,0,205,541.85],[657,619,327,616,0,205,541.85],[657,3,327,616,0,205,541.85],[657,1235,327,616,0,205,541.85],[657,1851,327,616,0,205,541.85],[657,2467,327,616,0,205,541.85],[657,3083,327,616,0,205,541.85],[984,3,327,616,0,205,541.85],[984,619,327,616,0,205,541.85],[984,1235,327,616,0,205,541.85],[984,1851,327,616,0,205,541.85],[984,2467,327,616,0,205,541.85],[984,3083,327,616,0,205,541.85],[1311,3,327,616,0,205,541.85],[1311,619,327,616,0,205,541.85],[1311,1235,327,616,0,205,541.85],[1311,1851,327,616,0,205,541.85],[3,3,327,616,0,205,541.85],[3,619,327,616,0,205,541.85],[3,1235,327,616,0,205,541.85],[3,1235,327,616,0,205,541.85],[3,1851,327,616,0,205,541.85],[3,2467,327,616,0,205,541.85],[3,3083,327,616,0,205,541.85],[330,3,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,1235,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85],[330,619,327,616,0,205,541.85]],
    "animations": {
        "idle": [0,1, "idle", 0.125], 
        "win": [2,35, "idle", 0.25],
        "lose": [36,37, "lose", 0.25],
        'losedie': [38,52, 'death', 0.75],
        'death': 52
    }
});

let frame = new createjs.Sprite(frameSheet, 'idle');

let torchesOnScreen = [];

for (let i = 0; i < 4; i++){
    torchesOnScreen.push(new createjs.Sprite(torchSheet, 'idle'));
    let thisTorch = torchesOnScreen[i];
    thisTorch.scaleX = 0.6; 
    thisTorch.scaleY = 0.6;
    if (i <= 1) {
        thisTorch.x = 150 + 175*i;
    }
    if (i >= 2) {
        thisTorch.rotation = 180;
        thisTorch.skewX = 180;
        thisTorch.x = 735 + 175*i
    }
    thisTorch.y = 500;
}

let removeOneOnly = true;
let backgroundElevator = new createjs.Container;
let score = new createjs.Text("", "80px Arial", "#000000");
let scoreTween; 

function elevatorStart(status) {
    let blueBG = new createjs.Shape();
    let tanBG = new createjs.Shape();
    let frameOffset = 50;

    blueBG.graphics.setStrokeStyle(18,"round").beginStroke("#0D0D2A");
    blueBG.graphics.beginFill("#2A2F50").drawRect(-10, -10, 1420, 400);

    tanBG.graphics.beginFill('#7D7755').drawRect(0,blueBG.graphics.command.h + blueBG.graphics.command.y, 1400, 450);
    
    frame.scaleX = 0.75;
    frame.scaleY = 0.75;
    frame.x = document.getElementById('demoCanvas').attributes.width.value/2 - frame.getBounds().width;
    frame.y = document.getElementById('demoCanvas').attributes.height.value/2 - frame.getBounds().height/2 + frameOffset;

    score.x = document.getElementById('demoCanvas').attributes.width.value/2;
    score.y = 50;
    
    if (gamesPassed < 0){
        score.text = 0;
    } else{
        scoreTween = createjs.Tween.get(score, {paused: true})
                        .set({font: '150px Arial', x: score.x - 20, y: score.y-30 })
                        .wait(500 - 1 * gamesPassed)
                        .set({text: gamesPassed + 1})
                        .wait(500 - 1 * gamesPassed)
                        .set({font: '80px Arial', x: score.x, y: score.y})
                        .wait(500 - 1 * gamesPassed)
    }

    
        

    backgroundElevator.addChild(tanBG, blueBG);
    stage.addChild(backgroundElevator);
    stage.addChild(frame);
    for(let i = 0; i < torchesOnScreen.length; i++){
        stage.addChild(torchesOnScreen[i]);
    }

    stage.addChild(score);
    createjs.Ticker.addEventListener('tick', elevatorTick);

    if (gamesPassed < 0){
        returnElevator();
    } else {
        returnElevator(status)
        console.log(status);
    }
    stage.update();

}

function elevatorTick (event) {
    stage.update(event)
}

function returnElevator(status) {
    setTimeout(() => {
        switch (status){
            case 'win':
                frame.gotoAndPlay('win')
                for(let i = 0; i < torchesOnScreen.length; i++){
                   torchesOnScreen[i].gotoAndPlay('win');
                   torchesOnScreen[i].on('animationend', () => {frame.gotoAndPlay('idle');})
                }
                break;
            case 'lose': 
                frame.gotoAndPlay('lose');
                for(let i = 0; i < torchesOnScreen.length; i++){
                    torchesOnScreen[i].gotoAndPlay('lose');
                    if (i = (torchesOnScreen.length-1)) //this means if the loop is on the last torch
                    { 
                        torchesOnScreen[i].gotoAndPlay('losedie');
                        torchesOnScreen[i].on('animationend', () =>
                        {
                            let removeTorch = createjs.Tween.get(torchesOnScreen[i])
                                .to({y:torchesOnScreen[i].y + 1000}, 1000 - 25*gamesPassed, createjs.Ease.quadInOut);
    
                            removeTorch.on('complete', () => {
                                if (removeOneOnly){
                                    stage.removeChild(torchesOnScreen[i]);
                                    torchesOnScreen.pop();
                                }
                            });
                        })    
                    }
                }
                break;                
        }
        setTimeout(startNewGame, 2000 - 5 * gamesPassed)
    }, 500 - 1 * gamesPassed)
}

function startNewGame () {
    if (torchesOnScreen.length != 0) {
        frame.gotoAndPlay('idle');
        for (let i = 0; i < torchesOnScreen.length; i++){
            torchesOnScreen[i].gotoAndPlay('idle');
        }
        if (gamesPassed >= 0)
        scoreTween.paused = false;

        setTimeout(() => {
            let randomizer = minigameObjects[Math.floor(Math.random() * minigameObjects.length)]
            let chooseRandomGame = new Function(randomizer.function);
            timeStarted = globalTimer;
            chooseRandomGame();
        }, 2500 - 10 * gamesPassed); //hopefully people don't play beyond 150. I should also make a function that just returns a value to subtract after x games
    } else { //game over. there should be no more torches on screen and frame is at sad pose
        score.text = 'Game Over'
    }
    
    
    
    
}