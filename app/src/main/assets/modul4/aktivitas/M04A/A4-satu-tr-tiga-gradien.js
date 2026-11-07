/* A4 Satu TR, tiga gradien. Memakai pembantu dari js/inti.js. */
/* Satu TR, tiga gradien */
let tr=0,sl=0,st=0; /* TN, TS, TM ada di js/inti.js */
function updT(){
 const c=$('ct').getContext('2d'),W=360,H=240,cw=W/TS,h=H/TN,selesai=tr>=TN;
 c.clearRect(0,0,W,H);
 for(let k=0;k<TS;k++){
  const x0=k*cw+6,w=cw-12;
  for(let i=0;i<TN;i++){
   const isi=i<tr||(i===tr&&k<sl);
   c.globalAlpha=isi?0.45:1;c.fillStyle=isi?warna('--t2'):warna('--permukaan');c.fillRect(x0,i*h+1,w,h-2);c.globalAlpha=1;
   c.strokeStyle=warna('--garis');c.lineWidth=1;c.strokeRect(x0+.5,i*h+1.5,w-1,h-3);
  }
  if(!selesai&&k===sl){
   c.strokeStyle=warna('--t1');c.lineWidth=3;c.strokeRect(x0-2,1,w+4,H-2);
   if(st>=1){c.strokeStyle=warna('--aksen');c.lineWidth=3;c.strokeRect(x0+1,tr*h+1.5,w-2,h-3);}
   if(st===2){c.fillStyle=warna('--t2');c.fillRect(x0+2,tr*h+3,w-4,h-6);c.fillStyle=warna('--latar');for(let m=0;m<TM;m++){c.beginPath();c.arc(x0+(m+.5)*w/TM,tr*h+h/2,2,0,2*Math.PI);c.fill();}}
  }
 }
 c.lineWidth=1;
 let t;
 if(selesai)t='Semua laci di semua lemari terisi: pemindaian selesai. Untuk NEX 1, jumlah TR sama dengan jumlah laci (matriks fase).';
 else{
  const no=nomorLaci(tr,TN),pol=no>0?'positif':no<0?'negatif':'nol, gradien fase tidak menyala',lr=no===0?'datar':Math.abs(no)>TN/4?'curam':'landai';
  t='TR ke-'+(tr+1)+' dari '+TN+'. ';
  if(st===0)t+='Gradien irisan menyala bersama pulsa RF: lemari irisan ke-'+(sl+1)+' dipilih.';
  else if(st===1)t+='Gradien fase menyala (polaritas '+pol+', kemiringan '+lr+'): laci garis '+(no>0?'+':'')+no+' dibuka.';
  else t+='Gradien frekuensi menyala saat sinyal dibaca: titik data diletakkan di sepanjang laci itu. Irisan berikutnya memakai laci yang sama.';
 }
 $('kett').textContent=t;
 $('tnext').disabled=selesai;$('tsatu').disabled=selesai;
}
function tlanjut(){if(tr>=TN)return;if(st<2)st++;else{st=0;sl++;if(sl>=TS){sl=0;tr++;}}}
$('tnext').onclick=()=>{tlanjut();updT();};
$('tsatu').onclick=()=>{const t0=tr;while(tr===t0&&tr<TN)tlanjut();updT();};
$('trese').onclick=()=>{tr=0;sl=0;st=0;updT();};

if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',updT);
updT();
