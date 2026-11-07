/* T2.4: Homogenitas B0 dan shimming. Aktivitas: A2. */
daftarMateri({
 id:'T2.4', tingkat:2,
 judul:'Homogenitas B0 dan shimming (ppm; pasif dan aktif; koil shim)',
 prasyarat:'T2.2',
 tujuan:'menjelaskan mengapa B0 harus homogen dan bagaimana shim meluruskan sisa ketidakmerataan.',
 aktivitas:['A2'],
 tautan:['Gradient coil dan shim aktif lebih rinci: M06A T3.1.'],
 singkat:`<p>B0 harus homogen dalam satuan ppm pada bola 40 cm. Shim pasif (pelat besi) dan shim aktif (koil shim) meratakan sisa ketidakmerataan.</p>`,
 lengkap:`
<p>Homogenitas dinyatakan dalam <b>ppm</b> pada bola pencitraan 40 cm. Medan homogen penting karena (1) mencegah distorsi geometrik, dan (2) frekuensi presesi bergantung pada medan: ketidakhomogenan menggeser frekuensi dan mengganggu SNR serta supresi lemak.</p>
<p>Medan mentah bisa bervariasi sekitar 100 ppm, padahal pencitraan pada 1,5 sampai 3 T butuh sekitar 10 ppm atau lebih baik.</p>
<ul>
<li><b>Shim pasif:</b> nampan plastik non-feromagnetik sepanjang bore dengan sekitar 14 sampai 16 kompartemen berisi pelat feromagnetik kecil. Insinyur mengukur medan pada bola 40 cm lalu menempatkan pelat untuk mengimbangi ketidakhomogenan.</li>
<li><b>Shim aktif:</b> koil shim berarus yang berada di warm bore, antara magnet dan gradient coil. Arusnya dapat diatur, termasuk untuk tiap pasien.</li>
</ul>
<p>Konversi ppm ke Hz: f = 42,58 MHz/T x B0 x ppm. Pada 1,5 T, 1 ppm sekitar 64 Hz; pada 3 T sekitar 128 Hz (lihat A2).</p>`,
 analogi:`Shim seperti mengganjal kaki meja agar permukaannya benar-benar rata.`
});
