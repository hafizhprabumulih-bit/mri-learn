(function(){
const J=k=>DATA.JARINGAN.find(j=>j.id===k),W=['fat','gm','wm','csf'].map(J),LB=['Lemak','GM','WM','CSF'],cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),f0=Math.round;
// TODO-VERIFIKASI: bentuk kurva adalah ilustrasi mengikuti Gambar 4.20 dan 4.23 sampai 4.25 buku; tinggi relatif bukan hasil hitung. Tabel memakai T2 sebagai pengganti T2* pada gradient echo.
const D={m:'co',tr:30,te:10};let q=Object.assign({},D);
function bell(c,x,w,h,col,on,B){c.setLineDash(on?[]:[5,4]);c.strokeStyle=C(on?col:'--lembut');c.beginPath();for(let d=-w;d<=w;d++){const y=B-h*Math.exp(-Math.pow(d/(w/2.2),2));d===-w?c.moveTo(x+d,y):c.lineTo(x+d,y);}c.stroke();c.setLineDash([]);}
function fid(c,x,h,col,on,B){c.setLineDash(on?[]:[5,4]);c.strokeStyle=C(on?col:'--lembut');c.beginPath();for(let d=0;d<=130;d++){const y=B-h*Math.exp(-d/40);d?c.lineTo(x+d,y):c.moveTo(x,y);}c.stroke();c.setLineDash([]);}
function dw(){
 const c=$('m3-cv-w').getContext('2d'),B=200,rev=q.m==='rev',tr=q.tr,ta=Math.min(q.te,tr-1);
 c.clearRect(0,0,760,260);c.font='12px sans-serif';c.lineWidth=2.5;c.strokeStyle=C('--garis');c.beginPath();c.moveTo(20,B);c.lineTo(740,B);c.stroke();
 const rf=(x,l,col)=>{c.fillStyle=C(col);c.fillRect(x-6,B-100,12,100);c.fillStyle=C('--teks');c.fillText(l,x-14,B-106);};
 const tx=(s,x,y,col)=>{c.fillStyle=C(col);c.fillText(s,x,y);};
 let te,k;
 if(rev){const kx=3.2,x3=620,x2=x3-kx*tr,x1=x3-2*kx*tr,xe=x3-kx*ta;te=2*tr-ta;rf(x1,'RF 1','--t1');rf(x2,'RF 2','--lembut');rf(x3,'RF 3','--aksen');
  fid(c,x1+6,50,'--t1',false,B);bell(c,xe,26,85,'--salah',true,B);tx('gema terstimulasi (dibaca)',xe-70,B-95,'--salah');
  c.strokeStyle=C('--teks');c.lineWidth=1.5;c.beginPath();c.moveTo(x1,B+22);c.lineTo(xe,B+22);c.moveTo(xe,B+42);c.lineTo(x3,B+42);c.stroke();
  tx('TE efektif = '+f0(te)+' ms',(x1+xe)/2-50,B+18,'--teks');tx('TE aktual = '+f0(ta)+' ms',(xe+x3)/2-40,B+38,'--teks');
  k='Reverse-echo: hanya gema terstimulasi yang dibaca. Gema digeser ke depan, sehingga TE efektif (2 × TR − TE aktual = '+f0(te)+' ms) lebih panjang daripada TR. Bobot T2 sejati dalam waktu pindai singkat.';}
 else{const xR=120,xg=xR+6*ta,co=q.m==='co';te=ta;rf(xR,'RF','--aksen');
  fid(c,xR+6,60,'--t1',true,B);tx('FID',xR+24,B-70,'--t1');
  bell(c,xR,30,co?60:45,'--salah',co,B);tx(co?'gema terstimulasi':'gema terstimulasi (di-spoil, tidak dibaca)',xR-60,B-(co?66:50),co?'--salah':'--lembut');
  if(co){c.setLineDash([5,4]);c.strokeStyle=C('--aksen');c.beginPath();for(let d=0;d<=130;d++){const y=B-100*Math.exp(-d/55);d?c.lineTo(xR+d,y):c.moveTo(xR,y);}c.stroke();c.setLineDash([]);tx('FID + gema terstimulasi',xR+60,B-98,'--aksen');}
  bell(c,xg,26,co?95:60,'--benar',true,B);tx('gradient echo (dibaca)',xg-50,B-(co?104:70),'--benar');
  c.strokeStyle=C('--teks');c.lineWidth=1.5;c.beginPath();c.moveTo(xR,B+22);c.lineTo(xg,B+22);c.stroke();tx('TE = '+ta+' ms',(xR+xg)/2-24,B+18,'--teks');
  k=co?'Koheren: FID dan gema terstimulasi dibaca bersama, sehingga bobot T1, PD, atau T2* bergantung pada TE.':'Inkoheren: sisa magnetisasi di-spoil, jadi hanya FID yang dibaca dan bobot T1 serta PD yang dominan.';}
 const T=W.map(t=>Math.exp(-te/t.T2_ms)),cr=(T[3]-T[2])/(T[3]+T[2]);
 $('m3-w-tb').innerHTML='<tr><th>Jaringan</th><th>Sinyal relatif pada '+(rev?'TE efektif ':'TE ')+f0(te)+' ms</th></tr>'+W.map((t,i)=>'<tr><td>'+LB[i]+'</td><td>'+f0(100*T[i])+'%</td></tr>').join('');
 $('m3-w-ket').textContent=k+' Kontras T2 relatif CSF dan substansia alba: '+f0(100*cr)+'%.';
 $('m3-cv-w').setAttribute('aria-label','Sinyal tunak, mode '+(q.m==='co'?'koheren':q.m==='in'?'inkoheren':'reverse-echo')+', TE '+f0(te)+' ms.');
}
function uw(){$('m3-w-tr').value=q.tr;$('m3-w-te').value=q.te;$('m3-w-otr').textContent=q.tr+' ms';$('m3-w-ote').textContent=q.te+' ms';$('m3-w-tr').disabled=q.m!=='rev';document.querySelectorAll('[data-w]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.w===q.m));dw();}
$('m3-w-tr').addEventListener('input',e=>{q.tr=+e.target.value;uw();});
$('m3-w-te').addEventListener('input',e=>{q.te=+e.target.value;uw();});
document.querySelectorAll('[data-w]').forEach(b=>b.addEventListener('click',()=>{q.m=b.dataset.w;uw();}));
$('m3-w-rs').addEventListener('click',()=>{q=Object.assign({},D);uw();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',dw);
uw();
})();
