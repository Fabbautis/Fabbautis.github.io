let philModel = new createjs.Container()//The container that'll hold all the assets for Phil. Kinda like a nested Animate symbol
    philModel.aName = 'phil';

let philHuman = new createjs.Shape()
    philHuman.graphics.beginFill("#888888").drawRect(-10,-10,20,20)

let philGun = new createjs.Shape()
    philGun.graphics.beginFill("#FFFFFF").drawRect(0,-20, 5, 10)


    philModel.addChild(philGun);
    philModel.addChild(philHuman);
    


    
let phil; //create the variable that'll hold the player class as well as phil model.
let philHitboxForgiveness = 10; //Be nice to the player and make their hitbox smaller 

class Player {
    constructor(speed, hp, model){
        this.hp = hp;//set up HP
        this.speed = speed;//set up speed
        this.model = model;//sprite / container asset to use
    }
    
    getPlayerInfo(){ //return all info about the player
        console.log(this);
        return this;
    }

    playerMovement() { //move the player based on wasd or arrow keys. Apply first comments to rest of if statements
        
        let model= this.model;

        if (keysPressed['87']||keysPressed['38'])
            model.y -= this.speed;
            if (model.y < walkspace.y) { //If the player's y value gets below the allowed walkspace's y value 
                model.y = walkspace.y //then make their y value the allowed walkspace's y value
            }
        else 
            model.y -= 0; //if no keys are pressed, don't move player

        if (keysPressed['83'] ||keysPressed['40'])
            model.y += this.speed;
            if (model.y > walkspace.height) {
                model.y = walkspace.height;
            }
        else 
            model.y += 0;

        if (keysPressed['65'] ||keysPressed['37'])
            model.x -= this.speed;
            if (model.x < walkspace.x) {
                model.x = walkspace.x;
            }
        else 
            model.x -= 0;

        if (keysPressed['68'] ||keysPressed['39'])
            model.x += this.speed;
            if (model.x > walkspace.width) {
                model.x = walkspace.width;
            }
        else 
            model.x += 0;
       
    }

    playerRotation(event){ //rotate the player based on the mouse. Helpful to see where the player is aiming.
        let changeX = event.stageX - this.model.x
        let changeY = event.stageY - this.model.y//Make a right triangle based on the distance the model is away from the cursor.

        let direction = Math.atan2(changeY, changeX); //inner angle based on the triangle
        this.model.rotation = (direction *180/Math.PI)+90
    }

    playerDeath(){
        console.log('dead');
    }

    playerCollision(){ //see if the player hitbox goes over something important in the game and execute functions based on it
        //collision code provided by https://www.youtube.com/watch?v=yJXVOQVYjMo&ab_channel=SyntaxByte

        let baseModel = this.model.children[1].graphics.command //get the base shape of the model
    
        let left = baseModel.x + this.model.x; 
        let top = baseModel.y + this.model.y;

        let coordinatePoints = [
            new createjs.Point(left, top), //top left corner
            new createjs.Point(left + baseModel.w, top), //top right corner
            new createjs.Point(left + baseModel.w, top + baseModel.h), //bottom right corner
            new createjs.Point(left, top + baseModel.h), //bottom left corner
        ];

        for(let i = 0; i<coordinatePoints.length; i++) {
            let everythingInHitbox = gameStage.getObjectsUnderPoint(coordinatePoints[i].x,coordinatePoints[i].y);
            if (everythingInHitbox.filter((object) => object.isEnemy == true).length > 0){
                this.hp -=1;
                    if (this.hp <= 0){
                        this.playerDeath();
                        this.hp = 0;
                    }
                return;
            }

        }
    }
}

