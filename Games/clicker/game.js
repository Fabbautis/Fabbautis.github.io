let stage;
let stageProperties;
let stageWidth;
let stageHeight;

let AEIOU = new createjs.Shape();
let circle = new createjs.Shape(); 
let text = new createjs.Text("Start Game", "20px Arial", "#ff7700");

let score;
let highscore;
let totalClicks = 0;
let startTime = 0;
let timePassed = 0;

let is_game_started = false;
createjs.Ticker.addEventListener("tick", tick);


function tick() {
    console.log(startTime);
    if (is_game_started)
        {
            timePassed = Math.floor(createjs.Ticker.getTime()/1000) - startTime;

            document.getElementById('timer').innerHTML = 30 - timePassed;
            if (document.getElementById('timer').innerHTML <= 0)
            {
                is_game_started = false;
                document.getElementById('timer').innerHTML = 30;
                if (Number(highscore.innerHTML[11]) <= totalClicks){
                    highscore.innerHTML = 'Highscore: ' + totalClicks;
                }
                totalClicks = 0;
                score.innerHTML = totalClicks;
                stage.removeChild(circle);
                stage.addChild(text);
                stage.addChild(AEIOU);
                
            }
        }
    stage.update();
    
}


function init() {
    stage =  new createjs.Stage("demoCanvas");
    score = document.getElementById('score');
    highscore = document.getElementById('highscore');
    stageProperties = document.getElementById('demoCanvas'); 

    stageWidth = stageProperties.attributes.width.value;
    stageHeight = stageProperties.attributes.height.value;    

    
    AEIOU.graphics.beginFill("#ff0000").drawRect(stageWidth/2-50, stageHeight/2, 200, 50);

    text.x = stageWidth / 2;
    text.y = stageHeight / 2 - 100;
    AEIOU.addEventListener("click", function(){
        startGame();
    })

    stage.addChild(AEIOU);
    stage.addChild(text);

    console.log(AEIOU);
    console.log(text);
    
    stage.update();
}

function handleClick(){
    totalClicks++;
    score.innerHTML = totalClicks;
    circle.x = Math.floor(Math.random() * stageWidth);
    circle.y = Math.floor(Math.random() * stageHeight);
    circle.graphics.command.radius = Math.floor(Math.random() * (100 - 25 + 1) + 25);
    stage.update();

}

function startGame(){
    circle.graphics.beginFill("red").drawCircle(0, 0, Math.floor(Math.random() * (100 - 25 + 1) + 25)); 
    circle.x = Math.floor(Math.random() * stageWidth);
    circle.y = Math.floor(Math.random() * stageHeight);
    circle.addEventListener("click", handleClick);
    stage.removeChild(AEIOU);
    stage.removeChild(text);
    stage.addChild(circle);
    is_game_started = true;
    startTime = Math.floor(createjs.Ticker.getTime()/1000);
    stage.update();
}