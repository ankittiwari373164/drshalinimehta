
/* Numerology & wellness calculation core — Dr. Shalini Mehta / Sai Kiran Institute
   Letter charts, reduction rules and favourable tables follow the institute's own calculator. */
(function(root){
var CHALDEAN={A:1,I:1,J:1,Q:1,Y:1,B:2,K:2,R:2,C:3,G:3,L:3,S:3,D:4,M:4,T:4,E:5,H:5,N:5,X:5,U:6,V:6,W:6,O:7,Z:7,F:8,P:8};
var PYTHAGOREAN={A:1,J:1,S:1,B:2,K:2,T:2,C:3,L:3,U:3,D:4,M:4,V:4,E:5,N:5,W:5,F:6,O:6,X:6,G:7,P:7,Y:7,H:8,Q:8,Z:8,I:9,R:9};
var VOWELS={A:1,E:1,I:1,O:1,U:1};
var FAV={
 1:{planet:'Sun (Surya)',deity:'Lord Surya',gem:'Ruby',colour:'Gold, Orange, Red',days:'Sunday, Monday',nums:'1, 2, 3, 9',dir:'East',mantra:'Om Suryaya Namah'},
 2:{planet:'Moon (Chandra)',deity:'Lord Shiva',gem:'Pearl',colour:'White, Cream, Silver',days:'Monday, Friday',nums:'1, 2, 5',dir:'North-West',mantra:'Om Chandraya Namah'},
 3:{planet:'Jupiter (Guru)',deity:'Lord Vishnu',gem:'Yellow Sapphire',colour:'Yellow, Saffron',days:'Thursday, Friday',nums:'3, 6, 9',dir:'North-East',mantra:'Om Gurave Namah'},
 4:{planet:'Rahu',deity:'Lord Ganesha',gem:'Hessonite (Gomed)',colour:'Grey, Electric Blue',days:'Saturday, Sunday',nums:'1, 4, 7',dir:'South-West',mantra:'Om Rahave Namah'},
 5:{planet:'Mercury (Budha)',deity:'Lord Vishnu',gem:'Emerald',colour:'Green, Light Shades',days:'Wednesday, Friday',nums:'5, 1, 6',dir:'North',mantra:'Om Budhaya Namah'},
 6:{planet:'Venus (Shukra)',deity:'Goddess Lakshmi',gem:'Diamond / Opal',colour:'White, Pink, Light Blue',days:'Friday, Tuesday',nums:'3, 6, 9',dir:'South-East',mantra:'Om Shukraya Namah'},
 7:{planet:'Ketu',deity:'Lord Ganesha',gem:"Cat's Eye",colour:'Smoky Grey, Light Green',days:'Monday, Sunday',nums:'2, 7, 9',dir:'South-West',mantra:'Om Ketave Namah'},
 8:{planet:'Saturn (Shani)',deity:'Lord Hanuman',gem:'Blue Sapphire',colour:'Dark Blue, Black',days:'Saturday, Friday',nums:'4, 5, 8',dir:'West',mantra:'Om Shanaye Namah'},
 9:{planet:'Mars (Mangal)',deity:'Lord Hanuman',gem:'Red Coral',colour:'Red, Crimson',days:'Tuesday, Thursday',nums:'3, 6, 9',dir:'South',mantra:'Om Mangalaya Namah'}};
var TRAITS={
 1:'A natural leader — independent, ambitious and original. You prefer to initiate rather than follow, and you thrive when given responsibility and creative freedom.',
 2:'Gentle, diplomatic and intuitive. You are a natural peacemaker who works best in partnership, valuing harmony, sensitivity and cooperation over confrontation.',
 3:'Expressive, optimistic and creative. Communication is your gift — you inspire and uplift others, and you flourish in artistic or social pursuits.',
 4:'Practical, disciplined and dependable. You build things that last — step by step, with patience and method — and others rely on your steadiness.',
 5:'Adventurous, versatile and freedom-loving. Change energises you; you learn quickly, adapt easily and excel wherever variety and travel are involved.',
 6:'Caring, responsible and harmonious. Home, family and beauty matter deeply to you, and you naturally take on the role of nurturer and counsellor.',
 7:'Introspective, analytical and spiritual. You seek deeper truths beneath the surface, and solitude, study and contemplation restore your energy.',
 8:'Ambitious, authoritative and karmic. You are built for material achievement and management — discipline and persistence bring you late but lasting rewards.',
 9:'Compassionate, courageous and humanitarian. You feel a duty toward the wider world, and generosity, service and idealism define your path.',
 11:'A master number — heightened intuition, vision and spiritual sensitivity. You can inspire many, though the intensity asks for grounding and self-care.',
 22:'A master number — the "master builder." You can turn grand visions into concrete reality, combining practical skill with far-reaching purpose.'};
var YEAR={1:'New beginnings — start projects, take initiative, plant seeds.',2:'Patience and partnership — cooperate, nurture relationships, let things grow.',3:'Expression and joy — create, communicate, socialise and celebrate.',4:'Foundation building — hard work, discipline, organisation and health.',5:'Change and freedom — travel, new experiences, adaptability.',6:'Home and responsibility — family, love, service and harmony.',7:'Reflection — study, inner work, spirituality and rest.',8:'Harvest and power — career, finances, recognition and authority.',9:'Completion — let go, forgive, finish cycles and prepare for the new.',11:'Illumination — intuition and inspiration run high; stay grounded.',22:'Master building — big visions can take real shape this year.'};
function reduce(n,keepMaster){n=Math.abs(n|0);while(n>9){if(keepMaster&&(n===11||n===22))return n;n=String(n).split('').reduce(function(a,d){return a+ +d},0);}return n;}
function letterSum(name,map){var s=0;String(name).toUpperCase().split('').forEach(function(ch){if(map[ch])s+=map[ch];});return s;}
function digitSum(str){return String(str).replace(/\D/g,'').split('').reduce(function(a,d){return a+ +d},0);}
function parseDob(dob){var p=String(dob).split('-');return {Y:+p[0],M:+p[1],D:+p[2]};}
function trait(n){return TRAITS[n]||TRAITS[reduce(n,false)];}
/* 1. Complete numerology profile (same method as the institute's calculator) */
function profile(name,dob,system,keepMaster,thisYear){
 var map=system==='pythagorean'?PYTHAGOREAN:CHALDEAN,d=parseDob(dob),Y=d.Y,M=d.M,D=d.D;
 var radical=reduce(D,keepMaster);
 var destiny=reduce(digitSum(''+D)+digitSum(''+M)+digitSum(''+Y),keepMaster);
 var nameNum=reduce(letterSum(name,map),keepMaster);
 var v=0,c=0;String(name).toUpperCase().split('').forEach(function(ch){if(!map[ch])return;if(VOWELS[ch])v+=map[ch];else c+=map[ch];});
 var soul=reduce(v,keepMaster),pers=reduce(c,keepMaster),maturity=reduce(destiny+nameNum,keepMaster);
 thisYear=thisYear||new Date().getFullYear();
 var pYear=reduce(digitSum(''+D)+digitSum(''+M)+digitSum(''+thisYear),keepMaster);
 var favKey=radical>9?reduce(radical,false):radical;
 return {radical:radical,destiny:destiny,name:nameNum,soul:soul,personality:pers,maturity:maturity,personalYear:pYear,year:thisYear,fav:FAV[favKey],D:D,M:M,Y:Y};
}
/* 2. Name numerology: Name (Chaldean), Destiny (full DOB), Psychic (day) */
function nameNumerology(name,dob){var d=parseDob(dob);var total=letterSum(name,CHALDEAN);
 return {nameTotal:total,name:reduce(total,false),destiny:reduce(digitSum(''+d.D)+digitSum(''+d.M)+digitSum(''+d.Y),false),psychic:reduce(d.D,false)};}
/* 3. Lo Shu grid */
var LOSHU=[4,9,2,3,5,7,8,1,6];
var PLANES={mental:[4,9,2],emotional:[3,5,7],practical:[8,1,6],thought:[4,3,8],will:[9,5,1],action:[2,7,6],golden:[4,5,6],property:[2,5,8]};
var PLANE_NAMES={mental:'Mental Plane (4-9-2)',emotional:'Emotional Plane (3-5-7)',practical:'Practical Plane (8-1-6)',thought:'Thought Plane (4-3-8)',will:'Will Plane (9-5-1)',action:'Action Plane (2-7-6)',golden:'Golden Yog / Success (4-5-6)',property:'Property / Raj Yog (2-5-8)'};
function kua(Y,M,D,gender){var y=Y;if(M<2||(M===2&&D<4))y=Y-1;var s=reduce(digitSum(''+y),false),k;
 if(gender==='male'){k=reduce(11-s,false);if(k===5)k=2;}else{k=reduce(s+4,false);if(k===5)k=8;}return {kua:k,yearUsed:y};}
function loshu(dob,gender){var d=parseDob(dob),digits=(String(d.D).padStart(2,'0')+String(d.M).padStart(2,'0')+String(d.Y)).split('').map(Number).filter(function(x){return x>0;});
 var driver=reduce(d.D,false),conductor=reduce(digitSum(''+d.D)+digitSum(''+d.M)+digitSum(''+d.Y),false);
 var all=digits.concat([driver,conductor]);var K=null;if(gender==='male'||gender==='female'){K=kua(d.Y,d.M,d.D,gender);all.push(K.kua);}
 var count={};for(var i=1;i<=9;i++)count[i]=0;all.forEach(function(x){count[x]++;});
 var missing=[],repeated=[];for(i=1;i<=9;i++){if(!count[i])missing.push(i);if(count[i]>1)repeated.push(i);}
 var planes=[];Object.keys(PLANES).forEach(function(k){if(PLANES[k].every(function(n){return count[n]>0;}))planes.push(PLANE_NAMES[k]);});
 return {driver:driver,conductor:conductor,kua:K?K.kua:null,kuaYear:K?K.yearUsed:null,count:count,missing:missing,repeated:repeated,planes:planes,digits:digits};}
/* 4. Compatibility via favourable-number table */
function favList(n){return FAV[reduce(n,false)].nums.split(',').map(function(x){return +x.trim();});}
function compatibility(a,b){ // a,b: {name,dob}
 var A=profile(a.name,a.dob,'chaldean',false,2000),B=profile(b.name,b.dob,'chaldean',false,2000);
 var checks=[
  {k:a.name+'\u2019s Radical '+A.radical+' welcomes '+b.name+'\u2019s Radical '+B.radical,ok:favList(A.radical).indexOf(B.radical)>-1},
  {k:b.name+'\u2019s Radical '+B.radical+' welcomes '+a.name+'\u2019s Radical '+A.radical,ok:favList(B.radical).indexOf(A.radical)>-1},
  {k:'Destiny '+A.destiny+' \u2194 Destiny '+B.destiny,ok:favList(A.destiny).indexOf(B.destiny)>-1||favList(B.destiny).indexOf(A.destiny)>-1},
  {k:'Radical '+A.radical+' \u2194 Destiny '+B.destiny,ok:favList(A.radical).indexOf(B.destiny)>-1},
  {k:'Radical '+B.radical+' \u2194 Destiny '+A.destiny,ok:favList(B.radical).indexOf(A.destiny)>-1},
  {k:'Name '+A.name+' \u2194 Name '+B.name,ok:favList(A.name).indexOf(B.name)>-1||favList(B.name).indexOf(A.name)>-1}];
 var score=Math.round(checks.filter(function(c){return c.ok;}).length/checks.length*100);
 var verdict=score>=80?'Highly harmonious':score>=50?'Good harmony with some growth areas':score>=30?'Mixed vibrations — needs conscious effort':'Challenging vibrations — guidance recommended';
 return {A:A,B:B,checks:checks,score:score,verdict:verdict};}
/* 5. Sun sign (tropical) & Vedic sun sign (sidereal, approx.) */
var WEST=[['Capricorn',1,19],['Aquarius',2,18],['Pisces',3,20],['Aries',4,19],['Taurus',5,20],['Gemini',6,20],['Cancer',7,22],['Leo',8,22],['Virgo',9,22],['Libra',10,22],['Scorpio',11,21],['Sagittarius',12,21],['Capricorn',12,31]];
var WSYM={Aries:'\u2648',Taurus:'\u2649',Gemini:'\u264A',Cancer:'\u264B',Leo:'\u264C',Virgo:'\u264D',Libra:'\u264E',Scorpio:'\u264F',Sagittarius:'\u2650',Capricorn:'\u2651',Aquarius:'\u2652',Pisces:'\u2653'};
var ELEM={Aries:'Fire',Leo:'Fire',Sagittarius:'Fire',Taurus:'Earth',Virgo:'Earth',Capricorn:'Earth',Gemini:'Air',Libra:'Air',Aquarius:'Air',Cancer:'Water',Scorpio:'Water',Pisces:'Water'};
var LORD={Aries:'Mars',Taurus:'Venus',Gemini:'Mercury',Cancer:'Moon',Leo:'Sun',Virgo:'Mercury',Libra:'Venus',Scorpio:'Mars',Sagittarius:'Jupiter',Capricorn:'Saturn',Aquarius:'Saturn',Pisces:'Jupiter'};
// sidereal sun ingress (approx. Sankranti dates)
var VED=[['Makara (Capricorn)',1,14],['Kumbha (Aquarius)',2,13],['Meena (Pisces)',3,14],['Mesha (Aries)',4,14],['Vrishabha (Taurus)',5,15],['Mithuna (Gemini)',6,15],['Karka (Cancer)',7,16],['Simha (Leo)',8,17],['Kanya (Virgo)',9,17],['Tula (Libra)',10,17],['Vrishchika (Scorpio)',11,16],['Dhanu (Sagittarius)',12,16]];
function westSign(M,D){for(var i=0;i<WEST.length;i++){var w=WEST[i];if(M<w[1]||(M===w[1]&&D<=w[2]))return w[0];}return 'Capricorn';}
function vedSign(M,D){var cur='Dhanu (Sagittarius)';for(var i=0;i<VED.length;i++){var v=VED[i];if(M>v[1]||(M===v[1]&&D>=v[2]))cur=v[0];}return cur;}
function signs(dob){var d=parseDob(dob),w=westSign(d.M,d.D);return {western:w,symbol:WSYM[w],element:ELEM[w],lord:LORD[w],vedic:vedSign(d.M,d.D)};}
/* 6. Personal year / month / day */
function personalCycle(dob,date){var d=parseDob(dob),t=parseDob(date);var py=reduce(digitSum(''+d.D)+digitSum(''+d.M)+digitSum(''+t.Y),false);var pm=reduce(py+t.M,false);var pd=reduce(pm+t.D,false);return {year:py,month:pm,day:pd,yearText:YEAR[py]};}
/* 7. Perceived Stress Scale (PSS-10, Cohen et al.) — items 4,5,7,8 reverse scored */
function pss(answers){if(answers.length!==10||answers.some(function(a){return a<0||a>4||a!==a;}))return null;var rev=[3,4,6,7],s=0;answers.forEach(function(a,i){s+=rev.indexOf(i)>-1?4-a:a;});return {score:s,level:s<=13?'Low stress':s<=26?'Moderate stress':'High perceived stress'};}
/* 8. Mobile number numerology */
function mobile(num,dob){var digits=String(num).replace(/\D/g,'');if(digits.length>10)digits=digits.slice(-10);var total=digitSum(digits),n=reduce(total,false),r=dob?profile('',dob,'chaldean',false,2000):null;
 var res={digits:digits,total:total,number:n};if(r){res.radical=r.radical;res.destiny=r.destiny;res.okRadical=favList(r.radical).indexOf(n)>-1;res.okDestiny=favList(r.destiny).indexOf(n)>-1;}return res;}
var api={CHALDEAN:CHALDEAN,PYTHAGOREAN:PYTHAGOREAN,FAV:FAV,TRAITS:TRAITS,YEAR:YEAR,LOSHU:LOSHU,reduce:reduce,letterSum:letterSum,digitSum:digitSum,trait:trait,profile:profile,nameNumerology:nameNumerology,loshu:loshu,kua:kua,compatibility:compatibility,signs:signs,personalCycle:personalCycle,pss:pss,mobile:mobile,favList:favList};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Calc=api;
})(this);
