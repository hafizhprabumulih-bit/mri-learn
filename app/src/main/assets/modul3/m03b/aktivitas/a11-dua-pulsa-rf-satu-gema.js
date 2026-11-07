/* dua pulsa RF, satu gema */
(function(){
const rad=Math.PI/180,cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim();
let h={a1:90,a2:180,t:50};
// TODO-VERIFIKASI: amplitudo gema dua pulsa = sin(a1)·sin²(a2/2), rumus standar yang tidak ada di halaman acuan. Amplitudo FID disederhanakan sebagai sin(sudut).
const amp=(a,b)=>Math.sin(a*rad)*Math.pow(Math.sin(b*rad/2),2);
function bs(c,x,A,col,sym){c.strokeStyle=col;c.beginPath();for(let d=sym?-40:0;d<=40;d++){const y=170-A*60*Math.exp(-Math.abs(d)/14)*Math.sin(d*1.3);d===(sym?-40:0)?c.moveTo(x+d,y):c.lineTo(x+d,y);}c.stroke();}
function dH(){
 const c=$('m3-cv-h').getContext('2d'),x1=60+h.t*3,x2=60+h.t*6;c.clearRect(0,0,760,260);c.font='12px sans-serif';c.lineWidth=2;
 c.strokeStyle=C('--garis');[70,170].forEach(y=>{c.beginPath();c.moveTo(40,y);c.lineTo(740,y);c.stroke();});c.fillStyle=C('--lembut');c.fillText('RF',8,74);c.fillText('Sinyal',2,174);
 [[60,h.a1],[x1,h.a2]].forEach((p,i)=>{const H=8+52*p[1]/180;c.fillStyle=C(i?'--aksen':'--t1');c.fillRect(p[0]-5,70-H,10,H);c.fillText(p[1]+'°',p[0]-12,70-H-6);});
 bs(c,60,Math.sin(h.a1*rad),C('--t1'),0);bs(c,x1,Math.sin(h.a2*rad),C('--aksen'),0);const A=amp(h.a1,h.a2);bs(c,x2,A,C('--t2'),1);
 c.fillStyle=C('--t1');c.fillText('FID 1',66,120);c.fillStyle=C('--aksen');c.fillText('FID 2',x1+6,120);c.fillStyle=C('--t2');c.fillText('gema, pada 2 × jarak',x2-50,226);
 c.strokeStyle=C('--lembut');c.setLineDash([4,4]);c.beginPath();c.moveTo(x2,90);c.lineTo(x2,215);c.stroke();c.setLineDash([]);
 return Math.round(100*A);
}
function uH(){
 $('m3-h-a1').value=h.a1;$('m3-h-a2').value=h.a2;$('m3-h-t').value=h.t;$('m3-h-o1').textContent=h.a1+'°';$('m3-h-o2').textContent=h.a2+'°';$('m3-h-ot').textContent=h.t;
 const p=dH();$('m3-h-ket').textContent='Gema muncul pada waktu dua kali jarak antar pulsa, dengan tinggi '+p+'% dari gema terbesar (90° lalu 180°).'+(p<15?' Gemanya lemah, tetapi tetap ada.':'');
 $('m3-cv-h').setAttribute('aria-label','Dua pulsa RF. Tinggi gema '+p+' persen dari terbesar.');
}
[['a1','m3-h-a1'],['a2','m3-h-a2'],['t','m3-h-t']].forEach(a=>$(a[1]).addEventListener('input',x=>{h[a[0]]=+x.target.value;uH();}));
document.querySelectorAll('[data-h]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.h.split(',');h.a1=+v[0];h.a2=+v[1];uH();}));
$('m3-h-rs').addEventListener('click',()=>{h={a1:90,a2:180,t:50};uH();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',uH);
uH();
})();
