let player = {
  radius: 10,
  locX: Math.floor(500 * Math.random() + 10),
  locY: Math.floor(500 * Math.random() + 10),
};
let orbs = [];
let players = [];
let xVector;
let yVector;

const canvas = document.getElementById('the-canvas');
const context = canvas.getContext('2d');
canvas.height = $(window).height();
canvas.width = $(window).width();

$('#loginModal').modal('show');

$('.name-form').submit((e) => {
  e.preventDefault();
  player.name = $('#name-input').val();
  $('#loginModal').modal('hide');
  $('#spawnModal').modal('show');
  $('.player-name').text(player.name);
});

$('.start-game').click((e) => {
  $('.modal').modal('hide');
  $('.hiddenOnStart').removeAttr('hidden');
  init();
});
