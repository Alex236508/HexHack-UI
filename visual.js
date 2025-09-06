// Create panel if it doesn't exist
let panelVisual = document.getElementById('panel-visual');
if(!panelVisual){
    panelVisual = document.createElement('div');
    panelVisual.id = 'panel-visual';
    panelVisual.style.cssText = `
        position:fixed;
        top:50px;
        left:50px;
        width:300px;
        background:#000;
        color:#0F0;
        font-family:Courier,monospace;
        padding:10px;
        border:2px solid #0F0;
        z-index:999999;
        border-radius:8px;
        box-shadow:0 0 10px rgba(0,255,0,0.5);
        pointer-events:auto;
    `;
    document.body.appendChild(panelVisual);
}

window.hackerGUIState = window.hackerGUIState || {};

// Helper to create buttons
function addBtn(container, name, on, off){
  let running=false;
  const btn=document.createElement('button');
  btn.textContent=name+' [Stopped]';
  btn.style.cssText = `
    display:block;
    width:100%;
    margin:2px 0;
    padding:6px;
    background:transparent;
    color:#0F0;
    border:2px solid #0F0;
    cursor:pointer;
    text-align:center;
  `;
  btn.onclick=function(){
    running=!running;
    btn.textContent=name+(running?' [Running...]':' [Stopped]');
    if(running) on(); else off&&off();
  };
  container.appendChild(btn);
}

// 3D Page
addBtn(panelVisual,'3D Page',()=>{
  if(!window.triScript){
    window.triScript=document.createElement('script');
    window.triScript.src='https://rawgit.com/Krazete/bookmarklets/master/tri.js';
    window.triScript.onload=()=>{document.querySelectorAll('#panel-visual *').forEach(el=>el.style.transform='none');};
    document.body.appendChild(window.triScript);
  }
},()=>{if(window.triScript){ window.triScript.remove(); window.triScript=null; }});

// Explode Page
addBtn(panelVisual,'Explode Page',()=>{
  let countdown=3;
  let gifUrl='https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif';
  let countdownEl=document.createElement('div');
  countdownEl.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:4rem;color:white;text-shadow:1px 1px black;';
  countdownEl.innerHTML=countdown;
  document.body.appendChild(countdownEl);
  let interval=setInterval(()=>{
    countdown--;
    countdownEl.innerHTML=countdown;
    if(countdown<=0){
      clearInterval(interval);
      countdownEl.remove();
      explode();
    }
  },1000);
  function explode(){
    const explosionEl=document.createElement('div');
    explosionEl.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;background:black;background-image:url('+gifUrl+');background-repeat:no-repeat;background-position:center;background-size:contain;z-index:999999;';
    document.body.appendChild(explosionEl);
    let elements=document.querySelectorAll('body *:not(script):not(style):not(#panel-visual)');
    const centerX=window.innerWidth/2, centerY=window.innerHeight/2;
    elements.forEach(el=>{
      let rect=el.getBoundingClientRect();
      let dx=rect.left+rect.width/2-centerX;
      let dy=rect.top+rect.height/2-centerY;
      let distance=Math.max(Math.sqrt(dx*dx+dy*dy),50);
      let force=1000/distance;
      let angle=Math.atan2(dy,dx);
      let fx=Math.cos(angle)*force*200;
      let fy=Math.sin(angle)*force*200;
      el.style.transition='transform 1s ease-out';
      el.style.transform='translate('+fx+'px,'+fy+'px)';
    });
    setTimeout(()=>{explosionEl.remove();},2000);
  }
});

// Image Glitch
addBtn(panelVisual,'Image Glitch',()=>{
  window.hackerGUIState.imgGlitchInt=window.hackerGUIState.imgGlitchInt||setInterval(()=>{
    document.querySelectorAll('img:not(#panel-visual *)').forEach(el=>{
      el.style.position='absolute';
      el.style.left=(Math.random()*window.innerWidth)+'px';
      el.style.top=(Math.random()*window.innerHeight)+'px';
    });
  },50);
},()=>{clearInterval(window.hackerGUIState.imgGlitchInt); window.hackerGUIState.imgGlitchInt=null;});

// Random Link Redirects
addBtn(panelVisual,'Random Link Redirects',()=>{
  window.hackerGUIState.linkRedirectsInt=window.hackerGUIState.linkRedirectsInt||setInterval(()=>{
    document.querySelectorAll('a:not(#panel-visual *)').forEach(a=>{
      a.href=['https://longdogechallenge.com/','https://puginarug.com/','https://onesquareminesweeper.com/'][Math.floor(Math.random()*3)];
    });
  },500);
},()=>{clearInterval(window.hackerGUIState.linkRedirectsInt); window.hackerGUIState.linkRedirectsInt=null;});

// Matrix Rain
addBtn(panelVisual,'Matrix Rain',()=>{
  if(!window.hackerGUIState.matrixCanvas){
    let c=document.createElement('canvas');
    c.width=window.innerWidth; c.height=window.innerHeight;
    c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none;';
    window.hackerGUIState.matrixCanvas=c;
    document.body.appendChild(c);
    let ctx=c.getContext('2d');
    let chars='1010';
    let cols=Math.floor(window.innerWidth/10);
    let drops=[];
    for(let i=0;i<cols;i++)drops[i]=Math.floor(Math.random()*c.height);
    window.hackerGUIState.matrixInt=setInterval(()=>{
      ctx.fillStyle='rgba(0,0,0,0.05)';
      ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle='#0F0'; ctx.font='10px monospace';
      for(let i=0;i<cols;i++){
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
        if(drops[i]*10>c.height&&Math.random()>0.975)drops[i]=0; drops[i]++;
      }
    },33);
  }
},()=>{clearInterval(window.hackerGUIState.matrixInt); if(window.hackerGUIState.matrixCanvas){window.hackerGUIState.matrixCanvas.remove(); window.hackerGUIState.matrixCanvas=null;}});

// You can continue adding Disco, Text Corruption, Bubble Text, Page Spin in the same safe pattern...
