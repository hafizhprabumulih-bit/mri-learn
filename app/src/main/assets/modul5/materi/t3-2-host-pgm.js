/* T3.2: Host computer dan pulse generator module (PGM). Opsional; dipindahkan dari M09 T2.5. */
daftarMateri({
 id:'T3.2', tingkat:3,
 judul:'Host computer dan pulse generator module (PGM)',
 opsional:true,
 tujuan:'menyebut peran host computer dan PGM di sisi pengendali pesawat.',
 tautan:['Rincian lebih lanjut: M09 T2.5.'],
 singkat:`<p>Host computer menerima perintah operator; PGM mengatur waktu pulsa RF dan gradien sesuai sekuens.</p>`,
 lengkap:`
<p><b>Host computer</b> adalah antarmuka operator: protokol dan parameter pemindaian dipilih di sini, lalu dikirim ke sistem pengendali.</p>
<p><b>Pulse generator module (PGM)</b> mengatur waktu (timing) pulsa RF dan gradien sesuai sekuens yang dipilih. Rincian pembagian tugas tiap perangkat berbeda antarpabrikan dan dibahas di M09 T2.5.</p>`,
 analogi:`Host computer seperti dirigen yang menerima partitur dari operator; PGM seperti metronom yang menjaga ketepatan waktu tiap pemain.`
});
