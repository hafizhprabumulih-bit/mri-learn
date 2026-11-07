/* A6: Pilih magnet untuk situasi. Menjelaskan T1.3, T1.4. (Usulan: perlu dikonfirmasi) */
const OPSI_A6=['Permanen, medan rendah (terbuka)','Resistif, medan rendah sampai menengah','Superkonduktif 1,5 T','Superkonduktif 3 T'];
const SITUASI_A6=[
 {k:'Klinik kecil dengan anggaran terbatas, tanpa pasokan helium.',benar:[0],alasan:'Magnet permanen tanpa listrik dan kriogen, biaya operasi rendah. Kekurangannya SNR lebih rendah dan bobot besar.'},
 {k:'Rumah sakit besar dengan banyak pasien dan pemeriksaan beragam.',benar:[2,3],alasan:'Superkonduktif 1,5 T (serba guna) atau 3 T (SNR dan resolusi lebih tinggi). Butuh helium dan ruang khusus.'},
 {k:'Lokasi dengan daya listrik terbatas.',benar:[0],alasan:'Magnet permanen tidak memakai listrik untuk menjaga medan. Resistif butuh daya puluhan kW; superkonduktif butuh pendingin kriogen.'},
 {k:'Banyak pasien klaustrofobik.',benar:[0,2],alasan:'Desain permanen terbuka, atau superkonduktif 1,5 T dengan bore lebar 70 cm, membuat pasien lebih nyaman.'}
];
daftarAktivitas({
 id:'A6', judul:'Pilih magnet untuk situasi', menjelaskan:['T1.3','T1.4'],
 html:`
<p class="lembut">Baca situasi, pilih jenis magnet dan kuat medan yang paling cocok. Tidak semua situasi punya satu jawaban tunggal.</p>
<p><b id="a6-k"></b></p>
<div id="a6-o"></div>
<p id="a6-f" role="status" aria-live="polite"></p>
<div class="baris"><button type="button" id="a6-prev">&larr; Sebelumnya</button><button type="button" id="a6-next">Berikutnya &rarr;</button></div>`,
 mulai(){
  let i=0; const coba=SITUASI_A6.map(()=>new Set()), sel=SITUASI_A6.map(()=>-1);
  function tampil(){
   const s=SITUASI_A6[i]; $('a6-k').textContent='Situasi '+(i+1)+'/'+SITUASI_A6.length+': '+s.k;
   const w=$('a6-o'); w.innerHTML='';
   OPSI_A6.forEach((t,k)=>{const b=document.createElement('button');b.type='button';b.className='opsi';
    const bn=sel[i]>=0&&s.benar.includes(sel[i]);
    b.textContent=t; if(coba[i].has(k)){b.classList.add('salah');b.textContent='\u2717 '+t;b.disabled=true;}
    if(sel[i]===k&&bn){b.classList.add('benar');b.textContent='\u2713 '+t;}
    b.disabled=b.disabled||(bn&&sel[i]!==k);
    b.onclick=()=>{if(s.benar.includes(k)){sel[i]=k;}else coba[i].add(k);tampil();};
    w.appendChild(b);});
   const bn=sel[i]>=0;
   $('a6-f').textContent=bn?'Cocok. '+s.alasan:(coba[i].size?'Belum cocok. Coba pilihan lain.':'');
   $('a6-prev').disabled=i===0; $('a6-next').disabled=i===SITUASI_A6.length-1;
  }
  $('a6-prev').onclick=()=>{i--;tampil();}; $('a6-next').onclick=()=>{i++;tampil();};
  tampil();
 }
});
