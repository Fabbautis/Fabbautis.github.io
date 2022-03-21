let pitcherSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Fill/Pitcher.png"],
    "frames": [[3,3,956,783,0,183.2,209.75],[3,786,956,783,0,183.2,209.75],[3,1569,956,783,0,183.2,209.75],[3,2352,956,783,0,183.2,209.75],[3,3135,956,783,0,183.2,209.75],[959,3,956,783,0,183.2,209.75],[959,3,956,783,0,183.2,209.75],[959,786,956,783,0,183.2,209.75],[959,786,956,783,0,183.2,209.75],[959,1569,956,783,0,183.2,209.75],[959,1569,956,783,0,183.2,209.75],[959,2352,956,783,0,183.2,209.75]],
    "animations": {
        "start": 0, 
        "25%": 1,
        "50%": 2,
        "75%": 3,
        "100%": 4,
        "hurray": [5,10, "100%", 1.0],
        "lose": 11,
    }
});

let testtubeSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Fill/testtubbe.png"],
    "frames": [[3,3,525,585,0,0,42.4],[3,588,525,585,0,0,42.4],[3,588,525,585,0,0,42.4],[3,1173,525,585,0,0,42.4],[3,1173,525,585,0,0,42.4],[528,3,525,585,0,0,42.4],[528,3,525,585,0,0,42.4]],
    "animations": {
        "idle": 0, 
        "filling": [1,3, "filling", 0.8],
    }
});

let professorSheet = new createjs.SpriteSheet ({
    framerate: 24,
    "images": ["Fill/professor.png"],
    "frames": [[3,3,913,1276,0,0,0],[916,3,913,1276,0,0,0]],
    "animations": {
        "hurray": 0,
        "lose": 1,
    }
}) 

let pitcher = new createjs.Sprite(pitcherSheet, "start");
let testtube = new createjs.Sprite(testtubeSheet, "idle");
let professor = new createjs.Sprite(professorSheet, "hurray");

let offset;
let fillOffset = 300;


let isOverPitcher = false; //is the testtube over the pitcher? Used to give timeInPitcherStart a value until the testtube isnt over the pitcher
let dummyFlag = true;   //Something dumb.
let waitToWin = false;  //Flag that activates when players get a desired amount to fill. Used to test some end game stuff
let waitForGameToEndTimer;  //number variable thats used to see if x seconds have passed for player to win
let timeInPitcherStart = 0; //The starting time in milliseconds when the player first put the testtube over the pitcher without dropping it
let timeInPitcher = 0;  //How long has the testtube been over the pitcher in total
let pitcherChangeTime = 1.5;   //Value used to change how fast the pitcher changes animations


let stupidTween;




function fillStart() {
    background.image.src = minigameObjects[0].background; 

    gameOver = false;
    isOverPitcher = false;
    dummyFlag = true;
    waitToWin = false;
    waitForGameToEnd = undefined;
    timeInPitcherStart = 0;
    timeInPitcher = 0;
    pitcherChangeTime = 1.5;
   
    //background location / scaling
    background.x = -50;
    background.y = 0;
    background.scaleX = 0.8;
    background.scaleY = 0.8;
      
    

    //professor yay / boo thingy.
    professor.x = 1600;
    professor.y = 50;
    professor.scaleX = 0.7;
    professor.scaleY = 0.7;
    professor.gotoAndStop("hurray");
    stupidTween = createjs.Tween.get(professor, {paused: true}, true) 
        .to({x: professor.x - 900 }, 400, createjs.Ease.linear)

    //pitcher filling up thing
    pitcher.x = 700;
    pitcher.y = 350;
    pitcher.scaleX = 0.8;
    pitcher.scaleY = 0.8;//BTW this creates a new property for pitcher to use
    pitcher.hitboxX = [pitcher.x, pitcher.x + (525 *0.8)];
    pitcher.hitboxY = [pitcher.y, pitcher.y +(585*0.8)];
    pitcher.gotoAndStop("start");

    //randomize a testtube location
    testtube.x = Math.floor(Math.random()*380);
    testtube.y = Math.floor(Math.random()*640);
    testtube.scaleX = 0.6;
    testtube.scaleY = 0.6;
    
    stage.addChild(background);
    stage.addChild(testtube);
    stage.addChild(pitcher);
    stage.addChild(professor);
    stage.addChild(gameBorder);
    playMusic();
    stage.update();

    createjs.Ticker.addEventListener("tick", fillTick);
}

testtube.on('mousedown', function (event){
    if (!gameOver){
        this.parent.addChild(this);
        this.offset = {x: this.x - event.stageX, y: this.y - event.stageY};
        testtube.gotoAndPlay("filling");
    }
});

testtube.on('pressmove',function (event) {
    this.x = event.stageX + this.offset.x;

    if (this.x < -15)
        this.x = -15;

    else if (this.x > 1350)
        this.x = 1350;


    this.y = event.stageY + this.offset.y;

    if (this.y > 640)
        this.y = 640;

   else if (this.y < -60)
       this.y = -60;

    if (testtube.x > pitcher.hitboxX[0] -fillOffset && testtube.x < pitcher.hitboxX[1]-fillOffset){
        if (!isOverPitcher){
            timeInPitcherStart = globalTimer;
        }
        isOverPitcher = true;
        
    }
    else {
        isOverPitcher = false; 
    }
});

testtube.on ('pressup', function (event){
    testtube.gotoAndStop("idle");
    isOverPitcher = false;
});

function fillTick(event) {
    timeInMinigame = globalTimer - timeStarted;
    console.log(timeInMinigame);
    
    if (isOverPitcher){
        timeInPitcher += (globalTimer - timeInPitcherStart)/24;
        if (timeInPitcher >= pitcherChangeTime && timeInPitcher < pitcherChangeTime*2){
            pitcher.gotoAndStop("25%");
        }
        if (timeInPitcher >= pitcherChangeTime*2 && timeInPitcher < pitcherChangeTime*3){
            pitcher.gotoAndStop("50%");
        }
        if (timeInPitcher >= pitcherChangeTime*3 && timeInPitcher < pitcherChangeTime*4){
            pitcher.gotoAndStop("75%");
        }
        if (timeInPitcher >= pitcherChangeTime*4 && timeInPitcher < pitcherChangeTime*5){
            if (!gameOver){
                pitcher.gotoAndStop("100%");
                if (dummyFlag) {
                    waitToWin = true;
                    dummyFlag = false;
                }
            }
        }        
        if (timeInPitcher >= pitcherChangeTime*5.5){
            if (!gameOver){
                fillWinLose('lose'); 
            }
        }
    }        
    if (waitToWin) {
        waitForGameToEnd= globalTimer;
        waitToWin = false;
    }
    
    if ((globalTimer - waitForGameToEnd) > 3){
        if (!gameOver){
            fillWinLose('win'); 
        }
    }
    stage.update();
}

function fillWinLose (status){
    switch (status)
    {
        case 'win':
            pitcher.gotoAndPlay('hurray');
            professor.gotoAndStop("hurray");
            
        break;
        case 'lose':
            pitcher.gotoAndStop("lose");
            professor.gotoAndStop("lose");
        break;
    }
    
    winLoseSFX(status);
    backgroundMusic.volume = 0.6;
    gameOver = true;
    stage.removeChild(testtube);    
    stupidTween.paused = false;
    
    
    setTimeout(() => { returnHome(status); createjs.Ticker.addEventListener("tick", fillTick); }, 2000);  
    
    
}