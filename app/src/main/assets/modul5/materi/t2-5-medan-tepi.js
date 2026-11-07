/* T2.5: Medan tepi dan perisai 5 gauss. Aktivitas: A4. */
daftarMateri({
 id:'T2.5', tingkat:2,
 judul:'Medan tepi dan perisai 5 gauss',
 prasyarat:'T2.2',
 tujuan:'membedakan perisai pasif dan aktif serta menyebut satu kelebihan dan kekurangan tiap jenis.',
 aktivitas:['A4'],
 tautan:['Bahaya dan zona 5 G: M07B T2.3.'],
 singkat:`<p>Perisai membatasi medan tepi 5 G (0,5 mT). Pasif memakai pelat baja; aktif memakai bucking coil berarus berlawanan.</p>`,
 lengkap:`
<p>Medan tepi dapat mengganggu peralatan sekitar dan berbahaya bagi publik pada 5 G atau lebih (5 G = 0,5 mT). Perisai menjaga garis 5 G tetap di dalam area terkendali.</p>
<ul>
<li><b>Perisai pasif:</b> pelat baja tebal di sekitar pesawat atau di dinding ruang. Garis fluks lebih suka melewati bahan feromagnetik daripada udara, jadi medan tepi dibelokkan kembali. Pada 1,5 T tanpa perisai, batas 5 G bisa sejauh sekitar 10 m. Kekurangan: bobot lebih dari 20 ton, mahal, dan logam dekat magnet dapat mengganggu homogenitas.</li>
<li><b>Perisai aktif:</b> bucking coil, solenoid berdiameter lebih besar di kedua ujung dengan arus berlawanan sehingga fluks dibalik dan jejak 5 G menyempit. Kini dipakai pada sebagian besar pesawat klinis.</li>
</ul>
<p><b>Waspada:</b> perisai aktif membuat gradien medan statis sangat curam, sehingga benda feromagnetik baru terasa ketika sudah dekat dan sulit dicegah menjadi proyektil.</p>
<p>Gaya Lorentz (F = qE + qv x B): konduktor berarus yang tegak lurus medan mengalami gaya. Ini menjelaskan tantangan perisai aktif pada medan sangat tinggi dan bunyi bising gradient coil saat aktif.</p>`,
 analogi:`Perisai pasif seperti tembok yang membelokkan air. Perisai aktif seperti arus tandingan yang menahan air agar tidak menyebar jauh, tetapi tepinya jadi lebih tajam.`
});
