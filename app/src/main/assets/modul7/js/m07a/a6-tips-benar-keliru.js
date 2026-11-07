/* A6 · Benar atau keliru? Tips keselamatan
   Menjelaskan: T2.5   [← M07 #15] */
daftarAktivitas('A6',{
 judul:'Benar atau keliru? Tips keselamatan',menjelaskan:["T2.5"],
 html:`<p class='lembut'>Tekan Benar atau Keliru. Hijau berarti tepat, merah berarti belum tepat. Tekan lagi untuk membatalkan.</p>
<div id='tpbox'></div>
<div class='baris'><button type='button' id='tpr'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #15 --- */
const TP=[
 ['Staf yang pernah masuk ruang magnet tidak perlu diskrining lagi.',false,'Jangan berasumsi staf paham bahayanya. Skrining seketat pada pasien.'],
 ['Kunci kode digital adalah pilihan yang baik untuk pintu Zona III.',false,'Kode mudah dibagikan ke staf departemen lain yang tidak paham keselamatan MR.'],
 ['Pasien yang kemarin dipindai di tempat lain pasti aman dipindai hari ini.',false,'Kekuatan medan dan gradien bisa berbeda, dan kondisi pasien, misalnya kehamilan, bisa berubah.'],
 ['Selain formulir tertulis, kontraindikasi perlu ditanyakan secara lisan.',true,'Pasien kadang menyebut bahaya yang tidak tertulis di formulir.'],
 ['Citra rontgen terbaru dapat membantu menyingkirkan pacu jantung atau klip aneurisma.',true,'Citra yang sudah ada dapat memperlihatkan benda logam tersebut.'],
 ['Tangga pijakan dan alat pemadam di departemen MRI sebaiknya non-ferrous bila ada pilihan.',true,'Benda ferromagnetik besar bisa terbawa masuk ke ruang magnet tanpa sengaja.'],
 ['Bila ragu dan ditekan untuk tetap memindai, lanjutkan agar jadwal tidak tertunda.',false,'Jangan membiarkan diri ditekan. Bila ragu, tunda pemeriksaan.']];
let tpS=TP.map(()=>-1),tpF=null;
function gambarTips(){
 const bx=$('tpbox');bx.innerHTML='';
 TP.forEach((t,i)=>{
  const d=document.createElement('div');d.className='baris';d.style.alignItems='center';
  const p=document.createElement('span');p.textContent=(i+1)+'. '+t[0];p.style.flex='1 1 280px';d.appendChild(p);
  ['Benar','Keliru'].forEach((nm,c)=>{
   const b=document.createElement('button');b.type='button';b.textContent=nm;b.dataset.k=i+'-'+c;
   const sel=tpS[i]===c;b.setAttribute('aria-pressed',sel);
   b.className='sk-b'+(sel?((c===0)===t[1]?' benar':' salah'):'');
   b.onclick=()=>{tpS[i]=sel?-1:c;tpF=i+'-'+c;gambarTips();};
   d.appendChild(b);});
  bx.appendChild(d);
  if(tpS[i]>=0){const ok=(tpS[i]===0)===t[1],f=document.createElement('p');f.className=ok?'ok':'no';f.textContent=(ok?'Tepat. ':'Belum tepat. ')+t[2];bx.appendChild(f);}
 });
 if(tpF){const b=bx.querySelector(`button[data-k='${tpF}']`);if(b)b.focus();}
}
$('tpr').onclick=()=>{tpS=TP.map(()=>-1);tpF=null;gambarTips();};
gambarTips();
 }
});
