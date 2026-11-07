/* T2.3: Ramping (menaikkan arus awal) dan saklar persisten. Aktivitas: A3 (mode 2). */
daftarMateri({
 id:'T2.3', tingkat:2,
 judul:'Ramping (menaikkan arus awal) dan saklar persisten',
 prasyarat:'T2.2',
 tujuan:'menjelaskan urutan ramping up, mode persisten, dan ramping down.',
 aktivitas:['A3'],
 singkat:`<p>Arus dinaikkan bertahap lewat catu daya (ramping) saat saklar persisten resistif. Setelah saklar menjadi superkonduktor, catu daya dilepas dan arus bertahan.</p>`,
 lengkap:`
<p>Terminal solenoid dihubungkan paralel dengan <b>saklar persisten</b>, yaitu kawat superkonduktor dengan kumparan pemanas.</p>
<ol>
<li><b>Ramping up:</b> pemanas ON, saklar menjadi resistif, sehingga arus dari catu daya mengalir ke solenoid dan dinaikkan bertahap.</li>
<li><b>Persisten:</b> setelah medan tercapai, pemanas OFF, saklar menjadi superkonduktor dan membentuk lingkaran tertutup dengan solenoid. Catu daya dilepas; arus bertahan.</li>
<li><b>Ramping down:</b> catu daya disambungkan lagi dan disamakan arusnya, pemanas ON, lalu arus diturunkan bertahap. Energinya dibuang sebagai panas pada resistor dump.</li>
</ol>
<p>Ramping down terencana juga dapat dipakai untuk mengeluarkan benda feromagnetik besar tanpa quench, hanya bila tidak ada bahaya bagi nyawa atau anggota tubuh. Bahaya ancaman nyawa ditangani dengan quench (T2.6).</p>`,
 analogi:`Saklar persisten seperti kran yang ditutup setelah bak penuh: air (arus) terus berputar di dalam lingkaran tertutup tanpa pompa.`
});
