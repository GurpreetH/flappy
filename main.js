var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var bird = new Image();
bird.src = "images/bird.png";
var background = new Image();
background.src = "images/bg.png";
var foreground = new Image();
foreground.src = "images/fg.png";
var topPipe = new Image();
topPipe.src = "images/pipeNorth.png";
var botPipe = new Image();
botPipe.src = "images/pipeSouth.png";

var gap = 75;
var constant = topPipe.height + gap;

var birdx = 10;
var birdy = 150;

var gravity = 1.4;
var score = 0;
//key

document.addEventListener("keydown", moveUp);

function moveUp() {
  birdy -= 25;
  fly.play();
}

var pipe = [];

pipe[0] = {
  x: canvas.clientWidth,
  y: 0
};

var fly = new Audio();
fly.src = "sounds/fly.mp3";
var scoresound = new Audio();
scoresound.src = "sounds/score.mp3";

function draw() {
  context.drawImage(background, 0, 0);
  context.fillStyle = "#800";
  context.font = "20px Verdana";
  context.fillText("Score :" + score, 10, 20);

  for (let i = 0; i < pipe.length; i++) {
    context.drawImage(topPipe, pipe[i].x, pipe[i].y);
    constant = topPipe.height + gap;

    context.drawImage(botPipe, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;

    if (pipe[i].x == 123) {
      pipe.push({
        x: canvas.clientWidth,
        y: Math.floor(Math.random() * (topPipe.height - botPipe.height))
      });
    }

    if (
      birdx + bird.width >= pipe[i].x &&
      birdx <= pipe[i].x + topPipe.width &&
      (birdy <= pipe[i].y + topPipe.height ||
        birdy + bird.height >= pipe[i].y + constant)
    ) {
      location.reload();
    }
    if (birdy + bird.height >= canvas.height - foreground.height) {
      location.reload();
    }
   
    if (pipe[i].x == birdx) {
      scoresound.play();
      score++;
    }
  }

  context.drawImage(foreground, 0, canvas.height - foreground.height);

  context.drawImage(bird, birdx, birdy);

  birdy += gravity;

  requestAnimationFrame(draw);
}

draw();
