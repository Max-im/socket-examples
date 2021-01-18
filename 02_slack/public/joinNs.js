let nsSocket;

document.querySelector('.namespaces').addEventListener('click', (e) => {
  const nsEl = e.target.closest('.namespace');
  if (!nsEl) return;
  const value = nsEl.getAttribute('ns');
  joinNs(value);
});

function joinNs(value) {
  const currentUrl = baseUrl + value;
  if (nsSocket) {
    nsSocket.close();
  }
  nsSocket = io(currentUrl);
  nsSocket.on('connect', () => {
    nsSocket.on('roomsList', (roomsList) => {
      populateRooms(roomsList);
      joinRoom(roomsList[0].roomTitle);
    });
  });

  nsSocket.on('msgToClient', (message) => {
    document.querySelector('#user-message').value = '';
    document.getElementById('messages').innerHTML += constructMsg(message);
  });

  nsSocket.on('updateMembersNum', (clients) => {
    document.querySelector('.curr-room-user-amount').innerHTML = clients;
  });
}

document.querySelector('#user-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.querySelector('#user-message').value.toString().trim();
  if (!message.length) return;
  nsSocket.emit('newMessage', message);
});

function populateRooms(roomsList) {
  document.querySelector('.room-list').innerHTML = roomsList
    .map(
      (room) =>
        `<li class="room"><span class="glyphicon ${
          room.privateRoom ? 'glyphicon-lock' : 'glyphicon-globe'
        }"></span>${room.roomTitle}</li>`
    )
    .join('');
}

function constructMsg(message) {
  return `<li class='message-item'><div class="user-image"><img src="${message.avatar}" /></div>
    <div class="user-message">
    <div class="user-name-time">${message.username} <span>${new Date(
    message.time
  ).toLocaleString()}</span></div>
    <div class="message-text">${message.text}</div>
    </div>
</li>`;
}
