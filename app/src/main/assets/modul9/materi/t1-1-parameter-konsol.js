/* T1.1: Parameter yang tampil di konsol. Aktivitas: S1. */
daftarMateri({
 id:'T1.1', tingkat:1,
 judul:"Parameter yang tampil di konsol",
 tujuan:"menjelaskan arti parameter yang tampil di layar konsol.",
 aktivitas:['S1'],
 tautan:["definisi: M01 T2.4","efek: M02"],
 singkat:`<p>Hampir semua protokol dapat dibaca dari enam angka: TR, TE, flip angle, FoV, matriks, dan ketebalan irisan.</p><p>TR/TE mengatur kontras dan waktu; flip angle mengatur besar tip magnetisasi; FoV dan matriks menentukan ukuran piksel; ketebalan melengkapi volume voksel.</p>`,
 lengkap:`
<p>TR (waktu ulang) menentukan seberapa pulih magnetisasi longitudinal antar pulsa dan ikut menentukan jumlah irisan serta TA. TE menentukan bobot T2: TE panjang menambah kontras T2 tetapi menurunkan SNR. Flip angle mengatur besar tip magnetisasi. FoV dan matriks menentukan ukuran piksel (FoV/matriks), sedangkan ketebalan irisan melengkapi volume voksel. Perlu diingat: matriks fase mengubah TA, matriks frekuensi tidak.</p>`,
 analogi:`Layar konsol seperti dasbor mobil: TR/TE adalah gigi yang mengubah karakter gambar, FoV/matriks adalah kerapatan jendela mozaik, dan TA adalah argo yang terus berjalan.`
});
