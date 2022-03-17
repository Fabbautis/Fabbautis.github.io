let backgroundMusic = new Audio('Fill/zmbgroov.wav');


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

let background = new createjs.Bitmap("Fill/background.png");;
    background.crossOrigin = "Anonymous";

let gameBorder = new createjs.Bitmap("../border.png");
    gameBorder.crossOrigin = "Anonymous";
    

let pitcher = new createjs.Sprite(pitcherSheet, "start");
let testtube = new createjs.Sprite(testtubeSheet, "idle");
let professor = new createjs.Sprite(professorSheet, "hurray");

let offset;
let fillOffset = 300;


let isOverPitcher = false;
let dummyFlag = true;
let waitToWin = false;
let gameOver = false;
let lastTimer;
let TimePitcherStart = 0;
let timePassed= 0;
let timeInPitcher = 0;
let pitcherChangeTime = 1.5;




function fillStart() {
    stage.removeChild(backgroundMM);
    stage.removeChild(introTextBackdrop)
    stage.removeChild(introText);
    stage.removeChild(startButton);
    stage.removeChild(startButtonText);

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
    createjs.Ticker.addEventListener("tick", tick);
    
    
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
    createjs.Tween.removeTweens(stage.children);

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
    backgroundMusic.currentTime = 6.3;
    backgroundMusic.play();
    stage.update();
    
    
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
            TimePitcherStart = timePassed
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


function tick(event) {

    timePassed = Math.floor(createjs.Ticker.getTime()/1000)
    if (isOverPitcher){
        timeInPitcher += (timePassed - TimePitcherStart)/24;
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
        if (timeInPitcher >= pitcherChangeTime*6){
            if (!gameOver){
                winLose('lose'); 
            }
        }
    }        
    if (waitToWin) {
        lastTimer= timePassed;
        waitToWin = false;
    }
    
    if ((timePassed - lastTimer) > 3){
        if (!gameOver){
            winLose('win'); 
        }
    }
    stage.update(event);
}

function winLose (status){
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
        
    gameOver = true;
    stage.removeChild(testtube);
    createjs.Tween.get(professor, { loop: false }) 
        .to({x: 700 }, 400, createjs.Ease.linear)

    setTimeout(() => { returnHome(status) }, 2000);   
    
}

function returnHome(status){
    switch (status)
    {
        case 'win':
            console.log('good job');
        break;
        case 'lose':
            health.innerText = parseInt(health.innerText)-1;
        break;
    }
    stage.removeChild(background);
    stage.removeChild(testtube);
    stage.removeChild(pitcher);
    stage.removeChild(professor);
    stage.removeChild(gameBorder);
    createjs.Tween.removeTweens(professor);
    
    backgroundMusic.pause();
    stage.update();
    init();
}