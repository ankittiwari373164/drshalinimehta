
(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('enter');
function ready(){const l=$('#loader');if(l)l.classList.add('done');document.body.classList.remove('enter');setTimeout(()=>document.documentElement.classList.add('ready'),120);}
if(sessionStorage.getItem('sm-seen')){const l=$('#loader');if(l)l.style.display='none';requestAnimationFrame(()=>requestAnimationFrame(ready));}
else{window.addEventListener('load',()=>setTimeout(ready,900));setTimeout(ready,3500);sessionStorage.setItem('sm-seen','1');}
window.addEventListener('pageshow',e=>{if(e.persisted){$('#curtain')&&$('#curtain').classList.remove('on');ready();}});
// page transition
$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(!h||h.startsWith('#')||h.startsWith('http')||h.startsWith('mailto')||h.startsWith('tel')||a.target==='_blank'||h.includes('#'))return;
 a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();$('#curtain').classList.add('on');setTimeout(()=>location.href=h,520);});});
// header
const hdr=$('.hdr');let ly=0;
function onScroll(){const y=scrollY;hdr.classList.toggle('s',y>40);hdr.classList.toggle('hide',y>ly&&y>500&&!document.body.classList.contains('menu-open'));ly=y;
 const h=document.documentElement.scrollHeight-innerHeight;$('#prog').style.transform='scaleX('+(h>0?y/h:0)+')';$('.totop')&&$('.totop').classList.toggle('on',y>800);}
addEventListener('scroll',onScroll,{passive:true});onScroll();
$('.burger').addEventListener('click',()=>document.body.classList.toggle('menu-open'));
$$('.mnav a').forEach((a,i)=>{a.style.transitionDelay=(.15+i*.05)+'s'});
$('.totop')&&$('.totop').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
// split words in page hero
$$('.phero h1').forEach(h=>{h.innerHTML=h.innerHTML.split(/(<[^>]+>|\s+)/).map(t=>/^\s+$/.test(t)||t.startsWith('<')||!t?t:'<span class="w">'+t+'</span>').join('');$$('.w',h).forEach((w,i)=>w.style.transitionDelay=(.1+i*.07)+'s')});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:0.01,rootMargin:'0px 0px -20px 0px'});
$$('[data-r]').forEach(el=>{const d=el.dataset.d;if(d)el.style.transitionDelay=d+'s';io.observe(el)});
$$('[data-stagger]').forEach(p=>[...p.children].forEach((c,i)=>{c.setAttribute('data-r',c.getAttribute('data-r')||'');c.style.transitionDelay=(i%6*.09)+'s';io.observe(c)}));
setTimeout(function(){$$('[data-r]:not(.in)').forEach(function(el){if(el.getBoundingClientRect().top<innerHeight)el.classList.add('in')})},2500);
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,end=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,suf=el.dataset.suf||'',t0=performance.now(),dur=1800;
 (function f(t){const p=Math.min((t-t0)/dur,1),v=end*(1-Math.pow(1-p,4));el.textContent=(dec?v.toFixed(dec):Math.round(v).toLocaleString('en-IN'))+suf;if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.5});
$$('[data-count]').forEach(el=>co.observe(el));
// marquee duplicate
$$('.marq .tr,.tmarq .tr').forEach(t=>{t.innerHTML+=t.innerHTML});
// stars
const cv=$('#stars');if(cv&&!reduce){const x=cv.getContext('2d');let W,H,S=[];const dpr=Math.min(devicePixelRatio||1,2);
 function rs(){W=cv.offsetWidth;H=cv.offsetHeight;cv.width=W*dpr;cv.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);S=Array.from({length:Math.round(W*H/5200)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.2,a:Math.random()*Math.PI*2,s:.01+Math.random()*.03,v:Math.random()*.15+.02}))}
 rs();addEventListener('resize',rs);let mx=0,my=0;addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});
 let shoot=null;
 (function d(){x.clearRect(0,0,W,H);for(const s of S){s.a+=s.s;s.y-=s.v;if(s.y<0)s.y=H;const o=.35+Math.sin(s.a)*.35;x.beginPath();x.arc(s.x+mx*s.r*14,s.y+my*s.r*14,s.r,0,7);x.fillStyle='rgba(255,236,190,'+o+')';x.fill()}
  if(!shoot&&Math.random()<.006)shoot={x:Math.random()*W*.7,y:Math.random()*H*.4,l:0};
  if(shoot){shoot.l+=14;const g=x.createLinearGradient(shoot.x+shoot.l,shoot.y+shoot.l*.45,shoot.x+shoot.l-120,shoot.y+shoot.l*.45-54);g.addColorStop(0,'rgba(247,195,6,.9)');g.addColorStop(1,'rgba(247,195,6,0)');x.strokeStyle=g;x.lineWidth=1.6;x.beginPath();x.moveTo(shoot.x+shoot.l,shoot.y+shoot.l*.45);x.lineTo(shoot.x+shoot.l-120,shoot.y+shoot.l*.45-54);x.stroke();if(shoot.l>W*.5)shoot=null}
  requestAnimationFrame(d)})()}
// parallax
const px=$$('[data-speed]');if(px.length&&!reduce){function pf(){for(const el of px){const r=el.getBoundingClientRect(),c=r.top+r.height/2-innerHeight/2;el.style.transform='translate3d(0,'+(c*parseFloat(el.dataset.speed))+'px,0)'}requestAnimationFrame(pf)}pf()}
// tilt
if(matchMedia('(hover:hover)').matches&&!reduce)$$('[data-tilt]').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),X=(e.clientX-r.left)/r.width-.5,Y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateY('+X*10+'deg) rotateX('+(-Y*10)+'deg) translateY(-6px)'});c.addEventListener('mouseleave',()=>c.style.transform='')});
// cursor
if(matchMedia('(hover:hover) and (min-width:901px)').matches){const cu=document.createElement('div');cu.className='cur';document.body.appendChild(cu);const gl=$('#glow');let tx=0,ty=0,cx=0,cy=0;
 addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;cu.style.transform='translate('+tx+'px,'+ty+'px) translate(-50%,-50%)'});
 (function g(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;if(gl)gl.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';requestAnimationFrame(g)})();
 document.addEventListener('mouseover',e=>cu.classList.toggle('big',!!e.target.closest('a,button,[data-tilt],input,select,textarea,label')))}
// magnetic buttons
if(matchMedia('(hover:hover)').matches)$$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.3-3)+'px)'});b.addEventListener('mouseleave',()=>b.style.transform='')});
// faq
$$('.qa button').forEach(b=>b.addEventListener('click',()=>{const q=b.parentElement,o=q.classList.contains('open');q.parentElement.querySelectorAll('.qa').forEach(x=>x.classList.remove('open'));if(!o)q.classList.add('open')}));
// filters
$$('[data-filter]').forEach(t=>{const grid=$(t.dataset.filter);$$('button',t).forEach(b=>b.addEventListener('click',()=>{$$('button',t).forEach(x=>x.classList.remove('on'));b.classList.add('on');const f=b.dataset.f;$$('.fitem',grid).forEach(it=>{const show=f==='all'||it.dataset.cat.split(' ').includes(f);it.classList.toggle('hide',!show);if(show){it.classList.remove('in');requestAnimationFrame(()=>requestAnimationFrame(()=>it.classList.add('in')))}})}))});
// sliders
$$('.slider').forEach(s=>{const tr=$('.slides',s),n=tr.children.length,dots=$('.dots',s);let i=0,tm;for(let k=0;k<n;k++){const b=document.createElement('button');b.setAttribute('aria-label','Slide '+(k+1));b.onclick=()=>go(k);dots.appendChild(b)}
 function go(k){i=(k+n)%n;tr.style.transform='translateX('+(-i*100)+'%)';[...dots.children].forEach((d,j)=>d.classList.toggle('on',j===i));clearInterval(tm);tm=setInterval(()=>go(i+1),5500)}go(0);
 let sx=null;tr.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});tr.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));sx=null})});
// shelf nav
$$('.shelf-nav').forEach(n=>{const sh=$(n.dataset.for);$$('button',n).forEach(b=>b.addEventListener('click',()=>sh.scrollBy({left:(b.dataset.dir==='l'?-1:1)*sh.clientWidth*.8,behavior:'smooth'})))});
// lightbox
const lb=$('#lb');if(lb){$$('[data-lb]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();$('img',lb).src=a.getAttribute('href');lb.classList.add('on')}));lb.addEventListener('click',e=>{if(e.target.tagName!=='IMG')lb.classList.remove('on')});addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')})}
// quote words
$$('.quote[data-words]').forEach(q=>{q.innerHTML=q.textContent.trim().split(/\s+/).map(w=>'<span class="w">'+w+'</span> ').join('');const ws=$$('.w',q);
 function f(){const r=q.getBoundingClientRect(),p=Math.min(Math.max((innerHeight*.85-r.top)/(r.height+innerHeight*.35),0),1),k=Math.floor(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('lit',i<k))}addEventListener('scroll',f,{passive:true});f()});
// WhatsApp forms
$$('form[data-wa]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const lines=[f.dataset.wa];let ok=true;
 $$('[name]',f).forEach(el=>{if(el.required&&!el.value.trim()){ok=false;el.style.borderColor='#d8251a'}else el.style.borderColor='';if(el.value.trim())lines.push('*'+(el.dataset.label||el.name)+':* '+el.value.trim())});
 const er=$('.err',f);if(!ok){if(er){er.textContent='Please fill the required fields.';er.style.display='block'}return}if(er)er.style.display='none';
 window.open('https://wa.me/919810433224?text='+encodeURIComponent(lines.join('\n')),'_blank')}));
// video autoplay safety
$$('video[autoplay]').forEach(v=>{v.muted=true;const p=v.play();if(p)p.catch(()=>{})});
})();
