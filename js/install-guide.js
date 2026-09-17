(()=>{
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
      :host{all:initial}
      *{box-sizing:border-box}
      .backdrop{position:fixed;inset:0;display:flex;align-items:flex-end;justify-content:center;padding:12px;padding-bottom:max(12px,env(safe-area-inset-bottom));background:rgba(1,7,20,.68);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);font-family:Cairo,Arial,sans-serif;direction:rtl}
      .sheet{position:relative;width:min(430px,calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;border-radius:24px;padding:18px;background:linear-gradient(160deg,#0b1a39,#07142d 65%,#061126);border:1px solid rgba(118,176,255,.24);box-shadow:0 28px 90px rgba(0,0,0,.58);color:#f4f8ff}
      .close{position:absolute;top:11px;left:11px;width:34px;height:34px;border:1px solid rgba(255,255,255,.09);border-radius:11px;background:rgba(255,255,255,.05);color:#9db1ce;font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer}
      .badge{display:inline-flex;margin-bottom:13px;padding:6px 10px;border-radius:999px;background:rgba(67,140,255,.1);border:1px solid rgba(104,167,255,.15);color:#8fc4ff;font-size:10px;font-weight:900}
      .head{display:grid;grid-template-columns:54px 1fr;gap:12px;align-items:center;padding-left:38px;margin-bottom:14px}
      .head img{width:54px;height:54px;border-radius:15px;object-fit:cover;background:#08152f}
      h2{margin:0 0 4px;font-size:18px;line-height:1.4;font-weight:900;color:#fff}
      .sub{margin:0;color:#91a8c7;font-size:12px;line-height:1.75}
      .steps{display:grid;gap:9px;margin:12px 0}
      .step{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:start;padding:11px 12px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(112,171,255,.1)}
      .step>span{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(135deg,#2f8cff,#5365ff);color:#fff;font-size:11px;font-weight:900}
      .step p{margin:1px 0 0;color:#d9e8fb;font-size:11.5px;line-height:1.75}
      .step b{color:#fff}
      .hint{display:none;margin:10px 0 0;padding:10px 12px;border-radius:12px;background:rgba(55,151,255,.09);border:1px dashed rgba(109,177,255,.22);color:#a9d2ff;text-align:center;font-size:11px;line-height:1.7}
      .hint.show{display:block}
      .actions{display:grid;grid-template-columns:1fr 84px;gap:8px;margin-top:14px}
      button{font-family:Cairo,Arial,sans-serif}
      .primary,.later{min-height:44px;border-radius:13px;padding:10px 12px;font-size:12px;font-weight:900;cursor:pointer}
      .primary{border:0;background:linear-gradient(135deg,#2f8cff,#5164ff);color:#fff;box-shadow:0 10px 24px rgba(45,112,255,.22)}
      .later{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045);color:#aebed5}
      @media(max-width:380px){.backdrop{padding:8px}.sheet{width:100%;padding:15px;border-radius:20px}.head{grid-template-columns:48px 1fr}.head img{width:48px;height:48px}h2{font-size:16px}.step p{font-size:11px}}
    </style>
    <div class="backdrop" id="backdrop" role="dialog" aria-modal="true" aria-label="طريقة تثبيت StudyMate">
      <section class="sheet">
        <button class="close" id="close" aria-label="إغلاق">×</button>
        <div class="badge">تثبيت سريع على الهاتف</div>
        <div class="head">
          <img src="/assets/studymate-logo.webp?v=26" alt="StudyMate">
          <div><h2>ثبّت StudyMate على جهازك</h2><p class="sub">بعد التثبيت بتفتح الكورسات والحصص من الشاشة الرئيسية مثل أي تطبيق.</p></div>
        </div>
        <div class="steps">${steps}</div>
        <div class="hint" id="hint"></div>
        <div class="actions"><button class="primary" id="install">${isIOS?'عرض طريقة التثبيت':'تثبيت التطبيق'}</button><button class="later" id="later">إغلاق</button></div>
      </section>
    </div>`;

  const install=shadow.getElementById('install');
  const hint=shadow.getElementById('hint');
  const close=shadow.getElementById('close');
  const later=shadow.getElementById('later');
  const backdrop=shadow.getElementById('backdrop');

  const show=()=>{
    previousOverflow=document.documentElement.style.overflow;
    document.documentElement.style.overflow='hidden';
    host.style.display='block';
  };
  const hide=()=>{
    host.style.display='none';
    document.documentElement.style.overflow=previousOverflow;
  };

  window.showStudyMateInstallGuide=show;

  const attachHeroButton=()=>{
    const actions=document.querySelector('.hero-actions');
    if(!actions||actions.querySelector('[data-install-app]')) return;
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='btn blue-ghost magnetic';
    btn.setAttribute('data-install-app','1');
    btn.innerHTML='تنزيل التطبيق <span>↓</span>';
    btn.addEventListener('click',show);
    actions.appendChild(btn);
  };

  const observer=new MutationObserver(attachHeroButton);
  observer.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
  attachHeroButton();
  window.addEventListener('hashchange',()=>setTimeout(attachHeroButton,0));

  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredPrompt=e;
    install.textContent='تثبيت التطبيق';
  });
  window.addEventListener('appinstalled',hide);

  install.addEventListener('click',async()=>{
    if(deferredPrompt){
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt=null;
      return;
    }
    hint.textContent=isIOS?'من Safari: مشاركة ← Add to Home Screen ← Add':'من Chrome: ⋮ ← Install app / Add to Home screen';
    hint.classList.add('show');
  });
  close.addEventListener('click',hide);
  later.addEventListener('click',hide);
  backdrop.addEventListener('click',e=>{if(e.target===backdrop) hide()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&host.style.display!=='none') hide()});
})();