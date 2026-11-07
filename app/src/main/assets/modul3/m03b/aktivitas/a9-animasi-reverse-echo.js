/* animasi reverse-echo */
(function(){
const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim();
// TODO-VERIFIKASI: skala waktu, bentuk sinyal, dan bentuk lobus rephase hanya ilustrasi. Yang berasal dari buku: TE efektif = 2 x TR - TE aktual, dan TE sekitar 70 ms atau lebih untuk bobot T2.
const SC=2.2,X0=24,YR=50,YG=130,YS=215,CL=['--t1','--aksen','--benar','--t2','--lembut'];
const D={tr:30,te:8,t:100,e:0};let s=Object.assign({},D),pl=0;
const tx=t=>X0+SC*t;
function draw(){
 const c=$('m3x-cv-r').getContext('2d'),tr=s.tr,te=s.te,i=s.e,end=4*tr+8,tc=end*s.t/100,T=C('--teks'),L=C('--lembut'),Ln=C('--garis');
 c.clearRect(0,0,760,300);c.font='12px sans-serif';c.lineWidth=2;
 [[YR,'RF'],[YG,'Gradien'],[YS,'Sinyal']].forEach(a=>{c.strokeStyle=Ln;c.beginPath();c.moveTo(X0,a[0]);c.lineTo(680,a[0]);c.stroke();c.fillStyle=L;c.fillText(a[1],690,a[0]+4);});
 c.save();c.beginPath();c.rect(0,0,tx(tc),300);c.clip();
 for(let k=0;k<5;k++){const x=tx(k*tr);c.fillStyle=C(CL[k]);c.fillRect(x,YR-26,8,26);c.fillStyle=T;c.fillText('RF'+(k+1),x-2,YR-32);}
 for(let k=0;k<4;k++){const x=tx(k*tr)+10;c.strokeStyle=C(CL[k]);c.lineWidth=1.5;c.beginPath();for(let d=0;d<=50;d++){const y=YS-26*Math.exp(-d/14)*Math.sin(d*.9);d?c.lineTo(x+d,y):c.moveTo(x,y);}c.stroke();c.fillStyle=C(CL[k]);c.fillText('FID '+(k+1),x,YS+30);}
 for(let q=0;q<3;q++){const et=(q+2)*tr-te,x=tx(et),lw=Math.min(8,tr-te-1),on=q===i;
  c.strokeStyle=C(CL[q]);c.lineWidth=on?3:1.5;c.beginPath();for(let d=-34;d<=34;d++){const y=YS-30*Math.exp(-d*d/180)*Math.sin(d*1.1);d>-34?c.lineTo(x+d,y):c.moveTo(x+d,y);}c.stroke();
  c.fillStyle=C(CL[q]);c.fillText('Gema '+(q+1),x-18,YS-38);
  c.globalAlpha=on?.8:.4;c.fillRect(tx(et-lw-2),YG-16,SC*lw,16);c.fillRect(tx(et-2),YG,SC*2,8);c.globalAlpha=1;
  if(on)c.fillText('rewinder',tx(et-lw-2)-6,YG-22);}
 const ts=i*tr,ee=(i+2)*tr-te,tn=(i+2)*tr;c.strokeStyle=C(CL[i]);c.fillStyle=C(CL[i]);c.lineWidth=2;
 const br=(a,b,y,lb)=>{c.beginPath();c.moveTo(tx(a),y-5);c.lineTo(tx(a),y+5);c.moveTo(tx(a),y);c.lineTo(tx(b),y);c.moveTo(tx(b),y-5);c.lineTo(tx(b),y+5);c.stroke();c.fillText(lb,tx(a)+6,y-7);};
 br(ts,ee,268,'TE efektif = '+(2*tr-te)+' ms');br(ee,tn,290,'TE aktual = '+te+' ms');
 c.restore();
 c.strokeStyle=T;c.lineWidth=1;c.setLineDash([4,4]);c.beginPath();c.moveTo(tx(tc),30);c.lineTo(tx(tc),250);c.stroke();c.setLineDash([]);
 const eff=2*tr-te;
 $('m3x-r-ket').textContent='TR '+tr+' ms dan TE aktual '+te+' ms: TE efektif gema '+(i+1)+' = 2 × '+tr+' − '+te+' = '+eff+' ms, dihitung dari RF'+(i+1)+' (pulsa yang membentuk FID-nya) sampai puncak gema. '+(eff>=70?'TE efektif cukup panjang untuk bobot T2 (buku: kira-kira 70 ms atau lebih). ':'TE efektif masih di bawah sekitar 70 ms, jadi bobot T2 lemah. Naikkan TR atau turunkan TE aktual. ')+'TE aktual (puncak gema sampai RF berikutnya) tidak menentukan kontras T2.';
 $('m3x-cv-r').setAttribute('aria-label','Animasi reverse-echo: TR '+tr+' ms, TE aktual '+te+' ms, TE efektif '+eff+' ms');
}
function ui(){
 if(s.te>s.tr-5)s.te=s.tr-5;
 $('m3x-r-te').max=Math.min(30,s.tr-5);$('m3x-r-te').value=s.te;$('m3x-r-tr').value=s.tr;$('m3x-r-t').value=s.t;
 $('m3x-r-otr').textContent=s.tr+' ms';$('m3x-r-ote').textContent=s.te+' ms';$('m3x-r-ot').textContent=Math.round(s.t)+' persen';
 $('m3x-r-play').textContent=pl?'Jeda':'Putar';
 document.querySelectorAll('[data-re]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.re===s.e));draw();
}
function lp(){if(!pl)return;s.t+=.8;if(s.t>=100){s.t=100;pl=0;}ui();if(pl)requestAnimationFrame(lp);}
$('m3x-r-play').addEventListener('click',()=>{if(pl){pl=0;}else{if(s.t>=100)s.t=0;pl=1;requestAnimationFrame(lp);}ui();});
$('m3x-r-t').addEventListener('input',e=>{pl=0;s.t=+e.target.value;ui();});
$('m3x-r-tr').addEventListener('input',e=>{s.tr=+e.target.value;ui();});
$('m3x-r-te').addEventListener('input',e=>{s.te=+e.target.value;ui();});
document.querySelectorAll('[data-re]').forEach(b=>b.addEventListener('click',()=>{s.e=+b.dataset.re;ui();}));
$('m3x-r-rs').addEventListener('click',()=>{pl=0;s=Object.assign({},D);ui();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',draw);
ui();
})();
