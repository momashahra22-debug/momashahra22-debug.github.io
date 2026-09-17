(()=>{
  /* StudyMate V31 — mobile/responsive hotfix. UI only; does not touch Supabase/content. */
  const responsiveCss=`
    html,body{max-width:100%!important;overflow-x:hidden!important}
    body{min-width:0!important}
    #app,.app-shell,.page-shell,.page-body,.page-title,.home-wrap,.grid,.course-grid,.resource-filters{min-width:0!important;max-width:100%!important}
    img,video,iframe,canvas,svg{max-width:100%}

    /* Compact, isolated social dock */
    .sm-footer{position:relative!important;z-index:10!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:0!important;height:auto!important;margin:14px 0 0!important;padding:18px 12px max(22px,env(safe-area-inset-bottom))!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;isolation:isolate!important}
    .sm-footer:before,.sm-footer:after,.sm-social-panel:before,.sm-social-panel:after{content:none!important;display:none!important}
    .sm-social-panel{position:relative!important;inset:auto!important;transform:none!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;width:auto!important;max-width:calc(100vw - 24px)!important;min-width:0!important;min-height:0!important;height:auto!important;margin:0 auto!important;padding:10px 12px!important;border-radius:16px!important;background:rgba(7,19,43,.82)!important;border:1px solid rgba(115,167,245,.18)!important;box-shadow:0 14px 36px rgba(0,0,0,.20),inset 0 1px rgba(255,255,255,.035)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;overflow:hidden!important}
    .sm-social-link{position:relative!important;inset:auto!important;transform:none!important;flex:0 0 40px!important;width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important;max-width:40px!important;max-height:40px!important;margin:0!important;padding:0!important;border-radius:11px!important;display:grid!important;place-items:center!important;background:rgba(255,255,255,.035)!important;border:1px solid rgba(255,255,255,.095)!important;color:#c7d8ee!important;text-decoration:none!important;box-shadow:none!important;overflow:hidden!important}
    .sm-social-link svg{width:19px!important;height:19px!important;min-width:19px!important;min-height:19px!important;display:block!important;position:static!important;transform:none!important}
    .sm-social-link:hover{transform:translateY(-2px)!important;background:rgba(67,139,255,.13)!important;border-color:rgba(86,157,255,.34)!important;color:#fff!important}

    /* Phone header: logo right, menu left, never overlap */
    @media(max-width:980px){
      .topbar{padding:6px!important;overflow:visible!important}
      .nav-shell{position:relative!important;display:block!important;width:calc(100vw - 12px)!important;max-width:none!important;min-width:0!important;height:62px!important;min-height:62px!important;margin:0 auto!important;padding:0!important;border-radius:18px!important;overflow:visible!important}
      .brand.brand-logo{position:absolute!important;right:9px!important;left:auto!important;top:50%!important;transform:translateY(-50%)!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:7px!important;width:auto!important;min-width:0!important;max-width:calc(100% - 72px)!important;height:46px!important;margin:0!important;padding:4px 8px!important;z-index:22!important;border-radius:13px!important;overflow:hidden!important}
      .brand-logo-mark{flex:0 0 34px!important;width:34px!important;height:34px!important;min-width:34px!important;border-radius:10px!important}
      .brand-logo-copy{display:flex!important;min-width:0!important;max-width:126px!important;overflow:hidden!important;align-items:flex-start!important}
      .brand-logo-copy strong{display:block!important;max-width:100%!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;font-size:14px!important;line-height:1.05!important}
      .brand-logo-copy small{display:block!important;font-size:7px!important;margin-top:4px!important;line-height:1!important}
      .mobile-menu{position:absolute!important;left:9px!important;right:auto!important;top:50%!important;transform:translateY(-50%)!important;display:grid!important;place-items:center!important;width:46px!important;height:46px!important;min-width:46px!important;margin:0!important;padding:0!important;z-index:25!important;border-radius:13px!important;font-size:23px!important;line-height:1!important}
      .nav-pills{position:absolute!important;top:68px!important;right:0!important;left:0!important;width:100%!important;max-width:100%!important;z-index:24!important;border-radius:16px!important;overflow:auto!important;max-height:calc(100dvh - 86px)!important}
      .nav-pills.open{display:flex!important}
      .nav-more,.nav-more-toggle{width:100%!important}
      .student-chip{display:none!important}
    }
    @media(max-width:420px){
      .brand.brand-logo{right:7px!important;max-width:calc(100% - 66px)!important;height:44px!important;padding-inline:7px!important}
      .brand-logo-mark{flex-basis:32px!important;width:32px!important;height:32px!important;min-width:32px!important}
      .brand-logo-copy{max-width:115px!important}
      .brand-logo-copy strong{font-size:13px!important}
      .mobile-menu{left:7px!important;width:44px!important;height:44px!important;min-width:44px!important}
    }

    /* Main mobile pages */
    @media(max-width:760px){
      .app-shell{width:calc(100vw - 12px)!important;max-width:calc(100vw - 12px)!important;margin-inline:auto!important;padding-inline:0!important}
      .page-title,.page-body{width:100%!important;max-width:100%!important;padding-inline:6px!important}
      .page-title h1{font-size:clamp(30px,10vw,44px)!important;overflow-wrap:anywhere!important}
      .page-title p{font-size:12px!important;line-height:1.9!important}
      .resource-filters{grid-template-columns:1fr!important;gap:10px!important;padding:16px!important;border-radius:20px!important}
      .resource-filters .field{min-width:0!important}
      .resource-filters select,.resource-filters input{width:100%!important;max-width:100%!important;font-size:16px!important}
      .grid,.course-grid,.quiz-grid{grid-template-columns:1fr!important;gap:12px!important}
      .resource-card,.content-card,.course-card,.tool-card,.feature-card{width:100%!important;max-width:100%!important;min-height:0!important;padding:17px!important;border-radius:20px!important;overflow:hidden!important}
      .resource-card .card-top,.content-card .card-top{display:flex!important;align-items:flex-start!important;gap:8px!important;flex-wrap:wrap!important}
      .resource-card .badge.gray{max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important}
      .resource-card h3,.content-card h3,.course-card h3{font-size:20px!important;line-height:1.55!important;overflow-wrap:anywhere!important}
      .resource-card p,.content-card p{font-size:12px!important;line-height:1.8!important}
      .resource-card .btn,.content-card .btn{min-height:44px!important}
      .toolbar{max-width:100%!important;gap:7px!important}
      .toolbar .btn{max-width:100%!important}
      .sm-footer{padding:14px 9px max(18px,env(safe-area-inset-bottom))!important}
      .sm-social-panel{gap:7px!important;padding:9px 10px!important;max-width:calc(100vw - 18px)!important}
      .sm-social-link{flex-basis:42px!important;width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;max-width:42px!important;max-height:42px!important}
    }
    @media(max-width:360px){
      .sm-social-panel{gap:6px!important;padding:8px!important}
      .sm-social-link{flex-basis:39px!important;width:39px!important;height:39px!important;min-width:39px!important;min-height:39px!important;max-width:39px!important;max-height:39px!important}
    }
  `;

  const mountResponsiveFix=()=>{
    const old=document.getElementById('studymate-v31-responsive');
    if(old) old.remove();
    const style=document.createElement('style');
    style.id='studymate-v31-responsive';
    style.textContent=responsiveCss;
    document.head.appendChild(style);
  };
  mountResponsiveFix();
  if(window.__studymateCssReady&&typeof window.__studymateCssReady.then==='function'){
    window.__studymateCssReady.finally(()=>requestAnimationFrame(mountResponsiveFix));
  }else{
    setTimeout(mountResponsiveFix,1200);
  }

  const old=document.getElementById('smInstallGuide');
  if(old) old.remove();

  const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
  const isStandalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  if(isStandalone) return;

  let deferredPrompt=null;
  let previousOverflow='';

  const host=document.createElement('div');
  host.id='studymateInstallHost';
  host.style.cssText='all:initial;position:fixed;inset:0;z-index:2147483647;display:none;';
  document.body.appendChild(host);
  const shadow=host.attachShadow({mode:'open'});

  const steps=isIOS
    ? `<div class="step"><span>1</span><p>افتح الموقع من <b>Safari</b>.</p></div>
       <div class="step"><span>2</span><p>اضغط زر <b>المشاركة</b> ثم اختر <b>Add to Home Screen</b>.</p></div>
       <div class="step"><span>3</span><p>اضغط <b>Add</b> وراح يظهر StudyMate على الشاشة الرئيسية.</p></div>`
    : `<div class="step"><span>1</span><p>افتح الموقع من <b>Google Chrome</b>.</p></div>
       <div class="step"><span>2</span><p>اضغط <b>⋮</b> واختر <b>Install app</b> أو <b>Add to Home screen</b>.</p></div>
       <div class="step"><span>3</span><p>اضغط <b>Install</b> وراح يظهر StudyMate مثل أي تطبيق.</p></div>`;

  shadow.innerHTML=`
    <style>
      :host{all:initial}*{box-sizing:border-box}
      .backdrop{position:fixed;inset:0;display:flex;align-items:flex-end;justify-content:center;padding:12px;padding-bottom:max(12px,env(safe-area-inset-bottom));background:rgba(1,7,20,.68);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);font-family:Cairo,Arial,sans-serif;direction:rtl}
      .sheet{position:relative;width:min(430px,calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;border-radius:24px;padding:18px;background:linear-gradient(160deg,#0b1a39,#07142d 65%,#061126);border:1px solid rgba(118,176,255,.24);box-shadow:0 28px 90px rgba(0,0,0,.58);color:#f4f8ff}
      .close{position:absolute;top:11px;left:11px;width:34px;height:34px;border:1px solid rgba(255,255,255,.09);border-radius:11px;background:rgba(255,255,255,.05);color:#9db1ce;font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer}
      .badge{display:inline-flex;margin-bottom:13px;padding:6px 10px;border-radius:999px;background:rgba(67,140,255,.1);border:1px solid rgba(104,167,255,.15);color:#8fc4ff;font-size:10px;font-weight:900}
      .head{display:grid;grid-template-columns:58px 1fr;gap:12px;align-items:center;padding-left:38px;margin-bottom:14px}.logo-box{width:58px;height:58px;border-radius:16px;display:grid;place-items:center;overflow:hidden;background:#08152f;border:1px solid rgba(104,167,255,.2);box-shadow:0 8px 24px rgba(45,112,255,.15)}.logo-box img{width:100%;height:100%;object-fit:contain;display:block}
      h2{margin:0 0 4px;font-size:18px;line-height:1.4;font-weight:900;color:#fff}.sub{margin:0;color:#91a8c7;font-size:12px;line-height:1.75}.steps{display:grid;gap:9px;margin:12px 0}.step{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:start;padding:11px 12px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(112,171,255,.1)}.step>span{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(135deg,#2f8cff,#5365ff);color:#fff;font-size:11px;font-weight:900}.step p{margin:1px 0 0;color:#d9e8fb;font-size:11.5px;line-height:1.75}.step b{color:#fff}.hint{display:none;margin:10px 0 0;padding:10px 12px;border-radius:12px;background:rgba(55,151,255,.09);border:1px dashed rgba(109,177,255,.22);color:#a9d2ff;text-align:center;font-size:11px;line-height:1.7}.hint.show{display:block}.actions{display:grid;grid-template-columns:1fr 84px;gap:8px;margin-top:14px}button{font-family:Cairo,Arial,sans-serif}.primary,.later{min-height:44px;border-radius:13px;padding:10px 12px;font-size:12px;font-weight:900;cursor:pointer}.primary{border:0;background:linear-gradient(135deg,#2f8cff,#5164ff);color:#fff;box-shadow:0 10px 24px rgba(45,112,255,.22)}.later{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045);color:#aebed5}@media(max-width:380px){.backdrop{padding:8px}.sheet{width:100%;padding:15px;border-radius:20px}.head{grid-template-columns:50px 1fr}.logo-box{width:50px;height:50px}h2{font-size:16px}.step p{font-size:11px}}
    </style>
    <div class="backdrop" id="backdrop" role="dialog" aria-modal="true" aria-label="طريقة تثبيت StudyMate"><section class="sheet"><button class="close" id="close" aria-label="إغلاق">×</button><div class="badge">تثبيت سريع على الهاتف</div><div class="head"><div class="logo-box"><img src="/assets/studymate-icon-192.png?v=29" alt="StudyMate"></div><div><h2>ثبّت StudyMate على جهازك</h2><p class="sub">بعد التثبيت بتفتح الكورسات والحصص من الشاشة الرئيسية مثل أي تطبيق.</p></div></div><div class="steps">${steps}</div><div class="hint" id="hint"></div><div class="actions"><button class="primary" id="install">${isIOS?'عرض طريقة التثبيت':'تثبيت التطبيق'}</button><button class="later" id="later">إغلاق</button></div></section></div>`;

  const install=shadow.getElementById('install'),hint=shadow.getElementById('hint'),close=shadow.getElementById('close'),later=shadow.getElementById('later'),backdrop=shadow.getElementById('backdrop');
  const show=()=>{previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';host.style.display='block'};
  const hide=()=>{host.style.display='none';document.documentElement.style.overflow=previousOverflow};
  window.showStudyMateInstallGuide=show;
  const attachHeroButton=()=>{const actions=document.querySelector('.hero-actions');if(!actions||actions.querySelector('[data-install-app]'))return;const btn=document.createElement('button');btn.type='button';btn.className='btn blue-ghost magnetic';btn.setAttribute('data-install-app','1');btn.innerHTML='تنزيل التطبيق <span>↓</span>';btn.addEventListener('click',show);actions.appendChild(btn)};
  const observer=new MutationObserver(attachHeroButton);observer.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});attachHeroButton();window.addEventListener('hashchange',()=>setTimeout(attachHeroButton,0));
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;install.textContent='تثبيت التطبيق'});window.addEventListener('appinstalled',hide);
  install.addEventListener('click',async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;return}hint.textContent=isIOS?'من Safari: مشاركة ← Add to Home Screen ← Add':'من Chrome: ⋮ ← Install app / Add to Home screen';hint.classList.add('show')});
  close.addEventListener('click',hide);later.addEventListener('click',hide);backdrop.addEventListener('click',e=>{if(e.target===backdrop)hide()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&host.style.display!=='none')hide()});
})();