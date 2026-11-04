
(function(){
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function err(id,msg){var e=$(id);if(!msg){e.style.display='none';return false}e.textContent=msg;e.style.display='block';return true}
function show(id,html){var o=$(id);o.innerHTML='<div class="pop">'+html+'</div>';if(innerWidth<900)o.scrollIntoView({behavior:'smooth',block:'start'})}
function validDate(v){if(!v)return false;var d=new Date(v+'T00:00:00');return !isNaN(d)&&d.getFullYear()>=1900&&d<=new Date(Date.now()+864e5*365*5)}
function waShare(text){return '<a class="btn wa mt2 noprint" target="_blank" rel="noopener" href="https://wa.me/919810433224?text='+encodeURIComponent(text)+'">Discuss this with Dr. Shalini</a>'}
// tabs
var tabs=[].slice.call(document.querySelectorAll('.ctabs button'));
function open(k,scroll){var ok=false;tabs.forEach(function(b){var on=b.dataset.t===k;b.classList.toggle('on',on);if(on){ok=true;b.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'})}});if(!ok)return open('numerology');
 [].forEach.call(document.querySelectorAll('.cpanel'),function(p){p.classList.toggle('on',p.id==='p-'+k)});if(history.replaceState)history.replaceState(null,'','#'+k);
 if(scroll){var t=document.querySelector('.ctabs');scrollTo({top:t.getBoundingClientRect().top+scrollY-90,behavior:'smooth'})}}
tabs.forEach(function(b){b.addEventListener('click',function(){open(b.dataset.t,false)})});
open((location.hash||'#numerology').slice(1),!!location.hash);
addEventListener('hashchange',function(){open(location.hash.slice(1),true)});
// 1 numerology report
$('ncGo').addEventListener('click',function(){var name=$('ncName').value.trim(),dob=$('ncDob').value;
 if(err('ncError',!name||!validDate(dob)?'Please enter your full name and a valid date of birth.':''))return;
 var p=Calc.profile(name,dob,$('ncSystem').value,$('ncMaster').checked),f=p.fav;
 show('ncOut','<div class="flexb noprint"><div class="eyebrow" style="margin:0">Your Numerology Report</div><button class="btn ghost" style="padding:.5em 1em;font-size:.8rem;color:#fff" onclick="window.print()">Save as PDF</button></div>'+
 '<div class="big3"><div><b>'+p.radical+'</b><small>Radical / Psychic</small></div><div><b>'+p.destiny+'</b><small>Destiny / Life Path</small></div><div><b>'+p.name+'</b><small>Name / Expression</small></div></div>'+
 '<div class="kv"><div><small>Name</small><b>'+esc(name)+'</b></div><div><small>Date of birth</small><b>'+p.D+'-'+p.M+'-'+p.Y+'</b></div><div><small>Soul Urge</small><b>'+p.soul+'</b></div><div><small>Personality</small><b>'+p.personality+'</b></div><div><small>Maturity</small><b>'+p.maturity+'</b></div><div><small>Personal Year ('+p.year+')</small><b>'+p.personalYear+'</b></div></div>'+
 '<h4>Favourable insights <span style="font-size:.8rem;color:#bfb0d8">(Radical '+p.radical+')</span></h4><div class="kv"><div><small>Ruling planet</small><b>'+f.planet+'</b></div><div><small>Deity</small><b>'+f.deity+'</b></div><div><small>Gemstone</small><b>'+f.gem+'</b></div><div><small>Lucky colours</small><b>'+f.colour+'</b></div><div><small>Lucky days</small><b>'+f.days+'</b></div><div><small>Lucky numbers</small><b>'+f.nums+'</b></div><div><small>Direction</small><b>'+f.dir+'</b></div><div><small>Mantra</small><b>'+f.mantra+'</b></div></div>'+
 '<h4>Radical Number '+p.radical+'</h4><p>'+Calc.trait(p.radical)+'</p><h4>Destiny Number '+p.destiny+'</h4><p>'+Calc.trait(p.destiny)+'</p><h4>Name Number '+p.name+'</h4><p>'+Calc.trait(p.name)+'</p>'+
 waShare('Namaste Dr. Shalini, my numerology: Radical '+p.radical+', Destiny '+p.destiny+', Name '+p.name+' ('+name+'). I would like a detailed reading.'));});
$('ncReset').addEventListener('click',function(){$('ncName').value='';$('ncDob').value='';$('ncSystem').value='chaldean';$('ncMaster').checked=false;err('ncError','');$('ncOut').innerHTML='<div class="ph"><img src="img/emblem.png" alt=""><p>Your report will appear here.<br>Fill in your details and press Calculate.</p></div>'});
// 2 name numerology
$('nnGo').addEventListener('click',function(){var n=$('nnName').value.trim(),d=$('nnDob').value;if(err('nnErr',!n||!validDate(d)?'Please enter your name and a valid date of birth.':''))return;
 var r=Calc.nameNumerology(n,d);var letters=n.toUpperCase().split('').filter(function(c){return Calc.CHALDEAN[c]}).map(function(c){return c+'<sub style="color:#f7c306">'+Calc.CHALDEAN[c]+'</sub>'}).join(' ');
 show('nnOut','<div class="eyebrow">'+esc(n)+'</div><div class="big3"><div><b>'+r.name+'</b><small>Name Number</small></div><div><b>'+r.destiny+'</b><small>Destiny Number</small></div><div><b>'+r.psychic+'</b><small>Psychic Number</small></div></div><p style="font-size:.85rem;word-break:break-word">'+letters+' = <b>'+r.nameTotal+'</b> → '+r.name+'</p>'+
 '<h4>Name Number '+r.name+'</h4><p>'+Calc.trait(r.name)+'</p><h4>Destiny Number '+r.destiny+'</h4><p>'+Calc.trait(r.destiny)+'</p><h4>Psychic Number '+r.psychic+'</h4><p>'+Calc.trait(r.psychic)+'</p>'+
 (Calc.favList(r.psychic).indexOf(r.name)>-1?'<p class="pills"><span class="ok">✓ Your Name Number is favourable for your Psychic Number</span></p>':'<p class="pills"><span class="no">Your Name Number is not among the favourable numbers ('+Calc.FAV[r.psychic].nums+') for Psychic '+r.psychic+' — a name correction consultation can help.</span></p>')+waShare('Namaste, my name number is '+r.name+', destiny '+r.destiny+', psychic '+r.psychic+'. I want name numerology guidance.'));});
// 3 lo shu
$('lsGo').addEventListener('click',function(){var d=$('lsDob').value;if(err('lsErr',!validDate(d)?'Please enter a valid date of birth.':''))return;var g=$('lsGender').value,r=Calc.loshu(d,g||null);
 var cells=Calc.LOSHU.map(function(n){var c=r.count[n];return '<div class="'+(c?'has':'')+'"><small>'+n+'</small>'+(c?new Array(c+1).join(n):'')+'</div>'}).join('');
 show('lsOut','<div class="eyebrow">Your Lo Shu Grid</div><div class="loshu">'+cells+'</div><div class="kv"><div><small>Driver (Mulank)</small><b>'+r.driver+'</b></div><div><small>Conductor (Bhagyank)</small><b>'+r.conductor+'</b></div>'+(r.kua?'<div><small>Kua number</small><b>'+r.kua+'</b></div><div><small>Kua year used</small><b>'+r.kuaYear+'</b></div>':'')+'</div>'+
 '<h4>Complete planes</h4><div class="pills">'+(r.planes.length?r.planes.map(function(p){return '<span class="ok">✓ '+p+'</span>'}).join(''):'<span>No complete plane — a balanced remedy plan can help.</span>')+'</div>'+
 '<h4>Missing numbers</h4><div class="pills">'+(r.missing.length?r.missing.map(function(m){return '<span class="no">'+m+'</span>'}).join(''):'<span class="ok">None — all nine present</span>')+'</div>'+
 (r.repeated.length?'<h4>Repeated numbers</h4><div class="pills">'+r.repeated.map(function(m){return '<span>'+m+' × '+r.count[m]+'</span>'}).join('')+'</div>':'')+
 waShare('Namaste, my Lo Shu grid: driver '+r.driver+', conductor '+r.conductor+', missing '+(r.missing.join(',')||'none')+'. I would like remedies.'));});
// 4 love
$('lvGo').addEventListener('click',function(){var a=$('lvA').value.trim(),ad=$('lvAd').value,b=$('lvB').value.trim(),bd=$('lvBd').value;if(err('lvErr',!a||!b||!validDate(ad)||!validDate(bd)?'Please enter both names and valid birth dates.':''))return;
 var r=Calc.compatibility({name:a,dob:ad},{name:b,dob:bd});var C=2*Math.PI*70;
 show('lvOut','<div class="eyebrow">'+esc(a)+' ♥ '+esc(b)+'</div><div class="ring"><svg width="170" height="170"><circle cx="85" cy="85" r="70" stroke="rgba(255,255,255,.1)" stroke-width="12" fill="none"/><circle id="lvArc" cx="85" cy="85" r="70" stroke="url(#lg)" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'" style="transition:stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)"/><defs><linearGradient id="lg"><stop offset="0" stop-color="#f7c306"/><stop offset="1" stop-color="#d8251a"/></linearGradient></defs></svg><b>'+r.score+'%</b></div><p class="center" style="text-align:center;margin:0 auto"><b style="color:#fff">'+r.verdict+'</b></p>'+
 '<div class="kv"><div><small>'+esc(a)+'</small><b>Radical '+r.A.radical+' · Destiny '+r.A.destiny+' · Name '+r.A.name+'</b></div><div><small>'+esc(b)+'</small><b>Radical '+r.B.radical+' · Destiny '+r.B.destiny+' · Name '+r.B.name+'</b></div></div><h4>Harmony checks</h4><div class="pills">'+r.checks.map(function(c){return '<span class="'+(c.ok?'ok':'no')+'">'+(c.ok?'✓ ':'✕ ')+esc(c.k)+'</span>'}).join('')+'</div>'+waShare('Namaste, our numerology compatibility shows '+r.score+'%. We would like a detailed matching consultation.'));
 setTimeout(function(){var e=$('lvArc');if(e)e.style.strokeDashoffset=C*(1-r.score/100)},80);});
// 5 zodiac
$('zdGo').addEventListener('click',function(){var d=$('zdDob').value;if(err('zdErr',!validDate(d)?'Please enter a valid date of birth.':''))return;var s=Calc.signs(d);
 show('zdOut','<div style="text-align:center;font-size:5rem;line-height:1;color:#f7c306">'+s.symbol+'&#xFE0E;</div><div class="big3" style="grid-template-columns:1fr 1fr"><div><b style="font-size:1.6rem">'+s.western+'</b><small>Western sun sign</small></div><div><b style="font-size:1.4rem">'+s.vedic.split(' ')[0]+'</b><small>Vedic sun sign · '+s.vedic.split(' ')[1].replace(/[()]/g,'')+'</small></div></div><div class="kv"><div><small>Element</small><b>'+s.element+'</b></div><div><small>Ruling planet</small><b>'+s.lord+'</b></div></div><p class="mt1">The Vedic (sidereal) zodiac is about 24° behind the Western one, which is why your Vedic sun sign is often the sign before your Western one.</p><h4>Want your Moon sign & Lagna?</h4><p>Those need your exact birth time and place — Dr. Shalini’s team prepares them in the ₹349 Kundali reading.</p><a class="btn mt1 noprint" href="#kundali">Get my Kundali</a>');});
// 6 cycle
var td=new Date();$('pcDate').value=td.getFullYear()+'-'+String(td.getMonth()+1).padStart(2,'0')+'-'+String(td.getDate()).padStart(2,'0');
$('pcGo').addEventListener('click',function(){var d=$('pcDob').value,t=$('pcDate').value;if(err('pcErr',!validDate(d)||!t?'Please enter your date of birth and the date to check.':''))return;var r=Calc.personalCycle(d,t);
 show('pcOut','<div class="eyebrow">Your cycle on '+t.split('-').reverse().join('-')+'</div><div class="big3"><div><b>'+r.year+'</b><small>Personal Year</small></div><div><b>'+r.month+'</b><small>Personal Month</small></div><div><b>'+r.day+'</b><small>Personal Day</small></div></div><h4>Year '+r.year+' theme</h4><p>'+r.yearText+'</p><h4>This month ('+r.month+')</h4><p>'+Calc.YEAR[r.month]+'</p><h4>Today ('+r.day+')</h4><p>'+Calc.YEAR[r.day]+'</p>');});
// 7 mobile
$('mbGo').addEventListener('click',function(){var n=$('mbNum').value,d=$('mbDob').value,dig=n.replace(/\D/g,'');if(err('mbErr',dig.length<10?'Please enter a valid 10-digit mobile number.':''))return;var r=Calc.mobile(n,validDate(d)?d:null);
 var h='<div class="eyebrow">'+r.digits.replace(/(\d{5})(\d{5})/,'$1 $2')+'</div><div class="big3" style="grid-template-columns:1fr 1fr"><div><b>'+r.total+'</b><small>Digit total</small></div><div><b>'+r.number+'</b><small>Mobile number vibration</small></div></div><p>'+Calc.trait(r.number)+'</p>';
 if(r.radical){h+='<h4>Match with your numbers</h4><div class="pills"><span class="'+(r.okRadical?'ok':'no')+'">'+(r.okRadical?'✓':'✕')+' Radical '+r.radical+' (favourable: '+Calc.FAV[r.radical].nums+')</span><span class="'+(r.okDestiny?'ok':'no')+'">'+(r.okDestiny?'✓':'✕')+' Destiny '+r.destiny+' (favourable: '+Calc.FAV[r.destiny].nums+')</span></div>'}else h+='<p class="note">Add your date of birth to check the match with your Radical and Destiny numbers.</p>';
 show('mbOut',h+waShare('Namaste, my mobile number totals '+r.number+'. Please guide me on a lucky number.'));});
// 8 stress
$('psGo').addEventListener('click',function(){var a=[];for(var i=0;i<10;i++){var c=document.querySelector('input[name=pss'+i+']:checked');a.push(c?+c.value:-1)}if(err('psErr',a.indexOf(-1)>-1?'Please answer all 10 questions ('+a.filter(function(x){return x<0}).length+' left).':''))return;
 var r=Calc.pss(a),pct=Math.round(r.score/40*100),msg=r.score<=13?'You are handling life’s pressures well. Keep up your routines — breathwork and meditation help maintain this balance.':r.score<=26?'You are carrying a moderate load of stress. Simple daily practices — breathwork, mindful mornings, better sleep — and a few coaching sessions can make a real difference.':'Your perceived stress is high. Please be gentle with yourself and consider talking to a professional soon — hypnotherapy, NLP and counselling can help you regain calm.';
 show('psOut','<div class="eyebrow">Your result</div><div style="text-align:center"><b style="font-family:var(--hf);font-weight:400;font-size:4rem;line-height:1;color:#fff">'+r.score+'</b><span style="color:#bfb0d8"> / 40</span></div><div class="meter"><b id="psBar"></b></div><p style="text-align:center;margin:0 auto"><b style="color:#f7c306">'+r.level+'</b></p><p class="mt1">'+msg+'</p><p class="note">Scoring: 0–13 low, 14–26 moderate, 27–40 high perceived stress (PSS-10). Items 4, 5, 7 and 8 are reverse-scored.</p>'+waShare('Namaste, my stress check score is '+r.score+'/40 ('+r.level+'). I would like to book a session.'));
 setTimeout(function(){var b=$('psBar');if(b)b.style.width=pct+'%'},80);});
// 9 breath
var bt=null,bEnd=0,cyc=0;function fmt(s){s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function stopB(msg){clearTimeout(bt);bt=null;clearInterval(window.__bc);$('brC').style.transitionDuration='1s';$('brC').style.transform='scale(.55)';$('brT').textContent=msg||'Ready'}
$('brMin').addEventListener('change',function(){if(!bt)$('brClock').textContent=fmt(+$('brMin').value*60)});
$('brGo').addEventListener('click',function(){stopB();var p=$('brPat').value.split(',').map(Number),ph=[['Breathe in',p[0],1],['Hold',p[1],1],['Breathe out',p[2],.55],['Hold',p[3],.55]].filter(function(x){return x[1]>0});
 cyc=0;bEnd=Date.now()+(+$('brMin').value)*60000;$('brInfo').textContent='Cycles: 0';var k=0;
 window.__bc=setInterval(function(){var left=(bEnd-Date.now())/1000;$('brClock').textContent=fmt(left);if(left<=0){stopB('Well done 🙏')}},250);
 (function step(){if(Date.now()>=bEnd)return;var s=ph[k];$('brT').textContent=s[0];var c=$('brC');c.style.transitionDuration=s[1]+'s';c.style.transform='scale('+s[2]+')';
  bt=setTimeout(function(){k=(k+1)%ph.length;if(k===0){cyc++;$('brInfo').textContent='Cycles: '+cyc}step()},s[1]*1000)})();});
$('brStop').addEventListener('click',function(){stopB();$('brClock').textContent=fmt(+$('brMin').value*60)});
})();
