/* T1.2: Waktu pindai (TA). Aktivitas: S1. */
daftarMateri({
 id:'T1.2', tingkat:1,
 judul:"Waktu pindai (TA)",
 prasyarat:"M04B",
 tujuan:"menghitung waktu pindai (TA) 2D.",
 aktivitas:['S1'],
 tautan:["TA = waktu mengisi ruang-k: M04B T2.10 (Fakta 4)"],
 singkat:`<p>TA 2D = TR &times; N<sub>fase</sub> &times; NEX.</p><p>Tiga faktor ini menentukan TA. Matriks frekuensi tidak ikut menaikkan TA.</p>`,
 lengkap:`
<p>Setiap langkah pengodean fase membutuhkan satu TR, dan seluruh baris diulang sebanyak NEX. Karena itu menaikkan matriks fase menaikkan TA, sedangkan menaikkan matriks frekuensi tidak (data frekuensi dibaca sekaligus dalam satu pembacaan). Rumus ini berlaku untuk 2D konvensional; koreksi untuk TSE dan 3D ada di T3.1.</p>`,
 analogi:`Setiap baris fase seperti satu ketukan pintu: TR adalah jeda antar ketukan, NEX berapa kali diulang. Menambah kolom frekuensi tidak menambah ketukan, hanya menambah lubang pada kertas.`
});
