/* Data bersama M07A/B/C. Blok TETAP dari template; tambahan baru ada di data-tambahan.js */
/* TETAP: awal */
// Konfigurasi dasar modul
const DATA={
 SN:{tubuh:2,bag:[2,10],kep:3.2,lk:10,lb:10,le:20,naik:0.5,maks:39}, // mode normal (Tabel 10.1)
 ST:{tubuh:4,bag:[4,10],kep:3.2,lk:20,lb:20,le:40,naik:1,maks:40}, // mode tingkat satu
 SX:{mnt:6,fak:2,orb:1,fert:6,testis:3.5},
 RF:{c:299.79,nm:10,l1:7,f15:63.87,l15:4.69,kawat:80,lbd:58,dip:29,eps:{u:1,a:81,d:67}},
 IMP:{k:13},
 STIM:{n:80,m:100,r:120,a:300,j:900,sl:200}, // persen ambang saraf tepi; slew maksimum tipikal (T/m/s)
 BIS:{ref:85,mnt:480,tkr:3,m15:100,m3:115,ic:80,gg:75,ny:140,tabel:[['Tembakan atau ledakan',170],['Mesin pesawat jet (lepas landas)',140],['Konser rock (barisan depan)',125],['Bore MRI 3 T (echo-planar)',115],['Klub malam (lantai dansa)',110],['Bore MRI 1,5 T, kabin pesawat, orkestra',100],['Pemutar MP3 volume tinggi',95],['Mesin motor',90],['Mobil',70],['Percakapan normal',60],['Bisikan',20],['Napas',10]]},
 KR:{k:4,o:21,lo:19.5,hi:23.5,s:8,f:6,dt:10,m1:2,m2:4,e:754,L:1600,j:8},
 PSIKO:{sedasi_persen:14.3,ct_persen:42,mri_persen:12,penurunan_kali:3},
 ZONA:{cadangan_jam:24,pelatihan_bulan:12,uji_T:1},
 EFEK:{bumi_mT:0.05,rasa_logam_T:[3,7],vertigo_T:7,icnirp_T:8,pulih_menit:15},
 KONTUR:[[1.5,3],[2.3,1],[3,0.5],[3.6,0.3],[5,0.1]], // TODO-VERIFIKASI: dibaca kasar dari Gambar 10.3 (jarak dari isosenter dalam m, medan dalam mT), bergantung model
 FISIKA:{gamma:42.58,larmor_MHz:{1.5:63.87,3:127.74}},
 KESELAMATAN:{sar_tubuh_W_per_kg:{normal:2,tingkat1:4},sar_kepala_normal_W_per_kg:3.2,garis_gauss_mT:{standar:0.5,alternatif:0.9}}
};
/* TETAP: akhir */
