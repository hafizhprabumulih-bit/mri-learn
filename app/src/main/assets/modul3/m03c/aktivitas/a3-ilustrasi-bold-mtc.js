/* ilustrasi BOLD dan MTC */
// TODO-VERIFIKASI: seluruh angka ilustrasi. BOLD: T2* dasar 50 ms, perubahan R2* maksimum 0,7 per detik pada aktivasi 100 persen, derau semu tetap. MTC: kontribusi inti terikat per jaringan (CSF 0,02; GM 0,30; WM 0,45), lebar garis inti terikat 3 kHz, saturasi langsung air bebas dengan lebar 0,3 kHz.
(function(){
const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),f1=x=>x.toFixed(1).replace('.',','),f0=Math.round;
/* ---- BOLD ---- */
const cb=$('m3-bo-cv'),b=cb.getContext('2d');let a=60,te=40;
const T2S=50,BL=[0,0,1,1,0,0,1,1,0,0,1,1];
const dR=a=>.0007*a/100;
const aps=()=>Math.exp(-te/T2S)*(Math.exp(te*dR(a))-1)*100/Math.exp(-te/T2S);
function drawB(){
 const T=C('--teks'),L=C('--lembut'),G=C('--garis'),A=C('--aksen'),pct=aps(),W=380,H=260,x0=40,x1=370,Y=v=>200-(v-100)/6*140;
 b.clearRect(0,0,W,H);b.font='12px system-ui';b.lineWidth=1;b.strokeStyle=G;b.fillStyle=L;b.textAlign='right';
 [100,102,104,106].forEach(v=>{b.beginPath();b.moveTo(x0,Y(v));b.lineTo(x1,Y(v));b.stroke();b.fillText(v+'%',x0-4,Y(v)+4);});
 const dx=(x1-x0)/BL.length;
 BL.forEach((v,i)=>{if(v){b.fillStyle='rgba(31,111,235,.12)';b.fillRect(x0+i*dx,40,dx,170);}});
 b.fillStyle=L;b.textAlign='center';b.fillText('biru muda: periode aktif (rangsang)',210,236);
 b.strokeStyle=A;b.lineWidth=2;b.beginPath();
 BL.forEach((v,i)=>{const y=Y(100+(v?pct:0)+.35*Math.sin(i*2.1+1)+.2*Math.sin(i*5.3));const x=x0+(i+.5)*dx;i?b.lineTo(x,y):b.moveTo(x,y);});b.stroke();
 b.fillStyle=T;b.textAlign='left';b.fillText('sinyal relatif (derau semu)',x0+4,30);
}
function updB(){
 const pct=aps(),abs=pct*Math.exp(-te/T2S);
 $('m3-bo-oa').textContent=a+' persen';$('m3-bo-ote').textContent=te+' ms';
 const k=a===0?'Tanpa aktivasi tidak ada perubahan sinyal.':'Perubahan sinyal saat aktif sekitar '+f1(pct)+' persen. Deoksihemoglobin berkurang, dephasing berkurang, sinyal naik. Perubahan sebesar ini kecil, jadi fMRI perlu banyak pengulangan dan analisis statistik.';
 $('m3-bo-ket').textContent=k+(a>0?' Beda sinyal mutlak (relatif terhadap sinyal saat TE nol) sekitar '+f1(abs)+' persen; nilainya paling besar bila TE mendekati T2* jaringan (di sini 50 ms).':'');
 cb.setAttribute('aria-label','Deret waktu BOLD. Perubahan sinyal saat aktif '+f1(pct)+' persen.');drawB();
}
$('m3-bo-a').addEventListener('input',e=>{a=+e.target.value;updB();});
$('m3-bo-te').addEventListener('input',e=>{te=+e.target.value;updB();});
/* ---- MTC ---- */
const cm=$('m3-mt-cv'),m=cm.getContext('2d');let of=4,pw=80;
const TS=[['CSF',.02,'#2f6bff'],['GM',.30,'#2b8a3e'],['WM',.45,'#d9a400']];
const offKhz=()=>of/2;
const mtc=k=>k*(pw/100)/(1+Math.pow(offKhz()/3,2));
const dir=()=>.6*(pw/100)/(1+Math.pow(offKhz()/.3,2));
const sisa=k=>(1-mtc(k))*(1-dir());
function drawM(){
 const T=C('--teks'),L=C('--lembut'),G=C('--garis'),W=380;
 m.clearRect(0,0,W,260);m.font='12px system-ui';m.lineWidth=1;m.strokeStyle=G;m.fillStyle=L;m.textAlign='right';
 [0,.5,1].forEach(v=>{const y=210-v*160;m.beginPath();m.moveTo(40,y);m.lineTo(370,y);m.stroke();m.fillText(String(v).replace('.',','),36,y+4);});
 TS.forEach(([n,k,col],i)=>{const x=70+i*100,h0=160,h1=160*sisa(k);
  m.strokeStyle=col;m.lineWidth=2;m.strokeRect(x,210-h0,60,h0);m.fillStyle=col;m.globalAlpha=.85;m.fillRect(x,210-h1,60,h1);m.globalAlpha=1;
  m.fillStyle=T;m.textAlign='center';m.fillText(n,x+30,228);m.fillText(f0(sisa(k)*100)+'%',x+30,210-h1-6);});
 m.fillStyle=L;m.textAlign='left';m.fillText('kotak: tanpa saturasi; isi: dengan saturasi',44,248);
}
function updM(){
 $('m3-mt-of').textContent=f1(offKhz())+' kHz';$('m3-mt-op').textContent=pw+' persen';
 const near=offKhz()<.9;
 const k=pw===0?'Tanpa pulsa saturasi tidak ada pengurangan sinyal.':(near?'Offset terlalu dekat dengan frekuensi air: air bebas ikut dijenuhkan langsung, sehingga semua jaringan, termasuk CSF, ikut turun. Itu bukan efek MTC.':'Pulsa off-resonance terutama menjenuhkan inti terikat, lalu magnetisasi berpindah ke inti bebas. Jaringan kaya inti terikat (WM) turun paling banyak, CSF hampir tidak berubah.');
 $('m3-mt-ket').textContent=k;
 cm.setAttribute('aria-label','Sinyal setelah saturasi MTC. CSF '+f0(sisa(.02)*100)+' persen, GM '+f0(sisa(.30)*100)+' persen, WM '+f0(sisa(.45)*100)+' persen.');drawM();
}
$('m3-mt-f').addEventListener('input',e=>{of=+e.target.value;updM();});
$('m3-mt-p').addEventListener('input',e=>{pw=+e.target.value;updM();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{updB();updM();});
updB();updM();
})();
