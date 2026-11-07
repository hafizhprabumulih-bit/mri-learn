/* DRIVE: pulsa pemulih setelah echo train */
// TODO-VERIFIKASI: model disederhanakan. Setelah pulsa 90° Mz dianggap 0 lalu pulih dengan T1; Mxy meluruh dengan T2 selama echo train. Pulsa DRIVE dianggap membalik seluruh sisa Mxy ke +z (Mz' = Mz + Mxy, dibatasi 1). Pada alat nyata efeknya tidak sepenuh ini.
(function(){
const J=k=>DATA.JARINGAN.find(j=>j.id===k),cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim();
const cv=$('m3-dr-cv'),c=cv.getContext('2d'),sj=$('m3-dr-j');
['csf','gm','wm'].forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=J(k).nama;sj.appendChild(o);});
let s={on:true,tr:1500,et:160,j:'csf'};
const TMAX=6000,X=t=>60+t/TMAX*660,Y=v=>270-v*230,f2=x=>x.toFixed(2).replace('.',',');
function mz(t,on,jr){
 const m0=1-Math.exp(-s.et/jr.T1_ms),mz0=on?Math.min(1,m0+Math.exp(-s.et/jr.T2_ms)):m0;
 return t<s.et?1-Math.exp(-t/jr.T1_ms):1-(1-mz0)*Math.exp(-(t-s.et)/jr.T1_ms);
}
function draw(){
 const T=C('--teks'),L=C('--lembut'),G=C('--garis'),A=C('--aksen'),jr=J(s.j);
 c.clearRect(0,0,760,330);c.font='13px system-ui';c.lineWidth=1;c.strokeStyle=G;c.fillStyle=L;
 c.beginPath();c.moveTo(60,30);c.lineTo(60,270);c.lineTo(730,270);c.stroke();
 c.textAlign='right';[0,.5,1].forEach(v=>{c.beginPath();c.moveTo(56,Y(v));c.lineTo(730,Y(v));c.stroke();c.fillText(String(v).replace('.',','),52,Y(v)+4);});
 c.textAlign='center';[0,1000,2000,3000,4000,5000,6000].forEach(t=>c.fillText(t,X(t),290));c.fillText('waktu sejak pulsa 90° (ms)',390,312);
 c.save();c.translate(14,150);c.rotate(-Math.PI/2);c.fillText('Mz relatif',0,0);c.restore();
 [[false,L,[5,4],1.5],[true,A,[],2.5]].forEach(([on,k,dash,lw])=>{
  const aktif=on===s.on;c.strokeStyle=k;c.lineWidth=aktif?lw+1.5:lw;c.globalAlpha=aktif?1:.55;c.setLineDash(dash);c.beginPath();
  for(let t=0;t<=TMAX;t+=20){const y=Y(mz(t,on,jr));t?c.lineTo(X(t),y):c.moveTo(X(t),y);}c.stroke();});
 c.setLineDash([]);c.globalAlpha=1;
 c.strokeStyle=T;c.lineWidth=1;c.setLineDash([3,4]);
 [[s.et,'gema terakhir'],[Math.min(s.tr,TMAX),'pulsa 90° berikutnya (TR)']].forEach(([t,n],i)=>{c.beginPath();c.moveTo(X(t),30);c.lineTo(X(t),270);c.stroke();c.fillStyle=T;c.textAlign=(i&&X(t)>560)?'right':'left';c.fillText(n,X(t)+((i&&X(t)>560)?-4:4),42+i*16);});
 c.setLineDash([]);
 [[false,L],[true,A]].forEach(([on,k])=>{c.fillStyle=k;c.beginPath();c.arc(X(Math.min(s.tr,TMAX)),Y(mz(s.tr,on,jr)),5,0,7);c.fill();});
 c.textAlign='left';c.fillStyle=L;c.fillText('Garis putus-putus: tanpa DRIVE',480,214);c.fillStyle=A;c.fillText('Garis tebal: dengan DRIVE',480,232);
}
function upd(){
 const jr=J(s.j),a=mz(s.tr,false,jr),b=mz(s.tr,true,jr);
 $('m3-dr-otr').textContent=s.tr+' ms';$('m3-dr-oet').textContent=s.et+' ms';
 $('m3-dr-on').setAttribute('aria-pressed',s.on);$('m3-dr-off').setAttribute('aria-pressed',!s.on);
 const naik=a>0?Math.round((b/a-1)*100):0;
 const ket='Mz saat pulsa 90° berikutnya: tanpa DRIVE '+f2(a)+', dengan DRIVE '+f2(b)+(naik>0?' (naik sekitar '+naik+' persen).':'.')+
  ' '+(s.on?'DRIVE aktif: sisa magnetisasi transversal dikembalikan ke arah longitudinal, jadi Mz di akhir TR lebih besar dan TR bisa lebih pendek. Efek terbesar pada jaringan ber-T2 panjang seperti cairan.':'DRIVE mati: sisa magnetisasi transversal hanya meluruh, tidak membantu pemulihan Mz.');
 $('m3-dr-ket').textContent=ket;cv.setAttribute('aria-label','Pemulihan magnetisasi '+jr.nama+'. '+ket);draw();
}
$('m3-dr-on').addEventListener('click',()=>{s.on=true;upd();});
$('m3-dr-off').addEventListener('click',()=>{s.on=false;upd();});
sj.addEventListener('change',e=>{s.j=e.target.value;upd();});
$('m3-dr-tr').addEventListener('input',e=>{s.tr=+e.target.value;upd();});
$('m3-dr-et').addEventListener('input',e=>{s.et=+e.target.value;upd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',upd);
upd();
})();
