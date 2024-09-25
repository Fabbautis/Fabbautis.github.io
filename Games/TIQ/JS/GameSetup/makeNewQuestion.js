let answerbox = new createjs.Container();
let box=new createjs.Shape();
box.graphics.beginFill("#aaaaaa").drawRect(0, 0, 200, 100);

let text=new createjs.Text();
text.text="answer";
text.x=0;
text.y=0;
text.font="20px Arial"

answerbox.addChild(box);
answerbox.addChild(text);
answerbox.x=500;

gameStage.addChild(answerbox);
gameStage.update();