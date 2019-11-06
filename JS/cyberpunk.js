// LOADING GAME PAGE ON CLICK " SAVE YOUR SYSTEM NOW " 

window.onload = function () {
  document.getElementById("start-game").onclick = function () {
    document.getElementById("Home-Page-Header").style.display = "none";
    document.getElementById("game-board").style.display = "block";
  }

  function startGame() {
    myGameArea.start();
    var player; 
    var myObstacles = [];
    player = new Component(50, 50, "./SVG/player.svg", 100, 200);
    myObstacle = new Component (50, 50, "./SVG/skull.svg", 150, 250);
  }

  var myGameArea = {
    canvas: document.createElement("canvas"),
    drawCanvas: function () {
      this.canvas.width = screen.width - screen.width * 0.15;
      this.canvas.height = screen.height - screen.height * 0.15;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
    },
    start: function () {
      this.drawCanvas();
      this.reqAnimation = window.requestAnimationFrame(updateGameArea);
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.frames=0;
      this.interval= setInterval(updateGameArea, 20);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function(){
      clearInterval(this.interval);
    }, 
    score: function() {
      var points = Math.floor(this.frames / 5);
      this.context.font = "23px serif";
      this.context.fillStyle = "black";
      this.context.fillText("Virus Avoided: " + points, 500, 50);
    }
  }
    function everyinterval(n){
      if ((myGameArea.frames / n) % 1 === 0) {return true;}
      return false;
    }
  };

  function Component(width, height, img, x, y) {
    this.img = new Image();
    this.img.src = img;
    this.width = width;
    this.height = height;
    this.speedX=0;
    this.speedY=0;
    this.x = x;
    this.y = y;
    this.update = function () {
      myGameArea.context.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height);
      }
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    this.crashWith = function(otherobject){
      var myleft= this.x;
      var myright= this.x + (this.width);
      var mytop = this.y; 
      var mybottom = this.y + (this.height);
      var otherleft= otherobject.x;
      var otherright = otherobject.x + (otherobject.width);
    var othertop = otherobject.y;
    var otherbottom = otherobject.y + (otherobject.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
  };

  function updateGameArea() {
    for (i=0; i<myObstacles.length, i++;){
      if (player.crashWith(myObstacles[i])){ myGameArea.stop();
      return;
    }
    }
    myGameArea.clear(),
    function updateObstacles(){ 
    for (i=0; i < myObstacles.length; i++){
      myObstacles[i].x +=4;
      myObstacles [i].update();
    }
     myGameArea.frames +=1;
    if (myGameArea.frames % 90 === 0){
    x= myGameArea.canvas.width;
    y= myGameArea.canvas.height - 150;
    var minGap =30;
    var maxGap=300;
    var gap= Math.floor(Math.random()*(maxGap - minGap+1) + minGap)
    myObstacles.push (new component (50, 50, "./SVG/skull.svg", 150, 250))
  }
    player.newPos();
    player.update();
    updateObstacles();
    myGameArea.score();
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }

  startGame();

};

// MAKING THE PLAYER MOVE
document.onkeydown = function (e) {
  if (e.keyCode === 39) {
    player.x += 10;
  }
  if (e.keyCode === 37) {
    player.x -= 10;
  }
  if (e.keyCode === 38) {
    player.y -= 10;
  }
  if (e.keyCode === 40) {
    player.y += 10
  }
};

document.onkeyup = function(e) {
  player.speedX = 0;
  player.speedY = 0;
}

// MATRIX 

const availableCharacters =
  "123456780ABCDEFGHIJKLMNOPQRTabcdefghijklmnopqrstuvwxyz";

function getRandomChar() {
  return availableCharacters[(Math.random() * availableCharacters.length) | 0];
}

class MatrixStream {
  constructor(container, len) {
    this.container = container;
    this.len = len;
    this.init();
  }

  init() {
    // start from 0, 1, 2
    this.status = (Math.random() * 3) | 0;
    this.pipe = [];
    this.count = 0;

    // create render
    this.renderNodes = [];
    for (let i = 0; i < this.len; i++) {
      let span = document.createElement("span");
      span.innerText = getRandomChar();
      this.container.appendChild(span);
      this.renderNodes.push(span);
    }
  }

  tick() {
    this.fill();
    this.render();
    this.shift();
  }

  fill() {
    // fill the pipe

    while (this.count < this.len) {
      let node = {
        code: this.status
      };

      switch (this.status) {
        case 0:
          node.length = 1;
          break;

        case 1:
          node.length = (1 + ((Math.random() * this.len) / 3) * 2) | 0;
          break;

        case 2:
          node.length = (1 + (Math.random() * this.len) / 3) | 0;
          break;
      }

      // switch to next status 0, 1, 2, 0, 1, 2, ...
      this.status = (this.status + 1) % 3;

      this.count += node.length;
      this.pipe.push(node);
    }
  }

  render() {
    // render

    let idx = 0;
    (() => {
      for (let node of this.pipe) {
        for (let i = 0; i < node.length; i++) {
          if (idx === this.len) return;

          switch (node.code) {
            case 0:
              // always update char
              this.renderNodes[idx].innerText = getRandomChar();
              this.renderNodes[idx].className = "b";
              break;

            case 1:
              // has a chance to update char
              if (Math.random() < 0.05) {
                this.renderNodes[idx].innerText = getRandomChar();
              }
              this.renderNodes[idx].className = "l";
              break;

            case 2:
              this.renderNodes[idx].className = "d";
              break;
          }

          idx++;
        }
      }
    })();
  }

  shift() {
    if (!--this.pipe[0].length) {
      this.pipe.shift();
    }

    this.count--;
  }
}

const columns = 15;
const rows = 60;
const matrix = [];

let container = document.getElementById("container");
for (let i = 0; i < columns; i++) {
  let column = document.createElement("div");
  column.className = "column";
  container.appendChild(column);
  let matrix = new MatrixStream(column, rows);

  setInterval(function loop() {
    matrix.tick();
  }, 100 + Math.random() * 100);
}

(function () {
  $("#testdiv")
    .delay(2000)
    .fadeOut(0);
});

