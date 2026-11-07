(function(){
const N=9,X=[],D=[.7,-.5,.9,-.2,.4,-.9,.1,.6,-.7],K=6,LM=1.2,cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),f2=x=>x.toFixed(2).replace('.',',');
// TODO-VERIFIKASI: K, LM, dan D adalah angka ilustrasi tanpa satuan, bukan nilai fisika. Pada spin echo, hanya efek medan yang direfokus oleh pulsa 180°.
for(let j=0;j<N;j++)X.push(j/(N-1)*2-1);
let t=0,inh=false,se=false,pl=0;
const g=u=>u<=1?-u:(u<=3?u-2:1);
const ph=(j,u)=>X[j]*K*g(u)+(inh?D[j]*LM*(se?(u<=1?u:2-u):u):0);
const S=u=>{let a=0,b=0;for(let j=0;j<N;j++){const p=ph(j,u);a+=Math.cos(p);b+=Math.sin(p);}return[a/N,b/N];};
const mag=u=>Math.hypot.apply(null,S(u)),xt=u=>340+100*u;
function draw(){
 const c=$('m3-cv-g').getContext('2d'),T=C('--teks'),L=C('--lembut'),Ln=C('--garis'),A=C('--aksen');
 c.clearRect(0,0,760,330);c.font='12px sans-serif';c.lineWidth=2;
 c.strokeStyle=Ln;c.beginPath();c.arc(150,170,110,0,7);c.stroke();c.fillStyle=L;c.fillText('Bidang transversal, tampak dari atas',20,24);c.fillText('ungu: melambat   merah: mempercepat',20,312);
 for(let j=0;j<N;j++){const p=ph(j,t);c.strokeStyle='hsl('+Math.round(250*(1-(X[j]+1)/2))+',75%,55%)';c.beginPath();c.moveTo(150,170);c.lineTo(150+105*Math.sin(p),170-105*Math.cos(p));c.stroke();}
 const s=S(t),m=Math.hypot(s[0],s[1]);c.strokeStyle=T;c.lineWidth=4;c.beginPath();c.moveTo(150,170);c.lineTo(150+105*s[1],170-105*s[0]);c.stroke();c.lineWidth=2;
 c.globalAlpha=.5;c.fillStyle=A;c.fillRect(xt(0),80,100,30);c.fillRect(xt(1),50,200,30);c.globalAlpha=1;
 c.strokeStyle=A;c.beginPath();c.moveTo(340,80);c.lineTo(340,110);c.lineTo(xt(1),110);c.lineTo(xt(1),50);c.lineTo(xt(3),50);c.lineTo(xt(3),80);c.lineTo(740,80);c.stroke();
 c.fillStyle=T;c.fillText('RF α',346,26);c.fillText('Gradien bipolar',440,40);if(se)c.fillText('180°',xt(1)-12,26);
 c.strokeStyle=Ln;c.beginPath();c.moveTo(340,250);c.lineTo(740,250);c.stroke();
 c.strokeStyle=T;c.beginPath();for(let i=0;i<=200;i++){const u=i/50,y=250-100*mag(u);i?c.lineTo(xt(u),y):c.moveTo(xt(u),y);}c.stroke();
 c.setLineDash([4,4]);c.strokeStyle=L;c.beginPath();c.moveTo(xt(2),130);c.lineTo(xt(2),262);c.stroke();c.setLineDash([]);
 c.fillStyle=L;c.fillText('besar sinyal',346,130);c.fillText('FID',350,146);c.fillText('gema, saat TE',xt(2)-34,282);c.fillText('waktu →',690,272);
 c.strokeStyle=A;c.beginPath();c.moveTo(xt(t),130);c.lineTo(xt(t),262);c.stroke();c.fillStyle=A;c.beginPath();c.arc(xt(t),250-100*m,5,0,7);c.fill();
}
function ket(){
 const pk=Math.round(100*mag(2));let k=t<1?'Lobus negatif: gradien mengacak fase, sinyal awal (FID) cepat hilang.':t<1.95?'Lobus positif: spin yang tertinggal dipercepat dan yang di depan diperlambat, mereka mulai berkumpul.':t<2.05?'Puncak gema: semua spin searah.':t<3?'Gradien masih menyala, spin berpencar lagi.':'Gradien mati, spin tetap berpencar.';
 k+=' Tinggi puncak gema: '+pk+'% dari FID awal. ';
 k+=inh?(se?'Pulsa 180° membatalkan efek medan tidak homogen, sehingga puncak kembali penuh.':'Gradien tidak mengoreksi medan tidak homogen (efek T2*), sehingga puncak lebih rendah.'):'Aktifkan medan tidak homogen untuk melihat efek T2*.';
 $('m3-g-ket').textContent=k;$('m3-cv-g').setAttribute('aria-label','Gema gradien. Puncak gema '+pk+' persen.');
}
function upd(){$('m3-g-t').value=Math.round(t*100);$('m3-g-o').textContent=f2(t/2)+' × TE';$('m3-g-play').textContent=pl?'Jeda':'Putar';$('m3-g-inh').setAttribute('aria-pressed',inh);$('m3-g-se').setAttribute('aria-pressed',se);draw();ket();}
function lp(){if(!pl)return;t+=.012;if(t>=4){t=4;pl=0;}upd();if(pl)requestAnimationFrame(lp);}
$('m3-g-play').addEventListener('click',()=>{if(pl){pl=0;}else{if(t>=4)t=0;pl=1;requestAnimationFrame(lp);}upd();});
$('m3-g-t').addEventListener('input',e=>{pl=0;t=+e.target.value/100;upd();});
$('m3-g-inh').addEventListener('click',()=>{inh=!inh;upd();});
$('m3-g-se').addEventListener('click',()=>{se=!se;upd();});
$('m3-g-rs').addEventListener('click',()=>{t=0;inh=false;se=false;pl=0;upd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',draw);
upd();
})();
