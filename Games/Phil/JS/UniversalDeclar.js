//Make the canvas the full screen of the HTML block (which for this instance, is the size of the entire window)
let gameStage = new createjs.Stage("canvas");
let canvas = document.getElementById('canvas');
let timePassed= -1;
let allWaves = [
    {"wave": 0, "normal": 1, "ranged": 0, "brute": 0, "event": 0, "description": "Welcome to the backyard! WASD to move. Click to shoot!"},//1 2 3 4 4
    {"wave": 1, "normal": 2, "ranged": 0, "brute": 0, "event": 0, "description": "That thing was a Scrunkly. They want to kill you"},
    {"wave": 2, "normal": 3, "ranged": 0, "brute": 0, "event": 0, "description": "We love this backyard and will do anything to stay"},
    {"wave": 3, "normal": 4, "ranged": 0, "brute": 0, "event": 0, "description": "They stole your tools and you're next."},
    {"wave": 4, "normal": 4, "ranged": 0, "brute": 0, "event": 0, "description": "Me? I'm just here for a good"},
    {"wave": 5, "normal": 5, "ranged": 0, "brute": 0, "event": 0, "description": "Every seven waves, the Scrunklies need to regroup, perfect for a break."},
    {"wave": 6, "normal": 6, "ranged": 0, "brute": 0, "event": 0, "description": "This would be a lot easier if you had another tool"},
    {"wave": 7, "normal": 0, "ranged": 0, "brute": 0, "event": 1, "description": "Speak of the devil... You also got HP and stat boosts!"},
    {"wave": 8, "normal": 4, "ranged": 0, "brute": 0, "event": 0, "description": "You just got your tablesaw. Press Q and try it out!"},
    {"wave": 9, "normal": 5, "ranged": 0, "brute": 0, "event": 0, "description": "Your tablesaw travels far! But it does take a while to launch it again"},
    {"wave": 10, "normal": 0, "ranged": 2, "brute": 0, "event": 0, "description": "Here comes the Slingly Scrunklies, they like to keep their distance."},
    {"wave": 11, "normal": 5, "ranged": 1, "brute": 0, "event": 0, "description": "They FUCKING explode when they die!"},
    {"wave": 12, "normal": 7, "ranged": 1, "brute": 0, "event": 0, "description": "Slingy Scrunklies are vulnerable while they're regrowing their seed head."},
    {"wave": 13, "normal": 9, "ranged": 2, "brute": 0, "event": 0, "description": "This is starting to get noticably harder"},
    {"wave": 14, "normal": 0, "ranged": 0, "brute": 0, "event": 1, "description": "Wonderful, another tool AND more health"},
    {"wave": 15, "normal": 8, "ranged": 2, "brute": 0, "event": 0, "description": "Your propane tank is a lot slower, but is a lot wider"},
    {"wave": 16, "normal": 12, "ranged": 2, "brute": 0, "event": 0, "description": "You might've noticed that it also takes time to throw your tank"},
    {"wave": 17, "normal": 0, "ranged": 4, "brute": 0, "event": 0, "description": "You might've ALSO noticed the tanks can hit Slingy Scrunklies"},
    {"wave": 18, "normal": 15, "ranged": 0, "brute": 1, "event": 0, "description": "Woah, here comes a slithery scrunkly. Good luck with that..."},
    {"wave": 19, "normal": 12, "ranged": 2, "brute": 1, "event": 0, "description": "The slithery scrunklies will destroy torches and tablesaws"},
    {"wave": 20, "normal": 14, "ranged": 3, "brute": 1, "event": 0, "description": "Have you tried using a propane tank on them?"},
    {"wave": 21, "normal": 0, "ranged": 0, "brute": 0, "event": 1, "description": "Fun Fact: we are all mutated weeds!"},
    {"wave": 22, "normal": 20, "ranged": 4, "brute": 1, "event": 0, "description": "We were given caffine stimulated supplements and gained consciousness"},
    {"wave": 23, "normal": 30, "ranged": 0, "brute": 2, "event": 0, "description": "It was fun watching you run around like a chicken without a head"},
    {"wave": 24, "normal": 0, "ranged": 10, "brute": 3, "event": 0, "description": "I hope you can come back and fight us for this backyard"},
    {"wave": 25, "normal": 0, "ranged": 0, "brute": 0, "event": 1, "description": "-the potted Scrunkly"},

];

let waveCleared = false;
let curWave = -1; //set to -1 later on
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let keysPressed  = {}; //see keys up / down function

let toolEquipped;
let enemySpawnManager;
let powerupSpawnManager;



   
