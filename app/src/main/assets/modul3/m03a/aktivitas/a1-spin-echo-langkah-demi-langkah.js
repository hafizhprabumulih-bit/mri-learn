/* animasi spin echo */
(function(){
const cv=$('m3-cv-r'),c=cv.getContext('2d'),cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),N=9,K=5,T2=80;
const F=[...Array(N)].map((_,j)=>j/(N-1)*2-1),CAR=[['\u{1F3CE}',1,.5],['\u{1F697}',.1,.8],['\u{1F69C}',-.8,1.1]];
let u=0,te=80,se=true,car=false,pl=0;
const ph=(f,x)=>f*K*(se&&x>1?x-2:x),A=x=>Math.exp(-x*te/2/T2);
const S=x=>{let a=0,b=0;F.forEach(f=>{const p=ph(f,x);a+=Math.cos(p);b+=Math.sin(p);});return[a/N,b/N];};
const sig=x=>Math.hypot(...S(x))*A(x);
const col=f=>'hsl('+Math.round(225*(1-(f+1)/2))+',75%,50%)';
function arrow(x,y,a,r,w,k){c.strokeStyle=k;c.fillStyle=k;c.lineWidth=w;const ex=x+r*Math.cos(a),ey=y-r*Math.sin(a);c.beginPath();c.moveTo(x,y);c.lineTo(ex,ey);c.stroke();c.beginPath();c.arc(ex,ey,w+1,0,7);c.fill();}
function draw(){
const T=C('--teks'),L=C('--lembut'),G=C('--garis'),AK=C('--aksen');
c.clearRect(0,0,760,380);c.font='13px system-ui';c.textAlign='center';
const cx=130,cy=130,R=95;
c.strokeStyle=G;c.lineWidth=1;c.fillStyle=L;
if(!car){c.beginPath();c.arc(cx,cy,R,0,7);c.stroke();
F.forEach(f=>arrow(cx,cy,-ph(f,u)+Math.PI/2,R*A(u)*.95,2,col(f)));
const s=S(u);arrow(cx,cy,Math.atan2(s[1],s[0])*-1+Math.PI/2,R*Math.hypot(s[0],s[1])*A(u),5,T);
c.fillStyle=L;c.fillText('Bidang transversal (dari atas)',cx,cy+R+22);}
else{[[R,0],[R*.7,1],[R*.4,2]].forEach(([r])=>{c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();});
c.beginPath();c.moveTo(cx,cy);c.lineTo(cx,cy-R-8);c.setLineDash([4,4]);c.stroke();c.setLineDash([]);
CAR.forEach(([e,f,r])=>{const rr=R*(.4+.3*(2-CAR.findIndex(z=>z[0]===e)))/1;const a=-ph(f,u)+Math.PI/2;c.font='20px system-ui';c.fillStyle=T;c.fillText(e,cx+rr*Math.cos(a),cy-rr*Math.sin(a)+7);});
c.font='13px system-ui';c.fillStyle=L;c.fillText('Lintasan: garis putus = garis start',cx,cy+R+22);}
// diagram
const x0=290,x1=730,yb=95,ys=240,X=x=>x0+x/2.5*(x1-x0);
c.strokeStyle=L;c.lineWidth=1;c.beginPath();c.moveTo(x0,yb);c.lineTo(x1,yb);c.stroke();
c.fillStyle=AK;c.fillRect(X(0)-6,yb-25,12,25);c.fillRect(X(1)-6,yb-50,12,50);
c.fillStyle=T;c.fillText('90°',X(0),yb-32);c.fillText('180°',X(1),yb-57);
c.fillStyle=L;c.fillText('RF',x0-18,yb-4);c.fillText('Sinyal',x0-24,ys);
c.beginPath();c.moveTo(x0,ys);c.lineTo(x1,ys);c.stroke();
c.setLineDash([5,4]);c.strokeStyle=L;c.beginPath();for(let x=0;x<=2.5;x+=.02){const px=X(x),py=ys-A(x)*80;x?c.lineTo(px,py):c.moveTo(px,py);}c.stroke();c.setLineDash([]);
c.strokeStyle=T;c.lineWidth=2;c.beginPath();for(let x=0;x<=u+.001;x+=.01){const px=X(x),py=ys-sig(x)*80;x?c.lineTo(px,py):c.moveTo(px,py);}c.stroke();
c.beginPath();for(let x=0;x<=u+.001;x+=.01){const px=X(x),py=ys+sig(x)*80;x?c.lineTo(px,py):c.moveTo(px,py);}c.stroke();
c.strokeStyle=AK;c.lineWidth=1;c.beginPath();c.moveTo(X(u),yb-60);c.lineTo(X(u),ys+85);c.stroke();
c.fillStyle=L;c.fillText('tau',X(.5),ys+100);c.fillText('tau',X(1.5),ys+100);c.fillText('TE = '+te+' ms',X(1),ys+118);
c.fillText('garis putus: batas peluruhan T2',X(1.25),ys-95);
}
function upd(){
const e=Math.abs(u-2)<.05&&se,s=sig(u);
let k=u<.03?'Pulsa 90°: semua vektor sefase.':u<=.97?'Dephasing T2*: vektor menyebar, sinyal turun cepat.':u<1.05?'Pulsa 180°: kipas dibalik seperti pancake.':e?'Spin echo: semua sefase lagi, sinyal maksimum (TE = 2 tau). Tingginya hanya '+Math.round(A(2)*100)+' persen karena T2 tidak dikoreksi.':u<2?(se?'Rephasing: yang cepat mengejar yang lambat.':'Tanpa 180°, vektor terus menyebar dan tidak ada echo.'):'Setelah echo, dephasing terulang: echo simetris.';
$('m3-r-t').value=Math.round(u*100);$('m3-r-o').textContent=u.toFixed(2).replace('.',',')+' tau';
$('m3-r-ote').textContent=te+' ms';$('m3-r-play').textContent=pl?'Jeda':'Putar';
$('m3-r-v').textContent='Tampilan: '+(car?'Larmor Grand Prix':'vektor');$('m3-r-v').setAttribute('aria-pressed',car);
$('m3-r-se').textContent='Pulsa 180°: '+(se?'aktif':'mati');$('m3-r-se').setAttribute('aria-pressed',se);
$('m3-r-ket').textContent=k+' Sinyal saat ini '+Math.round(s*100)+' persen.';
cv.setAttribute('aria-label','Animasi spin echo. '+k);draw();}
function lp(){if(!pl)return;u+=.01;if(u>=2.5){u=2.5;pl=0;}upd();if(pl)requestAnimationFrame(lp);}
$('m3-r-play').addEventListener('click',()=>{if(pl)pl=0;else{if(u>=2.5)u=0;pl=1;requestAnimationFrame(lp);}upd();});
$('m3-r-t').addEventListener('input',e=>{pl=0;u=+e.target.value/100;upd();});
$('m3-r-te').addEventListener('input',e=>{te=+e.target.value;upd();});
$('m3-r-se').addEventListener('click',()=>{se=!se;upd();});
$('m3-r-v').addEventListener('click',()=>{car=!car;upd();});
$('m3-r-rs').addEventListener('click',()=>{u=0;te=80;se=true;car=false;pl=0;$('m3-r-te').value=80;upd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',draw);
upd();
})();
