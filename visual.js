const panelVisual = document.getElementById('panel-visual');
window.hackerGUIState = window.hackerGUIState || {};

function addBtn(container, name, on, off){
  let running=false;
  const btn=document.createElement('button');
  btn.textContent=name+' [Stopped]';
  btn.onclick=function(){
    running=!running;
    btn.textContent=name+(running?' [Running...]':' [Stopped]');
    if(running) on(); else off&&off();
  };
  container.appendChild(btn);
}

// Example Visual Effects buttons

addBtn(panelVisual,'Page Spin',()=>{
  if(!window.hackerGUIState.pageSpinStyle){
    const s=document.createElement('style');
    s.id='pageSpinStyle';
    s.innerHTML='@keyframes roll{100%{transform:rotate(129600deg);}} body *:not(#gui-container *){animation:roll 140s linear 360;} #gui-container, #gui-container *{animation:none !important;}';
    document.head.appendChild(s);
    window.hackerGUIState.pageSpinStyle=s;
  }
},()=>{
  const s=window.hackerGUIState.pageSpinStyle;
  if(s){ s.remove(); window.hackerGUIState.pageSpinStyle=null; }
});

// Add more buttons like Matrix Rain, Disco Mode, Bubble Text, Full Chaos
// You can copy from your bookmarklet code and wrap each in addBtn(panelVisual, ...)
