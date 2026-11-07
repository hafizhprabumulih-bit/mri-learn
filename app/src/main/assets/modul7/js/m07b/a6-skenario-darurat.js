/* A6 · Skenario darurat: quench vs pasien terjepit, pilih tindakan   [BARU]
   Menjelaskan: T3.2. Urutan kejadian quench: M05 A7. Latihan konsep, bukan SOP. */
daftarAktivitas('A6',{
 judul:'Skenario darurat: pilih tindakan',
 menjelaskan:['T3.2'],
 lanjut:true,
 html:`<p class='lembut'>Baca skenario, lalu pilih tindakan: quench, keluarkan dan tangani di luar Zona IV, atau evakuasi. Ini latihan konsep, bukan pengganti SOP dan pelatihan darurat fasilitas.</p>
<p id='ds-q'></p>
<div class='baris'><button type='button' class='sk-b' data-v='quench'>Quench magnet</button><button type='button' class='sk-b' data-v='keluarkan'>Keluarkan dan tangani di luar Zona IV</button><button type='button' class='sk-b' data-v='evakuasi'>Evakuasi dan panggil bantuan</button></div>
<p id='ds-f' role='status' aria-live='polite'></p>
<p class='lembut' id='ds-s'></p>
<div class='baris'><button type='button' id='ds-n' hidden>Berikutnya</button><button type='button' id='ds-r'>Reset</button></div>`,
 mulai(root){
  const SC=[
   ['Seorang pasien mendadak tidak sadar dan tidak bernapas di Zona IV. Tidak ada benda yang menjepitnya.','keluarkan','Pasien yang sakit mendadak dikeluarkan dan ditangani di luar Zona IV sambil memanggil tim resusitasi. Quench tidak dipakai untuk itu.'],
   ['Seorang porter terjepit antara tabung oksigen ferromagnetik dan magnet, dan tidak bisa dilepaskan.','quench','Orang terjepit benda ferromagnetik adalah ancaman nyawa akibat medan, alasan yang dibenarkan untuk quench. Setelah itu ikuti prosedur gas helium.'],
   ['Pasien panik karena klaustrofobia dan memohon keluar dari bore.','keluarkan','Hentikan pemindaian dan keluarkan pasien. Tidak ada ancaman akibat medan, jadi quench tidak dipakai.'],
   ['Alarm oksigen berbunyi setelah pipa quench dilaporkan rusak, dan seseorang tampak lemas di dalam ruang magnet.','evakuasi','Helium menggantikan oksigen dan penolong pun bisa pingsan. Evakuasi, jangan masuk sendirian, dan minta bantuan terlatih. Pastikan keselamatan diri sendiri dahulu.'],
   ['Seorang staf pusing berputar (vertigo) setelah melewati medan tepi magnet berkekuatan sangat tinggi.','keluarkan','Keluarkan dari medan dan biarkan pulih (sekitar '+DATA.EFEK.pulih_menit+' menit). Ini efek sementara, bukan ancaman nyawa, jadi quench tidak dipakai.']];
  let si=0,ss=0,pr=null,pil='';
  const bt=()=>root.querySelectorAll('.sk-b');
  function tampil(){
   $('ds-q').textContent='Skenario '+(si+1)+' dari '+SC.length+': '+SC[si][0];
   $('ds-f').textContent='';$('ds-f').className='';pr=null;pil='';$('ds-n').hidden=true;
   bt().forEach(b=>{b.className='sk-b';b.setAttribute('aria-pressed','false');});
   $('ds-s').textContent='Benar: '+ss;
  }
  bt().forEach(b=>b.onclick=()=>{
   const s=SC[si],v=b.dataset.v,ok=v===s[1];
   if(pil===v){pil='';b.className='sk-b';b.setAttribute('aria-pressed','false');$('ds-f').textContent='';$('ds-f').className='';return;}
   if(pr===null){pr=ok;if(ok)ss++;}
   pil=v;bt().forEach(x=>{x.className='sk-b';x.setAttribute('aria-pressed','false');});
   b.className='sk-b '+(ok?'benar':'salah');b.setAttribute('aria-pressed','true');
   $('ds-f').className=ok?'ok':'no';$('ds-f').textContent=(ok?'Tepat. ':'Belum tepat. Yang sesuai: '+s[1]+'. ')+s[2];
   $('ds-s').textContent='Benar: '+ss;
   $('ds-n').hidden=false;$('ds-n').textContent=si===SC.length-1?'Selesai':'Berikutnya';
  });
  $('ds-n').onclick=()=>{if(si<SC.length-1){si++;tampil();}else{$('ds-q').textContent='Selesai. Skor '+ss+' dari '+SC.length+'. Tekan Reset untuk mengulang.';$('ds-n').hidden=true;$('ds-f').textContent='';}};
  $('ds-r').onclick=()=>{si=0;ss=0;tampil();};
  tampil();
 }
});
