/* DATA bersama semua modul (dari bagian TETAP). Ubah angka rujukan di sini. */
// Konfigurasi dasar modul
const DATA={
 FISIKA:{gamma_MHz_per_T:42.58,larmor_MHz:{1.5:63.87,3:127.74},geser_kimia_lemak_air_ppm:3.5},
 JARINGAN:[
  {id:'csf',nama:'Cairan serebrospinal',T1_ms:2400,T2_ms:180,PD:1.00},
  {id:'gm',nama:'Substansia grisea',T1_ms:925,T2_ms:100,PD:0.86},
  {id:'wm',nama:'Substansia alba',T1_ms:790,T2_ms:92,PD:0.77},
  {id:'fat',nama:'Lemak',T1_ms:260,T2_ms:85,PD:1.00},
  {id:'muscle',nama:'Otot',T1_ms:875,T2_ms:47},
  {id:'kidney',nama:'Ginjal',T1_ms:650,T2_ms:58},
  {id:'liver',nama:'Hati',T1_ms:500,T2_ms:43}],
 SKALA_B0:{1.5:{T1:1,T2:1},3:{T1:1.17,T2:0.9}},
 INSTRUMEN:{suhu_K:4.2,gradien_mT_per_m:[20,80],slew_T_per_m_per_s:[100,200],bore_cm:[60,70]},
 KESELAMATAN:{sar_tubuh_W_per_kg:{normal:2,tingkat1:4},sar_kepala_normal_W_per_kg:3.2,garis_gauss_mT:{standar:0.5,alternatif:0.9}}
};

