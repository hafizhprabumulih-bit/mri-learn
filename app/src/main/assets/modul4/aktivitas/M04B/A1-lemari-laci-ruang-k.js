/* A1 Lemari laci ruang-k. Memakai pembantu dari js/inti.js. */
/* Lemari laci: satu lemari = ruang-k satu irisan; gelombang diambil dari data ruang-k data ruang-k fantom modul */
function updD(){
 const N=+$('mtx').value,sl=$('laci');
 $('irsv').textContent=$('irs').value;
 sl.max=N;if(+sl.value>N)sl.value=N;
 const r=+sl.value-1,no=nomorLaci(r,N);
 $('lacv').textContent=(r+1)+' (garis '+(no>0?'+':'')+no+')';
 const c=$('cl').getContext('2d'),W=240,H=240,h=H/N;
 c.clearRect(0,0,W,H);
 for(let i=0;i<N;i++){
  c.fillStyle=i===r?warna('--aksen'):warna('--permukaan');c.fillRect(2,i*h+1,W-4,h-2);
  c.strokeStyle=warna('--garis');c.lineWidth=1;c.strokeRect(2.5,i*h+1.5,W-5,h-3);
  c.fillStyle=i===r?warna('--latar'):warna('--lembut');c.fillRect(W/2-14,i*h+h/2-1.5,28,3);
 }
 c.strokeStyle=warna('--t1');c.lineWidth=2;c.setLineDash([5,4]);c.beginPath();c.moveTo(0,(N/2+0.5)*h);c.lineTo(W,(N/2+0.5)*h);c.stroke();c.setLineDash([]);
 const w=$('cw').getContext('2d'),W2=300,H2=240;
 w.clearRect(0,0,W2,H2);
 const idr=Math.min(N1-1,Math.floor((r+0.5)*N1/N)),v=(idr+N1/2)%N1;
 const vals=[];let mx=1e-9,rm=0;
 for(let d=0;d<N1;d++){const i=v*N1+(d+N1/2)%N1;vals.push(KRe[i]);mx=Math.max(mx,Math.abs(KRe[i]));rm=Math.max(rm,Math.hypot(KRe[i],KIm[i]));}
 w.strokeStyle=warna('--garis');w.lineWidth=1;w.beginPath();w.moveTo(0,H2/2);w.lineTo(W2,H2/2);w.stroke();
 w.strokeStyle=warna('--t1');w.setLineDash([5,4]);w.beginPath();w.moveTo(W2/2,0);w.lineTo(W2/2,H2);w.stroke();w.setLineDash([]);
 w.strokeStyle=warna('--aksen');w.lineWidth=2;w.beginPath();
 vals.forEach((y,d)=>{const px=d*W2/(N1-1),py=H2/2-y/mx*(H2/2-20);d?w.lineTo(px,py):w.moveTo(px,py);});
 w.stroke();
 w.fillStyle=warna('--lembut');w.font='12px sans-serif';w.fillText('sumbu frekuensi \u2192',8,H2-8);
 const rel=(rm/Math.hypot(KRe[0],KIm[0])*100);
 $('ketd').textContent='Laci urutan '+(r+1)+' dari atas = garis '+(no>0?'+':'')+no+' ('+(no>0?'separuh atas, polaritas gradien fase positif':no<0?'separuh bawah, polaritas gradien fase negatif':'garis tengah, gradien fase tidak menyala')+'). '+(Math.abs(no)<=2?'Dekat sumbu tengah: sinyal kuat, membawa kontras.':Math.abs(no)>=N/2-1?'Dekat tepi: sinyal lemah, membawa detail halus.':'Di antara pusat dan tepi: sinyal makin lemah ke arah tepi.')+' Kekuatan sinyal relatif garis ini = '+rel.toFixed(1)+'% dari puncak ruang-k. Gelombang digambar dari data ruang-k data ruang-k fantom modul (dinormalkan per garis).';
 $('ketd2').textContent='Jumlah lemari = jumlah irisan = '+$('irs').value+'. Jumlah laci tiap lemari = matriks fase = '+N+'. Total baris data = '+(N*(+$('irs').value))+'.';
}
$('mtx').addEventListener('change',updD);$('irs').addEventListener('input',updD);$('laci').addEventListener('input',updD);
$('cl').addEventListener('click',e=>{const r=$('cl').getBoundingClientRect(),N=+$('mtx').value;$('laci').value=Math.min(N,Math.max(1,Math.floor((e.clientY-r.top)/r.height*N)+1));updD();});
$('reset6').onclick=()=>{$('mtx').value=16;$('irs').value=3;$('laci').value=8;updD();};
if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',updD);

updD();
