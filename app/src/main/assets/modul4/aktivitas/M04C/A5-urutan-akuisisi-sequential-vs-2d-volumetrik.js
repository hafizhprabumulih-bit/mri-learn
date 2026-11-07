/* A5 Urutan akuisisi: sequential vs 2D volumetrik. Memakai pembantu dari js/inti.js. */
/* Urutan akuisisi: sequential vs 2D volumetrik (memakai TN dan TS dari js/inti.js) */
let akT=null;
function updAk(){
 const seq=document.querySelector('input[name=am]:checked').value==='seq',cnt=+$('ac').value;
 $('acv').textContent=cnt;$('acm').textContent=TN*TS;
 const isi=[0,1,2].map(()=>new Array(TN).fill(0)),cm=[0,0,0];
 for(let n=0;n<cnt;n++){const sl=seq?Math.floor(n/TN):n%TS,tr=seq?n%TN:Math.floor(n/TS);isi[sl][tr]=1;cm[sl]++;}
 const c=$('cak').getContext('2d'),W=360,H=250,h=212/TN;c.clearRect(0,0,W,H);c.textAlign='center';c.font='12px sans-serif';
 for(let k=0;k<TS;k++){
  const x0=k*120+8,w=104;
  for(let i=0;i<TN;i++){
   c.globalAlpha=isi[k][i]?0.5:1;c.fillStyle=isi[k][i]?warna('--t2'):warna('--permukaan');c.fillRect(x0,i*h+1,w,h-2);c.globalAlpha=1;
   c.strokeStyle=warna('--garis');c.lineWidth=1;c.strokeRect(x0+.5,i*h+1.5,w-1,h-3);
  }
  if(cm[k]===TN){c.strokeStyle=warna('--t2');c.lineWidth=3;c.strokeRect(x0-1,0,w+2,212);}
  c.fillStyle=warna('--teks');c.fillText('Lemari '+(k+1)+(cm[k]===TN?' (lengkap)':''),x0+w/2,232);
 }
 const lengkap=cm.map((v,i)=>v===TN?i+1:0).filter(Boolean);
 $('keta2').textContent=(seq?'Sequential: lemari diisi satu per satu. ':'2D volumetrik: satu laci diisi di semua lemari, lalu laci berikutnya. ')+(lengkap.length===0?'Belum ada irisan yang lengkap.':'Irisan yang sudah lengkap dan dapat ditampilkan: '+lengkap.join(', ')+'.')+(seq?'':' Pada jenis ini, semua irisan baru lengkap hampir bersamaan di akhir pemindaian.');
}
function akStop(){if(akT){clearInterval(akT);akT=null;}$('aplay').textContent='Putar';}
document.querySelectorAll('input[name=am]').forEach(e=>e.addEventListener('change',()=>{akStop();updAk();}));
$('ac').addEventListener('input',()=>{akStop();updAk();});
$('aplay').onclick=()=>{if(akT){akStop();return;}if(+$('ac').value>=TN*TS)$('ac').value=0;$('aplay').textContent='Jeda';akT=setInterval(()=>{const b=$('ac');if(+b.value>=TN*TS){akStop();return;}b.value=+b.value+1;updAk();},120);};
$('reset18').onclick=()=>{akStop();document.querySelector('input[name=am][value=vol]').checked=true;$('ac').value=0;updAk();};

updAk();
