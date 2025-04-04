let projectiles = [];
let tablesawCooldown = 0;
let propaneCooldown = 0;
let damageBoost = 2;

let toolsAvailable = ["torch"];

class Tool {
    constructor(model){
        this.model = model;
    }

    createProjectile(tool, event){ //create the model as well as its necessary stuff

        if (tool == 'tablesaw' && tablesawCooldown <= 50){
            return;
        }
        if (tool == 'propane' && propaneCooldown <= 30){
            return;
        }
        let bullet = new createjs.Sprite(projectileSpritesheet)

        switch (tool){
            case "torch":
                bullet.gotoAndPlay("torchIgnite")
                bullet.x = phil.model.x;
                bullet.y = phil.model.y;
                bullet.scale = .2
                bullet.intendedSpeed = 20;
                bullet.maxDistance = 250;
                bullet.damage = 1 + damageBoost;
                break;
            case "tablesaw":
                bullet.gotoAndPlay("tablesawLoop")
                bullet.x = phil.model.x;
                bullet.y = phil.model.y;
                bullet.scale = .2
                bullet.intendedSpeed = 50;
                bullet.maxDistance = 10000;
                bullet.damage = 2 + damageBoost;
                tablesawCooldown = 0;
                break;
            case "propane":
                bullet.gotoAndPlay("propaneLoop")
                bullet.x = phil.model.x;
                bullet.y = phil.model.y;
                bullet.scale = .2
                bullet.intendedSpeed = 10;
                bullet.maxDistance = 600;
                bullet.damage = 1 + damageBoost;
                propaneCooldown = 0;
                break;
            default:
                bullet.gotoAndPlay("torchIgnite")
                bullet.x = phil.model.x;
                bullet.y = phil.model.y;
                bullet.scale = .2
                bullet.intendedSpeed = 20;
                bullet.maxDistance = 250;
                bullet.damage = 1 + damageBoost;
                break;
        }

        bullet.bulletNumber = projectiles.length; //maybe delete later and just use the projectiles array?????????
        bullet.isImportant = true;
        bullet.aName = tool
        bullet.distanceTravelled = 0;

        this.calculateTravelAngle(bullet, event);
        projectiles.push(bullet);//push the bullet into an array that'll update all of the bullets' positions on screen
        gameStage.addChildAt(bullet, gameStage.getChildIndex(phil.model))
    }

    swapTool (){//push q to cycle between at most three unique tools
        if (keysPressed['81']){
            let toolUsing = toolsAvailable[0];
            toolsAvailable.splice(0,1);
            toolsAvailable.push(toolUsing);
            toolEquipped.model = toolsAvailable[0];

            toolEquippedSprite.gotoAndPlay(toolsAvailable[0])
            toolEquippedFadeOut.gotoAndPlay(0);
        }
    }

    calculateTravelAngle(bullet, event){ //Determine how the bullet should travel in terms of angle
        bullet.globalX = phil.model.x; //get the bullet's global x and y positions. This'll be used for environment stuff
        bullet.globalY = phil.model.y;

        let changeX = event.stageX - phil.model.x; //distance away from the player based on where the mouse was clicked
        let changeY = event.stageY - phil.model.y;

        let direction = Math.atan2(changeY, changeX); //inner angle based on the triangle
        bullet.rotation = (direction *180/Math.PI)

        if (Math.abs(changeX) > Math.abs(changeY)){ //if the x distance is further than the y distance.
            bullet.deltaX = changeX / Math.abs(changeX) //create a ratio determined by the x distance as the denominator
            bullet.deltaY = changeY / Math.abs(changeX) /*/X is the demoninator because it will result in a decimal point for the shorter side 
            instead of a number larger than 1 for the longer side (that will result in bullets that travel faster if the user tries to click
            a 90, 180, 270, or 360° triangle/*/
        } else if (Math.abs(changeX) < Math.abs(changeY)){
            bullet.deltaX = changeX / Math.abs(changeY)
            bullet.deltaY = changeY / Math.abs(changeY)   
        } else {
            bullet.deltaX = changeX / Math.abs(changeY)
            bullet.deltaY = changeY / Math.abs(changeX)
        }
    }

    updateBullets(){ //move the projectile. If they get off the intended walkarea, delete the projectile
        tablesawCooldown++;
        propaneCooldown++;

        for (let i = 0; i < projectiles.length; i++) {
            let specificProjectile = projectiles[i];

            for (let i = 0; i < enemies.length; i++){
                if (this.bulletIntersects(i) == false && specificProjectile.aName == "torch"){//check to see if the bullet spawns on something it can kill already. This does not apply to propane tanks 
                    return //if the bullet did hit something, then dont do the rest of this code so there wont be errors in console.log
                }; 
            }
            const xIncrease = specificProjectile.deltaX * projectiles[i].intendedSpeed;//Move the bullet based on the ratio calculated in createProjectile
            const yIncrease = specificProjectile.deltaY * projectiles[i].intendedSpeed;
    
            specificProjectile.x += xIncrease;
            specificProjectile.globalX += xIncrease;//make sure to add that increase to the local and global x and y values
    
            specificProjectile.y += yIncrease; //specificProjectile.y moves the bullet onscreen. specificProjectile.globalY is used to see where the bullet is on the canvas
            specificProjectile.globalY += yIncrease;
            
            let distanceTravelled = xIncrease*xIncrease + yIncrease*yIncrease;

            specificProjectile.distanceTravelled += Math.sqrt(distanceTravelled);
           
            if ((specificProjectile.globalX > walkspace.width || specificProjectile.globalX < walkspace.x)||(specificProjectile.globalY > walkspace.height || specificProjectile.globalY < walkspace.y)){
                this.bulletDestroy(specificProjectile, i) //if it goes out of bounds
            }   
            if (specificProjectile.distanceTravelled >= specificProjectile.maxDistance){ //if it goes as far as it needs to go
                /*/if (specificProjectile.aName === 'torch'){
                    if (specificProjectile.torchDead === true){
                        return;
                    }
                    specificProjectile.torchDead = true;
                    specificProjectile.gotoAndPlay("torchDie");
                    specificProjectile.on("animationend", function(event){
                        if (event.name =='torchDie'){
                            toolEquipped.bulletDestroy(specificProjectile, i);
                        }
                    })
                } else{/*/
                    this.bulletDestroy(specificProjectile, i);
               /// }
            }

        }
    }

    bulletDestroy(specificBullet, i){
        gameStage.removeChild(specificBullet);
        projectiles.splice(i, 1);          
    }
    bulletIntersects(enemy){
        if (enemies[enemy].getTransformedBounds() == undefined){
            return false;
        }
        for(let i = 0; i < projectiles.length; i++){
            let projectile =  projectiles[i].getTransformedBounds();
            let enemyBounds = enemies[enemy].getTransformedBounds();
            try{
                if (projectile.intersects(enemyBounds) && enemies[enemy].isDead == false){//if this bullet intersects a non-dead enemy
                    let myEnemy = enemies[enemy];
                    let myProjectile = projectiles[i];

                    if (myEnemy.hitBullet == true && myProjectile.hitEnemy == true){//if the bullet has already hit a specific enemy
                        //this makes it so that you can't deal double or triple damage to big enemies if it takes a couple of ticks
                        //for a projectile to cross through an enemy
                        return false;
                    } 
                    else {
                        myEnemy.hitBullet = true
                        myProjectile.hitEnemy = true
                        myEnemy.health -= myProjectile.damage //deal damage based on the projectile damage and enemy health
                    }

                    if (myEnemy.health <= 0){//if the enemy's health is 0, kill it. Bullet deletion is independent of killing an enemy
                        myEnemy.isDead = true;
                        myEnemy.gotoAndPlay("dead");
                    }

                    //The bullet is only deleted if...
                    //its a torch OR its a tablesaw AND it hits a brute
                    if ((myProjectile.aName == 'torch') || (myProjectile.aName == 'tablesaw' && myEnemy.type == 'brute')){ //destroy the bullet if its a torch. They will die on impact, no exceptions
                        this.bulletDestroy(myProjectile, i);
                        return false;
                    }          
                    if (myEnemy.type == 'brute'){ //play hit animation for brute 
                        myEnemy.gotoAndPlay("hit")
                    }         
                } 
            }
            catch {
                enemySpawnManager.enemyKill(enemy);
            }
             
        }
    }
}

