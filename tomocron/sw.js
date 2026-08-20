const CACHE='tomocron-v20-logo-entry-2026-08-20';
const CORE=['./','./index.html','./app.css?v=19','./app.js?v=19','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
const LOGO='https://raw.githubusercontent.com/tiagosaude10-jpg/gestamed-2/main/tomocron/logo-tomocron-final.jpg?v=20';
function patchHome(html){
  html=html.replace(/src="\.\/logo-tomocron-final\.jpg\?v=\d+"/g,`src="${LOGO}"`);
  html=html.replace('<button class="btn primary tc-home-enter" data-go="command">ENTRAR NO TOMOCRON</button>','<button class="btn primary tc-home-enter" data-go="command" type="button" onclick="document.getElementById(\'start\').classList.add(\'hidden\');document.getElementById(\'command\').classList.remove(\'hidden\');window.scrollTo(0,0)">ENTRAR NO TOMOCRON</button>');
  return html;
}
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const url of CORE){try{const response=await fetch(url,{cache:'reload'});if(response.ok)await cache.put(url,response.clone())}catch(_){}}await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      let response;
      try{response=await fetch(event.request,{cache:'no-store'})}catch(_){response=await caches.match('./index.html')}
      if(!response)return new Response('TomoCron indisponível offline.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      const html=patchHome(await response.text());
      return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    })());
    return;
  }
  event.respondWith((async()=>{try{const response=await fetch(event.request,{cache:'no-store'});if(response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}return response}catch(_){return(await caches.match(event.request))||Response.error()}})());
});