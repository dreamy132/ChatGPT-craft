// Initialize bots array if not already
window.bots = window.bots || [
  {x:2,y:10,mode:'follow',inventory:{dirt:20,stone:10,wood:5,glass:3,door:2}},
  {x:4,y:10,mode:'follow',inventory:{dirt:15,stone:15,wood:10,glass:2,door:1}},
  {x:6,y:10,mode:'npc',inventory:{}}
];

// Simple pathfinding towards player
function botAction(bot,world,player){
  if(bot.mode==='npc'){
    let dx=Math.floor(Math.random()*3)-1;
    let dy=Math.floor(Math.random()*3)-1;
    let nx=bot.x+dx, ny=bot.y+dy;
    if(nx>=0&&nx<world[0].length&&ny>=0&&ny<world.length&&world[ny][nx]===0) bot.x=nx,bot.y=ny;
    return;
  }

  // Follow
  if(bot.mode==='follow'||['tower','bridge','wall','dig','mine','house','castle','farm'].includes(bot.mode)){
    if(Math.abs(bot.x-player.x)>1) bot.x += bot.x<player.x?1:-1;
    if(Math.abs(bot.y-player.y)>0) bot.y += bot.y<player.y?1:-1;
  }

  // Mining/building/farming (demo)
  if(bot.mode==='mine'){ if(bot.x+1<world[0].length && world[bot.y][bot.x+1]>0) world[bot.y][bot.x+1]=0; }
  if(bot.mode==='tower'){ if(bot.inventory.dirt>0){ world[bot.y-1][bot.x]=1; bot.inventory.dirt--; } }
  if(bot.mode==='farm'){ if(bot.inventory.dirt>0){ world[bot.y][bot.x]=1; bot.inventory.dirt--; } }
}

// BOT MODE FUNCTIONS
function setFollow(){bots.forEach(bot=>bot.mode='follow');}
function setMine(){bots.forEach(bot=>bot.mode='mine');}
function setTower(){bots.forEach(bot=>bot.mode='tower');}
function setBridge(){bots.forEach(bot=>bot.mode='bridge');}
function setWall(){bots.forEach(bot=>bot.mode='wall');}
function setDig(){bots.forEach(bot=>bot.mode='dig');}
function setHouse(){bots.forEach(bot=>bot.mode='house');}
function setCastle(){bots.forEach(bot=>bot.mode='castle');}
function setFarm(){bots.forEach(bot=>bot.mode='farm');}
