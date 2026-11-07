/* TSE dan phase reordering */
(function(){
const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),J=k=>DATA.JARINGAN.find(j=>j.id===k),f1=x=>x.toFixed(1).replace('.',',');
// TODO-VERIFIKASI: urutan baris dan bentuk gema hanya ilustrasi. Matriks fase 256 dan NSA 1 mengikuti contoh buku. Persamaan 3.1 dan 3.2 berasal dari buku. Amplitudo gema disederhanakan sebagai e^(-t/T2).
const D={etl:16,esp:10,te:100,tr:4000,j:'wm',ro:true};let s=Object.assign({},D);
const sj=$('m3z-j');['csf','gm','wm','fat'].forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=J(k).nama;sj.appendChild(o);});
function draw(){
 const c=$('m3z-cv').getContext('2d'),n=s.etl,t=i=>(i+1)*s.esp,T2=J(s.j).T2_ms,am=i=>Math.exp(-t(i)/T2),tot=(n+1)*s.esp,X=v=>40+680*Math.min(v,tot)/tot,c0=Math.floor(n/2),h=170/n,T=C('--teks'),L=C('--lembut'),Ln=C('--garis');
 let pos=[];
 if(!s.ro){for(let i=0;i<n;i++)pos[i]=i;}
 else{const idx=[...Array(n).keys()].sort((a,b)=>Math.abs(t(a)-s.te)-Math.abs(t(b)-s.te)||a-b),rows=[...Array(n).keys()].sort((a,b)=>Math.abs(a-c0)-Math.abs(b-c0)||a-b);idx.forEach((e,r)=>{pos[e]=rows[r];});}
 c.clearRect(0,0,760,340);c.font='12px sans-serif';c.lineWidth=2;
 c.strokeStyle=Ln;c.beginPath();c.moveTo(40,130);c.lineTo(740,130);c.stroke();
 const col=i=>'hsl('+Math.round(i/n*280)+',70%,50%)';
 for(let i=0;i<n;i++){c.fillStyle=col(i);c.fillRect(X(t(i))-3,130-100*am(i),6,100*am(i));}
 c.setLineDash([4,4]);c.strokeStyle=T;c.beginPath();c.moveTo(X(s.te),20);c.lineTo(X(s.te),140);c.stroke();c.setLineDash([]);
 c.fillStyle=T;c.fillText('TE efektif '+s.te+' ms',Math.min(X(s.te)+4,620),18);c.fillStyle=L;c.fillText('gema (waktu →)',44,148);
 c.strokeStyle=Ln;c.strokeRect(40,160,380,170);
 for(let i=0;i<n;i++){c.fillStyle=col(i);c.fillRect(40,160+pos[i]*h+1,380*am(i),Math.max(1,h-2));}
 c.setLineDash([4,4]);c.strokeStyle=T;c.beginPath();c.moveTo(36,160+c0*h+h/2);c.lineTo(424,160+c0*h+h/2);c.stroke();c.setLineDash([]);
 c.fillStyle=L;c.fillText('ruang-k, pusat ▸',440,160+c0*h+h/2+4);c.fillText('baris atas dan bawah = tepi ruang-k',440,170);
 const ce=pos.indexOf(c0),lin=c0;
 const st0=s.tr*256/1000,st=st0/s.etl,ns=Math.floor(s.tr/(s.etl*s.esp)),ft=x=>x>=60?f1(x/60)+' menit':f1(x)+' detik';
 $('m3z-tb').innerHTML='<tr><th>Waktu pindai spin echo konvensional</th><th>Waktu pindai TSE</th><th>Irisan per TR (TR / (ETL × ES))</th><th>TR minimal untuk 20 irisan</th></tr><tr><td>'+ft(st0)+'</td><td>'+ft(st)+' (ETL '+s.etl+')</td><td>'+ns+'</td><td>'+(20*s.etl*s.esp)+' ms</td></tr>';
 $('m3z-ket').textContent=(s.ro?'Dengan phase reordering':'Tanpa phase reordering (baris berurutan)')+', pusat ruang-k diisi gema ke-'+(ce+1)+' pada '+t(ce)+' ms, selisih '+Math.abs(t(ce)-s.te)+' ms dari TE efektif. '+(s.ro?'':'Dengan phase reordering, pusat akan diisi gema yang TE-nya paling dekat TE efektif. ')+'Gema terakhir tinggal '+Math.round(100*am(n-1)/am(0))+' persen dari gema pertama: makin panjang rangkaian atau jarak antar gema, makin lemah gema akhir dan makin besar risiko blur. TE efektif di atas '+(n*s.esp)+' ms melewati gema terakhir.';
 $('m3z-cv').setAttribute('aria-label','Rangkaian gema TSE: ETL '+n+', ES '+s.esp+' ms, TE efektif '+s.te+' ms. Pusat ruang-k diisi gema ke-'+(ce+1));
}
function ui(){
 $('m3z-etl').value=s.etl;$('m3z-esp').value=s.esp;$('m3z-te').value=s.te;$('m3z-tr').value=s.tr;sj.value=s.j;
 $('m3z-oetl').textContent=s.etl;$('m3z-oesp').textContent=s.esp+' ms';$('m3z-ote').textContent=s.te+' ms';$('m3z-otr').textContent=s.tr+' ms';
 $('m3z-ro').textContent='Phase reordering: '+(s.ro?'nyala':'mati');$('m3z-ro').setAttribute('aria-pressed',s.ro);draw();
}
[['etl','etl'],['esp','esp'],['te','te'],['tr','tr']].forEach(a=>$('m3z-'+a[0]).addEventListener('input',e=>{s[a[1]]=+e.target.value;ui();}));
sj.addEventListener('change',()=>{s.j=sj.value;ui();});
$('m3z-ro').addEventListener('click',()=>{s.ro=!s.ro;ui();});
$('m3z-rs').addEventListener('click',()=>{s=Object.assign({},D);ui();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',draw);
ui();
})();
