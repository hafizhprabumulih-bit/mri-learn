/* A7: Urutkan kejadian quench. Menjelaskan T2.6. (Usulan: perlu dikonfirmasi) */
const LANGKAH_A7=[
 {t:'Sebagian kawat memanas dan keluar dari keadaan superkonduktif',p:'Pemicunya bisa gangguan pada magnet atau tombol quench darurat.'},
 {t:'Hambatan muncul, arus besar berubah menjadi panas',p:'Arus yang tadinya tanpa hambatan kini menghasilkan panas dan menyebar ke kumparan lain.'},
 {t:'Helium cair mendidih dan menguap sangat cepat',p:'Gas helium mengembang sekitar 700 kali volume cairnya.'},
 {t:'Gas helium keluar lewat pipa quench ke luar gedung',p:'Medan magnet menghilang. Prosedur keselamatan lengkap ada di M07B.'}
];
daftarAktivitas({
 id:'A7', judul:'Urutkan kejadian quench', menjelaskan:['T2.6'],
 html:`
<p class="lembut">Ketuk kartu sesuai urutan kejadian, dari yang pertama. Kartu yang salah tidak akan terpasang.</p>
<div id="a7-kartu"></div>
<p><b>Urutan Anda:</b></p>
<div id="a7-slot"></div>
<p id="a7-f" role="status" aria-live="polite"></p>
<div class="baris"><button type="button" id="a7-reset">Acak ulang</button></div>
<p class="lembut">Tautan keselamatan: M07B (prosedur dan bahaya).</p>`,
 mulai(){
  let n=0;
  function siap(){
   n=0; $('a7-slot').innerHTML=''; $('a7-f').textContent='';
   const w=$('a7-kartu'); w.innerHTML='';
   acak(LANGKAH_A7.map((x,i)=>i)).forEach(i=>{
    const b=document.createElement('button'); b.type='button'; b.className='kartu-urut'; b.textContent=LANGKAH_A7[i].t;
    b.onclick=()=>{
     if(i===n){const d=document.createElement('div');d.className='slot';d.innerHTML='<b>'+(n+1)+'.</b> '+LANGKAH_A7[i].t+' <span class="lembut">'+LANGKAH_A7[i].p+'</span>';$('a7-slot').appendChild(d);b.remove();n++;
      $('a7-f').textContent=n===LANGKAH_A7.length?'Urutan benar. Quench selalu dimulai dari satu titik yang memanas.':'Benar. Lanjutkan ke langkah berikutnya.';}
     else $('a7-f').textContent='Belum tepat. Apa yang terjadi lebih dahulu?';
    };
    w.appendChild(b);});
  }
  $('a7-reset').onclick=siap; siap();
 }
});
