const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blockSize = 40;
const worldWidth = 25;
const worldHeight = 18;

// Load saved world or create default
let world = JSON.parse(localStorage.getItem('world')) || Array.from({length:worldHeight},(_,y)=>Array.from({length:worldWidth},(_,x)=>y>13?1:0));

let player = JSON.parse(localStorage.getItem('player')) || {x:5,y:10};

// Bots array loaded from bots.js
if(!window.bots) window.bots=[];

// DRAW
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let y=0;y<worldHeight;y++){
    for(let x=0;x<worldWidth;x++){
      let color='';
      switch(world[y][x]){
        case 1: color='saddlebrown'; break;
        case 2: color='gray'; break;
        case 3: color='peru'; break;
        case 4: color='lightblue'; break;
        case 5: color='brown'; break;
        default: continue;
      }
      ctx.fillStyle=color;
      ctx.fillRect(x*blockSize,y*blockSize,blockSize,blockSize);
    }
  }
  ctx.fillStyle='blue'; ctx.fillRect(player.x*blockSize,player.y*blockSize,blockSize,blockSize);
  bots.forEach(bot=>{ctx.fillStyle=bot.mode==='npc'?'orange':'green'; ctx.fillRect(bot.x*blockSize,bot.y*blockSize,blockSize,blockSize);});
}

// SAVE function
function saveWorld(){ localStorage.setItem('world',JSON.stringify(world)); localStorage.setItem('player',JSON.stringify(player));}

// GAME LOOP
function gameLoop(){ bots.forEach(bot=>botAction(bot,world,player)); draw(); saveWorld(); requestAnimationFrame(gameLoop);}
gameLoop();

// PLAYER CONTROLS
function moveUp(){if(player.y>0) player.y--;}
function moveDown(){if(player.y<worldHeight-1) player.y++;}
function moveLeft(){if(player.x>0) player.x--;}
function moveRight(){if(player.x<worldWidth-1) player.x++;}

// BUTTONS
['up','down','left','right','follow','mine','tower','bridge','wall','dig','house','castle','farm'].forEach(id=>{
  document.getElementById(id).addEventListener('touchstart',()=>window['set'+id.charAt(0).toUpperCase()+id.slice(1)]?.());
});

// KEYBOARD
window.addEventListener('keydown', e=>{
  if(e.key==='ArrowUp') moveUp();
  if(e.key==='ArrowDown') moveDown();
  if(e.key==='ArrowLeft') moveLeft();
  if(e.key==='ArrowRight') moveRight();
  if(e.key==='1') setFollow();
  if(e.key==='2') setMine();
  if(e.key==='3') setTower();
  if(e.key==='4') setBridge();
  if(e.key==='5') setWall();
  if(e.key==='6') setDig();
  if(e.key==='7') setHouse();
  if(e.key==='8') setCastle();
  if(e.key==='9') setFarm();
});
