(()=>{
  'use strict';
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const canvas=document.getElementById('fxCanvas'),orb=document.getElementById('pointerOrb'),neb=document.querySelector('.space-nebula');
  const ctx=canvas?.getContext('2d');if(!ctx)return;
  let tx=innerWidth*.5,ty=innerHeight*.35,x=tx,y=ty,w=0,h=0,dpr=Math.min(devicePixelRatio||1,2),stars=[];
  addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;document.documentElement.style.setProperty('--mx',tx+'px');document.documentElement.style.setProperty('--my',ty+'px')},{passive:true});
  const resize=()=>{w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(130,Math.max(55,Math.round(w*h/12000)))},()=>({x:Math.random()*w,y:Math.random()*h,z:Math.random()*.9+.1,r:Math.random()+.25,t:Math.random()*6.28}))};
  resize();addEventListener('resize',resize,{passive:true});
  const frame=()=>{x+=(tx-x)*.06;y+=(ty-y)*.06;if(orb)orb.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;if(neb)neb.style.transform=`translate3d(${(x-innerWidth/2)*-.014}px,${(y-innerHeight/2)*-.010}px,0)`;ctx.clearRect(0,0,w,h);const px=tx/w-.5,py=ty/h-.5;for(const s of stars){s.t+=.015;const sx=(s.x-px*26*s.z+w)%w,sy=(s.y-py*18*s.z+h)%h;ctx.beginPath();ctx.arc(sx,sy,s.r*(.7+s.z*.5),0,Math.PI*2);ctx.fillStyle=`rgba(130,190,255,${.15+s.z*.34+.08*Math.sin(s.t)})`;ctx.fill()}requestAnimationFrame(frame)};frame();
})();