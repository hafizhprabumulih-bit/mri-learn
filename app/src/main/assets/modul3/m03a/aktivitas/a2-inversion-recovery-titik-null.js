/* titik null inversion recovery */
(function(){
const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),cv=$('m3-cv-i'),c=cv.getContext('2d');
const W=['fat','wm','gm','csf'].map(k=>DATA.JARINGAN.find(j=>j.id===k)),LB=['Lemak','WM','GM','CSF'],CO=['#d9a400','#2f6bff','#2b8a3e','#e03131'],NL=W.map(w=>Math.round(.693*w.T1_ms));
let ti=600,mg=true;
const mz=(T1,t)=>1-2*Math.exp(-t/T1),X=t=>50+t/3000*450,Y=v=>175-v*130;
function draw(){
const T=C('--teks'),L=C('--lembut'),G=C('--garis');c.clearRect(0,0,760,350);c.font='13px system-ui';c.lineWidth=1;
c.strokeStyle=G;c.fillStyle=L;c.textAlign='right';
[[1,'+1'],[0,'0'],[-1,'−1']].forEach(([v,t])=>{c.beginPath();c.moveTo(50,Y(v));c.lineTo(500,Y(v));c.stroke();c.fillText(t,44,Y(v)+4);});
c.textAlign='center';[0,1000,2000,3000].forEach(t=>c.fillText(t,X(t),Y(-1)+18));c.fillText('TI (ms)',275,Y(-1)+36);
W.forEach((w,i)=>{c.strokeStyle=CO[i];c.lineWidth=2;c.beginPath();for(let t=0;t<=3000;t+=15){t?c.lineTo(X(t),Y(mz(w.T1_ms,t))):c.moveTo(X(t),Y(mz(w.T1_ms,t)));}c.stroke();
c.fillStyle=CO[i];c.beginPath();c.arc(X(ti),Y(mz(w.T1_ms,ti)),4,0,7);c.fill();c.beginPath();c.arc(X(NL[i]),Y(0),3,0,7);c.stroke();});
c.strokeStyle=T;c.lineWidth=1;c.setLineDash([5,4]);c.beginPath();c.moveTo(X(ti),Y(1)-8);c.lineTo(X(ti),Y(-1));c.stroke();c.setLineDash([]);
c.fillStyle=L;c.textAlign='left';c.fillText('lingkaran kosong = titik null (0,693 × T1)',60,Y(1)-12);
c.textAlign='center';W.forEach((w,i)=>{const v=mz(w.T1_ms,ti),h=(mg?Math.abs(v):v)*130,bx=540+i*50;c.fillStyle=CO[i];c.fillRect(bx,mg?Y(0)-h:(h>=0?Y(0)-h:Y(0)),34,Math.abs(h));c.fillStyle=L;c.fillText(LB[i],bx+17,Y(-1)+18);});
c.strokeStyle=G;c.beginPath();c.moveTo(530,Y(0));c.lineTo(750,Y(0));c.stroke();c.fillStyle=L;c.fillText('Sinyal ('+(mg?'magnitudo':'dengan fase')+')',640,Y(1)-12);
}
function upd(){
let k=0;NL.forEach((n,i)=>{if(Math.abs(ti-n)<Math.abs(ti-NL[k]))k=i;});
const near=Math.abs(ti-NL[k])<=40;
const txt='TI '+ti+' ms. '+(near?LB[k]+' berada di titik null dan tampak gelap.':'Jaringan terdekat ke titik null: '+LB[k]+' (TI null '+NL[k]+' ms).')+' TI null: '+LB.map((l,i)=>l+' '+NL[i]).join(', ')+' ms.'+(!mg?' Pada rekonstruksi fase, jaringan yang belum melewati null bernilai negatif (batang ke bawah).':'');
$('m3-i-t').value=ti;$('m3-i-o').textContent=ti+' ms';$('m3-i-ket').textContent=txt;
$('m3-i-m').textContent='Rekonstruksi: '+(mg?'magnitudo':'fase');$('m3-i-m').setAttribute('aria-pressed',mg);
cv.setAttribute('aria-label','Kurva inversion recovery pada TI '+ti+' ms. '+(near?LB[k]+' di titik null.':''));draw();}
const P={t1:600,stir:NL[0],flair:NL[3],pd:1800};
document.querySelectorAll('[data-ti]').forEach(b=>b.addEventListener('click',()=>{ti=P[b.dataset.ti];upd();}));
$('m3-i-t').addEventListener('input',e=>{ti=+e.target.value;upd();});
$('m3-i-m').addEventListener('click',()=>{mg=!mg;upd();});
$('m3-i-rs').addEventListener('click',()=>{ti=600;mg=true;upd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',draw);
upd();
})();
