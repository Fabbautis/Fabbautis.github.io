let philModel = new createjs.Container()//The container that'll hold all the assets for Phil. Kinda like a nested Animate symbol

let philHuman = new createjs.Shape()
    philHuman.graphics.beginFill("#888888").drawRect(-10,-10,20,20)

let philGun = new createjs.Shape()
    philGun.graphics.beginFill("#FFFFFF").drawRect(0,-20, 5, 10)

let philHitbox = new createjs.Rectangle(philHuman.x,philHuman.y,philHuman.width, philHuman.height); //create hitbox based on the idle 
//sprite dimensions of the phil model w/o tools

    philModel.addChild(philGun);
    philModel.addChild(philHuman);
    


    
let phil; //create the variable that'll hold the player class as well as phil model.

class Player {
    constructor(speed, hp, model, hitbox){
        this.hp = hp;//set up HP
        this.speed = speed;//set up speed
        this.model = model;//sprite / container asset to use
        this.hitbox = hitbox;//hitbox of the player
    }
    
    getPlayerInfo(){ //return all info about the player
        console.log(this);
        return this;
    }

    playerMovement() { //move the player based on wasd or arrow keys. Apply first comments to rest of if statements
        
        let model = this.model;
        let hitbox = this.hitbox;
        console.log(model.x, model.y, hitbox.x, hitbox.y)

        if (keysPressed['87']||keysPressed['38'])
            model.y -= this.speed;
            hitbox.y -= this.speed;
            if (model.y < walkspace.y) { //If the player's y value gets below the allowed walkspace's y value 
                model.y = walkspace.y //then make their y value the allowed walkspace's y value
                hitbox.y = walkspace.y
            }
        else 
            model.y -= 0; //if no keys are pressed, don't move player
            hitbox.y -=0;

        if (keysPressed['83'] ||keysPressed['40'])
            model.y += this.speed;
            hitbox.y += this.speed;
            if (model.y > walkspace.height) {
                model.y = walkspace.height;
                hitbox.y = walkspace.height;
            }
        else 
            model.y += 0;
            hitbox.y += 0;

        if (keysPressed['65'] ||keysPressed['37'])
            model.x -= this.speed;
            hitbox.x -= this.speed;
            if (model.x < walkspace.x) {
                model.x = walkspace.x;
                hitbox.x = walkspace.x;
            }
        else 
            model.x -= 0;
            hitbox.x -=0;

        if (keysPressed['68'] ||keysPressed['39'])
            model.x += this.speed;
            hitbox.x += this.speed;
            if (model.x > walkspace.width) {
                model.x = walkspace.width;
                hitbox.x = walkspace.width;
            }
        else 
            model.x += 0;
            model.x += 0;
       
    }

    playerRotation(event){ //rotate the player based on the mouse. Helpful to see where the player is aiming.
        let changeX = event.stageX - this.model.x
        let changeY = event.stageY - this.model.y//Make a right triangle based on the distance the model is away from the cursor.

        let direction = Math.atan2(changeY, changeX); //inner angle based on the triangle
        this.model.rotation = (direction *180/Math.PI)+90
    }
}

