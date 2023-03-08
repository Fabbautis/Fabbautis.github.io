function updateHealthbar(health){
    playerHealthGreens.graphics.command.w = health / playerHealth.healthMax * playerHealthBorder.graphics.command.w
    
    console.log(health);
    if (health > 75) {
        pfp.gotoAndStop('100');
    } else if (health <=75 && health > 50)
        pfp.gotoAndStop('75');
    else if (health <= 50 && health > 25){
        pfp.gotoAndStop('50');
    } else {
        pfp.gotoAndStop('25');
    }
    profileFadeOut.gotoAndPlay(0);
    console.log(profileCardBG.image.width, profileCardBG.image.height, pfp.x, pfp.y)
}