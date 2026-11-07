/* A1 Pseudo-frekuensi: bagaimana posisi fase diketahui. Memakai pembantu dari js/inti.js. */
/* Pseudo-frekuensi: sinyal satu voksel di sepanjang garis ruang-k (idealisasi) */
function updQ(){
 const N=32,p=+$('pp').value,W=600;
 $('ppv').textContent=p;
 const H1=140,c=$('cq1').getContext('2d');c.clearRect(0,0,W,H1);
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.beginPath();c.moveTo(0,H1/2);c.lineTo(W,H1/2);c.stroke();
 const xs=n=>(n+0.5)*W/N,ya=v=>H1/2-v*(H1/2-14);
 c.strokeStyle=warna('--aksen');c.lineWidth=2;c.beginPath();
 for(let n=0;n<N;n++){const v=Math.cos(2*Math.PI*(n-N/2)*p/N);n?c.lineTo(xs(n),ya(v)):c.moveTo(xs(n),ya(v));}
 c.stroke();
 c.strokeStyle=warna('--t2');c.lineWidth=1.5;c.setLineDash([5,4]);c.beginPath();
 for(let n=0;n<N;n++){const v=Math.sin(2*Math.PI*(n-N/2)*p/N);n?c.lineTo(xs(n),ya(v)):c.moveTo(xs(n),ya(v));}
 c.stroke();c.setLineDash([]);
 c.fillStyle=warna('--t1');
 for(let n=0;n<N;n++){c.beginPath();c.arc(xs(n),ya(Math.cos(2*Math.PI*(n-N/2)*p/N)),3.5,0,2*Math.PI);c.fill();}
 c.fillStyle=warna('--lembut');c.font='12px sans-serif';c.fillText('nomor garis (urutan TR) \u2192',6,H1-4);
 const H2=120,d=$('cq2').getContext('2d');d.clearRect(0,0,W,H2);
 let best=0,bq=0;
 for(let q=-N/2;q<N/2;q++){
  let sr=0,si=0;
  for(let n=0;n<N;n++){const a=2*Math.PI*(n-N/2)*(p-q)/N;sr+=Math.cos(a);si+=Math.sin(a);}
  const m=Math.hypot(sr,si)/N;
  if(m>best){best=m;bq=q;}
  d.fillStyle=m>0.5?warna('--t1'):warna('--aksen');
  d.fillRect((q+N/2)*W/N+2,H2-18-m*(H2-30),W/N-4,Math.max(1,m*(H2-30)));
 }
 d.fillStyle=warna('--lembut');d.font='12px sans-serif';d.fillText('posisi sepanjang sumbu fase (piksel dari pusat) \u2192',6,H2-4);
 $('ketq').textContent='Posisi '+p+': pseudo-frekuensi = '+Math.abs(p)+' siklus sepanjang '+N+' garis. '+(p===0?'Di pusat nilai sinyal tidak berubah dari garis ke garis, jadi tidak ada pseudo-frekuensi.':Math.abs(p)>=N/2-3?'Dekat tepi FOV: pseudo-frekuensi tinggi, nilai berganti cepat dari garis ke garis.':'Makin jauh dari pusat, makin tinggi pseudo-frekuensinya.')+' Puncak FFT muncul di piksel '+bq+': posisi voksel ditemukan.';
}
$('pp').addEventListener('input',updQ);
$('reset10').onclick=()=>{$('pp').value=6;updQ();};

if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',updQ);
updQ();
