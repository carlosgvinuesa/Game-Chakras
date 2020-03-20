const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const chakras = [
  {
    num: 1,
    position: "Raiz",
    sansName: "Muladhara",
    frase: "Yo tengo",
    element: "Tierra",
    characteristic: "Supervivencia",
    blocks: "Miedo",
    images: ["images/Chakras/Chakra1.png", "images/Elements/Tierra.png"]
  },
  {
    num: 2,
    position: "Sacro",
    sansName: "Swadishthana",
    frase: "Yo deseo",
    element: "Agua",
    characteristic: "Placer",
    blocks: "Culpa",
    images: ["images/Chakras/Chakra2.png", "images/Elements/Agua.png"]
  },
  {
    num: 3,
    position: "Plexo Solar",
    sansName: "Manipura",
    frase: "Yo puedo",
    element: "Fuego",
    characteristic: "Fuerza de voluntad",
    blocks: "Verguenza",
    images: ["images/Chakras/Chakra3.png", "images/Elements/fuego.png"]
  },
  {
    num: 4,
    position: "Corazon",
    sansName: "Anahata",
    frase: "Yo amo",
    element: "Aire",
    characteristic: "Amor",
    blocks: "Dolor",
    images: ["images/Chakras/Chakra4.png", "images/Elements/Aire.png"]
  },
  {
    num: 5,
    position: "Garganta",
    sansName: "Vishuda",
    frase: "Yo hablo",
    element: "Sonido",
    characteristic: "Verdad",
    blocks: "Mientira",
    images: ["images/Chakras/Chakra5.png", "images/Elements/Sonido.png"]
  },
  {
    num: 6,
    position: "Tercer Ojo",
    sansName: "Ajña",
    frase: "Yo comprendo",
    element: "Luz",
    characteristic: "Discernimiento",
    blocks: "Ilusion",
    images: ["images/Chakras/Chakra6.png", "images/Elements/Luz.png"]
  },
  {
    num: 7,
    position: "Corona",
    sansName: "Sahasrara",
    frase: "Yo soy",
    element: "Pensamiento",
    characteristic: "Energia Cosmica",
    blocks: "Lazos Mundanos",
    images: ["images/Chakras/Chakra7.png", "images/Elements/Pensamiento.png"]
  }
];
let chakraStatus = 1;
const chakraScore = [0, 0, 0, 0, 0, 0, 0, 0];
let lives = 3;
let items = [];
let frames = 0;
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

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
      ctx.fillText("Game Over", 200, 300);
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
      this.chakra = chakras[Math.floor(Math.random() * chakras.length)];
      this.chakraNum = this.chakra.num;
      this.image = new Image();
      this.image.src = this.chakra.images[Math.floor(Math.random() * 2)];
    }
    draw() {
      if (frames % 10) this.y += 2;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
  const fondo = new Background();
  const avatar = new Avatar();
  const meditator = new Meditator();

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
        if (item.chakraNum === chakraStatus) {
          chakraScore[chakraStatus]++;
          item.y = item.y + 200;
        } else {
          lives--;
        }
        if (lives === 0) fondo.gameOver();
      }
    });
  }

  var interval = setInterval(function() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fondo.draw();
    avatar.draw();
    meditator.draw();
    generateItems();
    drawingItems();
    ctx.font = "20px Avenir";
    ctx.fillText(`Vidas: ${lives}`, 10, 80);
    ctx.fillText(`Chakra 7: ${chakraScore[7]}`, 10, 100);
    ctx.fillText(`Chakra 6: ${chakraScore[6]}`, 10, 130);
    ctx.fillText(`Chakra 5: ${chakraScore[5]}`, 10, 160);
    ctx.fillText(`Chakra 4: ${chakraScore[4]}`, 10, 190);
    ctx.fillText(`Chakra 3: ${chakraScore[3]}`, 10, 220);
    ctx.fillText(`Chakra 2: ${chakraScore[2]}`, 10, 250);
    ctx.fillText(`Chakra 1: ${chakraScore[1]}`, 10, 280);
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
function startGame() {
  chakraStatus = 1;
  chakraScore = chakraScore.map(x => (x = 0));
}
