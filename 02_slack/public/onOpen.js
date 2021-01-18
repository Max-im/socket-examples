const baseUrl = 'http://localhost:8000';
const username = prompt('Please enter you name');
const initSocket = io(baseUrl, { query: { username } });

initSocket.on('nsList', (nsList) => {
  document.querySelector('.namespaces').innerHTML = nsList
    .map((ns) => `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`)
    .join('');

  joinNs(nsList[0].endpoint);
});

document.getElementById('search-box').addEventListener('input', (e) => {
  const messages = Array.from(document.querySelectorAll('.message-item'));
  if (!e.target.value.length) {
    messages.forEach((msg) => {
      msg.classList.remove('hidden');
    });
  }
  const reg = new RegExp(`.*${e.target.value}.*`, 'gi');
  messages.forEach((msg) => {
    msg.querySelector('.message-text').innerText.match(reg) ? msg : msg.classList.add('hidden');
  });
});
