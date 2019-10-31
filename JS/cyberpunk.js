// LOADING GAME PAGE ON CLICK " SAVE YOUR SYSTEM NOW " 

window.onload = function () {
  document.getElementById("start-game").onclick = function () {
    document.getElementById("Home-Page-Header").style.display = "none";
    document.getElementById("game-board").style.display = "block";
  }

  function startGame() {
    myGameArea.start();
    player = new Component(50, 50, "./SVG/player.svg", 100, 200);
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
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  function Component(width, height, img, x, y) {
    this.img = new Image();
    this.img.src = img;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
      myGameArea.context.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };
  }

  function updateGameArea() {
    myGameArea.clear();
    player.update();
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }

  startGame();

};



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

const columns = 20;
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