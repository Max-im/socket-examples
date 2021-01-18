document.querySelector('.room-list').addEventListener('click', (e) => {
  const roomEl = e.target.closest('.room');
  if (!roomEl) return;
  const value = roomEl.innerText;
  joinRoom(value);
});

function joinRoom(roomName) {
  nsSocket.emit('joinRoom', roomName, (response) => {
    const msgEl = document.getElementById('messages');
    msgEl.innerHTML = response.history.map((msg) => constructMsg(msg)).join('');
    msgEl.scrollTo(0, msgEl.scrollHeight);
    document.querySelector('.curr-room-text').innerText = roomName;
  });
}
