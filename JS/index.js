const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  ctx.fillRect(0, 0, 400, 200);

  class Background {
    constructor() {
      this.x = 120;
      this.y = 0;
      this.width = canvas.width - 120;
      this.height = canvas.height;
      this.imagen = new Image();
      this.imagen.src = "images/background.jpg";
    }
    gameOver() {
      clearInterval(interval);
      ctx.font = "80px Avenir";
      ctx.fillText("Game Over", 50, 400);
    }
    draw() {
      ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height);
      let score = Math.floor(frames / 100);
      ctx.fillStyle = "black";
      ctx.font = "40px Avenir";
      ctx.fillText(`Score: ${score}`, 20, 50);
    }
  }

  class Avatar {
    constructor() {
      this.x = 225;
      this.y = canvas.height - 100;
      this.width = 67;
      this.height = 74;
      this.sx = 100;
      this.sy = 170;
      this.sw = 750;
      this.sh = 830;
      this.image = new Image();
      this.image.src = "images/aang-meditando.png";
    }
    collision(item) {
      return (
        this.x < item.x + item.width &&
        this.x + this.width > item.x &&
        this.y < item.y + item.height &&
        this.y + this.height > item.y
      );
    }
    draw() {
      ctx.drawImage(
        this.image,
        this.sx,
        this.sy,
        this.sw,
        this.sh,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  class Item {
    constructor() {
      this.x = 120 + Math.floor(Math.random() * (canvas.width - 140));
      this.y = -40;
      this.width = 40;
      this.height = 40;
    }
    draw() {
      if (frames % 10) this.y += 5;
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  class Meditator {
    constructor() {
      this.x = 20;
      this.y = 400;
      this.width = 100;
      this.height = 113;
      this.sx = 15;
      this.sy = 85;
      this.sw = 125;
      this.sh = 155;
      this.image = new Image();
      this.image.src = "images/chakras-meditation.jpg";
    }
    draw() {
      ctx.drawImage(
        this.image,
        this.sx,
        this.sy,
        this.sw,
        this.sh,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  let chakraStatus = 1;
  const fondo = new Background();
  const avatar = new Avatar();
  const meditator = new Meditator();
  const firstChakraArr = [];
  const secondChakraArr = [];
  const thirdChakraArr = [];
  const fourthChakraArr = [];
  const fifthChakraArr = [];
  const sixthChakraArr = [];
  const seventhChakraArr = [];
  var items = [];

  function generateItems() {
    if (frames % 100 == 0) {
      var item = new Item();
      items.push(item);
    }
  }

  function drawingItems() {
    items.forEach(function(item) {
      item.draw();
      // Checamos colisiones
      if (avatar.collision(item)) {
        // Ejecutaremos el gameOver
        fondo.gameOver();
      }
    });
  }

  var frames = 0;
  var interval = setInterval(function() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fondo.draw();
    avatar.draw();
    meditator.draw();
    generateItems();
    drawingItems();
  }, 1000 / 60);

  addEventListener("keydown", function(event) {
    if (event.keyCode === 37) {
      avatar.x -= 30;
    }
    if (event.keyCode === 39) {
      avatar.x += 30;
    }
    if (event.keyCode === 65) {
      if (chakraStatus < 7) {
        meditator.sx += 124;
        chakraStatus++;
      }
    }
    if (event.keyCode === 90) {
      if (chakraStatus > 1) {
        meditator.sx -= 124;
        chakraStatus--;
      }
    }
  });
};
function startGame() {}
