const CACHE='tomocron-v32-bottom-nav-requisitos-2026-08-20';
const CORE=['./','./index.html','./requirements.html','./app.css?v=27','./app.js?v=27','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./logo-tomocron-final.jpg?v=24'];
const HISTORICO_BUTTON='<button type="button" onclick="alert(\'Histórico será desenvolvido em etapa futura.\')"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6h4"/></svg><span>Histórico</span></button>';
const REQUISITOS_BUTTON='<button type="button" onclick="location.href=\'./requirements.html\'"><svg viewBox="0 0 24 24"><path d="M8 4h8M9 2h6v4H9zM6 4H4v18h16V4h-2M8 10h8M8 14h8M8 18h5"/></svg><span>Requisitos</span></button>';
async function transformHtml(response){
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  const text=await response.text();
  const updated=text.replace(HISTORICO_BUTTON,REQUISITOS_BUTTON);
  const headers=new Headers(response.headers);
  headers.set('content-type','text/html; charset=utf-8');
  return new Response(updated,{status:response.status,statusText:response.statusText,headers});
}
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const url of CORE){try{let response=await fetch(url,{cache:'reload'});if(response.ok&&url.includes('index.html'))response=await transformHtml(response);if(response.ok)await cache.put(url,response.clone())}catch(_){}}await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{try{return await transformHtml(await fetch(event.request,{cache:'no-store'}))}catch(_){return(await caches.match(event.request))||(await caches.match('./index.html'))||new Response('TomoCron indisponível offline.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})());
    return;
  }
  event.respondWith((async()=>{try{const response=await fetch(event.request,{cache:'no-store'});if(response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}return response}catch(_){return(await caches.match(event.request))||Response.error()}})());
});