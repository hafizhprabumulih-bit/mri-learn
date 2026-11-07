/* T2* vs T2 sejati */
(function(){
const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),J=k=>DATA.JARINGAN.find(j=>j.id===k);
// TODO-VERIFIKASI: T2 plak (130 ms) serta PD dan T2 diskus (0,70 dan 40 ms) adalah angka didaktik modul ini, bukan data buku. Ambang 8 persen juga ilustrasi. Gambar hanya skema.
const TS={csf:J('csf'),cord:J('wm'),plak:{PD:J('wm').PD,T2_ms:130},disk:{PD:.7,T2_ms:40}},D=10;let te=D;
const gr=(v,m)=>{const g=Math.round(18+237*Math.min(1,v/m));return 'rgb('+g+','+g+','+g+')';};
function dd(){
 const c=$('m3x-cv-d').getContext('2d'),S=t=>t.PD*Math.exp(-te/t.T2_ms),sv={csf:S(TS.csf),cord:S(TS.cord),plak:S(TS.plak),disk:S(TS.disk)},m=Math.max(sv.csf,sv.cord,sv.plak,sv.disk),T=C('--teks'),L=C('--lembut'),Ln=C('--garis');
 c.clearRect(0,0,760,300);c.font='12px sans-serif';c.lineWidth=1;
 c.fillStyle=gr(sv.csf,m);c.fillRect(150,10,56,270);
 c.fillStyle='rgb(120,120,120)';[10,100,190].forEach(y=>c.fillRect(60,y,80,60));
 c.fillStyle=gr(sv.disk,m);[70,160].forEach(y=>c.fillRect(60,y,80,30));
 c.beginPath();c.ellipse(146,175,12,12,0,0,7);c.fill();
 c.fillStyle=gr(sv.cord,m);c.fillRect(166,10,24,270);
 c.fillStyle=gr(sv.plak,m);c.beginPath();c.ellipse(178,130,8,16,0,0,7);c.fill();
 c.fillStyle=T;c.fillText('CSF (kantung tekal)',214,28);c.fillText('korda',214,60);c.fillText('plak MS kecil',214,134);c.fillText('hernia diskus',214,178);
 c.strokeStyle=L;[[212,130,188,130],[212,174,160,174]].forEach(a=>{c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(a[2],a[3]);c.stroke();});
 const c1=Math.abs(sv.csf-sv.disk)/(sv.csf+sv.disk),c2=Math.abs(sv.plak-sv.cord)/(sv.plak+sv.cord);
 [[c1,'Hernia diskus terhadap CSF',90],[c2,'Plak MS kecil terhadap korda',190]].forEach(a=>{const ok=a[0]>=.08;c.fillStyle=T;c.fillText(a[1]+': '+Math.round(100*a[0])+'%',380,a[2]-14);c.strokeStyle=Ln;c.strokeRect(380,a[2],300,18);c.fillStyle=C(ok?'--benar':'--t1');c.fillRect(380,a[2],Math.min(300,300*a[0]/.4),18);c.fillStyle=T;c.fillRect(380+300*.08/.4,a[2]-4,2,26);c.fillStyle=L;c.fillText(ok?'tampak':'sulit dibedakan',380,a[2]+36);});
 c.fillStyle=L;c.fillText('garis tegak = ambang tampak (ilustrasi)',380,270);
 $('m3x-d-te').value=te;$('m3x-d-o').textContent=te+' ms';
 $('m3x-d-ket').textContent='TE '+te+' ms. Kontras hernia diskus terhadap CSF '+Math.round(100*c1)+'%, plak terhadap korda '+Math.round(100*c2)+'%. '+(c2<.08?'Hernia diskus tetap tampak, tetapi plak kecil hampir menyatu dengan korda: TE terlalu pendek untuk memperlihatkan beda T2 (khas gradient echo).':'Plak mulai tampak karena TE cukup panjang untuk memperlihatkan beda peluruhan T2 (khas T2 sejati).');
 $('m3x-cv-d').setAttribute('aria-label','Skema tulang belakang servikal pada TE '+te+' ms. Kontras plak terhadap korda '+Math.round(100*c2)+' persen.');
}
$('m3x-d-te').addEventListener('input',e=>{te=+e.target.value;dd();});
document.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>{te=+b.dataset.d;dd();}));
$('m3x-d-rs').addEventListener('click',()=>{te=D;dd();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',dd);
dd();
})();
