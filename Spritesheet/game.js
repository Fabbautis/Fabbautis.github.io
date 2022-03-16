let stage;
let stageProperties;
let stageWidth;
let stageHeight;

var img = new Image();
img.crossOrigin="Anonymous";
img.src = "Grubworm.png";

let grubwormSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": [img.src],
    "frames": [[3,3,850,893,0,-562.1,-21.05],[3,3,850,893,0,-562.1,-21.05],[3,3,850,893,0,-562.1,-21.05],[3,3,850,893,0,-562.1,-21.05],[3,3,850,893,0,-562.1,-21.05],[3,3,850,893,0,-562.1,-21.05],[3,896,850,893,0,-562.1,-21.05],[3,1789,850,893,0,-562.1,-21.05],[3,2682,850,893,0,-562.1,-21.05],[853,3,850,893,0,-562.1,-21.05],[1703,3,850,893,0,-562.1,-21.05],[1703,3,850,893,0,-562.1,-21.05],[2553,3,850,893,0,-562.1,-21.05],[2553,3,850,893,0,-562.1,-21.05],[853,896,850,893,0,-562.1,-21.05],[853,1789,850,893,0,-562.1,-21.05],[853,2682,850,893,0,-562.1,-21.05],[1703,896,850,893,0,-562.1,-21.05],[2553,896,850,893,0,-562.1,-21.05],[1703,1789,850,893,0,-562.1,-21.05],[1703,1789,850,893,0,-562.1,-21.05],[1703,1789,850,893,0,-562.1,-21.05],[1703,1789,850,893,0,-562.1,-21.05],[1703,1789,850,893,0,-562.1,-21.05]],
    "animations": {
        "idle": [0,23,'idle',1.0],
    }
    });

grubwormSheet.on("complete", function(event) {
    console.log("Complete", event);
});
grubwormSheet.on("error", function(event) {
    console.log("Error", event);
});
let grubworm = new createjs.Sprite(grubwormSheet, 'idle');
let table = new createjs.Shape();
let table2 = new createjs.Shape();

let backgroundColor = new createjs.Shape(); 

let offset;
let update = false;

let score;
let totalClicks = 0;

createjs.Ticker.addEventListener("tick", tick);//You need to add a ticker so that things can move in real time 
function tick(event) {

    stage.update(event);
}


function init() {
    score = document.getElementById('score');
    stageProperties = document.getElementById('demoCanvas');
    stage = new createjs.Stage("demoCanvas");

    stageWidth = stageProperties.attributes.width.value;
    stageHeight = stageProperties.attributes.height.value;    

    
    

    backgroundColor.graphics.beginFill("blue").drawRect(0, 0, stageWidth, stageHeight);
    backgroundColor.x = 0;
    backgroundColor.y = 0;

    
    table.graphics.beginFill("cyan").drawCircle(0,0, 150)
    table.x = stageWidth/4;
    table.y = 200;
    
    
    table2.graphics.beginFill("cyan").drawCircle(0,0, 150)
    table2.x = (stageWidth/4)*3;
    table2.y = 200;

    stage.addChild(backgroundColor);
    stage.addChild(table2);
    stage.addChild(table);
    
    
    stage.addChild(grubworm);
    console.log(grubworm);

    //Now the circle is on the stage, but the stage displayed is a old version, so you need to update it with all the new stuff drawn on the stage
    stage.update(); //Clear the canvas, run through all the children that need to be added, and add them
}

grubworm.addEventListener("click", handleClick);
function handleClick(event){
    totalClicks++;
    score.innerHTML = totalClicks;
}

grubworm.on("mousedown", function (evt) {
        this.parent.addChild(this);
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        update = true;
    });

grubworm.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;

        if (this.x > stageWidth - 20)
            this.x = stageWidth - 20;

        else if (this.x < 0 + 20)
            this.x = 0 + 20;


        this.y = evt.stageY + this.offset.y;

        if (this.y > stageHeight - 20)
            this.y = stageHeight - 20;

        else if (this.y < 0 + 20)
            this.y = 0 + 20;
        

        console.log('x = ' + this.x);
        console.log('y = ' + this.y);
        update = true;
    });

    