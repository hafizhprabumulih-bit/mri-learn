/* agen kontras: pemendekan T1 atau T2 */
// TODO-VERIFIKASI: r1, r2, dan rentang konsentrasi adalah angka ilustrasi (gadolinium r1 4 dan r2 5; besi superparamagnetik r1 3 dan r2 100, L/(mmol.s)), bukan data produk. Model tanpa pertukaran air, tanpa efek T2*.
(function(){
const J=k=>DATA.JARINGAN.find(j=>j.id===k),cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim();
const cv=$('m3-ak-cv'),c=cv.getContext('2d'),sj=$('m3-ak-j');
['wm','gm','csf'].forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=J(k).nama;sj.appendChild(o);});
const AG={gd:{nm:'gadolinium',r1:4,r2:5,max:2,u:'mmol/L'},fe:{nm:'besi superparamagnetik',r1:3,r2:100,max:.3,u:'mmol Fe/L'}};
let s={a:'gd',j:'wm',p:25};
const f1=x=>x.toFixed(1).replace('.',','),f0=Math.round;
const si=(t,tr,te,T1,T2)=>t.PD*Math.exp(-te/T2)*(1-Math.exp(-tr/T1));
function hit(cc){const t=J(s.j),a=AG[s.a],T1=1/(1/t.T1_ms+a.r1*cc/1000),T2=1/(1/t.T2_ms+a.r2*cc/1000);
 return{T1,T2,s1:si(t,500,15,T1,T2)/si(t,500,15,t.T1_ms,t.T2_ms),s2:si(t,3000,100,T1,T2)/si(t,3000,100,t.T1_ms,t.T2_ms)};}
const ket=r=>r>1.1?'hiperintens (terang)':r<.9?'hipointens (gelap)':'hampir tidak berubah';
function draw(){
 const T=C('--teks'),L=C('--lembut'),G=C('--garis'),a=AG[s.a],n=60,cc=a.max*s.p/100;
 let ym=1.2;for(let i=0;i<=n;i++){const h=hit(a.max*i/n);ym=Math.max(ym,h.s1,h.s2);}ym=Math.ceil(ym*1.1*4)/4;
 const X=v=>60+v/a.max*640,Y=v=>260-v/ym*230;
 c.clearRect(0,0,760,320);c.font='13px system-ui';c.lineWidth=1;c.strokeStyle=G;c.fillStyle=L;
 c.beginPath();c.moveTo(60,20);c.lineTo(60,260);c.lineTo(700,260);c.stroke();
 c.textAlign='right';[0,1,ym].forEach(v=>{c.beginPath();c.moveTo(56,Y(v));c.lineTo(700,Y(v));c.stroke();c.fillText(f0(v*100)+'%',52,Y(v)+4);});
 c.textAlign='center';[0,.5,1].forEach(q=>c.fillText((a.max*q).toFixed(2).replace('.',','),X(a.max*q),280));c.fillText('konsentrasi ('+a.u+')',380,306);
 [['s1','--t1','T1w'],['s2','--t2','T2w']].forEach(([k,col,nm],i)=>{c.strokeStyle=C(col);c.fillStyle=C(col);c.lineWidth=2.5;c.beginPath();
  for(let q=0;q<=n;q++){const v=a.max*q/n,y=Y(hit(v)[k]);q?c.lineTo(X(v),y):c.moveTo(X(v),y);}c.stroke();
  c.beginPath();c.arc(X(cc),Y(hit(cc)[k]),5,0,7);c.fill();c.textAlign='left';c.fillText(nm,710-(i?0:0),Y(hit(a.max)[k])+4);});
 c.strokeStyle=T;c.setLineDash([4,4]);c.beginPath();c.moveTo(X(cc),20);c.lineTo(X(cc),260);c.stroke();c.setLineDash([]);
}
function upd(){
 const a=AG[s.a],cc=a.max*s.p/100,t=J(s.j),h=hit(cc);
 $('m3-ak-oc').textContent=cc.toFixed(2).replace('.',',')+' '+a.u;
 document.querySelectorAll('[data-ag]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ag===s.a));
 $('m3-ak-tb').innerHTML='<tr><th></th><th>Tanpa agen</th><th>Dengan agen</th></tr><tr><td>T1 (ms)</td><td>'+f0(t.T1_ms)+'</td><td>'+f0(h.T1)+'</td></tr><tr><td>T2 (ms)</td><td>'+f0(t.T2_ms)+'</td><td>'+f0(h.T2)+'</td></tr><tr><td>Sinyal T1w (relatif)</td><td>100%</td><td>'+f0(h.s1*100)+'%</td></tr><tr><td>Sinyal T2w (relatif)</td><td>100%</td><td>'+f0(h.s2*100)+'%</td></tr>';
 $('m3-ak-s1').textContent=ket(h.s1);$('m3-ak-s2').textContent=ket(h.s2);
 const k=s.a==='gd'?'Gadolinium memendekkan T1 jauh lebih besar secara relatif daripada T2, jadi T1w naik. Pada konsentrasi tinggi T2 ikut memendek sehingga kurva T1w melandai atau turun.':'Besi superparamagnetik memendekkan T2 sangat kuat, jadi sinyal T2w turun tajam. Efek pada T1w jauh lebih kecil.';
 $('m3-ak-ket').textContent=k+' (T1 '+f0(t.T1_ms)+' menjadi '+f0(h.T1)+' ms; T2 '+f0(t.T2_ms)+' menjadi '+f0(h.T2)+' ms.)';
 cv.setAttribute('aria-label','Sinyal relatif T1w dan T2w pada konsentrasi '+cc.toFixed(2)+' '+a.u+'. T1w '+f0(h.s1*100)+' persen, T2w '+f0(h.s2*100)+' persen.');draw();
}
document.querySelectorAll('[data-ag]').forEach(b=>b.addEventListener('click',()=>{s.a=b.dataset.ag;upd();}));
sj.addEventListener('change',e=>{s.j=e.target.value;upd();});
$('m3-ak-c').addEventListener('input',e=>{s.p=+e.target.value;upd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',upd);
upd();
})();
