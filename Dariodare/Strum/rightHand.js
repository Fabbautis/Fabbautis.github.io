(function(window) {
Rhand_instance_1 = function() {
	this.initialize();
}
Rhand_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["rightHand.png"], frames: [[3,3,1185,1495,0,280.4,187.6],[3,1498,1185,1495,0,280.4,187.6],[1188,3,1185,1495,0,280.4,187.6],[2373,3,1185,1495,0,280.4,187.6],[2373,3,1185,1495,0,280.4,187.6],[1188,1498,1185,1495,0,280.4,187.6],[1188,1498,1185,1495,0,280.4,187.6],[3,3,1185,1495,0,280.4,187.6]]});
var Rhand_instance_1_p = Rhand_instance_1.prototype = new createjs.Sprite();
Rhand_instance_1_p.Sprite_initialize = Rhand_instance_1_p.initialize;
Rhand_instance_1_p.initialize = function() {
	this.Sprite_initialize(Rhand_instance_1._SpriteSheet);
	this.paused = false;
}
window.Rhand_instance_1 = Rhand_instance_1;
}(window));

