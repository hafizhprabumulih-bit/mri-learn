/* Dijalankan terakhir di tiap halaman. Memerlukan MATERI, SOAL, TINGKAT_KUIS dari js/m07x/ */
renderMateri('materi',MATERI);
isiNilai();
renderAktivitas('aktivitas');
kuisBertingkat($('kuis'),SOAL,TINGKAT_KUIS);
