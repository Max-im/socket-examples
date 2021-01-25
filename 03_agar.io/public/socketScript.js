const socketUrl = 'http://localhost:8000';
const socket = io.connect(socketUrl);

function init() {
  draw();
  socket.emit('init', { playerName: player.name });
}


socket.on('initReturn', (orbsArr) => {
  orbs = orbsArr;
  setInterval(() => {
    socket.emit('tick', { xVector: player.xVector, yVector: player.yVector })
  }, 33);
});


socket.on('tock', (data) => {
  players = data.players;
});

socket.on('orbSwitch', orbData => {
  orbs.splice(orbData.index, 1, orbData.newOrb);
});

socket.on('tickTock', data => {
  player.locX = data.playerX;
  player.locY = data.playerY;
});

socket.on('updateLeaderBoard', board => {
  const htmlContent = board.map(item => {
    return `<li class="leaderboard-player">${item.name}: ${item.score}</li>`
  }).join('');
  $('.leader-board').html(htmlContent);
});

socket.on('playerScoreUpdate', score =>{
  $('.player-score').text(score);
});

socket.on('playerKilled', (data) => {

});