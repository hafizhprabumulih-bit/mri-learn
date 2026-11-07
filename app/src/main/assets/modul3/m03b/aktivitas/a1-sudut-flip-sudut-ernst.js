(function(){
const rad=Math.PI/180,J=k=>DATA.JARINGAN.find(j=>j.id===k),W=['fat','gm','wm','csf'].map(J),LB=['Lemak','GM','WM','CSF'],CL=['--t1','--aksen','--lembut','--t2'],cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),fd=x=>x.toFixed(2).replace('.',',');
// TODO-VERIFIKASI: rentang TR slider adalah pilihan didaktik. Kurva memakai TE sangat pendek dan model gradient echo ter-spoil (disederhanakan).
const RT=[5,500],pos=(v,r)=>100*Math.log(v/r[0])/Math.log(r[1]/r[0]),val=(p,r)=>Math.round(r[0]*Math.pow(r[1]/r[0],p/100));
let e={tr:30,fa:35};
const S=(t,a)=>{const E=Math.exp(-e.tr/t.T1_ms);return t.PD*Math.sin(a*rad)*(1-E)/(1-E*Math.cos(a*rad));},ern=t=>Math.acos(Math.exp(-e.tr/t.T1_ms))/rad;
function dE(){
 const c=$('m3-cv-e').getContext('2d'),X=a=>50+a*570/90;let mx=0;
 W.forEach(t=>{for(let a=1;a<=90;a++)mx=Math.max(mx,S(t,a));});
 c.clearRect(0,0,640,300);c.font='12px sans-serif';c.lineWidth=2;
 c.strokeStyle=C('--garis');c.beginPath();c.moveTo(50,20);c.lineTo(50,260);c.lineTo(620,260);c.stroke();
 W.forEach((t,i)=>{const col=C(CL[i]);c.strokeStyle=col;c.beginPath();for(let a=0;a<=90;a++){const y=260-235*S(t,a)/mx;a?c.lineTo(X(a),y):c.moveTo(X(a),y);}c.stroke();
 c.setLineDash([4,4]);c.beginPath();c.moveTo(X(ern(t)),260);c.lineTo(X(ern(t)),30+i*12);c.stroke();c.setLineDash([]);c.fillStyle=col;c.fillText(LB[i]+' '+Math.round(ern(t))+'°',X(ern(t))+4,40+i*12);
 c.beginPath();c.arc(X(e.fa),260-235*S(t,e.fa)/mx,4,0,7);c.fill();});
 c.strokeStyle=C('--teks');c.lineWidth=1;c.beginPath();c.moveTo(X(e.fa),20);c.lineTo(X(e.fa),260);c.stroke();
 c.fillStyle=C('--lembut');c.fillText('sudut flip (derajat) →',500,282);c.fillText('sinyal',8,16);[0,30,60,90].forEach(a=>c.fillText(a,X(a)-6,276));
}
function uE(){
 $('m3-e-tr').value=pos(e.tr,RT);$('m3-e-fa').value=e.fa;$('m3-e-otr').textContent=e.tr+' ms';$('m3-e-ofa').textContent=e.fa+'°';dE();
 const o=W.map((t,i)=>[S(t,e.fa),LB[i]]).sort((p,q)=>q[0]-p[0]).map(p=>p[1]).join(' > ');
 $('m3-e-ket').textContent='Sudut Ernst: '+W.map((t,i)=>LB[i]+' '+Math.round(ern(t))+'°').join(', ')+'. Pada α = '+e.fa+'°, urutan sinyal: '+o+'. Jaringan yang α-nya di atas sudut Ernst: '+(W.filter(t=>e.fa>ern(t)).map(t=>LB[W.indexOf(t)]).join(', ')||'tidak ada')+' (saturasi, kontras T1 menguat).';
 $('m3-cv-e').setAttribute('aria-label','Kurva sudut Ernst. Urutan sinyal: '+o);
}
$('m3-e-tr').addEventListener('input',x=>{e.tr=val(+x.target.value,RT);uE();});
$('m3-e-fa').addEventListener('input',x=>{e.fa=+x.target.value;uE();});
$('m3-e-rs').addEventListener('click',()=>{e={tr:30,fa:35};uE();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',uE);
uE();
})();
