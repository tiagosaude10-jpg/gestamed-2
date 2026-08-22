(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
const command=$('#command'); if(!command)return;
const input=$('#tcGlobalSearch',command); if(!input)return;
const oldBackdrop=$('.tc-search-backdrop'); if(oldBackdrop)oldBackdrop.classList.add('hidden');

const routes={
 renal:{where:'1 · Avaliação renal',view:'renal',badge:'Módulo'},
 dose:{where:'2 · Dose de contraste',view:'dose',badge:'Módulo'},
 protocol:{where:'7 · Protocolos da TC',view:'protocol',badge:'Módulo'},
 contrast:{where:'8 · Contrastes iodados',view:'contrast',badge:'Módulo'},
 safety:{where:'9 · Segurança em TC',view:'safety',badge:'Módulo'}
};
const remotePages=[
 {url:'./requirements.html',where:'3 · Requisitos para o exame',badge:'Página'},
 {url:'./renal-labs.html',where:'4 · Ureia e creatinina',badge:'Página'},
 {url:'./venous-access.html',where:'5 · Acesso venoso para TC',badge:'Página'},
 {url:'./positioning.html',where:'6 · Posicionamento do paciente',badge:'Página'},
 {url:'./cranio-positioning.html',where:'6 · TC de crânio',badge:'Página'},
 {url:'./oral-contrast.html',where:'8 · Contrastes iodados',badge:'Página'}
];
const moduleRoutes={
 m1:routes.renal,
 m2:routes.dose,
 m3:remotePages[0],
 m4:remotePages[1],
 m5:remotePages[2],
 m6:remotePages[3],
 m7:routes.protocol,
 m8:routes.contrast,
 m9:routes.safety
};

const panel=document.createElement('div');
panel.className='tc-live-search-panel';
panel.innerHTML='<div class="tc-live-search-head"><strong>Resultados da pesquisa</strong><span id="tcLiveSearchCount"></span></div><div class="tc-live-search-list" id="tcLiveSearchList"></div>';
command.appendChild(panel);
const list=$('#tcLiveSearchList',panel), count=$('#tcLiveSearchCount',panel);
let index=[];
const seen=new Set();
function add(entry){
  const text=clean(entry.text); if(text.length<2)return;
  const key=[entry.url||entry.view||'',norm(entry.where),norm(entry.title),norm(text)].join('|');
  if(seen.has(key))return; seen.add(key);
  index.push({...entry,text,norm:norm([entry.where,entry.title,text].join(' '))});
}
function nearestHeading(el,root){
  let n=el;
  while(n&&n!==root){
    let p=n.previousElementSibling;
    while(p){if(/^H[1-4]$/.test(p.tagName))return clean(p.textContent);p=p.previousElementSibling}
    n=n.parentElement;
  }
  return '';
}
function indexRoot(root,base){
  const selectors='h1,h2,h3,h4,p,li,label,summary,th,td,option,small,.notice,.hint,.small-note,.source-note,.note,.info,.guidance-box,.metric,.pill,.essential,.result,.output,.error';
  $$(selectors,root).forEach(el=>{
    if(el.closest('script,style,noscript,svg'))return;
    const text=clean(el.textContent); if(text.length<2)return;
    const title=/^H[1-4]$/.test(el.tagName)?text:(nearestHeading(el,root)||base.where);
    add({...base,title,text,target:base.view?el:null});
  });
  const owner=root.ownerDocument||document;
  const walker=owner.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
    const p=node.parentElement;if(!p||p.closest('script,style,noscript,svg'))return NodeFilter.FILTER_REJECT;
    const t=clean(node.nodeValue);return t.length>=2?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
  }});
  let node; while((node=walker.nextNode())){
    const p=node.parentElement; const text=clean(node.nodeValue); const title=nearestHeading(p,root)||base.where;
    add({...base,title,text,target:base.view?p:null});
  }
}
function buildLocal(){
  Object.entries(routes).forEach(([id,base])=>{const root=document.getElementById(id);if(root)indexRoot(root,base)});
  $$('.tc-module',document).forEach(btn=>{
    const cls=Object.keys(moduleRoutes).find(c=>btn.classList.contains(c));
    const base=cls?moduleRoutes[cls]:{badge:'Módulo'};
    const title=clean($('.tc-module-copy b',btn)?.textContent||'');
    const text=clean($('.tc-module-copy span',btn)?.textContent||btn.textContent);
    const n=clean($('.tc-module-num',btn)?.textContent||'');
    add({...base,where:base.where||((n?n+' · ':'')+title),title,text,badge:base.badge||'Módulo'});
  });
}
async function buildRemote(){
  for(const page of remotePages){
    try{
      const r=await fetch(page.url,{cache:'no-store'}); if(!r.ok)continue;
      const html=await r.text(); const doc=new DOMParser().parseFromString(html,'text/html');
      $$('script,style,noscript,svg',doc).forEach(x=>x.remove());
      const main=doc.querySelector('main')||doc.body; indexRoot(main,page);
    }catch(_e){}
  }
}
buildLocal(); buildRemote();

function highlight(text,q){
  const safe=esc(text); const words=clean(q).split(/\s+/).filter(Boolean).sort((a,b)=>b.length-a.length);
  let out=safe;
  words.forEach(w=>{try{out=out.replace(new RegExp('('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'),'<mark>$1</mark>')}catch(_e){}});
  return out;
}
function snippet(text,q){
  const t=clean(text), nt=norm(t), nq=norm(q); const p=nt.indexOf(nq);
  if(p<0)return t.slice(0,170)+(t.length>170?'…':'');
  const a=Math.max(0,p-55), b=Math.min(t.length,p+Math.max(q.length,18)+105);
  return (a?'…':'')+t.slice(a,b)+(b<t.length?'…':'');
}
function rank(x,q){
  const nq=norm(q), title=norm(x.title), where=norm(x.where); let s=0;
  if(title===nq)s+=120; else if(title.startsWith(nq))s+=80; else if(title.includes(nq))s+=55;
  if(where.includes(nq))s+=35;
  const p=x.norm.indexOf(nq); if(p>=0)s+=30-Math.min(20,Math.floor(p/50));
  return s;
}
function positionPanel(){
  const box=$('.tc-command-titlebox',command)||input.parentElement; if(!box)return;
  const r=box.getBoundingClientRect(); const vv=window.visualViewport;
  const vh=vv?vv.height:window.innerHeight; const top=Math.round(r.bottom+5);
  const available=Math.max(120,Math.min(280,vh-top-10));
  panel.style.setProperty('left',Math.round(r.left)+'px','important');
  panel.style.setProperty('top',top+'px','important');
  panel.style.setProperty('width',Math.round(r.width)+'px','important');
  list.style.setProperty('max-height',available+'px','important');
}
function close(){panel.classList.remove('open')}
function render(){
  const q=clean(input.value), nq=norm(q);
  if(nq.length<2){close();return}
  const all=index.filter(x=>x.norm.includes(nq)).sort((a,b)=>rank(b,q)-rank(a,q));
  const compact=[]; const dedupe=new Set();
  for(const x of all){
    const k=[x.url||x.view||x.where,norm(x.title),norm(snippet(x.text,q))].join('|');
    if(dedupe.has(k))continue; dedupe.add(k); compact.push(x); if(compact.length>=12)break;
  }
  count.textContent=all.length?`${all.length} encontrado${all.length===1?'':'s'}`:'0 encontrados';
  list.innerHTML=compact.length?compact.map((x,i)=>`<button class="tc-live-search-item" type="button" data-i="${i}"><span class="tc-live-search-where">${esc(x.where||'TomoCron')}</span><span class="tc-live-search-title">${esc(x.title||x.where||'Conteúdo')}</span><span class="tc-live-search-snippet">${highlight(snippet(x.text,q),q)}</span><span class="tc-live-search-badge">${esc(x.badge||'Conteúdo')}</span></button>`).join(''):'<div class="tc-live-search-empty">Nenhum conteúdo encontrado. Tente outra palavra ou uma forma mais curta.</div>';
  list._items=compact; positionPanel(); panel.classList.add('open');
}
function intercept(e){
  e.stopImmediatePropagation();
  if(e.type==='keydown'&&e.key==='Escape'){close();return}
  if(e.type==='keydown'&&e.key==='Enter')e.preventDefault();
  clearTimeout(intercept.t); intercept.t=setTimeout(render,70);
}
input.addEventListener('input',intercept,true);
input.addEventListener('keydown',intercept,true);
input.addEventListener('focus',()=>{buildLocal();if(clean(input.value).length>=2)render()});
document.addEventListener('pointerdown',e=>{if(!panel.contains(e.target)&&e.target!==input)close()},true);
window.addEventListener('resize',()=>{if(panel.classList.contains('open'))positionPanel()});
window.visualViewport?.addEventListener('resize',()=>{if(panel.classList.contains('open'))positionPanel()});
window.visualViewport?.addEventListener('scroll',()=>{if(panel.classList.contains('open'))positionPanel()});

list.addEventListener('click',e=>{
  const b=e.target.closest('.tc-live-search-item'); if(!b)return;
  const x=(list._items||[])[Number(b.dataset.i)]; if(!x)return;
  const q=clean(input.value); close();
  if(x.url){location.href=x.url+(x.url.includes('?')?'&':'?')+'search='+encodeURIComponent(q);return}
  if(x.view){
    const nav=document.querySelector(`[data-view="${x.view}"]`); if(nav)nav.click();
    setTimeout(()=>{const t=x.target&&document.body.contains(x.target)?x.target:document.getElementById(x.view);if(t){t.scrollIntoView({behavior:'smooth',block:'center'});t.classList.add('tc-search-hit');setTimeout(()=>t.classList.remove('tc-search-hit'),1800)}},100);
  }
});
})();
