/* A2 · Simulasi skrining
   Menjelaskan: T1.2, T2.3   [← M07 #2] */
daftarAktivitas('A2',{
 judul:'Simulasi skrining',menjelaskan:["T1.2", "T2.3"],
 html:`<p class='lembut'>Baca skenario, lalu putuskan: lanjut, tahan, atau tolak. Ini latihan konsep, bukan pengganti SOP.</p>
<p id='sk-q'></p>
<div class='baris'><button type='button' class='sk-b' data-v='lanjut'>Lanjut</button><button type='button' class='sk-b' data-v='tahan'>Tahan</button><button type='button' class='sk-b' data-v='tolak'>Tolak</button></div>
<p id='sk-f' role='status' aria-live='polite'></p>
<p class='lembut' id='sk-s'></p>
<div class='baris'><button type='button' id='sk-n' hidden>Berikutnya</button><button type='button' id='sk-r'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #2 --- */
const SK=[
 ['Pasien membawa kunci, ponsel, dan ikat pinggang logam. Tidak ada implan.','tahan','Barang logam dilepas dan disimpan di luar Zona IV dahulu. Setelah itu skrining dilanjutkan.'],
 ['Pasien membawa implan berlabel MR Conditional. Syaratnya belum diperiksa.','tahan','MR Conditional berarti aman hanya bila syarat pada label dipenuhi. Syarat diperiksa petugas yang berwenang dahulu.'],
 ['Staf kebersihan ingin masuk Zona IV mendorong troli baja.','tolak','Troli ferromagnetik dapat menjadi proyektil. Gunakan peralatan aman-MR dan petugas yang terlatih.'],
 ['Pasien membawa implan berlabel MR Unsafe.','tolak','MR Unsafe berarti berbahaya di lingkungan MR, jadi tidak masuk ruang magnet.'],
 ['Pasien tidak ingat jenis implan dan tidak ada dokumennya.','tahan','Implan yang tidak diketahui tidak boleh dianggap aman. Cari dokumen dan tanyakan penanggung jawab keselamatan MR.'],
 ['Semua logam sudah dilepas, formulir lengkap, dan tidak ada implan.','lanjut','Skrining terpenuhi. Pemeriksaan boleh dilanjutkan sesuai SOP fasilitas.']];
let si=0,ss=0,pr=null,pil='';
function tampilSk(){
 $('sk-q').textContent='Skenario '+(si+1)+' dari '+SK.length+': '+SK[si][0];
 $('sk-f').textContent='';$('sk-f').className='';pr=null;pil='';$('sk-n').hidden=true;
 $('A2').querySelectorAll('.sk-b').forEach(b=>{b.className='sk-b';b.setAttribute('aria-pressed','false');});
 $('sk-s').textContent='Benar: '+ss;
}
$('A2').querySelectorAll('.sk-b').forEach(b=>b.onclick=()=>{
 const s=SK[si],v=b.dataset.v,ok=v===s[1];if(pil===v){pil='';b.className='sk-b';b.setAttribute('aria-pressed','false');$('sk-f').textContent='';$('sk-f').className='';return;}if(pr===null){pr=ok;if(ok)ss++;}pil=v;$('A2').querySelectorAll('.sk-b').forEach(x=>{x.className='sk-b';x.setAttribute('aria-pressed','false');});b.className='sk-b '+(ok?'benar':'salah');b.setAttribute('aria-pressed','true');
 $('sk-f').className=ok?'ok':'no';$('sk-f').textContent=(ok?'Tepat. ':'Belum tepat. Yang sesuai: '+s[1]+'. ')+s[2];
 $('sk-s').textContent='Benar: '+ss;
 $('sk-n').hidden=false;$('sk-n').textContent=si===SK.length-1?'Selesai':'Berikutnya';});
$('sk-n').onclick=()=>{if(si<SK.length-1){si++;tampilSk();}else{$('sk-q').textContent='Selesai. Skor '+ss+' dari '+SK.length+'. Tekan Reset untuk mengulang.';$('sk-n').hidden=true;$('sk-f').textContent='';}};
$('sk-r').onclick=()=>{si=0;ss=0;tampilSk();};
tampilSk();
 }
});
