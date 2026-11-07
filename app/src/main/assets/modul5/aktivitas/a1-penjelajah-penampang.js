/* A1: Penjelajahan diagram penampang. Menjelaskan T1.1, T1.2. Mode: Jelajah dan Uji (ketuk label lalu ketuk lapisan). */
const LAPISAN_A1=[
 {n:'Ruang berpelindung RF',tugas:'Menahan gelombang radio dari luar dan menjaga sinyal pasien tidak keluar.',fisika:'Sangkar Faraday yang menyatu dengan dinding ruang (Zona IV).'},
 {n:'Magnet utama',tugas:'Menghasilkan B0 yang kuat, stabil, dan homogen.',fisika:'Kriostat berisi kumparan superkonduktor dalam helium cair 4,2 K.'},
 {n:'Gradient coil',tugas:'Menambah medan yang berubah linear di sumbu X, Y, Z untuk mengode posisi.',fisika:'Tiga set kumparan; penyebab bunyi bising saat dipindai.'},
 {n:'RF coil',tugas:'Memancarkan pulsa RF dan menerima sinyal dari proton.',fisika:'Koil volume (body, kepala) atau koil permukaan; frekuensi sama dengan frekuensi Larmor.'},
 {n:'Bore dan meja pasien',tugas:'Ruang periksa 60 sampai 70 cm; meja menggeser pasien ke isosenter.',fisika:'Isosenter: titik medan paling homogen, tempat area yang diperiksa diletakkan.'}
];
daftarAktivitas({
 id:'A1', judul:'Penjelajahan diagram penampang', menjelaskan:['T1.1','T1.2'],
 html:`
<p class="lembut">Mode Jelajah: ketuk satu lapisan pada diagram atau tombol di bawahnya. Mode Uji: ketuk satu label, lalu ketuk lapisan yang cocok. Pilihan berlaku untuk kedua potongan.</p>
<div class="pilih" id="a1-mode" role="group" aria-label="Pilih mode">
<button type="button" data-k="jelajah" aria-pressed="true">Jelajah</button>
<button type="button" data-k="uji" aria-pressed="false">Uji</button>
</div>
<div class="pilih" role="group" aria-label="Pilih arah potongan">
<button type="button" id="m5-v-long" aria-pressed="true">Potongan membujur</button>
<button type="button" id="m5-v-ax" aria-pressed="false">Potongan aksial</button>
</div>
<div class="m5-stage" id="m5-view-long">${SVG_A1_MEMBUJUR}</div>
<div class="m5-stage" id="m5-view-ax" hidden>${SVG_A1_AKSIAL}</div>
<p class="lembut">Diagram skematis dan tidak berskala.</p>
<div id="a1-jel">
<div class="pilih" id="m5-chips" role="group" aria-label="Pilih lapisan dari luar ke dalam"></div>
<p>Status: <span id="m5-status" class="lencana">Belum ada lapisan dipilih</span></p>
<div class="meter" aria-hidden="true"><i id="m5-prog"></i></div>
<div id="m5-panel"><p class="lembut">Pilih satu lapisan untuk melihat tugas dan fisikanya.</p></div>
<div class="baris">
<button type="button" id="m5-prev">&larr; Sebelumnya</button>
<button type="button" id="m5-next">Berikutnya &rarr;</button>
<button type="button" id="m5-reset">Reset</button>
</div>
</div>
<div id="a1-uji" hidden>
<div class="pilih" id="a1-label" role="group" aria-label="Label lapisan"></div>
<p>Benar: <b id="a1-skor">0</b> / 5 <button type="button" id="a1-ulang">Ulangi uji</button></p>
</div>
<p id="m5-pesan" role="status" aria-live="polite" class="lembut">Tur berurutan dari luar ke dalam. Tombol Escape menutup panel.</p>`,
 mulai(){
  const els=[...document.querySelectorAll('#A1 .m5-p')];
  const stL=$('m5-view-long'), stA=$('m5-view-ax');
  let aktif=-1, mode='jelajah', label=-1, benar=new Set();
  const chips=$('m5-chips');
  LAPISAN_A1.forEach((l,i)=>{const b=document.createElement('button');b.type='button';b.textContent=(i+1)+'. '+l.n;b.setAttribute('aria-pressed','false');b.onclick=()=>klik(i);chips.appendChild(b);});
  function tanda(i,on){els.forEach(e=>{const m=+e.dataset.m5I===i;if(m){e.classList.toggle('on',on);e.setAttribute('aria-pressed',on);}});}
  function pilih(i){
   aktif=i; els.forEach(e=>{const on=+e.dataset.m5I===i;e.classList.toggle('on',on);e.setAttribute('aria-pressed',on);});
   [...chips.children].forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
   $('m5-prog').style.width=(i<0?0:(i+1)*20)+'%';
   $('m5-status').textContent=i<0?'Belum ada lapisan dipilih':'Lapisan '+(i+1)+' dari 5: '+LAPISAN_A1[i].n;
   $('m5-panel').innerHTML=i<0?'<p class="lembut">Pilih satu lapisan untuk melihat tugas dan fisikanya.</p>':'<p><b>'+LAPISAN_A1[i].n+'</b></p><p><b>Tugas:</b> '+LAPISAN_A1[i].tugas+'</p><p><b>Fisika:</b> '+LAPISAN_A1[i].fisika+'</p>';
  }
  function klik(i){ if(mode==='uji') return uji(i); pilih(i); }
  function uji(i){
   const p=$('m5-pesan');
   if(label<0){p.textContent='Pilih satu label dulu, lalu ketuk lapisan pada diagram.';return;}
   if(benar.has(i)){p.textContent='Lapisan itu sudah terisi.';return;}
   if(label===i){benar.add(i);tanda(i,true);const bt=[...$('a1-label').children].find(x=>+x.dataset.i===i);bt.disabled=true;bt.setAttribute('aria-pressed','false');label=-1;
    p.textContent=benar.size===5?'Selesai! Semua lapisan benar.':'Benar. Lanjutkan dengan label berikutnya.';}
   else p.textContent='Belum tepat. Pikirkan lagi tugas label itu, lalu coba lapisan lain.';
   $('a1-skor').textContent=benar.size;
  }
  function siapUji(){
   benar=new Set();label=-1;els.forEach(e=>{e.classList.remove('on');e.setAttribute('aria-pressed','false');});
   const w=$('a1-label'); w.innerHTML='';
   acak(LAPISAN_A1.map((l,i)=>i)).forEach(i=>{const b=document.createElement('button');b.type='button';b.className='pilihan-uji';b.textContent=LAPISAN_A1[i].n;b.setAttribute('aria-pressed','false');
    b.onclick=()=>{label=i;[...w.children].forEach(x=>x.setAttribute('aria-pressed',x===b));$('m5-pesan').textContent='Label dipilih. Ketuk lapisan pada diagram.';};
    b.dataset.i=i;w.appendChild(b);});
   $('a1-skor').textContent=0;
  }
  els.forEach(e=>{
   e.addEventListener('click',()=>klik(+e.dataset.m5I));
   e.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();klik(+e.dataset.m5I);}});
  });
  grup('a1-mode',k=>{
   mode=k; const uj=k==='uji';
   stL.classList.toggle('uji',uj); stA.classList.toggle('uji',uj);
   $('a1-jel').hidden=uj; $('a1-uji').hidden=!uj;
   if(uj){siapUji();$('m5-pesan').textContent='Mode Uji: ketuk satu label, lalu ketuk lapisan yang cocok.';}
   else{els.forEach(e=>{e.classList.remove('on');e.setAttribute('aria-pressed','false');});pilih(-1);$('m5-pesan').textContent='Tur berurutan dari luar ke dalam. Tombol Escape menutup panel.';}
  });
  $('a1-ulang').onclick=siapUji;
  $('m5-v-long').onclick=()=>{stL.hidden=false;stA.hidden=true;$('m5-v-long').setAttribute('aria-pressed','true');$('m5-v-ax').setAttribute('aria-pressed','false');};
  $('m5-v-ax').onclick=()=>{stL.hidden=true;stA.hidden=false;$('m5-v-long').setAttribute('aria-pressed','false');$('m5-v-ax').setAttribute('aria-pressed','true');};
  $('m5-prev').onclick=()=>pilih(Math.max(aktif-1,0));
  $('m5-next').onclick=()=>pilih(Math.min(aktif+1,4));
  $('m5-reset').onclick=()=>pilih(-1);
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&mode==='jelajah')pilih(-1);});
  pilih(-1);
 }
});
