/* T3.1: Koreksi rumus TA untuk TSE dan 3D. Aktivitas: S1. (Usulan baru, perlu dikonfirmasi.) */
daftarMateri({
 id:'T3.1', tingkat:3,
 judul:"Koreksi rumus TA untuk TSE dan 3D",
 prasyarat:"T1.2",
 tujuan:"mengoreksi rumus TA untuk TSE dan 3D.",
 aktivitas:['S1'],
 tautan:[],
 singkat:`<p>TA umum = TR &times; N<sub>fase</sub> &times; NEX &times; N<sub>partisi</sub> &divide; ETL.</p><p>TSE: TA dibagi turbo factor (ETL). 3D: TA dikali jumlah partisi. 2D konvensional: ETL = 1 dan partisi = 1.</p>`,
 lengkap:`
<p>Contoh TSE: TR 4000 ms, 256 langkah fase, NEX 1, ETL 16 memberi TA = 4 &times; 256 &divide; 16 = 64 s. Contoh 3D: TR 20 ms, 128 fase, 64 partisi, NEX 1 memberi TA = 0,02 &times; 128 &times; 64 &approx; 164 s. Pada 3D, SNR juga ikut naik dengan akar jumlah partisi. Slider ETL dan partisi ada di Simulasi 1.</p>`,
 analogi:`Seperti memindahkan banyak barang dengan satu perjalanan membawa beberapa kardus (ETL), sementara 3D seperti menambah jumlah lantai yang harus dikerjakan.`
});
