(()=>{
  let promptEvent=null;
  const guide=document.getElementById('smInstallGuide');
  if(!guide)return;
  const install=document.getElementById('smInstallNow');
  const later=document.getElementById('smInstallLater');
  const close=document.getElementById('smInstallClose');
  const ios=document.getElementById('smInstallIOS');
  const android=document.getElementById('smInstallAndroid');
  const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
  const isStandalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  const isMobileUA=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const touchMobile=navigator.maxTouchPoints>0&&matchMedia('(max-width: 820px)').matches;
  const mobile=isMobileUA||touchMobile;
  if(isStandalone||!mobile)return;
  if(isIOS){ios.hidden=false;android.hidden=true;install.textContent='عرض الطريقة';}
  const hide=(remember=true)=>{guide.classList.remove('show');document.documentElement.classList.remove('sm-install-open');if(remember)localStorage.setItem('sm_install_guide_seen','1')};
  const show=()=>{if(localStorage.getItem('sm_install_guide_seen')==='1')return;guide.classList.add('show');document.documentElement.classList.add('sm-install-open')};
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;install.textContent='تثبيت التطبيق';show()});
  window.addEventListener('appinstalled',()=>hide(true));
  install.addEventListener('click',async()=>{
    if(promptEvent){promptEvent.prompt();const choice=await promptEvent.userChoice;promptEvent=null;if(choice?.outcome==='accepted')hide(true);return}
    const hint=document.getElementById('smInstallHint');
    if(hint){hint.hidden=false;hint.textContent=isIOS?'Safari ← مشاركة ← Add to Home Screen':'Chrome ⋮ ← Install app / Add to Home screen';}
  });
  later.addEventListener('click',()=>hide(true));
  close?.addEventListener('click',()=>hide(true));
  guide.addEventListener('click',e=>{if(e.target===guide)hide(true)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&guide.classList.contains('show'))hide(true)});
  setTimeout(show,1400);
})();