
// =========================
// DRAW
// =========================
function draw() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;
  context.translate(camX, camY);

  const playersLen = players.length;
  for (let i = 0; i < playersLen; i++) {
    const player = players[i];
    context.beginPath();
    context.fillStyle = player.color;
    context.arc(player.locX, player.locY, player.radius, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(0,255,0)';
    context.stroke();
  }

  const orbLen = orbs.length;
  for (let i = 0; i < orbLen; i++) {
    const orb = orbs[i];
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  }

  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (event) => {
  const mousePosition = { x: event.clientX, y: event.clientY };

  const angleDeg =
    (Math.atan2(mousePosition.y - canvas.height / 2, mousePosition.x - canvas.width / 2) * 180) /
    Math.PI;

  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
    // console.log('bottom right');
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
    // console.log('bottom left');
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
    // console.log('top left');
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
    // console.log('top right');
  }

  player.xVector = xVector;
  player.yVector = yVector;
});
