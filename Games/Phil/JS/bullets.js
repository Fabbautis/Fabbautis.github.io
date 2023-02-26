let bulletSpeed = 50;

let bullets = [];

function createProjectile(event){
    let bullet = new createjs.Shape()
        bullet.graphics.beginFill("#000000").drawCircle(phil.model.x,phil.model.y,5)
        gameStage.addChild(bullet)

    let changeX = event.stageX - phil.model.x;
    let changeY = event.stageY - phil.model.y;
    if (Math.abs(changeX) > Math.abs(changeY)){ 

        bullet.deltaX = changeX / Math.abs(changeX)
        bullet.deltaY = changeY / Math.abs(changeX)
        //console.log("Change X is further away. Move Y by "+ changeY / Math.abs(changeY) + ". Move X by " + changeX / Math.abs(changeY))
    } else if (Math.abs(changeX) < Math.abs(changeY)){
        bullet.deltaX = changeX / Math.abs(changeY)
        bullet.deltaY = changeY / Math.abs(changeY)
        //console.log("Change Y is further away. Move X by "+ changeX / Math.abs(changeX) + ". Move Y by " + changeY / Math.abs(changeX))
    } else {
        bullet.deltaX = changeX / Math.abs(changeY)
        bullet.deltaY = changeY / Math.abs(changeX)
        //console.log("Change X and Y are equal")
    }

    bullets.push(bullet)
    console.log(bullets)
}

function updateBullets(){
    for (let i = 0; i < bullets.length; i++) {
		let missile = bullets[i];
		missile.x += missile.deltaX*bulletSpeed;
		missile.y += missile.deltaY*bulletSpeed;
	}
}