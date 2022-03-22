let backgroundMM = new createjs.Bitmap("sus.png");//Change later
    backgroundMM.crossOrigin = "Anonymous";

let introText = new createjs.Text("Dario's Dare", "80px Arial", "#ff7700");
let introTextBackdrop = new createjs.Text("Dario's Dare", "80px Arial", "#000000");

let startButton = new createjs.Shape();
let startButtonText = new createjs.Text("Click to Start", "80px Arial", "#000000");

function init() {
    backgroundMM.scaleX = 2.25;
    backgroundMM.scaleY = 2.25;
    backgroundMM.x = 0;
    backgroundMM.y = 0;
    
    introText.x = 700
    introText.y = 200;
    introText.textAlign = 'center';

    introTextBackdrop.x = 702
    introTextBackdrop.y = 198;
    introTextBackdrop.textAlign = 'center';

    startButton.graphics.beginFill('#ffffff').drawRect(455, 600, 500, 100);
    startButtonText.x =700;
    startButtonText.y =615;
    startButtonText.textAlign = 'center';

    stage.addChild(backgroundMM);
    stage.addChild(introTextBackdrop)
    stage.addChild(introText);
    if (health.innerText != 0){
        stage.addChild(startButton);
        stage.addChild(startButtonText);
    }   
    stage.update();
}

startButton.on ('click', () =>{
    stage.removeChild(backgroundMM);
    stage.removeChild(introTextBackdrop)
    stage.removeChild(introText);
    stage.removeChild(startButton);
    stage.removeChild(startButtonText);
    
    let randomizer = minigameObjects[Math.floor(Math.random() * minigameObjects.length)]
    let chooseRandomGame = new Function(randomizer.function);
    timeStarted = globalTimer;
    //Will have to add some code later on that ensures duplicate microgames can't be played in a row (e.g. oldMicrogame = minigameObjects[gameYou'reIn].game. If oldMicrogame = newMicrogame, then shuffle again)
    chooseRandomGame();
});
