/* T2.5: Sistem komputer. Aktivitas: . */
daftarMateri({
 id:'T2.5', tingkat:2,
 judul:"Sistem komputer",
 tujuan:"menyebut peran host computer dan PGM.",
 aktivitas:[],
 tautan:["Ringkasan singkat ada di M05 T3.2. Rincian lengkap tetap di sini."],
 singkat:`<p>Opsional di modul ini; materi lengkapnya dipindah ke M05 T3.2.</p><p>Host computer = sutradara (GUI, identitas, PACS). Pulse generator module (PGM) = asisten yang mengendalikan RF dan gradien.</p>`,
 lengkap:`
<p>Host computer (GUI) menghubungkan identitas pasien lewat jaringan ke RIS, menyimpan umur, berat, jenis kelamin, dan orientasi untuk menghitung amplitudo RF dan label gambar. PGM mengirim instruksi waktu, amplitudo, bentuk RF, jendela sampling, serta mengendalikan gradien dan sensor fisiologis. Modul pemroses gambar mempercepat rekonstruksi. Gambar disimpan dalam format DICOM pada server berarray redundan dan diakses lewat PACS.</p>`,
 analogi:`Host computer adalah sutradara; PGM adalah asisten panggung yang menghitung detik demi detik kapan lampu (RF) dan efek (gradien) menyala.`
});
