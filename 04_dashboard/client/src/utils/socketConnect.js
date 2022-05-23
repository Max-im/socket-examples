import io from 'socket.io-client';

const socket = io.connect('http://localhost:8081');
socket.emit('clientAuth','oir34uerjafiaiyy8942yh');

export default socket;