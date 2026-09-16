(()=>{
  const files=['01','02','03','04','05','06','07','08','09'].map(n=>`/js/app18/${n}.txt?v=18`);
  const cssReady=window.__studymateCssReady||Promise.resolve();
  cssReady.then(()=>Promise.all(files.map(f=>fetch(f,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(`APP ${r.status}: ${f}`);return r.text()}))))
    .then(parts=>{const src=parts.join('');(0,eval)(src)})
    .catch(e=>{console.error('StudyMate app load failed',e);document.documentElement.classList.add('css-ready');const a=document.getElementById('app');if(a)a.innerHTML='<div class="empty">تعذر تحميل التطبيق. حاول تحديث الصفحة.</div>'});
})();
