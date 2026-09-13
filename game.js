let shards = +localStorage.getItem('ss_shards') || 0;

let frame = 1;
let earned = 0;


/* =========================
   NORMAL BALLS
========================= */

const balls = [

  {
    id: 'basic',
    name: 'Basic Ball',
    price: 0,
    file: 'basic_ball-1.png',
    icon: '🎳'
  },

  {
    id: 'fire',
    name: 'Fire Ball',
    price: 1000,
    file: 'fire_ball-1.png',
    icon: '🔥'
  },

  {
    id: 'lightning',
    name: 'Lightning Ball',
    price: 2500,
    file: 'lightning_ball.png',
    icon: '⚡'
  },

  {
    id: 'diamond',
    name: 'Diamond Ball',
    price: 5000,
    file: 'diamond_ball.png',
    icon: '💎'
  },

  {
    id: 'rainbow',
    name: 'Rainbow Ball',
    price: 10000,
    file: 'rainbow_ball-1.png',
    icon: '🌈'
  },

  {
    id: 'golden',
    name: 'Golden Ball',
    price: 25000,
    file: 'golden_ball.png',
    icon: '👑'
  }

];


/* =========================
   NORMAL PINS
========================= */

const pins = [

  {
    id: 'classic',
    name: 'Classic Pins',
    price: 0,
    file: 'classic_pins.png',
    icon: '⚪'
  },

  {
    id: 'fire',
    name: 'Fire Pins',
    price: 1500,
    file: 'fire_pins.png',
    icon: '🔥'
  },

  {
    id: 'lightning',
    name: 'Lightning Pins',
    price: 3000,
    file: 'lightning_pins.png',
    icon: '⚡'
  },

  {
    id: 'diamond',
    name: 'Diamond Pins',
    price: 10000,
    file: 'diamond_pins.png',
    icon: '💎'
  },

  {
    id: 'golden',
    name: 'Golden Pins',
    price: 17000,
    file: 'golden_pins.png',
    icon: '👑'
  }

];


/* =========================
   PREMIUM BALLS
========================= */

const premiumBalls = [

  {
    id: 'galaxy',
    name: 'Galaxy Ball',
    price: 199,
    icon: '🌌'
  },

  {
    id: 'dragon',
    name: 'Dragon Ball',
    price: 299,
    icon: '🐉'
  },

  {
    id: 'frost',
    name: 'Frost Ball',
    price: 399,
    icon: '❄️'
  },

  {
    id: 'cyberstorm',
    name: 'Cyber Storm Ball',
    price: 499,
    icon: '⚡'
  },

  {
    id: 'phoenix',
    name: 'Phoenix Ball',
    price: 699,
    icon: '🔥'
  },

  {
    id: 'blackhole',
    name: 'Black Hole Ball',
    price: 999,
    icon: '🕳️'
  }

];


/* =========================
   PREMIUM PINS
========================= */

const premiumPins = [

  {
    id: 'galaxy',
    name: 'Galaxy Pins',
    price: 99,
    icon: '🌌'
  },

  {
    id: 'dragon',
    name: 'Dragon Pins',
    price: 149,
    icon: '🐉'
  },

  {
    id: 'frost',
    name: 'Frost Pins',
    price: 199,
    icon: '❄️'
  },

  {
    id: 'cyberstorm',
    name: 'Cyber Storm Pins',
    price: 249,
    icon: '⚡'
  },

  {
    id: 'phoenix',
    name: 'Phoenix Pins',
    price: 349,
    icon: '🔥'
  },

  {
    id: 'blackhole',
    name: 'Black Hole Pins',
    price: 499,
    icon: '🕳️'
  }

];


/* =========================
   OWNED ITEMS
========================= */

let ownedBalls = JSON.parse(
  localStorage.getItem('ss_owned_balls') || '["basic"]'
);

let ownedPins = JSON.parse(
  localStorage.getItem('ss_owned_pins') || '["classic"]'
);


let selectedBall =
  localStorage.getItem('ss_selected_ball') || 'basic';

let selectedPins =
  localStorage.getItem('ss_selected_pins') || 'classic';


/* =========================
   QUESTIONS
========================= */

const qs = [

  ['Maths','7 + 5 = ?',['10','12','14'],1],

  ['Science','Which is the Red Planet?',
   ['Mars','Venus','Jupiter'],0],

  ['General Knowledge','How many days are in a week?',
   ['5','7','9'],1],

  ['Maths','9 × 3 = ?',
   ['18','27','36'],1],

  ['Science','Which gas do humans need to breathe?',
   ['Oxygen','Helium','Neon'],0],

  ['General Knowledge','Which is the largest ocean?',
   ['Atlantic','Indian','Pacific'],2],

  ['Maths','50 ÷ 5 = ?',
   ['5','10','15'],1],

  ['Science','At what temperature does water freeze?',
   ['0°C','10°C','100°C'],0],

  ['General Knowledge','How many continents are there?',
   ['5','6','7'],2],

  ['Maths','100 - 37 = ?',
   ['53','63','73'],1]

];


/* =========================
   BALANCE
========================= */

function updateBalance() {

  const el =
    document.getElementById('shards');

  if (el) {
    el.textContent =
      shards.toLocaleString();
  }

}


/* =========================
   SCREEN NAVIGATION
========================= */

function show(id) {

  document
    .querySelectorAll('section')
    .forEach(section => {

      section.classList.add('hide');

    });


  const target =
    document.getElementById(id);


  if (target) {

    target.classList.remove('hide');

  }


  updateBalance();


  if (id === 'balls') {

    renderMyBalls();

  }


  if (id === 'shop') {

    renderShop();

  }


  updateLaneItems();

}


/* =========================
   START GAME
========================= */

function start() {

  frame = 1;

  earned = 0;


  show('game');


  document.getElementById('frame')
    .textContent = '1';


  document.getElementById('q')
    .innerHTML = '';


  document.getElementById('bowl')
    .disabled = false;


  updateLaneItems();

}


/* =========================
   UPDATE LANE BALL + PINS
========================= */

function updateLaneItems() {

  const ball =
    document.getElementById('ball');


  const pinArea =
    document.getElementById('pins');


  const b =
    balls.find(x => x.id === selectedBall);


  const p =
    pins.find(x => x.id === selectedPins);


  if (ball && b) {

    ball.innerHTML =
      '<img src="' +
      b.file +
      '" alt="' +
      b.name +
      '" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'🎳\';">';

  }


  if (pinArea && p) {

    pinArea.innerHTML =
      '<div class="pin-design ' +
      p.id +
      '">' +

      '<span>⚪</span> ' +
      '<span>⚪</span> ' +
      '<span>⚪</span> ' +
      '<span>⚪</span> ' +
      '<span>⚪</span>' +

      '<br>' +

      '<span>⚪</span> ' +
      '<span>⚪</span> ' +
      '<span>⚪</span> ' +
      '<span>⚪</span> ' +
      '<span>⚪</span>' +

      '</div>';

  }

}


/* =========================
   BOWL
========================= */

function bowl() {

  const bowlButton =
    document.getElementById('bowl');


  if (bowlButton.disabled) {
    return;
  }


  bowlButton.disabled = true;


  const ball =
    document.getElementById('ball');


  const pinArea =
    document.getElementById('pins');


  if (ball) {

    ball.classList.add('roll');

  }


  setTimeout(() => {

    if (ball) {

      ball.classList.remove('roll');

    }


    if (pinArea) {

      pinArea.style.transform =
        'scale(0.85) rotate(2deg)';

    }


    setTimeout(() => {

      if (pinArea) {

        pinArea.style.transform = '';

      }


      question();

    }, 250);

  }, 900);

}


/* =========================
   QUESTION
========================= */

function question() {

  const q =
    qs[frame - 1];


  document.getElementById('q').innerHTML =

    '<b>' +
    q[0] +
    ' 🧠</b>' +

    '<p>' +
    q[1] +
    '</p>' +

    q[2]
      .map((answerText, index) =>

        '<button class="answer" onclick="answer(' +
        index +
        ',' +
        q[3] +
        ')">' +

        answerText +

        '</button>'

      )
      .join('');

}


/* =========================
   ANSWER
========================= */

function answer(index, correctIndex) {

  const buttons =
    document.querySelectorAll('.answer');


  buttons.forEach(button => {

    button.disabled = true;

  });


  if (index === correctIndex) {

    buttons[index]
      .classList.add('correct');


    shards += 5;

    earned += 5;


    localStorage.setItem(
      'ss_shards',
      shards
    );


    updateBalance();

  }

  else {

    buttons[index]
      .classList.add('wrong');


    buttons[correctIndex]
      .classList.add('correct');

  }


  setTimeout(() => {

    frame++;


    if (frame > 10) {

      document.getElementById('q').innerHTML =

        '<h2>🏆 GAME COMPLETE!</h2>' +

        '<p>You earned <b>' +
        earned +
        ' 🌱 Star Shards</b>.</p>' +

        '<button onclick="start()">' +
        'PLAY AGAIN 🎳' +
        '</button>' +

        '<button onclick="show(\'home\')">' +
        'HOME 🏠' +
        '</button>';

    }

    else {

      document.getElementById('frame')
        .textContent = frame;


      document.getElementById('q')
        .innerHTML = '';


      document.getElementById('bowl')
        .disabled = false;

    }

  }, 900);

}


/* =========================
   BUY BALL
========================= */

function buyBall(id) {

  const ball =
    balls.find(item => item.id === id);


  if (!ball) {
    return;
  }


  if (ownedBalls.includes(id)) {
    return;
  }


  if (shards < ball.price) {

    alert(
      'You need ' +
      ball.price.toLocaleString() +
      ' 🌱 Star Shards.'
    );

    return;

  }


  shards -= ball.price;

  ownedBalls.push(id);


  localStorage.setItem(
    'ss_shards',
    shards
  );


  localStorage.setItem(
    'ss_owned_balls',
    JSON.stringify(ownedBalls)
  );


  updateBalance();

  renderShop();

}


/* =========================
   BUY PINS
========================= */

function buyPins(id) {

  const pin =
    pins.find(item => item.id === id);


  if (!pin) {
    return;
  }


  if (ownedPins.includes(id)) {
    return;
  }


  if (shards < pin.price) {

    alert(
      'You need ' +
      pin.price.toLocaleString() +
      ' 🌱 Star Shards.'
    );

    return;

  }


  shards -= pin.price;

  ownedPins.push(id);


  localStorage.setItem(
    'ss_shards',
    shards
  );


  localStorage.setItem(
    'ss_owned_pins',
    JSON.stringify(ownedPins)
  );


  updateBalance();

  renderShop();

}


/* =========================
   USE BALL
========================= */

function useBall(id) {

  if (!ownedBalls.includes(id)) {
    return;
  }


  selectedBall = id;


  localStorage.setItem(
    'ss_selected_ball',
    selectedBall
  );


  updateLaneItems();

  renderMyBalls();

}


/* =========================
   USE PINS
========================= */

function usePins(id) {

  if (!ownedPins.includes(id)) {
    return;
  }


  selectedPins = id;


  localStorage.setItem(
    'ss_selected_pins',
    selectedPins
  );


  updateLaneItems();

  renderMyPins();

}


/* =========================
   MY BALLS
========================= */

function renderMyBalls() {

  const section =
    document.getElementById('balls');


  section.innerHTML =

    '<button onclick="show(\'home\')">' +
    '← HOME</button>' +

    '<h2>MY BALLS 🎳</h2>' +

    '<p>Select your bowling ball.</p>' +

    balls
      .filter(ball =>
        ownedBalls.includes(ball.id)
      )
      .map(ball =>

        '<div class="card">' +

        '<img src="' +
        ball.file +
        '" alt="' +
        ball.name +
        '" style="width:140px;height:140px;object-fit:contain" onerror="this.style.display=\'none\'">' +

        '<h3>' +
        ball.icon +
        ' ' +
        ball.name +
        '</h3>' +

        '<button onclick="useBall(\'' +
        ball.id +
        '\')">' +

        (
          selectedBall === ball.id
            ? '✅ USING THIS BALL'
            : 'USE BALL'
        ) +

        '</button>' +

        '</div>'

      )
      .join('');

}


/* =========================
   MY PINS
========================= */

function renderMyPins() {

  const section =
    document.getElementById('balls');


  section.innerHTML =

    '<button onclick="show(\'home\')">' +
    '← HOME</button>' +

    '<h2>MY PINS ⚪</h2>' +

    '<p>Select your bowling pins.</p>' +

    ownedPins
      .map(id =>
        pins.find(pin => pin.id === id)
      )
      .filter(Boolean)
      .map(pin =>

        '<div class="card">' +

        '<img src="' +
        pin.file +
        '" alt="' +
        pin.name +
        '" style="width:180px;height:180px;object-fit:contain" onerror="this.style.display=\'none\'">' +

        '<h3>' +
        pin.icon +
        ' ' +
        pin.name +
        '</h3>' +

        '<button onclick="usePins(\'' +
        pin.id +
        '\')">' +

        (
          selectedPins === pin.id
            ? '✅ USING THESE PINS'
            : 'USE PINS'
        ) +

        '</button>' +

        '</div>'

      )
      .join('');

}


/* =========================
   STORE
========================= */

function renderShop() {

  const section =
    document.getElementById('shop');


  section.innerHTML =

    '<button onclick="show(\'home\')">' +
    '← HOME</button>' +

    '<h1>🛒 STORE</h1>' +

    '<p>Unlock awesome bowling balls and pins!</p>' +


    /* NORMAL BALLS */

    '<div class="shop-section">' +

    '<h2>🎳 STAR SHARD BALLS</h2>' +

    '<p>🌱 Use Star Shards to unlock!</p>' +

    balls.map(ball => {

      const isOwned =
        ownedBalls.includes(ball.id);


      return (

        '<div class="card shop-card">' +

        '<img src="' +
        ball.file +
        '" alt="' +
        ball.name +
        '" style="width:150px;height:150px;object-fit:contain" onerror="this.style.display=\'none\'">' +

        '<h3>' +
        ball.icon +
        ' ' +
        ball.name +
        '</h3>' +

        '<p><b>' +

        (
          ball.price === 0
            ? 'FREE'
            : ball.price.toLocaleString() +
              ' 🌱'
        ) +

        '</b></p>' +

        (
          isOwned

            ? '<button disabled>✅ OWNED</button>'

            : '<button onclick="buyBall(\'' +
              ball.id +
              '\')">' +
              'BUY / UNLOCK' +
              '</button>'
        ) +

        '</div>'

      );

    }).join('') +

    '</div>' +


    /* NORMAL PINS */

    '<div class="shop-section">' +

    '<h2>⚪ STAR SHARD PINS</h2>' +

    '<p>🌱 Use Star Shards to unlock!</p>' +

    pins.map(pin => {

      const isOwned =
        ownedPins.includes(pin.id);


      return (

        '<div class="card shop-card">' +

        '<img src="' +
        pin.file +
        '" alt="' +
        pin.name +
        '" style="width:180px;height:180px;object-fit:contain" onerror="this.style.display=\'none\'">' +

        '<h3>' +
        pin.icon +
        ' ' +
        pin.name +
        '</h3>' +

        '<p><b>' +

        (
          pin.price === 0
            ? 'FREE'
            : pin.price.toLocaleString() +
              ' 🌱'
        ) +

        '</b></p>' +

        (
          isOwned

            ? '<button disabled>✅ OWNED</button>'

            : '<button onclick="buyPins(\'' +
              pin.id +
              '\')">' +
              'BUY / UNLOCK' +
              '</button>'
        ) +

        '</div>'

      );

    }).join('') +

    '</div>' +


    /* PREMIUM BALLS */

    '<div class="premium-section">' +

    '<h2>💎 PREMIUM EXCLUSIVE BALLS</h2>' +

    '<p><b>🔒 COMING SOON</b></p>' +

    '<p>Available after launch.</p>' +


    premiumBalls.map(ball =>

      '<div class="card premium-card">' +

      '<h3>' +
      ball.icon +
      ' ' +
      ball.name +
      '</h3>' +

      '<p><b>₹' +
      ball.price +
      '</b></p>' +

      '<button disabled>' +
      '🔒 COMING SOON' +
      '</button>' +

      '</div>'

    ).join('') +

    '</div>' +


    /* PREMIUM PINS */

    '<div class="premium-section">' +

    '<h2>💎 PREMIUM EXCLUSIVE PINS</h2>' +

    '<p><b>🔒 COMING SOON</b></p>' +

    '<p>Available after launch.</p>' +


    premiumPins.map(pin =>

      '<div class="card premium-card">' +

      '<h3>' +
      pin.icon +
      ' ' +
      pin.name +
      '</h3>' +

      '<p><b>₹' +
      pin.price +
      '</b></p>' +

      '<button disabled>' +
      '🔒 COMING SOON' +
      '</button>' +

      '</div>'

    ).join('') +

    '</div>' +


    '<p><b>Scroll down to explore all premium exclusives.</b></p>' +

    '<p>No real-money purchases are enabled in the launch version.</p>';

}


/* =========================
   INITIAL LOAD
========================= */

updateBalance();

updateLaneItems();

show('home');
/* ================= 3D BOWLING LANE ================= */

let threeScene;
let threeCamera;
let threeRenderer;
let threeBall;
let threePins = [];

function create3DBowlingLane() {

  if (typeof THREE === "undefined") return;

  const lane = document.querySelector(".lane");
  if (!lane) return;

  const oldPins = document.getElementById("pins");
  const oldBall = document.getElementById("ball");

  if (oldPins) oldPins.style.display = "none";
  if (oldBall) oldBall.style.display = "none";

  threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(0x06142f);

  threeCamera = new THREE.PerspectiveCamera(
    45,
    lane.clientWidth / lane.clientHeight,
    0.1,
    100
  );

  threeCamera.position.set(0, 5, 11);
  threeCamera.lookAt(0, 0, -4);

  threeRenderer = new THREE.WebGLRenderer({
    antialias: true
  });

  threeRenderer.setSize(
    lane.clientWidth,
    lane.clientHeight
  );

  threeRenderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  lane.appendChild(threeRenderer.domElement);

  /* LIGHT */

  const light = new THREE.HemisphereLight(
    0xffffff,
    0x223355,
    2
  );

  threeScene.add(light);

  /* LANE */

  const laneGeometry = new THREE.BoxGeometry(
    5,
    0.25,
    18
  );

  const laneMaterial = new THREE.MeshStandardMaterial({
    color: 0xb87942,
    roughness: 0.65
  });

  const laneMesh = new THREE.Mesh(
    laneGeometry,
    laneMaterial
  );

  laneMesh.position.y = -0.15;
  laneMesh.position.z = -1;

  threeScene.add(laneMesh);

  /* BALL */

  const ballGeometry =
    new THREE.SphereGeometry(0.55, 32, 32);

  const ballMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.25,
      roughness: 0.2
    });

  threeBall = new THREE.Mesh(
    ballGeometry,
    ballMaterial
  );

  threeBall.position.set(0, 0.55, 6);

  threeScene.add(threeBall);

  /* PINS */

  const pinMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35
    });

  const pinPositions = [
    [0, -6.5],
    [-0.65, -7.1],
    [0.65, -7.1],
    [-1.3, -7.7],
    [0, -7.7],
    [1.3, -7.7],
    [-1.95, -8.3],
    [-0.65, -8.3],
    [0.65, -8.3],
    [1.95, -8.3]
  ];

  pinPositions.forEach(function(pos) {

    const pinGeometry =
      new THREE.CylinderGeometry(
        0.22,
        0.32,
        1.15,
        24
      );

    const pin = new THREE.Mesh(
      pinGeometry,
      pinMaterial
    );

    pin.position.set(
      pos[0],
      0.55,
      pos[1]
    );

    threeScene.add(pin);
    threePins.push(pin);
  });

  /* ANIMATION */

  function animate3D() {

    requestAnimationFrame(animate3D);

    if (threeBall) {
      threeBall.rotation.x += 0.03;
    }

    threeRenderer.render(
      threeScene,
      threeCamera
    );
  }

  animate3D();
}

window.addEventListener(
  "load",
  create3DBowlingLane
);
