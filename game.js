let shards = +localStorage.getItem('ss_shards') || 0;
let frame = 1;
let earned = 0;

const balls = [
  { id:'basic', name:'Basic Ball', price:0, file:'basic_ball-1.png', icon:'🎳' },
  { id:'fire', name:'Fire Ball', price:1000, file:'fire_ball-1.png', icon:'🔥' },
  { id:'lightning', name:'Lightning Ball', price:2500, file:'lightning_ball.png', icon:'⚡' },
  { id:'diamond', name:'Diamond Ball', price:5000, file:'diamond_ball.png', icon:'💎' },
  { id:'rainbow', name:'Rainbow Ball', price:10000, file:'rainbow_ball-1.png', icon:'🌈' },
  { id:'golden', name:'Golden Ball', price:25000, file:'golden_ball.png', icon:'👑' }
];

let owned = JSON.parse(localStorage.getItem('ss_owned_balls') || '["basic"]');
let selectedBall = localStorage.getItem('ss_selected_ball') || 'basic';

const qs = [
  ['Maths','7 + 5 = ?',['10','12','14'],1],
  ['Science','Which is the Red Planet?',['Mars','Venus','Jupiter'],0],
  ['General Knowledge','How many days are in a week?',['5','7','9'],1],
  ['Maths','9 × 3 = ?',['18','27','36'],1],
  ['Science','Which gas do humans need to breathe?',['Oxygen','Helium','Neon'],0],
  ['General Knowledge','Which is the largest ocean?',['Atlantic','Indian','Pacific'],2],
  ['Maths','50 ÷ 5 = ?',['5','10','15'],1],
  ['Science','At what temperature does water freeze?',['0°C','10°C','100°C'],0],
  ['General Knowledge','How many continents are there?',['5','6','7'],2],
  ['Maths','100 - 37 = ?',['53','63','73'],1]
];

function show(id) {
  document.querySelectorAll('section').forEach(s => s.classList.add('hide'));
  document.getElementById(id).classList.remove('hide');

  document.getElementById('shards').textContent = shards;

  if (id === 'balls') renderMyBalls();
  if (id === 'shop') renderShop();

  updateLaneBall();
}

function start() {
  frame = 1;
  earned = 0;

  show('game');

  document.getElementById('frame').textContent = 1;
  document.getElementById('q').innerHTML = '';
  document.getElementById('bowl').disabled = false;

  updateLaneBall();
}

function updateLaneBall() {
  const ball = document.getElementById('ball');
  if (!ball) return;

  const b = balls.find(x => x.id === selectedBall);
  if (!b) return;

  ball.innerHTML =
    '<img src="' + b.file + '" alt="' + b.name + '">' ;
}

function bowl() {
  document.getElementById('bowl').disabled = true;

  const ball = document.getElementById('ball');
  const pins = document.getElementById('pins');

  ball.classList.add('roll');

  setTimeout(() => {
    ball.classList.remove('roll');

    pins.style.transform = 'scale(0.85) rotate(2deg)';

    setTimeout(() => {
      pins.style.transform = '';
      question();
    }, 250);

  }, 900);
}

function question() {
  const q = qs[frame - 1];

  document.getElementById('q').innerHTML =
    '<b>' + q[0] + ' 🧠</b>' +
    '<p>' + q[1] + '</p>' +
    q[2].map((a,i) =>
      '<button class="answer" onclick="answer(' +
      i + ',' + q[3] + ')">' + a + '</button>'
    ).join('');
}

function answer(i,c) {
  const bs = document.querySelectorAll('.answer');

  bs.forEach(b => b.disabled = true);

  if (i === c) {
    bs[i].classList.add('correct');

    shards += 5;
    earned += 5;

    localStorage.setItem('ss_shards', shards);
    document.getElementById('shards').textContent = shards;

  } else {
    bs[i].classList.add('wrong');
    bs[c].classList.add('correct');
  }

  setTimeout(() => {
    frame++;

    if (frame > 10) {

      document.getElementById('q').innerHTML =
        '<h2>🏆 GAME COMPLETE!</h2>' +
        '<p>You earned <b>' + earned + ' 🌱 Star Shards</b>.</p>' +
        '<button onclick="start()">PLAY AGAIN 🎳</button>' +
        '<button onclick="show(\'home\')">HOME 🏠</button>';

    } else {

      document.getElementById('frame').textContent = frame;
      document.getElementById('q').innerHTML = '';
      document.getElementById('bowl').disabled = false;

    }

  },900);
}

function buyBall(id) {
  const b = balls.find(x => x.id === id);

  if (!b || owned.includes(id)) return;

  if (shards < b.price) {
    alert('You need ' + b.price + ' 🌱 Star Shards.');
    return;
  }

  shards -= b.price;
  owned.push(id);

  localStorage.setItem('ss_shards', shards);
  localStorage.setItem('ss_owned_balls', JSON.stringify(owned));

  document.getElementById('shards').textContent = shards;

  renderShop();
}

function useBall(id) {
  if (!owned.includes(id)) return;

  selectedBall = id;

  localStorage.setItem('ss_selected_ball', selectedBall);

  updateLaneBall();

  renderMyBalls();
}

function renderMyBalls() {
  const section = document.getElementById('balls');

  section.innerHTML =
    '<button onclick="show(\'home\')">← HOME</button>' +
    '<h2>MY BALLS 🎳</h2>' +
    '<p>Select the ball you want to bowl with.</p>' +
    balls.filter(b => owned.includes(b.id)).map(b =>
      '<div class="card">' +
      '<img src="' + b.file + '" style="width:120px;height:120px;object-fit:contain">' +
      '<h3>' + b.icon + ' ' + b.name + '</h3>' +
      '<button onclick="useBall(\'' + b.id + '\')">' +
      (selectedBall === b.id ? '✅ USING THIS BALL' : 'USE BALL') +
      '</button>' +
      '</div>'
    ).join('');
}

function renderShop() {
  const section = document.getElementById('shop');

  section.innerHTML =
    '<button onclick="show(\'home\')">← HOME</button>' +
    '<h2>BALL SHOP 🛒</h2>' +
    '<p>Use 🌱 Star Shards to unlock bowling balls.</p>' +
    balls.map(b => {

      const isOwned = owned.includes(b.id);

      return '<div class="card">' +
        '<img src="' + b.file + '" style="width:140px;height:140px;object-fit:contain">' +
        '<h3>' + b.icon + ' ' + b.name + '</h3>' +
        '<p>' + (b.price === 0 ? 'FREE' : b.price.toLocaleString() + ' 🌱') + '</p>' +

        (isOwned
          ? '<button disabled>✅ OWNED</button>'
          : '<button onclick="buyBall(\'' + b.id + '\')">BUY / UNLOCK</button>'
        ) +

        '</div>';

    }).join('') +

    '<p>🌱 Earn 5 Star Shards for every correct answer.</p>';
}

show('home');
