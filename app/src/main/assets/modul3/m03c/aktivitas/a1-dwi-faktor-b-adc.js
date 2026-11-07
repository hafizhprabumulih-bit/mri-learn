/* difusi dan faktor b */
(function(){
const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),cv=$('m3-cv-d'),c=cv.getContext('2d');
const IT=[['CSF',2.94,'#2f6bff'],['GM',.76,'#2b8a3e'],['WM',.45,'#d9a400'],['Lesi',.30,'#e03131']],S=(a,b)=>Math.exp(-b*a*1e-3);
let g=40,dl=20,D=30;
const bv=()=>{const d=Math.max(D,dl)*1e-3;return Math.pow(2.675e8,2)*Math.pow(g*1e-3,2)*Math.pow(dl*1e-3,2)*(d-dl*1e-3/3)/1e6;};
const X=b=>50+b/4000*450,Y=v=>290-v*260;
function draw(b){const T=C('--teks'),L=C('--lembut'),G=C('--garis');c.clearRect(0,0,760,340);c.font='13px system-ui';c.lineWidth=1;
c.strokeStyle=G;c.fillStyle=L;c.textAlign='right';[0,.5,1].forEach(v=>{c.beginPath();c.moveTo(50,Y(v));c.lineTo(500,Y(v));c.stroke();c.fillText(v,44,Y(v)+4);});
c.textAlign='center';[0,1000,2000,3000,4000].forEach(t=>c.fillText(t,X(t),310));c.fillText('b (s/mm²)',275,330);
IT.forEach(([n,a,k])=>{c.strokeStyle=k;c.lineWidth=2;c.beginPath();for(let t=0;t<=4000;t+=40){t?c.lineTo(X(t),Y(S(a,t))):c.moveTo(X(t),Y(S(a,t)));}c.stroke();c.fillStyle=k;c.beginPath();c.arc(X(Math.min(b,4000)),Y(S(a,b)),4,0,7);c.fill();});
c.strokeStyle=T;c.lineWidth=1;c.setLineDash([5,4]);c.beginPath();c.moveTo(X(Math.min(b,4000)),20);c.lineTo(X(Math.min(b,4000)),290);c.stroke();c.setLineDash([]);
IT.forEach(([n,a,k],i)=>{const v=S(a,b),bx=545+i*50;c.fillStyle=k;c.fillRect(bx,290-v*260,34,v*260);c.fillStyle=L;c.textAlign='center';c.fillText(n,bx+17,310);});
c.fillStyle=L;c.fillText('Sinyal pada b ini',640,20);}
function upd(){const b=bv();
$('m3-d-og').textContent=g+' mT/m';$('m3-d-odl').textContent=dl+' ms';$('m3-d-oD').textContent=Math.max(D,dl)+' ms';$('m3-d-b').textContent=Math.round(b)+' s/mm²';
const t=IT.map(([n,a])=>n+' '+S(a,b).toFixed(2).replace('.',',')).join(', ');
$('m3-d-ket').textContent='Sinyal relatif: '+t+'. '+(b<50?'b hampir nol: tidak ada bobot difusi, semua jaringan bersinyal tinggi.':'Makin besar b, makin besar beda sinyal. CSF (difusi bebas) paling cepat meredup, sedangkan lesi berdifusi terbatas tetap terang.');
cv.setAttribute('aria-label','Sinyal difusi pada b '+Math.round(b)+'. '+t);draw(b);}
const P={lo:[10,5,10],hi:[40,20,30],mx:[80,20,50]};
document.querySelectorAll('[data-df]').forEach(x=>x.addEventListener('click',()=>{[g,dl,D]=P[x.dataset.df];$('m3-d-g').value=g;$('m3-d-dl').value=dl;$('m3-d-D').value=D;upd();}));
$('m3-d-g').addEventListener('input',e=>{g=+e.target.value;upd();});
$('m3-d-dl').addEventListener('input',e=>{dl=+e.target.value;upd();});
$('m3-d-D').addEventListener('input',e=>{D=+e.target.value;upd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',upd);
upd();
})();
