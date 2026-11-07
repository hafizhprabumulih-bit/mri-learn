/* T3.2: Parallel imaging: dampak pada TA dan SNR. Aktivitas: S1. (Usulan baru, perlu dikonfirmasi.) */
daftarMateri({
 id:'T3.2', tingkat:3,
 judul:"Parallel imaging: dampak pada TA dan SNR",
 prasyarat:"T3.1",
 tujuan:"menilai dampak parallel imaging pada TA dan SNR.",
 aktivitas:['S1'],
 tautan:["M04C T3.6"],
 singkat:`<p>iPAT, SENSE, dan ASSET memakai banyak elemen koil untuk melewati sebagian langkah fase.</p><p>Faktor akselerasi R membagi TA dengan R, tetapi SNR turun minimal &radic;R.</p>`,
 lengkap:`
<p>Ideal: TA &divide; R dan SNR &divide; &radic;R. Di praktik ada penalti tambahan (g-factor, g &ge; 1) sehingga SNR turun lebih banyak, dan R terlalu besar menimbulkan artefak aliasing sisa. Simulasi 1 memakai g = 1 (kasus terbaik), jadi hasilnya batas optimis.</p>`,
 analogi:`Seperti beberapa orang membaca bagian buku berbeda lalu digabung: lebih cepat, tetapi sambungannya tidak selalu mulus (g-factor).`
});
