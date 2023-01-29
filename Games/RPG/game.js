let stage = new createjs.Stage('game');

//SPRITE / SPRITESHEET STUFF
let ZGSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ["ZG.png"],
    "frames": [[3,3,233,352,0,0,0]],
    "animations": {
        "idle": 0, 
    }
});
let enemySheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ['enemy.png'],
    "frames": [[3,3,367,490,0,0,0]],
    "animations": {
        "idle": 0,
    }
});
let battleOptionsSheet = new createjs.SpriteSheet({
    framerate: 24,
    "images": ['symbols.png'],
    "frames": [[3,3,132,139,0,1.45,0.1],[3,142,132,139,0,1.45,0.1],[3,281,132,139,0,1.45,0.1]],
    "animations": {
        "attack": [0,0,"attack"],
        "item": [1,1,"item"],
        "run": [2,2,"run"],
    }
});

let ZG = new createjs.Sprite(ZGSheet, 'idle');
let enemy = new createjs.Sprite(enemySheet, 'idle');
let battleOptions = new createjs.Sprite(battleOptionsSheet, 'attack');

//PLAYER
let playerHealth = new createjs.Container();
playerHealth.name = "Player Health";
playerHealth.health = 100;
playerHealth.healthMax = 100;

let playerHealthBG = new createjs.Shape();
playerHealthBG.graphics.s('white').ss(5).f('black').dr(0,0, 300, 50);
playerHealth.addChild(playerHealthBG);

let playerHealthGreens = new createjs.Shape();
playerHealthGreens.graphics.f('green').dr(0,0,300,50);
playerHealth.addChild(playerHealthGreens);

//ENEMY
let enemyHealth = new createjs.Container();
enemyHealth.name = "Enemy Health";
enemyHealth.health = 100;
enemyHealth.healthMax = 100;

let enemyHealthBG = new createjs.Shape();
enemyHealthBG.graphics.s('white').ss(5).f('black').dr(0,0, 300, 50);
enemyHealth.addChild(enemyHealthBG);

let enemyHealthGreens = new createjs.Shape();
enemyHealthGreens.graphics.f('green').dr(0,0,300,50);
enemyHealth.addChild(enemyHealthGreens);

//ENVIRONMENT 
let backgroundColor = new createjs.Shape();
backgroundColor.graphics.beginFill("#4A527A").dr(0, 0, 1400, 800);
let floor = new createjs.Shape();
floor.graphics.beginFill('#964B00').dr(0, 600, 1400, 200);

//INVENTORY SETUP
let inventoryContainer = new createjs.Container();

let inventoryBG = new createjs.Shape(); 
inventoryBG.graphics.s("darkblue").ss(8).f('rgba(60,60,200,0.75)').dr(0, 200, 1400, 300);
inventoryContainer.addChild(inventoryBG);

let items = 
[
    {name: 'Healing potion', y: 250},
    {name: 'Chainsaw', y: 350}
];
let inventoryOpen = false;

for (let i = 0; i < items.length; i++){
    inventoryContainer.addChild(new createjs.Text(''+ items[i].name, "40px Arial"));
    inventoryContainer.children[i+1].x = 50;
    inventoryContainer.children[i+1].y = items[i].y;
}

let inventoryTriangle = new createjs.Shape();
inventoryTriangle.graphics.f('white').dp(25, 265, 15, 3, 0);
inventoryContainer.addChild(inventoryTriangle);

let currentItem = 0;

//OTHER
let currentOption = 0;
let playerTurn = true;
let alertOnce = true;

createjs.Ticker.addEventListener('tick', stageUpdate);

function init(){
    ZG.x = 100;
    ZG.y = 300;

    enemy.x = 800;
    enemy.y = 300;

    battleOptions.x = 500;
    battleOptions.y = 100;

    inventoryContainer.y = 700;

    playerHealth.x = ZG.x-50;
    playerHealth.y = ZG.y -100;

    enemyHealth.x = enemy.x;
    enemyHealth.y = enemy.y - 100;
    window.addEventListener("keydown", keysDown);
    

    stage.addChild(backgroundColor);
    stage.addChild(floor);
    stage.addChild(enemy);
    stage.addChild(ZG);
    stage.addChild(battleOptions);
    stage.addChild(enemyHealth);
    stage.addChild(playerHealth);
    stage.addChild(inventoryContainer);
    stage.update();
}

function stageUpdate(e){
    if (!playerTurn){
        takeDamage(ZG, playerHealth, Math.floor(Math.random()*(17-8)+8))
        playerTurn = true;
    }
    if (playerHealth.health <0 && alertOnce){
        alert('you lose');
        alertOnce = false;
    }
    stage.update(e);
}

function keysDown(event)
{
    if (alertOnce){
        if (event.keyCode=='65'|| event.keyCode == '37'){ //LEFT
            if (!inventoryOpen){//no inventory  
                if (battleOptions.currentFrame == 0)
                    currentOption = 2;
                else 
                    currentOption--;  
                battleOptions.gotoAndStop(currentOption);    
            }
    
            if (inventoryOpen){
                if (currentItem == 0){
                    currentItem = 1;
                } else{
                    currentItem--;
                }
                inventoryContainer.children[3].y = items[currentItem].y - items[0].y;
            }
        }
        if (event.keyCode == '68' || event.keyCode == '39'){//RIGHT
            if (!inventoryOpen){//no inventory  
                if (battleOptions.currentFrame == 2){
                    currentOption = 0;
                }    
                else
                    currentOption++
                battleOptions.gotoAndStop(currentOption);
            }
    
            if (inventoryOpen){
                if (currentItem == 1){
                    currentItem = 0;
                } else{
                    currentItem++;
                }
                inventoryContainer.children[3].y = items[currentItem].y - items[0].y;
            }
        }
        if (event.keyCode == '13'){ //ENTER
            if (battleOptions.currentFrame ==0){
                takeDamage(enemy, enemyHealth, Math.floor(Math.random()*(15-10)+10));
                playerTurn = false;
            }
            if (battleOptions.currentFrame ==1){
                if (inventoryOpen){ //selected an item
                    if (currentItem == 1){
                        createjs.Tween.get(inventoryContainer, {override: true})
                            .to({y:700}, 300, createjs.Ease.quadInOut)
                            .set(inventoryOpen = false)
                        takeDamage(enemy, enemyHealth, Math.floor(Math.random()*(20-8)+8))
                        playerTurn = false;
                    }
                }
                if (!inventoryOpen){//open inventory
                    currentItem == 0;
                    createjs.Tween.get(inventoryContainer, {override: true})
                    .to({y:350}, 300, createjs.Ease.quadInOut)
                    .set(inventoryOpen = true)
                }
                
            }
        }
        if (event.keyCode == '27' && inventoryOpen){//ESC
            createjs.Tween.get(inventoryContainer, {override: true})
                .to({y:700}, 300, createjs.Ease.quadInOut)
                .set(inventoryOpen = false)
        }
    }
    
    
}

function takeDamage(sprite, character, damage){
    console.log(damage);
    console.log(character.health)
    if (alertOnce){
        character.health = character.health - damage;
        character.children[1].graphics.command.w = character.health / character.healthMax * 300 //change green hp width to a percentages of what the new hp is (character.health / healthMax) and multiply it based on the original width
        if (character.children[1].graphics.command.w < 0){
            character.children[1].graphics.command.w = 0;
            if (sprite == enemy) {
                alert('you win')
                alertOnce = false;
            }
            createjs.Tween.get(sprite)
                .to({y:1000}, 500)
        }
    }
    
}