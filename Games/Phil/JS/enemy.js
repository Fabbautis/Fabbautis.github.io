let enemies = [];
class Enemy {
    constructor(){
    }
    spawnEnemy(type, speed){
        let enemy = new createjs.Shape();

        console.log(type)
        switch (type){
            case "range":
                enemy.graphics.beginFill("#25b95f").drawRect(0,0,20,20);
                enemy.setBounds(0,0,20,20);
                enemy.damage = 10;
                enemy.health = 1;
            break;
            case 'brute':
                enemy.graphics.beginFill("#046137").drawRect(0,0,70,70);
                enemy.setBounds(0,0,70,70);
                enemy.damage = 30;
                enemy.health = 2;
            break;
            case 'normal':
            default:
                enemy.graphics.beginFill("#269a39").drawRect(0,0,30,30);      
                enemy.setBounds(0,0,30,30);   
                enemy.damage = 20;   
                enemy.health = 1; 
            break;
        }

        enemy.enemyNumber = enemies.length;
        enemy.isEnemy = true;

        if (speed == undefined){
            enemy.speed = Math.random() * (13-5)+5;
        } else{
            enemy.speed = Math.random() * ((speed+2)-(speed -2)) + (speed -2);
        }
        
        if (type  == undefined){
            enemy.aName = "normal " + enemy.enemyNumber;
        } else{
            enemy.aName = type +" " + enemy.enemyNumber;
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

        gameStage.addChild(enemy)
        enemies.push(enemy)
    }
    enemyIntersects(player){
        for(let i = 0; i < enemies.length; i++){
            let enemy =  enemies[i].getTransformedBounds();
            let playerBounds = player.getTransformedBounds();
            if (enemy.intersects(playerBounds)){
                console.log(enemies[i].aName + " is colliding with " + player.aName);
                phil.playerDamage(enemies[i].damage);
                gameStage.removeChild(enemies[i]);
                enemies.splice(i,1);
            }
        }
    }
    enemyMovement(){
        for(let i = 0; i < enemies.length; i++){
            let specificEnemy = enemies[i]
            let changeX = phil.model.x - specificEnemy.x; //distance away from the player based on where the mouse was clicked
            let changeY = phil.model.y - specificEnemy.y;
    
            let direction = Math.atan2(changeY, changeX); //inner angle based on the triangle
            specificEnemy.rotation = (direction *180/Math.PI)+90

            if (Math.abs(changeX) > Math.abs(changeY)){ //if the x distance is further than the y distance.
                specificEnemy.deltaX = changeX / Math.abs(changeX) //create a ratio determined by the x distance as the denominator
                specificEnemy.deltaY = changeY / Math.abs(changeX) /*/X is the demoninator because it will result in a decimal point for the shorter side 
                instead of a number larger than 1 for the longer side (that will result in bullets that travel faster if the user tries to click
                a 90, 180, 270, or 360° triangle/*/
            } else if (Math.abs(changeX) < Math.abs(changeY)){
                specificEnemy.deltaX = changeX / Math.abs(changeY)
                specificEnemy.deltaY = changeY / Math.abs(changeY)   
            } else {
                specificEnemy.deltaX = changeX / Math.abs(changeY)
                specificEnemy.deltaY = changeY / Math.abs(changeX)
            }

            const xIncrease = specificEnemy.deltaX * specificEnemy.speed;//Move the bullet based on the ratio calculated in createProjectile
            const yIncrease = specificEnemy.deltaY * specificEnemy.speed;
    
            specificEnemy.x += xIncrease;  
            specificEnemy.y += yIncrease; //specificProjectile.y moves the bullet onscreen. specificProjectile.globalY is used to see where the bullet is on the canvas
            
            
            this.enemyIntersects(phil.model)
        }
       
    }
}