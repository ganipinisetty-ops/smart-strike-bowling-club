let shards=+localStorage.getItem('ss_shards')||0,frame=1,earned=0;

const qs=[
['Maths','7 + 5 = ?',['10','12','14'],1],
['Science','Red Planet?',['Mars','Venus','Jupiter'],0],
['General Knowledge','Days in a week?',['5','7','9'],1],
['Maths','9 × 3 = ?',['18','27','36'],1],
['Science','Humans need which gas?',['Oxygen','Helium','Neon'],0],
['General Knowledge','Largest ocean?',['Atlantic','Indian','Pacific'],2],
['Maths','50 ÷ 5 = ?',['5','10','15'],1],
['Science','Water freezes at?',['0°C','10°C','100°C'],0],
['General Knowledge','Continents?',['5','6','7'],2],
['Maths','100 - 37 = ?',['53','63','73'],1]
];

function show(id){
 document.querySelectorAll('section').forEach(s=>s.classList.add('hide'));
 document.getElementById(id).classList.remove('hide');
 document.getElementById('shards').textContent=shards;
}

function start(){
 frame=1;
 earned=0;
 show('game');
 document.getElementById('frame').textContent=1;
 document.getElementById('q').innerHTML='';
 document.getElementById('bowl').disabled=false;
}

function bowl(){
 document.getElementById('bowl').disabled=true;
 document.getElementById('ball').classList.add('roll');

 setTimeout(()=>{
  document.getElementById('ball').classList.remove('roll');
  question();
 },900);
}

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
