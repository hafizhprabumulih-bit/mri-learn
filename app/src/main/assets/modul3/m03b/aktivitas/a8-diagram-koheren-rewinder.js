/* diagram sekuens koheren */
(function(){
const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim();
// TODO-VERIFIKASI: bentuk gelombang dan lebar lobus hanya ilustrasi. Yang berasal dari buku: rewinder membalik kemiringan gradien penyandi fase setelah pembacaan, sehingga magnetisasi transversal koheren pada awal TR berikutnya.
const X0=30,W=320,YR=45,YP=108,YX=172,YS=250,D={a:60,rw:true,t:0};let s=Object.assign({},D),pl=0;
function draw(){
 const c=$('m3y-cv-c').getContext('2d'),T=C('--teks'),L=C('--lembut'),Ln=C('--garis'),A=C('--aksen'),O=C('--t1'),a=s.a/100,tc=X0+2*W*s.t/100;
 c.clearRect(0,0,760,300);c.font='12px sans-serif';c.lineWidth=2;
 [[YR,'RF'],[YP,'Fase'],[YX,'Baca'],[YS,'Sinyal']].forEach(r=>{c.strokeStyle=Ln;c.beginPath();c.moveTo(X0,r[0]);c.lineTo(X0+2*W,r[0]);c.stroke();c.fillStyle=L;c.fillText(r[1],X0+2*W+8,r[0]+4);});
 c.save();c.beginPath();c.rect(0,0,tc,300);c.clip();
 for(let k=0;k<2;k++){const x=X0+k*W;
  c.fillStyle=A;c.fillRect(x,YR-26,8,26);c.fillStyle=T;c.fillText('RF',x,YR-32);
  c.strokeStyle=O;c.lineWidth=2;c.beginPath();for(let d=0;d<=40;d++){const y=YP-a*30*Math.exp(-Math.pow(d-20,2)/60);d?c.lineTo(x+25+d,y):c.moveTo(x+25,y);}c.stroke();
  if(s.rw){c.setLineDash([5,3]);c.beginPath();for(let d=0;d<=40;d++){const y=YP+a*30*Math.exp(-Math.pow(d-20,2)/60);d?c.lineTo(x+260+d,y):c.moveTo(x+260,y);}c.stroke();c.setLineDash([]);c.fillStyle=O;c.fillText('rewinder',x+250,YP+46);}
  c.fillStyle=A;c.globalAlpha=.55;c.fillRect(x+55,YX,45,16);c.fillRect(x+100,YX-32,90,32);c.globalAlpha=1;c.fillStyle=T;c.fillText('dephase',x+52,YX+32);c.fillText('rephase',x+118,YX-38);
  c.strokeStyle=T;c.lineWidth=1.5;c.beginPath();for(let d=0;d<=60;d++){const y=YS-28*Math.exp(-d/14)*Math.sin(d*.9);d?c.lineTo(x+10+d,y):c.moveTo(x+10,y);}c.stroke();
  c.beginPath();for(let d=-34;d<=34;d++){const y=YS-24*Math.exp(-d*d/180)*Math.sin(d*1.1);d>-34?c.lineTo(x+145+d,y):c.moveTo(x+145+d,y);}c.stroke();
  c.fillStyle=T;c.fillText('FID',x+14,YS+30);c.fillText('gema',x+132,YS+40);}
 c.restore();
 c.strokeStyle=T;c.lineWidth=1;c.setLineDash([4,4]);c.beginPath();c.moveTo(tc,20);c.lineTo(tc,270);c.stroke();c.setLineDash([]);
 c.fillStyle=L;c.fillText('TR 1',X0+W/2-12,292);c.fillText('TR 2',X0+W*1.5-12,292);
 const u=(s.t/100*2)%1,r1=s.rw?0:Math.abs(s.a),r2=s.rw?0:2*Math.abs(s.a);
 const st=u<.04?'Pulsa RF: eksitasi, FID terbentuk.':u<.17?'FID mulai meluruh.':u<.31?'Lobus dephase gradien baca: spin berpencar.':u<.6?'Lobus rephase: spin berkumpul kembali dan gema terbentuk di tengahnya.':u<.8?'Menunggu pulsa RF berikutnya.':(s.rw?'Rewinder: gradien penyandi fase dibalik, mengembalikan fase ke semula.':'Tanpa rewinder: fase dari langkah penyandi fase tidak dikembalikan.');
 $('m3y-c-ket').textContent=st+' Sisa fase penyandi yang menumpuk (satuan relatif): setelah TR 1 = '+r1+', setelah TR 2 = '+r2+'. '+(s.rw?'Magnetisasi transversal tetap koheren pada awal TR berikutnya.':'Magnetisasi transversal tidak lagi koheren, sehingga kontras dan sinyal berubah.');
 $('m3y-cv-c').setAttribute('aria-label','Diagram sekuens koheren, rewinder '+(s.rw?'nyala':'mati')+', langkah fase '+s.a+' persen');
}
function ui(){
 $('m3y-c-t').value=s.t;$('m3y-c-a').value=s.a;$('m3y-c-ot').textContent=Math.round(s.t)+' persen';$('m3y-c-oa').textContent=(s.a>0?'+':'')+s.a+' persen';
 $('m3y-c-rw').textContent='Rewinder: '+(s.rw?'nyala':'mati');$('m3y-c-rw').setAttribute('aria-pressed',s.rw);$('m3y-c-play').textContent=pl?'Jeda':'Putar';draw();
}
function lp(){if(!pl)return;s.t+=.5;if(s.t>=100){s.t=100;pl=0;}ui();if(pl)requestAnimationFrame(lp);}
$('m3y-c-play').addEventListener('click',()=>{if(pl){pl=0;}else{if(s.t>=100)s.t=0;pl=1;requestAnimationFrame(lp);}ui();});
$('m3y-c-t').addEventListener('input',e=>{pl=0;s.t=+e.target.value;ui();});
$('m3y-c-a').addEventListener('input',e=>{s.a=+e.target.value;ui();});
$('m3y-c-rw').addEventListener('click',()=>{s.rw=!s.rw;ui();});
$('m3y-c-rs').addEventListener('click',()=>{pl=0;s=Object.assign({},D);s.t=100;ui();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',draw);
s.t=100;ui();
})();
