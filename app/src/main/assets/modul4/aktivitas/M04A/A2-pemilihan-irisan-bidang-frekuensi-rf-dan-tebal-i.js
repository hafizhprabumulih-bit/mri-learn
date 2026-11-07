/* A2 Pemilihan irisan. Memakai G, warna() dari js/inti.js. */
/* Pemilihan irisan: bidang, pembawa RF, TBW, tebal irisan = TBW/(gamma.G) */
const PLN={ax_tubuh:{n:'Aksial (tubuh)',s:'Z',f:'Y',q:'X'},ax_kepala:{n:'Aksial (kepala)',s:'Z',f:'X',q:'Y'},sagital:{n:'Sagital',s:'X',f:'Y',q:'Z'},koronal:{n:'Koronal',s:'Y',f:'X',q:'Z'}};
$('ia').min=G[0];$('ia').max=G[1];$('ia').value=G[0];
function updI(){
 const kunci=document.querySelector('input[name=bid]:checked').value,P=PLN[kunci];
 const amp=+$('ia').value,tbw=+$('itb').value,pos=+$('ip').value,gap=+$('ig').value,B0=+$('ib0').value;
 $('iav').textContent=amp;$('itbv').textContent=tbw;$('ipv').textContent=pos;$('igv').textContent=gap;
 let h='<table class=\'tabel\'><tr><th>Bidang</th><th>Pemilihan irisan</th><th>Pengodean fase</th><th>Pengodean frekuensi</th></tr>';
 for(const k in PLN){const q=PLN[k],on=k===kunci;h+='<tr'+(on?' style=\'font-weight:700\'':'')+'><td>'+(on?'\u25b6 ':'')+q.n+'</td><td>'+q.s+'</td><td>'+q.f+'</td><td>'+q.q+'</td></tr>';}
 $('tbl5').innerHTML=h+'</table>';
 const gam=DATA.FISIKA.gamma_MHz_per_T,f0=DATA.FISIKA.larmor_MHz[B0];
 const slope=gam*amp/100,th=tbw/(gam*amp)*1000,thc=th/10,off=slope*pos,fc=f0+off/1000;
 const c=$('csl').getContext('2d'),W=600,H=250,pc=30,X=cm=>W/2+cm*pc,Ymax=gam*G[1]/100*10,Y=k=>110-k*(95/Ymax);
 c.clearRect(0,0,W,H);c.textAlign='left';c.font='12px sans-serif';
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.beginPath();c.moveTo(X(-10),110);c.lineTo(X(10),110);c.moveTo(W/2,14);c.lineTo(W/2,200);c.stroke();
 c.globalAlpha=0.25;c.fillStyle=warna('--t2');c.fillRect(X(-10),Y(off+tbw/2),20*pc,Math.max(1,Y(off-tbw/2)-Y(off+tbw/2)));
 c.fillStyle=warna('--aksen');c.fillRect(X(pos-thc/2),Y(off+tbw/2),Math.max(1,thc*pc),230-Y(off+tbw/2));c.globalAlpha=1;
 const p2=pos+(th+gap)/10;
 c.strokeStyle=warna('--lembut');c.lineWidth=1;c.setLineDash([4,3]);c.strokeRect(X(p2-thc/2),Y(slope*p2+tbw/2),Math.max(1,thc*pc),230-Y(slope*p2+tbw/2));c.setLineDash([]);
 c.strokeStyle=warna('--t1');c.lineWidth=3;c.beginPath();c.moveTo(X(-10),Y(-slope*10));c.lineTo(X(10),Y(slope*10));c.stroke();
 c.strokeStyle=warna('--lembut');c.lineWidth=1.5;c.beginPath();
 if(c.roundRect)c.roundRect(X(-10),204,20*pc,26,13);else c.rect(X(-10),204,20*pc,26);
 c.stroke();
 c.fillStyle=warna('--lembut');c.fillText('tubuh (sumbu irisan)',X(-10)+10,221);
 c.fillText('frekuensi \u2191',6,14);c.fillText('posisi sepanjang sumbu irisan (cm) \u2192',6,246);
 c.fillStyle=warna('--teks');c.textAlign='center';c.fillText('irisan '+th.toFixed(1)+' mm',Math.min(Math.max(X(pos),60),W-60),Math.max(14,Y(off+tbw/2)-8));
 c.textAlign='right';c.fillStyle=warna('--t2');c.fillText('TBW',W-6,Math.min(Y(off)+4,196));c.textAlign='left';
 $('keti').textContent='Bidang '+P.n+': gradien '+P.s+' memilih irisan, gradien '+P.f+' mengodekan fase, gradien '+P.q+' mengodekan frekuensi. Frekuensi pembawa RF = '+fc.toFixed(4)+' MHz (Larmor '+f0+' MHz + '+off.toFixed(1)+' kHz). Tebal irisan = TBW / (\u03b3\u00b7G) = '+tbw+' kHz / ('+gam+' MHz/T \u00d7 '+amp+' mT/m) = '+th.toFixed(2)+' mm. Irisan berikutnya (garis putus-putus) berjarak tebal + celah = '+(th+gap).toFixed(2)+' mm, dengan pembawa berbeda '+(slope*(th+gap)/10).toFixed(2)+' kHz. Gradien lebih curam atau TBW lebih sempit memberi irisan lebih tipis. TBW sempit memberi profil irisan baik dan SAR lebih rendah, tetapi TE minimum naik dan citra lebih rentan distorsi.';
}
document.querySelectorAll('input[name=bid]').forEach(e=>e.addEventListener('change',updI));
$('ib0').addEventListener('change',updI);['ia','itb','ip','ig'].forEach(k=>$(k).addEventListener('input',updI));
$('reset14').onclick=()=>{$('isinc').checked=false;document.querySelector('input[name=bid][value=ax_tubuh]').checked=true;$('ib0').value='1.5';$('ia').value=G[0];$('itb').value=4;$('ip').value=3;$('ig').value=1;updI();};

/* Toggle bentuk pulsa RF sinc: pita frekuensi sempit (TBW kecil) berarti pulsa panjang di waktu.
   Jendela gambar selalu +-4/TBW ms (4 lobus tiap sisi), jadi yang berubah adalah skala waktu. */
function gambarSinc(){
 const cv=$('csinc'),ket=$('ketsinc'),on=$('isinc').checked;
 cv.hidden=!on;ket.hidden=!on;if(!on)return;
 const tbw=+$('itb').value,c=cv.getContext('2d'),W=600,H=140,T=4/tbw;
 c.clearRect(0,0,W,H);
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.beginPath();c.moveTo(0,H/2);c.lineTo(W,H/2);c.stroke();
 c.strokeStyle=warna('--aksen');c.lineWidth=2;c.beginPath();
 for(let x=0;x<=W;x++){const t=(x/W*2-1)*T,u=Math.PI*tbw*t,v=Math.abs(u)<1e-9?1:Math.sin(u)/u;const y=H/2-v*(H/2-18);x?c.lineTo(x,y):c.moveTo(x,y);}
 c.stroke();
 c.fillStyle=warna('--lembut');c.font='12px sans-serif';c.textAlign='left';c.fillText('waktu \u2192',6,H-6);c.textAlign='right';c.fillText('amplitudo RF (sinc)',W-6,14);
 ket.textContent='Pulsa sinc di domain waktu berkaitan dengan pita frekuensi yang hampir persegi: lebar pita = TBW = '+tbw+' kHz. Lobus tengah selebar sekitar '+(2/tbw).toFixed(2)+' ms, dan empat lobus tiap sisi membentang sekitar '+(8/tbw).toFixed(2)+' ms. TBW lebih sempit memberi pulsa lebih panjang (TE minimum cenderung naik). Pulsa nyata dipotong dan diberi jendela, sehingga profil irisan tidak persegi sempurna.';
}
$('isinc').addEventListener('change',gambarSinc);$('itb').addEventListener('input',gambarSinc);

updI();gambarSinc();
