const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start-button");
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
let chakraScore = [0, 0, 0, 0, 0, 0, 0, 0];
let lives = 3;
let items = [];
let frames = 0;
let goal = 1;
let points = 0;
let time = 0;
let player = "player1";
let player1 = {
  points: 0,
  time: 0
};
let player2 = {
  points: 0,
  time: 0
};
let record = {
  points: 0,
  time: 0,
  owner: "no record"
};
const audio = new Audio();
audio.src =
  "http://audio.avatarspiritmedia.net/atla/ATLA%20321%20-%20Series%20Finale%20End%20Credits.mp3";
audio.loop = true;

class Background {
  constructor() {
    this.x = 120;
    this.y = 0;
    this.width = canvas.width - 120;
    this.height = canvas.height;
    this.imagen = new Image();
    this.imagen.src = "images/background.jpg";
  }

  draw() {
    ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height);
    time = Math.floor(frames / 60);
    points = chakraScore.reduce((a, b) => a + b);
    ctx.fillStyle = "grey";
    ctx.font = "20px Avenir";
    ctx.fillText(`Time: ${time}`, 10, 50);
    ctx.fillText(`Points: ${points}`, 10, 80);
    ctx.fillText(`Vidas: ${lives}`, 10, 120);
    ctx.fillStyle = "#c242f5";
    ctx.fillRect(0, 137, (120 / goal) * chakraScore[7], 30);
    ctx.fillStyle = "grey";
    ctx.fillText(`Chakra 7: ${chakraScore[7]}`, 10, 160);
    ctx.fillStyle = "#1333a8";
    ctx.fillRect(0, 167, (120 / goal) * chakraScore[6], 30);
    ctx.fillStyle = "grey";
    ctx.fillText(`Chakra 6: ${chakraScore[6]}`, 10, 190);
    ctx.fillStyle = "#a0e7e8";
    ctx.fillRect(0, 197, (120 / goal) * chakraScore[5], 30);
    ctx.fillStyle = "grey";
    ctx.fillText(`Chakra 5: ${chakraScore[5]}`, 10, 220);
    ctx.fillStyle = "#3f7349";
    ctx.fillRect(0, 227, (120 / goal) * chakraScore[4], 30);
    ctx.fillStyle = "grey";
    ctx.fillText(`Chakra 4: ${chakraScore[4]}`, 10, 250);
    ctx.fillStyle = "#faef23";
    ctx.fillRect(0, 257, (120 / goal) * chakraScore[3], 30);
    ctx.fillStyle = "grey";
    ctx.fillText(`Chakra 3: ${chakraScore[3]}`, 10, 280);
    ctx.fillStyle = "#e38839";
    ctx.fillRect(0, 287, (120 / goal) * chakraScore[2], 30);
    ctx.fillStyle = "grey";
    ctx.fillText(`Chakra 2: ${chakraScore[2]}`, 10, 310);
    ctx.fillStyle = "#b82e21";
    ctx.fillRect(0, 317, (120 / goal) * chakraScore[1], 30);
    ctx.fillStyle = "grey";
    ctx.fillText(`Chakra 1: ${chakraScore[1]}`, 10, 340);
    if (player === "player1") {
      player1.points = points;
      player1.time = time;
      if (player1.points > record.points) {
        record.points = points;
        record.time = time;
        record.owner = "Player1";
      } else if (
        player1.points === record.points &&
        player1.time > record.time
      ) {
        record.points = points;
        record.time = time;
        record.owner = "Player1";
      }
    } else {
      player2.points = points;
      player2.time = time;
      if (player2.points > record.points) {
        record.points = points;
        record.time = time;
        record.owner = "Player2";
      } else if (
        player2.points === record.points &&
        player2.time < record.time
      ) {
        record.points = points;
        record.time = time;
        record.owner = "Player2";
      }
    }
    ctx.fillStyle = "#ede9ce";
    ctx.fillText(`Player 1: Aang`, 130, 20);
    ctx.fillText(`Points: ${player1.points}`, 130, 50);
    ctx.fillText(`Time: ${player1.time} sec`, 130, 80);
    ctx.fillText(`Player 2: Guru Pathik`, 300, 20);
    ctx.fillText(`Points: ${player2.points}`, 300, 50);
    ctx.fillText(`Time: ${player2.time} sec`, 300, 80);
    ctx.fillText(`Record: ${record.owner}`, 750, 20);
    ctx.fillText(`Points: ${record.points}`, 750, 50);
    ctx.fillText(`Time: ${record.time} sec`, 750, 80);
  }
}

class Avatar {
  constructor() {
    this.x = 500;
    this.y = canvas.height - 100;
    this.width = 75;
    this.height = 83;
    this.sx = player === "player1" ? 100 : 12;
    this.sy = player === "player1" ? 170 : 0;
    this.sw = player === "player1" ? 750 : 460;
    this.sh = player === "player1" ? 830 : 500;
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
    this.x = 120 + Math.floor(Math.random() * (canvas.width - 150));
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
    this.x = 0;
    this.y = 370;
    this.width = 119;
    this.height = 135;
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
      if (item.chakraNum === chakraStatus && chakraScore[chakraStatus] < goal) {
        chakraScore[chakraStatus]++;
        item.y = item.y + 200;
      } else {
        lives--;
        item.y = item.y + 200;
      }
      if (lives === 0 || chakraScore.reduce((a, b) => a + b) === goal * 7)
        gameOver();
    }
  });
}

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

function update() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fondo.draw();
  avatar.draw();
  meditator.draw();
  generateItems();
  drawingItems();
  if (!requestId) gameOver();
  if (requestId) {
    requestId = requestAnimationFrame(update);
  }
}
function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fondo.draw();
  requestId = undefined;
  ctx.font = "80px Avenir";
  if (player === "player1") {
    ctx.fillText("Player2 turn", 300, 300);
  } else {
    if (player2.points > player1.points) {
      ctx.fillText("Game Over", 300, 200);
      ctx.fillText("Player 2 Wins!", 300, 300);
    } else if (player2.points === record.points && player2.time < record.time) {
      ctx.fillText("Game Over", 300, 200);
      ctx.fillText("Player 2 Wins!", 300, 300);
    } else {
      ctx.fillText("Game Over", 300, 200);
      ctx.fillText("Player 1 Wins!", 300, 300);
    }
  }
  audio.pause();
  startButton.onclick = restart;
}
function restart() {
  chakraStatus = 1;
  meditator.sx = 15;
  frames = 0;
  lives = 3;
  points = 0;
  time = 0;
  chakraScore = chakraScore.map(x => (x = 0));
  audio.currentTime = 0;
  avatar.x = 500;
  items = [];
  if (player === "player1") {
    player = "player2";
    avatar.image.src = "images/GuruPathik.png";
    avatar.sx = 12;
    avatar.sy = 0;
    avatar.sw = 460;
    avatar.sh = 500;
  } else {
    player = "player1";
    avatar.image.src = "images/aang-meditando.png";
    avatar.sx = 100;
    avatar.sy = 170;
    avatar.sw = 750;
    avatar.sh = 830;
  }
  startGame();
}
function startGame() {
  audio.play();
  requestId = requestAnimationFrame(update);
}
startButton.onclick = startGame;
