(()=>{
  const files=['01','02','03','04','05','06','07','08','09'].map(n=>`/css/parts/${n}.txt?v=17`);
  window.__studymateCssReady=Promise.all(files.map(f=>fetch(f,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(`CSS ${r.status}: ${f}`);return r.text()}))).then(parts=>{
    const old=document.getElementById('studymate-css'); if(old) old.remove();
    const s=document.createElement('style'); s.id='studymate-css'; s.textContent=parts.join(''); document.head.appendChild(s);
    document.documentElement.classList.add('css-ready');
    const boot=document.getElementById('studymate-boot-css'); if(boot) setTimeout(()=>boot.remove(),250);
    return true;
  }).catch(e=>{console.error('StudyMate CSS load failed',e);document.documentElement.classList.add('css-ready');throw e});
})();
