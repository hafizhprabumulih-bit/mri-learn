(function(){
const rad=Math.PI/180,J=k=>DATA.JARINGAN.find(j=>j.id===k),W=['fat','gm','wm','csf'].map(J),LB=['Lemak','GM','WM','CSF'],cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),fd=x=>x.toFixed(2).replace('.',',');
// TODO-VERIFIKASI: rentang slider didaktik. Preset memakai rentang tipikal Tabel 4.3 buku (Westbrook dan Talbot). T2*w memakai TE lebih panjang karena modul ini memakai T2 sebagai pengganti T2* (T2 lebih panjang dari T2*).
const RT=[10,2000],RE=[2,100],pos=(v,r)=>100*Math.log(v/r[0])/Math.log(r[1]/r[0]),val=(p,r)=>Math.round(r[0]*Math.pow(r[1]/r[0],p/100));
const P={t1:{tr:40,te:4,fa:80},t2:{tr:200,te:60,fa:15},pd:{tr:500,te:4,fa:10}},csf=J('csf'),wm=J('wm');
let s=Object.assign({},P.t1);
const f1=t=>{const e=Math.exp(-s.tr/t.T1_ms),a=s.fa*rad;return Math.sin(a)*(1-e)/(1-e*Math.cos(a));},f2=t=>Math.exp(-s.te/t.T2_ms),cr=(a,b)=>Math.abs(a-b)/(a+b);
function api(c,x,h,lb,v){
 const b=205;c.fillStyle=C('--garis');c.beginPath();c.ellipse(x,b+4,52,8,0,0,7);c.fill();
 c.fillStyle='rgb(70,130,255)';[-30,-15,0,15,30].forEach(d=>{c.beginPath();c.moveTo(x+d-6,b);c.quadraticCurveTo(x+d,b-16,x+d+6,b);c.fill();});
 if(h>3){const g=c.createLinearGradient(0,b,0,b-h);g.addColorStop(0,'rgb(90,140,255)');g.addColorStop(.35,'rgb(255,255,255)');g.addColorStop(1,'rgb(255,120,20)');c.fillStyle=g;c.beginPath();c.moveTo(x-34,b);c.bezierCurveTo(x-42,b-h*.5,x-8,b-h*.6,x,b-h);c.bezierCurveTo(x+8,b-h*.6,x+42,b-h*.5,x+34,b);c.closePath();c.fill();}
 c.fillStyle=C('--teks');c.fillText(lb,x-10,238);c.fillStyle=C('--lembut');c.fillText(fd(v),x-10,254);
}
function tunak(){
 const c=$('m3-cv-k').getContext('2d'),a=s.fa*rad,N=30,col=['--t1','--aksen','--lembut','--t2'];
 c.clearRect(0,0,380,260);c.font='12px sans-serif';c.lineWidth=2;
 const D=W.map(t=>{const e=Math.exp(-s.tr/t.T1_ms),q=t.PD*Math.sin(a)*f2(t),ss=q*(1-e)/(1-e*Math.cos(a));let m=1,r=[],n5=0;for(let n=1;n<=N;n++){const x=q*m;r.push(x);if(!n5&&Math.abs(x-ss)<.05*ss)n5=n;m=1+(m*Math.cos(a)-1)*e;}return{r,n5};});
 const mx=Math.max.apply(null,D.map(d=>Math.max.apply(null,d.r)))||1;
 c.strokeStyle=C('--garis');c.beginPath();c.moveTo(40,24);c.lineTo(40,210);c.lineTo(370,210);c.stroke();
 D.forEach((d,i)=>{c.strokeStyle=C(col[i]);c.beginPath();d.r.forEach((y,n)=>{const X=40+n*330/(N-1),Y=210-182*y/mx;n?c.lineTo(X,Y):c.moveTo(X,Y);});c.stroke();c.fillStyle=C(col[i]);c.fillText(LB[i],50+i*70,250);});
 c.fillStyle=C('--lembut');c.fillText('Sinyal tiap TR menuju keadaan tunak',44,16);c.fillText('TR ke-n →',300,226);
 return LB.map((l,i)=>l+' '+(D[i].n5||'lebih dari '+N)).join(', ');
}
function upd(){
 $('m3-k-tr').value=pos(s.tr,RT);$('m3-k-te').value=pos(s.te,RE);$('m3-k-fa').value=s.fa;
 $('m3-k-otr').textContent=s.tr+' ms';$('m3-k-ote').textContent=s.te+' ms';$('m3-k-ofa').textContent=s.fa+'°';
 const h=[cr(f1(csf),f1(wm)),cr(f2(csf),f2(wm)),cr(csf.PD,wm.PD)],nm=['T1','T2*','PD'],w=h.indexOf(Math.max.apply(null,h));
 const c=$('m3-cv-a').getContext('2d');c.clearRect(0,0,380,260);c.font='13px sans-serif';
 nm.forEach((n,i)=>api(c,65+i*125,Math.min(1,h[i]/.4)*150,n,h[i]));
 const t=tunak();
 $('m3-k-st').textContent=nm[w];
 $('m3-k-ket').textContent='Dominan: '+nm[w]+'. Kontras relatif (CSF dan substansia alba): T1 '+fd(h[0])+', T2* '+fd(h[1])+', PD '+fd(h[2])+'. TR menuju keadaan tunak (selisih di bawah 5 persen): '+t+'.';
 $('m3-cv-a').setAttribute('aria-label','Tiga api kontras. Dominan '+nm[w]);
}
$('m3-k-tr').addEventListener('input',e=>{s.tr=val(+e.target.value,RT);upd();});
$('m3-k-te').addEventListener('input',e=>{s.te=val(+e.target.value,RE);upd();});
$('m3-k-fa').addEventListener('input',e=>{s.fa=+e.target.value;upd();});
document.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>{s=Object.assign({},P[b.dataset.k]);upd();}));
$('m3-k-rs').addEventListener('click',()=>{s=Object.assign({},P.t1);upd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',upd);
upd();
})();
