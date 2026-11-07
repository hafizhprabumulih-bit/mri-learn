/* T2.3: Kompromi (trade-off). Aktivitas: S1. */
daftarMateri({
 id:'T2.3', tingkat:2,
 judul:"Kompromi (trade-off)",
 prasyarat:"T2.1",
 tujuan:"menilai kompromi antar parameter protokol.",
 aktivitas:['S1'],
 tautan:["menurunkan SAR: M07C A1 mode 3","perbaikan artefak ada harganya: M08C T3.3"],
 singkat:`<p>Ideal: SNR tinggi, resolusi baik, waktu singkat. Mengubah satu parameter selalu memengaruhi yang lain.</p><p>Tidak ada pengaturan yang menang di semua sisi; pilih sesuai tujuan pemeriksaan (prinsip selimut sempit).</p>`,
 lengkap:`
<p>Ideal: SNR tinggi, resolusi baik, waktu singkat. Mengubah satu parameter selalu memengaruhi yang lain:</p>
<ul>
<li>NEX naik: SNR naik, TA naik.</li>
<li>Ketebalan irisan naik: SNR naik, resolusi irisan turun, partial voluming naik.</li>
<li>Bandwidth turun: SNR naik, tetapi pergeseran kimia dan TE minimum naik.</li>
<li>TR naik: SNR dan jumlah irisan naik (sampai pemulihan penuh), kontras T1 turun, TA naik.</li>
<li>TE naik: kontras T2 naik, SNR turun.</li>
<li>Koil besar: area sinyal luas tetapi SNR lebih rendah; koil kecil: SNR tinggi, area terbatas.</li>
</ul>
<p class="lembut">Sumber: Westbrook, Tabel 7.6. Dari M04: menaikkan SNR lewat NEX memperpanjang TA dan hasilnya hanya naik sebesar akar. Parallel imaging dan partial Fourier memangkas waktu dengan harga SNR (lihat T3.2).</p>`,
 analogi:`Seperti selimut sempit: ditarik menutupi kaki (SNR), terbuka bahu (resolusi). Tugas radiografer memilih bagian mana yang harus tertutup.`
});
