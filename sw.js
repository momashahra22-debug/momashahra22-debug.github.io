const VERSION='studymate-v24';
const APP_CACHE=`${VERSION}-app`;
const DATA_CACHE=`${VERSION}-data`;
const APP_SHELL=['./','./index.html','./app-manifest.txt?v=24','./assets/studymate-logo.webp?v=24','./js/css-loader.js?v=22','./js/app-loader.js?v=22','./js/config.js?v=22','./js/youtube-simple.js?v=22','./js/install-guide.js?v=24'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(APP_CACHE).then(c=>c.addAll(APP_SHELL)).catch(()=>null));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>!k.startsWith(VERSION)).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);
 const isQuiz=url.pathname.includes('/btecQuizzes/')||url.pathname.includes('/data/quizzes/');
 if(isQuiz){event.respondWith(caches.open(DATA_CACHE).then(async c=>{const hit=await c.match(req);if(hit)return hit;try{const res=await fetch(req);if(res.ok)c.put(req,res.clone());return res}catch{return hit||Response.error()}}));return;}
 if(url.origin===location.origin){event.respondWith((async()=>{const c=await caches.open(APP_CACHE);try{const res=await fetch(req,{cache:'no-cache'});if(res.ok)c.put(req,res.clone());return res}catch{const hit=await c.match(req);return hit||Response.error()}})());}
});
