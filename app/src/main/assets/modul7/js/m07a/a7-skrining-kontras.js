/* A7 · Alur skrining sebelum agen kontras (fungsi ginjal, kehamilan, alergi)   [BARU]
   Menjelaskan: T2.6. Latihan konsep, bukan SOP. */
daftarAktivitas('A7',{
 judul:'Alur skrining sebelum agen kontras',
 menjelaskan:['T2.6'],
 html:`<p class='lembut'>Centang kondisi pasien. Lihat langkah yang perlu dipertimbangkan sebelum kontras gadolinium. Keputusan akhir ada pada radiolog dan dokter perujuk, dan SOP fasilitas selalu didahulukan.</p>
<label><input type='checkbox' id='kt1'> Ada faktor risiko ginjal (usia lanjut, penyakit ginjal, diabetes, hipertensi, dialisis)</label>
<label><input type='checkbox' id='kt2'> eGFR terbaru sudah diperiksa</label>
<label><input type='checkbox' id='kt3'> eGFR sangat rendah (contoh: di bawah ${DATA.KONTRAS.egfr}) atau cedera ginjal akut</label>
<label><input type='checkbox' id='kt4'> Hamil atau mungkin hamil</label>
<label><input type='checkbox' id='kt5'> Pernah mengalami reaksi alergi pada kontras</label>
<svg id='ktsvg' viewBox='0 0 600 100' role='img' aria-label='Empat kotak status skrining kontras'></svg>
<p class='hasil' id='ktk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='ktr'>Reset</button></div>`,
 mulai(root){
  const WS={ok:'var(--benar)',awas:'var(--t1)',no:'var(--salah)'};
  const c=i=>$('kt'+i).checked;
  function gambarKontras(){
   const risiko=c(1),cek=c(2),rendah=c(3),hamil=c(4),alergi=c(5);
   const gin=rendah?['no','Konsul radiolog','eGFR sangat rendah atau cedera ginjal akut: ada risiko NSF. Radiolog menimbang MRI tanpa kontras atau agen dengan risiko terendah.']
    :(risiko&&!cek?['awas','Periksa eGFR','Ada faktor risiko ginjal tetapi eGFR belum diperiksa: periksa dahulu sebelum kontras.']
    :(risiko?['ok','eGFR cukup','Faktor risiko ada, eGFR sudah diperiksa dan tidak sangat rendah: lanjut sesuai SOP.']
    :['ok','Skrining singkat','Tanpa faktor risiko ginjal: skrining singkat sesuai SOP.']));
   const keh=hamil?['no','Tinjau manfaat-risiko','Gadolinium melewati plasenta: kontras dihindari kecuali manfaatnya jelas lebih besar. Keputusan ada pada radiolog dan dokter perujuk.']
    :['ok','Tanyakan status','Tanyakan status kehamilan secara lisan dan tertulis pada pasien usia subur.'];
   const al=alergi?['awas','Tinjau riwayat','Riwayat reaksi alergi menaikkan peluang reaksi ulang: beri tahu radiolog dan siapkan penanganan reaksi sesuai SOP.']
    :['ok','Tanyakan riwayat','Tanyakan riwayat alergi atau reaksi pada kontras sebelumnya.'];
   const bagian=[gin,keh,al];
   const kes=bagian.some(x=>x[0]==='no')?['no','Tinjau dengan radiolog']:(bagian.some(x=>x[0]==='awas')?['awas','Tahan dahulu']:['ok','Dapat lanjut sesuai SOP']);
   const nama=['Ginjal','Kehamilan','Alergi','Kesimpulan'],semua=bagian.concat([kes]);
   let h='';
   semua.forEach((b,i)=>{const x=6+i*148;h+=`<rect x='${x}' y='6' width='140' height='84' rx='8' fill='${WS[b[0]]}' fill-opacity='.3' stroke='${WS[b[0]]}' stroke-width='${i===3?4:2}'/>`+Tf(x+70,32,nama[i],'var(--teks)','middle',14)+Tf(x+70,60,b[1],'var(--teks)','middle',12);});
   $('ktsvg').innerHTML=h;
   $('ktk').textContent=gin[2]+' '+keh[2]+' '+al[2];
  }
  [1,2,3,4,5].forEach(i=>$('kt'+i).onchange=gambarKontras);
  $('ktr').onclick=()=>{[1,2,3,4,5].forEach(i=>$('kt'+i).checked=false);gambarKontras();};
  gambarKontras();
 }
});
