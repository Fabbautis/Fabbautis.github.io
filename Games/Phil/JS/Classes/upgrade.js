let powerups = [];
class Upgrade {
    constructor(){
    }
    createPowerup(type){
        let powerup = new createjs.Container();
        let powerupModel = new createjs.Sprite(powerupsSpritesheet)
        let powerupRectangle
        let powerupHalo = new createjs.Bitmap(queue.getResult('powerupHalo'));
            powerupHalo.regX = powerupHalo.image.width / 2;
            powerupHalo.regy = powerupHalo.image.height / 2;
            
        powerup.addChild(powerupHalo)
        switch (type){
            case "tool":
                if (toolsAvailable.length == 1){
                    powerupModel.gotoAndStop("tablesaw");

                    powerupRectangle = powerupModel.getTransformedBounds()
                    powerupModel.regX = powerupRectangle.width/2;
                    powerupModel.regY = powerupRectangle.height/2;
                    
                    powerupModel.x = powerupHalo.x
                    powerupModel.y = powerupHalo.y + 1180;

                    powerup.aName = 'tablesaw'
                }
                if (toolsAvailable.length == 2){
                    powerupModel.gotoAndStop("propane");

                    powerupRectangle = powerupModel.getTransformedBounds()
                    powerupModel.regX = powerupRectangle.width/2;
                    powerupModel.regY = powerupRectangle.height/2;
                    powerupModel.scale = 0.9;
                    
                    powerupModel.x = powerupHalo.x-30;
                    powerupModel.y = powerupHalo.y + 1400;

                    powerup.aName = 'propane'
                }
                if (toolsAvailable.length >= 3){
                    powerupModel.gotoAndStop("killAll");

                    powerupRectangle = powerupModel.getTransformedBounds()
                    powerupModel.regX = powerupRectangle.width/2;
                    powerupModel.regY = powerupRectangle.height/2;
                    
                    powerupModel.x = powerupHalo.x+200
                    powerupModel.y = powerupHalo.y + 1240;

                    powerup.aName = 'killAll'
                }
                powerup.addChild(powerupModel);
            break;
            case "statBoost":
                powerupModel.gotoAndStop(type);
                powerupModel.scale = 1.3

                powerupRectangle = powerupModel.getTransformedBounds()
                powerupModel.regX = powerupRectangle.width/2;
                powerupModel.regY = powerupRectangle.height/2;
                
                powerupModel.x = powerupHalo.x + 50
                powerupModel.y = powerupHalo.y + 1320;

                powerup.addChild(powerupModel);

                powerup.aName = type;
            break;
            case "health":
            default:
                powerupModel.gotoAndStop("health");

                powerupRectangle = powerupModel.getTransformedBounds()
                powerupModel.regX = powerupRectangle.width/2;
                powerupModel.regY = powerupRectangle.height/2;
                
                powerupModel.x = powerupHalo.x
                powerupModel.y = powerupHalo.y + 1000;

                powerup.addChild(powerupModel);

                powerup.aName = type;
            break;
        }
        powerup.property = 'powerup'
        powerup.scale = 0.175;
        if (powerups.length ==0){ //first powerup on screen
            powerup.x = canvas.width/2;
            powerup.y = canvas.height/2;
            if ((phil.model.x < powerup.x +100 && phil.model.x >powerup.x-100 && (phil.model.y < powerup.y +100 && phil.model.y >powerup.y-100))){
                powerup.x = canvas.width/3;
                powerup.y = canvas.width/3;
            }
        } else {
            console.log(powerups[0], powerups.length)
            powerup.x = powerups[0].x - (50 *powerups.length);
            powerup.y = powerups[0].y - (10 *powerups.length);
        }
        
        gameStage.addChild(powerup);
        powerups.push(powerup);
    }
}