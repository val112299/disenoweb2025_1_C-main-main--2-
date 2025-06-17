const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 32;
const rows = 16, cols = 16;

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const deathSound = document.getElementById("deathSound");

let score = 0;
let lives = 3;
let gameOver = false;
let fading = false;
let pacmanOpacity = 1;

const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1],
  [1,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1],
  [1,2,1,2,2,2,2,1,2,2,2,2,1,2,1,1],
  [1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1],
  [1,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1],
  [1,2,2,1,2,2,2,2,2,2,2,2,2,1,2,1],
  [1,1,2,1,1,1,1,1,1,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,1],
  [1,2,1,1,1,1,1,2,1,1,2,1,1,1,2,1],
  [1,2,2,2,2,2,1,2,1,2,2,2,2,1,2,1],
  [1,1,1,1,1,2,1,1,1,2,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const pacman = { x: 1, y: 1, dir: [1, 0] };
const ghosts = [
  { x: 14, y: 1, color: "red" },
  { x: 1, y: 13, color: "pink" },
  { x: 14, y: 13, color: "cyan" }
];

let ghostCounter = 0;
const ghostDelay = 20;

let pacmanCounter = 0;
const pacmanDelay = 10;

function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawMap() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (map[y][x] === 1) drawTile(x, y, "blue");
      else if (map[y][x] === 2) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

function drawPacman() {
  ctx.save();
  ctx.globalAlpha = pacmanOpacity;
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(
    pacman.x * tileSize + tileSize / 2,
    pacman.y * tileSize + tileSize / 2,
    tileSize / 2.5,
    0.25 * Math.PI,
    1.75 * Math.PI
  );
  ctx.lineTo(pacman.x * tileSize + tileSize / 2, pacman.y * tileSize + tileSize / 2);
  ctx.fill();
  ctx.restore();
}

function drawGhost(ghost) {
  ctx.beginPath();
  ctx.fillStyle = ghost.color;
  ctx.arc(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2, tileSize / 2.5, Math.PI, 0);
  ctx.lineTo(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2 + tileSize / 2.5);
  ctx.lineTo(ghost.x * tileSize - tileSize / 2, ghost.y * tileSize + tileSize / 2.5);
  ctx.closePath();
  ctx.fill();
}

function moveEntity(entity, target) {
  const dx = target.x - entity.x;
  const dy = target.y - entity.y;
  const options = [];

  if (Math.abs(dx) > Math.abs(dy)) {
    options.push([Math.sign(dx), 0]);
    options.push([0, Math.sign(dy)]);
  } else {
    options.push([0, Math.sign(dy)]);
    options.push([Math.sign(dx), 0]);
  }

  for (const [mx, my] of options) {
    const nx = entity.x + mx;
    const ny = entity.y + my;
    if (map[ny] && map[ny][nx] !== 1) {
      entity.x = nx;
      entity.y = ny;
      break;
    }
  }
}

function checkCollision() {
  for (const ghost of ghosts) {
    if (ghost.x === pacman.x && ghost.y === pacman.y) {
      deathSound.play();
      fading = true;
      gameOver = true;
    }
  }
}

function update() {
  if (fading) {
    pacmanOpacity -= 0.02;
    if (pacmanOpacity <= 0) {
      alert("¡Game Over!");
      location.reload();
    }
    return;
  }

  pacmanCounter++;
  if (pacmanCounter >= pacmanDelay) {
    const [dx, dy] = pacman.dir;
    const nx = pacman.x + dx;
    const ny = pacman.y + dy;

    if (map[ny] && map[ny][nx] !== 1) {
      pacman.x = nx;
      pacman.y = ny;

      if (map[ny][nx] === 2) {
        map[ny][nx] = 0;
        score += 10;
        scoreEl.textContent = "Puntos: " + score;
      }
    } else {
      const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
      pacman.dir = dirs[Math.floor(Math.random() * dirs.length)];
    }
    pacmanCounter = 0;
  }

  ghostCounter++;
  if (ghostCounter >= ghostDelay) {
    for (const ghost of ghosts) {
      moveEntity(ghost, pacman);
    }
    ghostCounter = 0;
  }

  checkCollision();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPacman();
  ghosts.forEach(drawGhost);
}

function loop() {
  update();
  draw();
  if (!gameOver || fading) requestAnimationFrame(loop);
}

loop();
