/* T3.1: Efek kenaikan B0. Aktivitas: A5. */
daftarMateri({
 id:'T3.1', tingkat:3,
 judul:'Efek kenaikan B0',
 prasyarat:'T1.4',
 tujuan:'menjelaskan konsekuensi kenaikan B0 terhadap SNR, SAR, T1, pergeseran kimia, dan artefak suseptibilitas.',
 aktivitas:['A5'],
 tautan:['SAR dan batas paparan: M07C.','T1 memanjang: M02 T3.1 (prasyarat).','Pergeseran kimia dalam Hz: M06B T3.1 (prasyarat).','Artefak suseptibilitas: M08C T2.6.'],
 singkat:`<p>B0 naik: SNR naik kira-kira linear, SAR naik dengan B0 kuadrat, T1 memanjang, pergeseran kimia dalam Hz makin lebar, dan artefak suseptibilitas makin kuat.</p>`,
 lengkap:`
<ul>
<li><b>SNR</b> naik kira-kira linear dengan B0 (sinyal naik sebanding kuadrat medan, derau naik linear). Pada fantom melipatkan medan kira-kira melipatkan SNR; pada pasien belum tentu.</li>
<li><b>SAR</b> naik dengan B0 kuadrat (batas seluruh tubuh pada mode normal 2 W/kg). SAR membatasi TR spin-echo dan flip angle gradient-echo.</li>
<li><b>T1 memanjang</b>, sehingga kontras T1 berubah.</li>
<li><b>Pergeseran kimia dalam Hz makin lebar</b> (dalam ppm tetap). Bandwidth terima perlu dinaikkan, yang mengurangi SNR. Di sisi lain, supresi lemak spektral lebih efektif karena puncak lemak terpisah dari air.</li>
<li><b>Artefak suseptibilitas makin kuat</b>: sinyal cepat hilang fase di dekat logam atau batas udara-jaringan.</li>
</ul>
<p>Keuntungan lain: pencitraan lebih cepat, voksel lebih kecil, fMRI (BOLD) lebih jelas, dan spektroskopi lebih mudah membedakan metabolit.</p>
<p class="lembut">Kuat medan sebenarnya dinyatakan dalam A/m (simbol H), sedangkan kerapatan fluks B dalam tesla; 1 T = 10 000 G. Medan bumi sekitar 0,5 G.</p>`,
 analogi:`Seperti menaikkan volume radio: suara makin jelas, tetapi bila terlalu keras timbul distorsi dan perangkat jadi panas.`
});
