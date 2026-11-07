(function(){
const rad=Math.PI/180,J=k=>DATA.JARINGAN.find(j=>j.id===k),cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),f1=x=>x.toFixed(1).replace('.',','),f2=x=>x.toFixed(2).replace('.',',');
// TODO-VERIFIKASI: model disederhanakan. Sisa magnetisasi menyusut sebesar e^(-TR/T2) tiap TR dan dijumlahkan pada keadaan tunak; sudut flip diabaikan. Ambang 1,3 hanya perkiraan didaktik.
const D={d:90,tr:30,j:'wm'};let r=Object.assign({},D);
const sj=$('m3-j-j');['wm','gm','csf','fat'].forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=J(k).nama;sj.appendChild(o);});
function dj(){
 const c=$('m3-cv-j').getContext('2d'),cx=190,cy=140,R0=100,R=Math.exp(-r.tr/J(r.j).T2_ms),dl=r.d*rad;
 c.clearRect(0,0,380,280);c.font='12px sans-serif';c.lineWidth=2;c.strokeStyle=C('--garis');c.beginPath();c.arc(cx,cy,R0+8,0,7);c.stroke();
 for(let h=0;h<12;h++){const a=h*Math.PI/6;c.beginPath();c.moveTo(cx+(R0+8)*Math.sin(a),cy-(R0+8)*Math.cos(a));c.lineTo(cx+(R0+1)*Math.sin(a),cy-(R0+1)*Math.cos(a));c.stroke();}
 c.setLineDash([4,4]);c.strokeStyle=C('--lembut');c.beginPath();c.moveTo(cx,cy);c.lineTo(cx,cy-R0-8);c.stroke();c.setLineDash([]);
 for(let m=5;m>=0;m--){const a=m*dl,L=R0*Math.pow(R,m);c.globalAlpha=m?Math.max(.3,1-m*.15):1;c.strokeStyle=C(m?'--t1':'--aksen');c.lineWidth=m?2:4;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+L*Math.sin(a),cy-L*Math.cos(a));c.stroke();}
 c.globalAlpha=1;c.fillStyle=C('--lembut');c.fillText('penerima terkunci pada fase pulsa terbaru',70,272);
 const G=1/Math.sqrt(1-2*R*Math.cos(dl)+R*R);
 $('m3-j-ket').textContent='Sisa magnetisasi menyusut sebesar '+f2(R)+' kali tiap TR. Faktor sinyal akibat sisa: '+f1(G)+' kali. '+(G>1.3?'Sisa menumpuk dan ikut terbaca, sehingga kontras T2 ikut masuk.':'Sisa hampir tidak terbaca, sehingga hanya FID baru yang menentukan kontras (T1 dan PD).');
 $('m3-cv-j').setAttribute('aria-label','Jam fase. Pergantian fase '+r.d+' derajat, faktor sinyal akibat sisa '+f1(G)+' kali.');
}
function uj(){$('m3-j-d').value=r.d;$('m3-j-tr').value=r.tr;$('m3-j-od').textContent=r.d+'°';$('m3-j-otr').textContent=r.tr+' ms';sj.value=r.j;dj();}
$('m3-j-d').addEventListener('input',e=>{r.d=+e.target.value;uj();});
$('m3-j-tr').addEventListener('input',e=>{r.tr=+e.target.value;uj();});
sj.addEventListener('change',()=>{r.j=sj.value;uj();});
document.querySelectorAll('[data-sp]').forEach(b=>b.addEventListener('click',()=>{r.d=+b.dataset.sp;uj();}));
$('m3-j-rs').addEventListener('click',()=>{r=Object.assign({},D);uj();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',dj);
uj();
})();
