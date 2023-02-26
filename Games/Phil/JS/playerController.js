class Player {
    constructor(speed, hp, model){
        this.hp = hp;
        this.speed = speed;
        this.model = model;
    }
    
    getPlayerInfo(){
        console.log(this);
        return this;
    }

    playerMovement() {
        
        let model = this.model;

        if (keysPressed['87']||keysPressed['38'])
            model.y -= this.speed;
            if (model.y < 100) {
                model.y = 100
            }
        else 
            model.y -= 0;

        if (keysPressed['83'] ||keysPressed['40'])
            model.y += this.speed;
            if (model.y > 700) {
                model.y = 700
            }
        else 
            model.y += 0;

        if (keysPressed['65'] ||keysPressed['37'])
            model.x -= this.speed;
            if (model.x < 70) {
                model.x = 70
            }
        else 
            model.x -= 0;

        if (keysPressed['68'] ||keysPressed['39'])
            model.x += this.speed;
            if (model.x > 1300) {
                model.x = 1300
            }
        else 
            model.x += 0;
       
    }
    playerRotation(event){
        let changeX = event.stageX - this.model.x
        let changeY = event.stageY - this.model.y//Make a right triangle based on the distance the model is away from the cursor.

        let direction = Math.atan2(changeY, changeX);
        this.model.rotation = (direction *180/Math.PI)+67.5
    }
}

let philCircle = new createjs.Shape()
    philCircle.graphics.beginFill("#888888").drawRect(-10,-10,20,20)
let philGun = new createjs.Shape()
    philGun.graphics.beginFill("#FFFFFF").drawRect(0,-20, 5, 10)
let philModel = new createjs.Container()
    philModel.addChild(philGun);
    philModel.addChild(philCircle);
    
let phil;