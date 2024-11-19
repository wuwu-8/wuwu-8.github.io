const canvas = document.getElementById('birdCanvas');
const ctx = canvas.getContext('2d');

const bird = {
  x: 50,
  y: 200,
  width: 20,
  height: 15,
  velocityY: 0,
  gravity: 0.5,
  jumpStrength: -10,
};

const pipes = [];
let score = 0;

function drawBird() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.topHeight + pipe.gap, pipe.width, canvas.height - (pipe.topHeight + pipe.gap));
  }
}

function update() {
  bird.velocityY += bird.gravity;
  bird.y += bird.velocityY;

  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    pipe.x--;

    if (bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        (bird.y < pipe.topHeight || bird.y + bird.height > pipe.topHeight + pipe.gap)) {
      alert('Game Over! Score: ' + score);
      location.reload();
    }

    if (pipe.x + pipe.width < 0) {
      pipes.shift();
      score++;
    }
  }

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    alert('Game Over! Score: ' + score);
    location.reload();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 10, 20);

  requestAnimationFrame(update);
}

function createPipe() {
  const pipeWidth = 30;
  const pipeGap = 100;
  const topHeight = Math.random() * (canvas.height - pipeGap);
  pipes.push({
    x: canvas.width,
    y: 0,
    width: pipeWidth,
    topHeight: topHeight,
    gap: pipeGap,
  });
}

setInterval(createPipe, 2000);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    bird.velocityY = bird.jumpStrength;
  }
});

update();
