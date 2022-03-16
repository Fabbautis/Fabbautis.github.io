let stage;
let stageProperties;
let stageWidth;
let stageHeight;


let grubwormSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["Grubworm.png"],
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

let grubHeld = false;

let offset;

let score;
let totalClicks = 0;

createjs.Ticker.addEventListener("tick", tick);//You need to add a ticker so that things can move in real time 
function tick(event) {
    if (grubworm.x >=650 && grubworm.x <= 950&&grubHeld){ 
        grubworm.alpha = 0.2;
        
    } else {
        grubworm.alpha = 1;
    }
    stage.update(event);
}


function init() {
    score = document.getElementById('score');
    stageProperties = document.getElementById('demoCanvas');
    stage = new createjs.Stage("demoCanvas");

    stageWidth = stageProperties.attributes.width.value;
    stageHeight = stageProperties.attributes.height.value;    

    
    
    grubworm.x = 0;
    grubworm.y = 0;
    grubworm.scaleX = 0.2;
    grubworm.scaleY = 0.2;
    
    backgroundColor.graphics.beginFill("blue").drawRect(0, 0, stageWidth, stageHeight);
    backgroundColor.x = 0;
    backgroundColor.y = 0;

    
    table.graphics.beginFill("cyan").drawCircle(0,0, 150)
    table.x = (stageWidth/4)*3;
    table.y = 200;
    
    
    table2.graphics.beginFill("cyan").drawCircle(0,0, 150)
    table2.x = (stageWidth/4)*3;
    table2.y = 600;

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
        grubHeld = true;
    });

grubworm.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;

        if (this.x < -180)
            this.x = -180;

        else if (this.x > 1150)
            this.x = 1150;


        this.y = evt.stageY + this.offset.y;

        if (this.y > 640)
            this.y = 640;

       else if (this.y < -60)
           this.y = -60;
        
        console.log('x = ' + this.x);
        console.log('y = ' + this.y);
    });

grubworm.on('pressup', function (){
    grubHeld = false;
    console.log(grubHeld)
})
    