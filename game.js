let shards = +localStorage.getItem('ss_shards') || 0;
let frame = 1;
let earned = 0;

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

function show(id){
  document.querySelectorAll('section').forEach(s => s.classList.add('hide'));
  document.getElementById(id).classList.remove('hide');
  document.getElementById('shards').textContent = shards;
}

function start(){
  frame = 1;
  earned = 0;
  show('game');

  document.getElementById('frame').textContent = 1;
  document.getElementById('q').innerHTML = '';
  document.getElementById('bowl').disabled = false;
}

function bowl(){
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

function question(){
  const q = qs[frame - 1];

  document.getElementById('q').innerHTML =
    '<b>' + q[0] + ' 🧠</b>' +
    '<p>' + q[1] + '</p>' +
    q[2].map((a,i) =>
      '<button class="answer" onclick="answer(' +
      i + ',' + q[3] + ')">' + a + '</button>'
    ).join('');
}

function answer(i,c){
  const bs = document.querySelectorAll('.answer');

  bs.forEach(b => b.disabled = true);

  if(i === c){
    bs[i].classList.add('correct');

    shards++;
    earned++;

    localStorage.setItem('ss_shards', shards);
    document.getElementById('shards').textContent = shards;
  }else{
    bs[i].classList.add('wrong');
    bs[c].classList.add('correct');
  }

  setTimeout(() => {
    frame++;

    if(frame > 10){

      document.getElementById('q').innerHTML =
        '<h2>🏆 GAME COMPLETE!</h2>' +
        '<p>You earned <b>' + earned + ' 🌱 Star Shards</b>.</p>' +
        '<button onclick="start()">PLAY AGAIN 🎳</button>' +
        '<button onclick="show(\'home\')">HOME 🏠</button>';

    }else{

      document.getElementById('frame').textContent = frame;
      document.getElementById('q').innerHTML = '';
      document.getElementById('bowl').disabled = false;

    }

  },900);
}

show('home'); 



function question(){
 let q=qs[frame-1];

 document.getElementById('q').innerHTML=
 '<b>'+q[0]+' 🧠</b><p>'+q[1]+'</p>'+
 q[2].map((a,i)=>
 '<button class="answer" onclick="answer('+i+','+q[3]+')">'+a+'</button>'
 ).join('');
}

function answer(i,c){
 let bs=document.querySelectorAll('.answer');

 bs.forEach(b=>b.disabled=true);

 if(i===c){
  bs[i].classList.add('correct');
  shards++;
  earned++;
  localStorage.setItem('ss_shards',shards);
  document.getElementById('shards').textContent=shards;
 }else{
  bs[i].classList.add('wrong');
  bs[c].classList.add('correct');
 }

 setTimeout(()=>{
  frame++;

  if(frame>10){
   document.getElementById('q').innerHTML=
   '<h2>🏆 GAME COMPLETE!</h2>'+
   '<p>You earned <b>'+earned+' 🌱</b>.</p>'+
   '<button onclick="start()">PLAY AGAIN</button>'+
   '<button onclick="show(\'home\')">HOME</button>';
  }else{
   document.getElementById('frame').textContent=frame;
   document.getElementById('q').innerHTML='';
   document.getElementById('bowl').disabled=false;
  }
 },900);
}

show('home');
