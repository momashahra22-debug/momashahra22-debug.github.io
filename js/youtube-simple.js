(()=>{
  'use strict';

  const STYLE_ID='studymate-youtube-simple-style';
  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .sm-youtube-simple{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#000;border:1px solid rgba(105,165,255,.18);box-shadow:0 20px 70px rgba(0,0,0,.28)}
      .sm-youtube-simple iframe{position:absolute;inset:0;width:100%!important;height:100%!important;max-width:none!important;border:0!important;display:block;background:#000}
      .sm-youtube-full{position:absolute;z-index:5;left:14px;bottom:14px;width:44px;height:44px;border-radius:12px;border:1px solid rgba(255,255,255,.24);background:rgba(3,12,30,.86);color:#fff;display:grid;place-items:center;font:900 22px/1 system-ui;cursor:pointer;backdrop-filter:blur(12px);box-shadow:0 10px 30px rgba(0,0,0,.28);transition:.2s ease}
      .sm-youtube-full:hover{background:rgba(17,52,105,.92);transform:translateY(-1px)}
      .sm-youtube-simple:fullscreen,.sm-youtube-simple:-webkit-full-screen{width:100vw!important;height:100vh!important;aspect-ratio:auto!important;border-radius:0!important;border:0!important}
      .sm-youtube-simple:fullscreen iframe,.sm-youtube-simple:-webkit-full-screen iframe{width:100%!important;height:100%!important}
      @media(max-width:700px){.sm-youtube-simple{border-radius:14px}.sm-youtube-full{left:9px;bottom:9px;width:40px;height:40px;border-radius:10px;font-size:20px}}
    `;
    document.head.appendChild(style);
  }

  const fullscreenElement=()=>document.fullscreenElement||document.webkitFullscreenElement||null;

  function makeSimplePlayer(old){
    if(!old || old.dataset.smSimpleDone==='1')return;
    const id=(old.dataset.videoId||'').trim();
    if(!/^[A-Za-z0-9_-]{6,20}$/.test(id))return;

    const wrap=document.createElement('div');
    wrap.className='sm-youtube-simple';
    wrap.dataset.videoId=id;
    wrap.dataset.smSimpleDone='1';

    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&playsinline=1&controls=1&fs=0`;
    iframe.title=old.dataset.videoTitle||'YouTube video';
    iframe.loading='eager';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy='strict-origin-when-cross-origin';

    const full=document.createElement('button');
    full.type='button';
    full.className='sm-youtube-full';
    full.textContent='⛶';
    full.setAttribute('aria-label','ملء الشاشة داخل الموقع');
    full.title='ملء الشاشة';

    const sync=()=>{
      const active=fullscreenElement()===wrap;
      full.setAttribute('aria-label',active?'الخروج من ملء الشاشة':'ملء الشاشة داخل الموقع');
      full.title=active?'الخروج من ملء الشاشة':'ملء الشاشة';
    };

    full.addEventListener('click',async e=>{
      e.preventDefault();e.stopPropagation();
      try{
        if(fullscreenElement()){
          const exit=document.exitFullscreen||document.webkitExitFullscreen;
          if(exit)await exit.call(document);
        }else{
          const req=wrap.requestFullscreen||wrap.webkitRequestFullscreen;
          if(req)await req.call(wrap);
        }
      }catch(err){console.warn('StudyMate fullscreen failed',err)}
      sync();
    });

    document.addEventListener('fullscreenchange',sync);
    document.addEventListener('webkitfullscreenchange',sync);

    wrap.append(iframe,full);
    old.replaceWith(wrap);
    sync();
  }

  function scan(root=document){
    if(root.nodeType===1 && root.matches?.('.site-video-player[data-video-id]'))makeSimplePlayer(root);
    root.querySelectorAll?.('.site-video-player[data-video-id]').forEach(makeSimplePlayer);
  }

  scan();
  const obs=new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes){if(node.nodeType===1)scan(node)}
    }
  });
  obs.observe(document.documentElement,{childList:true,subtree:true});
})();
