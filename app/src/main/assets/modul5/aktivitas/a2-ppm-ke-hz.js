/* A2: Kalkulator konversi ppm ke Hz. Menjelaskan T2.4. Mode pergeseran kimia dipakai juga oleh M06B A6 dan M08A A7. */
daftarAktivitas({
 id:'A2', judul:'Kalkulator konversi ppm ke Hz', menjelaskan:['T2.4'],
 html:`
<p class="lembut">Rumus: selisih frekuensi (Hz) = frekuensi Larmor (MHz) x ppm. Pilih inti, kuat medan, dan jenis nilai ppm.</p>
<div class="pilih" id="a2-mode" role="group" aria-label="Jenis nilai ppm">
<button type="button" data-k="inhom" aria-pressed="true">Ketidakhomogenan B0</button>
<button type="button" data-k="kimia" aria-pressed="false">Pergeseran kimia</button>
</div>
<label for="a2-inti">Inti</label>
<select id="a2-inti"></select>
<label for="a2-b0">Medan</label>
<select id="a2-b0"><option value="0.5">0,5 T</option><option value="1.5" selected>1,5 T</option><option value="3">3 T</option><option value="7">7 T</option></select>
<label for="a2-ppm"><span id="a2-nama">Ketidakhomogenan</span>: <span id="a2-ppmv"></span> ppm</label>
<input type="range" id="a2-ppm" min="0" max="10" step="0.1" value="1">
<p class="m5-out" id="a2-hz"></p>
<p>Status: <span id="a2-st" class="lencana ok"></span></p>
<div class="baris"><button type="button" id="a2-reset">Reset</button><button type="button" id="a2-lemak">Setel pergeseran lemak-air (3,5 ppm)</button></div>
<p id="a2-ket" role="status" aria-live="polite" class="lembut"></p>`,
 mulai(){
  const s=$('a2-inti'); Object.keys(DATA.FISIKA.INTI).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=DATA.FISIKA.INTI[k].nama;s.appendChild(o);});
  let mode='inhom';
  function hitung(){
   const g=DATA.FISIKA.INTI[s.value].gamma, b=+$('a2-b0').value, p=+$('a2-ppm').value, f0=g*b, hz=f0*p;
   $('a2-ppmv').textContent=koma(p,1);
   $('a2-hz').textContent=koma(p,1)+' ppm = '+koma(hz,0)+' Hz (Larmor '+koma(f0,2)+' MHz)';
   const lemak=f0*DATA.FISIKA.geser_kimia_lemak_air_ppm;
   $('a2-lemak').hidden=!(mode==='kimia'&&s.value==='1H');
   if(s.value==='1H'){
    const r=hz/lemak*100;
    $('a2-st').textContent=mode==='inhom'?(p<=1?'Sangat homogen':p<=3.5?'Sedang':'Ketidakhomogenan besar'):(Math.abs(p-3.5)<0.05?'Setara pergeseran lemak-air':p<3.5?'Lebih kecil dari lemak-air':'Lebih besar dari lemak-air');
    $('a2-ket').textContent='Jarak puncak lemak-air pada medan ini sekitar '+koma(lemak,0)+' Hz. Nilai ini sama dengan '+koma(r,0)+'% dari jarak itu.';
   } else {
    $('a2-st').textContent='Frekuensi Larmor inti ini lebih rendah';
    $('a2-ket').textContent='Prinsip sama: Hz = frekuensi Larmor (MHz) x ppm. Nilai gamma dibulatkan.';
   }
  }
  grup('a2-mode',k=>{mode=k;$('a2-nama').textContent=k==='inhom'?'Ketidakhomogenan':'Pergeseran kimia';$('a2-ppm').value=k==='inhom'?1:3.5;hitung();});
  ['a2-inti','a2-b0','a2-ppm'].forEach(id=>$(id).oninput=hitung);
  $('a2-lemak').onclick=()=>{$('a2-ppm').value=3.5;hitung();};
  $('a2-reset').onclick=()=>{s.value='1H';$('a2-b0').value='1.5';$('a2-ppm').value=mode==='inhom'?1:3.5;hitung();};
  hitung();
 }
});
