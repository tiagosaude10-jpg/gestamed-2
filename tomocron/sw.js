const CACHE='tomocron-v23-resume-reset-2026-08-20';
const CORE=['./','./index.html','./app.css?v=21','./app.js?v=23','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./logo-tomocron-final.jpg?v=22'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const url of CORE){try{const response=await fetch(url,{cache:'reload'});if(response.ok)await cache.put(url,response.clone())}catch(_){}}await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{try{return await fetch(event.request,{cache:'no-store'})}catch(_){return(await caches.match('./index.html'))||new Response('TomoCron indisponível offline.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})());
    return;
  }
  event.respondWith((async()=>{try{const response=await fetch(event.request,{cache:'no-store'});if(response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}return response}catch(_){return(await caches.match(event.request))||Response.error()}})());
});