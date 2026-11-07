/* Ilustrasi bertahap (tombol Sebelumnya/Berikutnya).
   Tiap <figure class='ilus' data-langkah='NAMA'> mencari NAMA di LANGKAH.
   s = daftar langkah; tiap langkah berisi indeks elemen SVG (tanpa <title>) yang ditampilkan.
   t = teks penjelasan tiap langkah (jumlah t = jumlah s + 1). */
const LANGKAH={
 'tiga-langkah':{s:[[1],[2],[3,4]],t:['Tekan Berikutnya. Satu irisan axial otak akan dibangun dari tiga langkah.','Langkah 1 (T1.4): gradien Gz menyala saat pulsa RF dikirim. Dari seluruh kepala (tampak sagital), hanya satu irisan yang beresonansi, dan itulah irisan axial di kanan.','Langkah 2 (T1.7): gradien singkat memberi tiap baris voksel pada irisan itu fase berbeda, seperti jam tangan yang disetel berbeda. Ini diulang pada setiap TR.','Langkah 3 (T1.6): gradien menyala saat sinyal dibaca, sehingga tiap kolom voksel berfrekuensi berbeda. Baris dikenali dari fase, kolom dari frekuensi.']},
 'pilih-irisan':{s:[[2,6,7,8,9],[3,12],[0,10],[1,11,13],[4,5,14,15,16,17,18]],t:['Tekan Berikutnya. Kita bangun pemilihan irisan pelan-pelan.','Sumbu: posisi sepanjang tubuh (z) dan frekuensi sinyal.','Dengan gradien, frekuensi naik linear menurut posisi: ω = γ(B0 + Gz·z).','Pulsa RF hanya membawa pita frekuensi yang sempit.','Hanya posisi dengan frekuensi di dalam pita yang beresonansi. Itulah irisan Δz.','Gradien lebih kuat membuat garis lebih curam, jadi pita yang sama hanya cocok di bagian yang lebih sempit: irisan lebih tipis.']},
 'ruangk-ke-citra':{s:[[0,5],[1,2,3,4],[6,7],[8,9,10,11,12],[13,14,15,16,17,18]],t:['Tekan Berikutnya. Kita ikuti jalannya data menjadi citra.','Ruang-k adalah tabel sinyal yang terbaca, bukan gambar.','Pusat dan tepi ruang-k berbeda peran. Pusat memuat sinyal dan kontras, tepi memuat detail.','Transformasi Fourier 2D mengubah ruang-k menjadi citra.','Hasilnya adalah citra yang bisa dikenali.','Ringkasan: pusat untuk kontras, tepi untuk detail. FOV = 1/Δk dan voksel = FOV/N.']}
};

function pasangIlustrasi(akar){
(akar||document).querySelectorAll('figure.ilus[data-langkah]').forEach(fg=>{
 const cfg=LANGKAH[fg.dataset.langkah];if(!cfg)return;
 const els=[...fg.querySelector('svg').children].filter(e=>e.tagName.toLowerCase()!=='title');
 const n=cfg.s.length;let st=0;
 const bar=document.createElement('div');bar.className='stp';
 const mk=(txt,f)=>{const b=document.createElement('button');b.type='button';b.textContent=txt;b.onclick=f;bar.appendChild(b);return b;};
 const prev=mk('‹ Sebelumnya',()=>{st=Math.max(0,st-1);tampil();});
 const next=mk('Berikutnya ›',()=>{st=Math.min(n,st+1);tampil();});
 mk('Reset',()=>{st=0;tampil();});
 const no=document.createElement('span');no.className='no2';bar.appendChild(no);
 const info=document.createElement('p');info.className='info-stp';info.setAttribute('aria-live','polite');
 fg.insertBefore(bar,fg.querySelector('figcaption'));fg.insertBefore(info,fg.querySelector('figcaption'));
 function tampil(){
  els.forEach(e=>{e.style.display='none';e.style.filter='';});
  for(let k=0;k<st;k++)cfg.s[k].forEach(i=>{els[i].style.display='';if(k===st-1)els[i].style.filter='drop-shadow(0 0 3px var(--aksen))';});
  prev.disabled=st===0;next.disabled=st===n;
  no.textContent='Langkah '+st+' / '+n;info.textContent=cfg.t[st];
 }
 tampil();
});
}
