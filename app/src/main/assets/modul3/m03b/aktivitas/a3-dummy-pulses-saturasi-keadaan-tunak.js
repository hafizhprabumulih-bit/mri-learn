(function(){
const rad=Math.PI/180,J=k=>DATA.JARINGAN.find(j=>j.id===k),C=C3,f0=Math.round,f2=x=>x.toFixed(2).replace('.',',');
// TODO-VERIFIKASI: rentang TR slider didaktik. Model disederhanakan: sisa magnetisasi transversal dihapus tiap TR. Ambang 5 persen (keadaan tunak) dan 90 persen (saturasi) hanya perkiraan didaktik.
const RT=[10,5000],pos=(v,r)=>100*Math.log(v/r[0])/Math.log(r[1]/r[0]),val=(p,r)=>Math.round(r[0]*Math.pow(r[1]/r[0],p/100));
const D={tr:300,fa:90,n:2,j:'csf'},fat=J('fat');let s=Object.assign({},D);
const sj=$('m3-u-j');['csf','gm','wm'].forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=J(k).nama;sj.appendChild(o);});
function ser(t){const E=Math.exp(-s.tr/t.T1_ms),a=s.fa*rad,r=[];let m=1;for(let n=1;n<=8;n++){r.push({mz:m,sg:t.PD*m*Math.sin(a)});m=1+(m*Math.cos(a)-1)*E;}return r;}
function du(){
 const c=$('m3-cv-u').getContext('2d'),cp=J(s.j),F=ser(fat),K=ser(cp),n=s.n-1,cx=110,y0=170,al=s.fa*rad;
 c.clearRect(0,0,760,290);c.font='12px sans-serif';
 AR3(c,cx-40,270,cx-40,20,'--lembut',5);c.fillStyle=C('--lembut');c.fillText('B0',cx-60,18);
 c.setLineDash([4,4]);c.strokeStyle=C('--lembut');c.lineWidth=1.5;c.beginPath();c.moveTo(cx-40,y0);c.lineTo(290,y0);c.stroke();c.setLineDash([]);
 [[F[n],'--t1',0,'Lemak'],[K[n],'--t2',10,cp.nama]].forEach((a,i)=>{const p=a[0],o=a[2];c.globalAlpha=.35;AR3(c,cx+o,y0,cx+o,y0-130*p.mz,a[1],3);c.globalAlpha=1;AR3(c,cx+o,y0,cx+o+130*p.mz*Math.sin(al),y0,a[1],4);c.fillStyle=C(a[1]);c.fillText(a[3],cx+o+130*p.mz*Math.sin(al)+6,y0+(i?18:-6));});
 c.fillStyle=C('--lembut');c.fillText('Pulsa ke-'+s.n,cx+60,40);
 const ax=340,aw=390,ay=250,ah=190,mx=Math.max.apply(null,F.concat(K).map(p=>p.sg))||1,X=i=>ax+i*aw/7,Y=v=>ay-ah*v/mx;
 c.strokeStyle=C('--garis');c.lineWidth=2;c.beginPath();c.moveTo(ax,50);c.lineTo(ax,ay);c.lineTo(ax+aw+10,ay);c.stroke();
 const st=a=>{const e=a[7].sg;let k=8;for(let i=0;i<8;i++){if(Math.abs(a[i].sg-e)<=.05*e){k=i;break;}}return k;},ns=Math.max(st(F),st(K));
 if(ns>0){c.globalAlpha=.15;c.fillStyle=C('--aksen');c.fillRect(ax,50,X(ns-.5)-ax,ay-50);c.globalAlpha=1;c.fillStyle=C('--aksen');c.fillText('pulsa persiapan',ax+4,64);}
 [[F,'--t1'],[K,'--t2']].forEach(a=>{c.strokeStyle=C(a[1]);c.fillStyle=C(a[1]);c.lineWidth=2;c.beginPath();a[0].forEach((p,i)=>i?c.lineTo(X(i),Y(p.sg)):c.moveTo(X(i),Y(p.sg)));c.stroke();a[0].forEach((p,i)=>{c.beginPath();c.arc(X(i),Y(p.sg),i===n?6:3,0,7);c.fill();});});
 c.fillStyle=C('--lembut');for(let i=0;i<8;i++)c.fillText(i+1,X(i)-3,ay+16);c.fillText('nomor pulsa →',ax+aw-70,ay+32);c.fillText('sinyal',ax-34,44);
 const E=Math.exp(-s.tr/cp.T1_ms),Mss=(1-E)/(1-E*Math.cos(al));
 $('m3-u-ket').textContent='Pulsa ke-'+s.n+': magnetisasi longitudinal sebelum pulsa, lemak '+f0(100*F[n].mz)+'%, '+cp.nama+' '+f0(100*K[n].mz)+'%. Keadaan tunak tercapai setelah sekitar '+ns+' pulsa persiapan. Pada keadaan tunak, '+cp.nama+' pulih sekitar '+f0(100*Mss)+'% sebelum pulsa berikutnya: '+(Mss<.9?'jenuh sebagian, kontras T1 kuat.':'hampir pulih penuh, kontras T1 kecil dan kontras lebih ditentukan kerapatan proton.');
 $('m3-cv-u').setAttribute('aria-label','Pulsa ke-'+s.n+'. Keadaan tunak setelah sekitar '+ns+' pulsa persiapan.');
}
function uu(){$('m3-u-tr').value=pos(s.tr,RT);$('m3-u-fa').value=s.fa;$('m3-u-n').value=s.n;$('m3-u-otr').textContent=s.tr+' ms';$('m3-u-ofa').textContent=s.fa+'°';$('m3-u-on').textContent=s.n;sj.value=s.j;du();}
$('m3-u-tr').addEventListener('input',e=>{s.tr=val(+e.target.value,RT);uu();});
$('m3-u-fa').addEventListener('input',e=>{s.fa=+e.target.value;uu();});
$('m3-u-n').addEventListener('input',e=>{s.n=+e.target.value;uu();});
sj.addEventListener('change',()=>{s.j=sj.value;uu();});
$('m3-u-rs').addEventListener('click',()=>{s=Object.assign({},D);uu();});
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',du);
uu();
})();
