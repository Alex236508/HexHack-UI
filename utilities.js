const panelUtils = document.getElementById('panel-utils');
window.utilsGUIState = window.utilsGUIState || {};

function addBtn(container, name, action){
  const btn=document.createElement('button');
  btn.textContent=name+' [Stopped]';
  let running=false;
  btn.onclick=function(){
    running=!running;
    btn.textContent=name+(running?' [Running...]':' [Stopped]');
    action(running);
  };
  container.appendChild(btn);
}

// Example Utilities buttons

addBtn(panelUtils,'Developer Console',on=>{
  if(on){
    if(!window.utilsGUIState.erudaLoaded){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';
      s.onload=function(){eruda.init(); eruda.theme='Dark'; window.utilsGUIState.erudaLoaded=true;};
      document.body.appendChild(s);
    } else { eruda.show(); }
  } else { if(window.utilsGUIState.erudaLoaded) eruda.hide(); }
});

addBtn(panelUtils,'Calculator',on=>{
  if(on){
    let input='';
    while(true){
      const expr=prompt('Calculator - Input expression',input);
      if(expr===null||expr==='') break;
      input=eval(expr);
    }
  }
});

// Add other utilities buttons (DNS Lookup, FPS Counter, IP Finder, etc.) similarly
