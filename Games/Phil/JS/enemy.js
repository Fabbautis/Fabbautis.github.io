let enemies = [];
class Enemy {
    constructor(type, speed){
        this.type = type;
        this.speed = speed;
    }
    spawnEnemy(){
        let enemy = new createjs.Shape();

        switch (this.type){
            case 'range':
                enemy.graphics.beginFill("#25b95f").drawRect(0,0,20,20);
            break;
            case 'brute':
                enemy.graphics.beginFill("#046137").drawRect(0,0,70,70);
            break;
            case 'normal':
            default:
                enemy.graphics.beginFill("#269a39").drawRect(0,0,30,30);             
            break;
        }
        if (this.speed == undefined){
            this.speed = 10;
        }
        
        let random = Math.round(Math.random()); //either spawn enemy on left and right or top and bottom
        let spawnX = Math.random()*(canvas.width-0);
        let spawnY = Math.random()*(canvas.height-0);

        if (random == 0){ //left and right only
            if ((spawnX >= walkspace.x) && (spawnX <= walkspace.width)){ //if the spawnX value is placed inside the rectangle
                if (spawnX >= walkspace.width/2){//if spawn x is closer to the right side of the rectangle, just move it there                
                    spawnX = Math.random()*((walkspace.width + wallThickness) - walkspace.width) + walkspace.width;
                } else { //otherwise calculate a new spawnX to the left side of the rectangle
                    spawnX = Math.random()*(walkspace.x - (walkspace.x - wallThickness)) + (walkspace.x - wallThickness);
                }
            }
            //no need to set spawn y otherwise enemies will spawn on the corners of the map only
        }
        if (random == 1){ //top and bottom only
            if ((spawnY >= walkspace.y) && (spawnY <= walkspace.height)){ 
                if (spawnY >= walkspace.height/2){              
                    spawnY = Math.random()*((walkspace.height + wallThickness) - walkspace.height) + walkspace.height;
                } else {
                    spawnY = Math.random()*(walkspace.y - (walkspace.y - wallThickness)) + (walkspace.y - wallThickness);
                }
            }
        }

        enemy.x = spawnX;
        enemy.y = spawnY;
        enemy.enemyNumber = enemies.length;
        enemy.isEnemy = true;
        if (enemy.aName){
            enemy.aName = this.type + enemy.enemyNumber;
        } else{
            enemy.aName = "normal" + enemy.enemyNumber;
        }
        
        enemies.push(enemy);
        gameStage.addChild(enemy);  
        console.log(enemies);
    }
}