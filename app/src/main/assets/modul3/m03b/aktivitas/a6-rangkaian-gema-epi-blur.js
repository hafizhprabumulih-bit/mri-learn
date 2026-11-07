(function(){
const J=k=>DATA.JARINGAN.find(j=>j.id===k),cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),f0=x=>Math.round(x);
// TODO-VERIFIKASI: rentang jumlah gema, ESP, dan TE adalah pilihan didaktik. T2 dipakai sebagai pengganti T2*, dan model SE-EPI disederhanakan (puncak simetris di pusat ruang-k).
const D={m:'ge',n:32,esp:10,te:60,j:'wm'};let q=Object.assign({},D);
const sj=$('m3-p-j');['wm','gm','csf','fat'].forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=J(k).nama;sj.appendChild(o);});
function dr(){
 const c=$('m3-cv-p').getContext('2d'),esp=q.esp/10,T2=J(q.j).T2_ms,X=t=>60+680*t/300,tc=Math.max(q.te,q.n*esp/2+esp),t0=tc-q.n*esp/2,ge=q.m==='ge';
 const A=k=>{const t=t0+(k+.5)*esp;return ge?Math.exp(-t/T2):Math.exp(-tc/T2)*Math.exp(-Math.abs(t-tc)/T2);},Ac=Math.exp(-tc/T2);
 c.clearRect(0,0,760,290);c.font='12px sans-serif';c.lineWidth=2;c.strokeStyle=C('--garis');[60,140,250].forEach(y=>{c.beginPath();c.moveTo(50,y);c.lineTo(745,y);c.stroke();});
 c.fillStyle=C('--lembut');c.fillText('RF',8,64);c.fillText('Gradien baca',2,144);c.fillText('Sinyal',8,254);
 const rf=(t,h,l,col)=>{c.fillStyle=C(col);c.fillRect(X(t)-4,60-h,8,h);c.fillText(l,X(t)-12,60-h-5);};
 if(ge)rf(0,24,'α','--t1');else{rf(0,26,'90°','--t1');rf(tc/2,42,'180°','--aksen');}
 c.strokeStyle=C('--teks');c.beginPath();for(let k=0;k<=q.n;k++){const x=X(t0+k*esp),y=140+(k%2?18:-18);k?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();
 if(ge){c.strokeStyle=C('--garis');c.setLineDash([4,4]);c.beginPath();for(let t=0;t<=300;t+=5){const y=250-85*Math.exp(-t/T2);t?c.lineTo(X(t),y):c.moveTo(X(t),y);}c.stroke();c.setLineDash([]);}
 c.strokeStyle=C('--t2');c.lineWidth=Math.max(1.2,Math.min(4,680*esp/300*.6));for(let k=0;k<q.n;k++){const x=X(t0+(k+.5)*esp);c.beginPath();c.moveTo(x,250);c.lineTo(x,250-85*A(k));c.stroke();}
 c.lineWidth=1.5;c.strokeStyle=C('--lembut');c.setLineDash([4,4]);c.beginPath();c.moveTo(X(tc),70);c.lineTo(X(tc),262);c.stroke();c.setLineDash([]);c.fillStyle=C('--lembut');c.fillText('pusat ruang-k (TE efektif)',X(tc)-60,278);
 const r=Math.round(100*A(q.n-1)/Ac),b=r<50?'blur kuat':r<80?'blur sedang':'blur ringan';
 $('m3-p-ket').textContent='TE efektif: '+f0(tc)+' ms'+(tc>q.te+.5?' (tidak bisa lebih pendek daripada separuh waktu bacaan)':'')+'. Waktu bacaan: '+q.n+' × '+(esp).toFixed(1).replace('.',',')+' ms = '+f0(q.n*esp)+' ms. Gema terakhir: '+r+'% dari gema pusat, '+b+'.';
 $('m3-cv-p').setAttribute('aria-label',(ge?'GE-EPI':'SE-EPI')+', '+q.n+' gema, gema terakhir '+r+' persen dari gema pusat.');
}
function up(){$('m3-p-n').value=q.n;$('m3-p-esp').value=q.esp;$('m3-p-te').value=q.te;$('m3-p-on').textContent=q.n;$('m3-p-oe').textContent=(q.esp/10).toFixed(1).replace('.',',')+' ms';$('m3-p-ot').textContent=q.te+' ms';sj.value=q.j;document.querySelectorAll('[data-q]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.q===q.m));dr();}
[['n','m3-p-n'],['esp','m3-p-esp'],['te','m3-p-te']].forEach(a=>$(a[1]).addEventListener('input',x=>{q[a[0]]=+x.target.value;up();}));
sj.addEventListener('change',()=>{q.j=sj.value;up();});
document.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{q.m=b.dataset.q;up();}));
$('m3-p-rs').addEventListener('click',()=>{q=Object.assign({},D);up();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',dr);
up();
})();
