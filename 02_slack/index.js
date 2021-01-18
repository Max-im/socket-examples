const express = require('express');
const socketIO = require('socket.io');
const Message = require('./classes/Message');

const app = express();
const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const server = app.listen(8000);
const io = socketIO(server);

io.on('connection', (socket) => {
  const nsList = namespaces.map((ns) => ({ img: ns.img, endpoint: ns.endpoint }));
  socket.emit('nsList', nsList);
});

namespaces.forEach((ns) => {
  io.of(ns.endpoint).on('connection', (nsSocket) => {
    const { username } = nsSocket.handshake.query;
    console.log(`ID: ${nsSocket.id}. Endpoint: ${ns.endpoint}`);
    nsSocket.emit('roomsList', ns.rooms);
    nsSocket.on('joinRoom', (roomName, callback) => {
      const prevRoom = Array.from(nsSocket.rooms)[1];

      if (prevRoom) {
        const clientsUnmber = nsSocket.adapter.rooms.get(prevRoom).size;
        nsSocket.leave(prevRoom);
        io.of(ns.endpoint).in(prevRoom).emit('updateMembersNum', clientsUnmber);
      }
      nsSocket.join(roomName);
      const clientsUnmber = nsSocket.adapter.rooms.get(roomName).size;
      const room = ns.rooms.find((item) => item.roomTitle === roomName);
      callback({ history: room.history });
      io.of(ns.endpoint).in(roomName).emit('updateMembersNum', clientsUnmber);
    });

    nsSocket.on('newMessage', (message) => {
      const roomName = Array.from(nsSocket.rooms)[1];
      const msgObj = new Message(message, 'https://via.placeholder.com/30', username);
      const room = ns.rooms.find((item) => item.roomTitle === roomName);
      room.addMessage(msgObj);
      io.of(ns.endpoint).to(roomName).emit('msgToClient', msgObj);
    });
  });
});

function getRoomUsersNum() {}
