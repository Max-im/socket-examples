const { io } = require('../server');
const {checkForOrbCollisions, checkForPlayerCollisions} = require('../checkCollisions');

const Orb = require('../classes/Orb');
const PlayerConfig = require('../classes/PlayerConfig');
const PlayerData = require('../classes/PlayerData');
const Player = require('../classes/Player');

const settings = {
  defaultOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000,
};

let orbs = [];
let players = [];

initGame();

setInterval(() => {
  if(players.length) {
    io.to('game').emit('tock', { players })
  }
}, 33);


io.on('connect', (socket) => {
  let player;
  
  socket.on('init', (data) => {
    socket.join('game');
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(data.playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    players.push(playerData);
    socket.emit('initReturn', orbs)
    setInterval(() => {
      socket.emit('tickTock', { 
        playerX: player.playerData.locX,
        playerY: player.playerData.locY
      })
    }, 33);
  });


  socket.on('tick', (data) => {
    if(!player) return;
    
    xV = player.playerConfig.xVector = data.xVector;
    yV = player.playerConfig.yVector = data.yVector;
    const moveX = player.playerConfig.speed * xV;
    const moveY = player.playerConfig.speed * yV;
    if(isNaN(moveX) || isNaN(moveY)) return;


    if (
      (player.playerData.locX < 5 && xV < 0) ||
      (player.playerData.locX > settings.worldWidth && xV > 0)
    ) {
      player.playerData.locY -= moveY;
    } else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > settings.worldHeight && yV < 0)) {
      player.playerData.locX += moveX;
    } else {
      player.playerData.locX += moveX;
      player.playerData.locY -= moveY;
    }

    checkForOrbCollisions(player.playerData, player.playerConfig, orbs, settings)
      .then(data => {
        const orbData = {
          index: data,
          newOrb: orbs[data]
        }        
        io.sockets.emit('orbSwitch', orbData);
        io.sockets.emit('updateLeaderBoard', getLeaderBoard());
        socket.emit('playerScoreUpdate', player.playerData.score);
      }).catch(()=> {});

    checkForPlayerCollisions(player.playerData, player.playerConfig, players, player.socketId)
      .then(data => {
        io.sockets.emit('updateLeaderBoard', getLeaderBoard());
        socket.emit('playerScoreUpdate', player.playerData);
        socket.emit('playerKilled', data);
      })
      .catch(() =>{});
  });

  socket.on('disconnect', (data)=> {
    if (player && player.playerData) {
      const i = players.findIndex(item => item.uid === player.playerData.uid);
      players.splice(i, 1);
      io.sockets.emit('updateLeaderBoard', getLeaderBoard());
    }
  });
});

function getLeaderBoard(){
  players.sort((a,b) => b.score - a.score);
  const leaderBoard = players.map(player => ({name: player.name, score: player.score}));
  return leaderBoard;
}

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
