/* A5: Grafik kuat medan vs SNR dan SAR. Menjelaskan T3.1. Komponen SAR sama dengan M07C A1. */
daftarAktivitas({
 id:'A5', judul:'Grafik kuat medan vs SNR dan SAR', menjelaskan:['T3.1'],
 html:`
<p class="lembut">Geser kuat medan B0 (0,5 sampai 7 T). Nilai relatif terhadap 1,5 T, model ideal.</p>
<label for="fs-r">B0: <b id="fs-v"></b></label>
<input type="range" id="fs-r" min="0.5" max="7" step="0.1" value="1.5">
<div class="pilih" id="fs-p"><button type="button" data-k="0.5">0,5 T</button><button type="button" data-k="1.5">1,5 T</button><button type="button" data-k="3">3 T</button><button type="button" data-k="7">7 T</button></div>
<p id="fs-o" class="m5-out"></p>
<div>SNR relatif (kira-kira linear): <b id="fs-n"></b><div class="bar"><i id="fs-nb"></i></div></div>
<div>SAR relatif (sebanding kuadrat B0): <b id="fs-a"></b><div class="bar sar"><i id="fs-ab"></i></div></div>
<p class="lembut" id="fs-t"></p>`,
 mulai(){
  function hitung(){
   const b=+$('fs-r').value, r=b/1.5, sar=r*r, mx=7/1.5;
   $('fs-v').textContent=koma(b,1)+' T';
   $('fs-o').textContent='Larmor 1H '+koma(DATA.FISIKA.gamma_MHz_per_T*b,2)+' MHz | '+koma(b*10000/0.5,0)+' x medan bumi';
   $('fs-n').textContent=koma(r,2)+' x'; $('fs-nb').style.width=(r/mx*100)+'%';
   $('fs-a').textContent=koma(sar,2)+' x'; $('fs-ab').style.width=(sar/(mx*mx)*100)+'%';
   $('fs-t').textContent=b<1.5?'Medan rendah: SNR lebih kecil, SAR lebih ringan.':b<=1.5?'Titik acuan.':b<=3?'SNR naik kira-kira sebanding medan, SAR naik lebih cepat (kuadrat). Artefak suseptibilitas dan pergeseran kimia (Hz) juga membesar.':'SAR naik tajam; pada medan ini SAR membatasi sekuens, dan T1 makin panjang.';
  }
  $('fs-r').oninput=hitung;
  $('fs-p').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('fs-r').value=b.dataset.k;hitung();});
  hitung();
 }
});
