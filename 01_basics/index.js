const express = require('express');
const socketIO = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/public'));

const server = app.listen(8000);
const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    io.emit('newMessage', data);
  });
});
