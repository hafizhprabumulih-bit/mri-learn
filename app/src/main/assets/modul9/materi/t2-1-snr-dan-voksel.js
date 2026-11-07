/* T2.1: SNR dan voksel. Aktivitas: S1. */
daftarMateri({
 id:'T2.1', tingkat:2,
 judul:"SNR dan voksel",
 tujuan:"memperkirakan perubahan SNR dari voksel, NEX, dan bandwidth.",
 aktivitas:['S1'],
 tautan:["SNR tingkat lanjut: M04C T3.8"],
 singkat:`<p>SNR &prop; volume voksel &times; &radic;(NEX &middot; N<sub>fase</sub> / BW).</p><p>Voksel besar, NEX banyak, bandwidth sempit = SNR tinggi. FoV adalah pengendali SNR terkuat.</p>`,
 lengkap:`
<p>Pada MRI, SNR adalah faktor kualitas paling penting; resolusi bagus tidak berguna bila SNR buruk. Saat FoV mengecil (matriks tetap), piksel mengecil pada kedua sumbu, maka FoV menjadi pengendali SNR paling kuat (contoh: FoV 160 mm vs 80 mm). Area dengan sinyal bawaan baik (otak) memungkinkan matriks halus dan NEX kecil; area sinyal rendah (paru) butuh NEX lebih banyak dan matriks lebih kasar. Voksel = FoV/matriks; interpolasi (zero-fill) memperhalus tampilan tetapi tidak menambah resolusi sejati.</p>`,
 analogi:`Voksel seperti ember hujan: ember lebar menampung banyak air (sinyal) tetapi kurang rinci menunjukkan di mana hujan jatuh. Noise adalah percikan acak; mengulang pengukuran meratakannya.`
});
