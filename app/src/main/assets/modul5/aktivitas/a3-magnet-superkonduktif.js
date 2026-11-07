/* A3: Magnet superkonduktif. Menjelaskan T2.1, T2.2, T2.3. Mode 1: suhu vs hambatan (usulan). Mode 2: ramping dan saklar persisten. */
daftarAktivitas({
 id:'A3', judul:'Magnet superkonduktif', menjelaskan:['T2.1','T2.2','T2.3'],
 html:`
<div class="pilih" id="a3-mode" role="group" aria-label="Pilih mode">
<button type="button" data-k="m1" aria-pressed="true">Mode 1: suhu dan hambatan kawat</button>
<button type="button" data-k="m2" aria-pressed="false">Mode 2: ramping dan saklar persisten</button>
</div>

<div id="a3-m1">
<p class="lembut">Geser suhu kawat. Kurva ilustratif, tidak berskala (hambatan relatif terhadap suhu ruang).</p>
<label for="a3-t">Suhu: <b id="a3-tv"></b> K</label>
<input type="range" id="a3-t" min="0" max="300" step="0.1" value="293">
<div class="pilih" id="a3-pre"><button type="button" data-k="293">Suhu ruang (293 K)</button><button type="button" data-k="77">Nitrogen cair (77 K)</button><button type="button" data-k="4.2">Helium cair (4,2 K)</button></div>
<svg id="a3-g" class="grafik" viewBox="0 0 400 200" role="img" aria-label="Grafik hambatan terhadap suhu untuk logam biasa dan kawat superkonduktor"></svg>
<p class="m5-out" id="a3-o"></p>
<p class="lembut" id="a3-k"></p>
</div>

<div id="a3-m2" hidden>
<p class="lembut">Pilih tahap lalu amati jalur arus (garis putus-putus) pada rangkaian paralel dan kurva arus terhadap waktu.</p>
<div class="pilih" id="rp-b" role="group" aria-label="Pilih tahap ramping">
<button type="button" data-k="up" aria-pressed="true">Ramping up</button>
<button type="button" data-k="per" aria-pressed="false">Persisten</button>
<button type="button" data-k="down" aria-pressed="false">Ramping down</button>
</div>
<label for="rp-tg">Arus target ramping up: <b id="rp-tgv"></b>%</label>
<input type="range" id="rp-tg" min="20" max="100" step="5" value="100">
${SVG_A3_RAMPING}
<p id="rp-t" role="status" aria-live="polite"></p>
<svg id="rp-g" class="grafik" viewBox="0 0 400 140" role="img" aria-label="Kurva arus solenoid terhadap waktu"></svg>
<p class="m5-out" id="rp-i"></p>
<div class="baris"><button type="button" id="rp-reset">Reset arus ke nol</button></div>
</div>`,
 mulai(){
  grup('a3-mode',k=>{$('a3-m1').hidden=k!=='m1';$('a3-m2').hidden=k!=='m2';});
  /* ---------- Mode 1 ---------- */
  const TC=DATA.INSTRUMEN.Tc_NbTi_K, NS='http://www.w3.org/2000/svg';
  const X=T=>40+T/300*340, Y=r=>170-r*140;
  const rN=T=>0.04+0.96*T/300, rS=T=>T<=TC?0:rN(T);
  function garis(fn,warna,ket){let d='';for(let T=0;T<=300;T+=3){d+=(d?'L':'M')+X(T)+' '+Y(fn(T));}return '<path class="kv" stroke="'+warna+'" d="'+d+'"><title>'+ket+'</title></path>';}
  function gambar(){
   const T=+$('a3-t').value;
   $('a3-g').innerHTML='<line class="sb" x1="40" y1="170" x2="385" y2="170"/><line class="sb" x1="40" y1="20" x2="40" y2="170"/>'
    +garis(rN,'var(--lembut)','Logam biasa')+garis(rS,'var(--aksen)','Niobium-titanium')
    +'<line x1="'+X(T)+'" y1="20" x2="'+X(T)+'" y2="170" stroke="var(--salah)" stroke-dasharray="4 3"/>'
    +'<text x="44" y="14">Hambatan relatif</text><text x="300" y="192">Suhu (K)</text>'
    +'<text x="'+(X(TC)+30)+'" y="162">suhu transisi NbTi sekitar '+TC+' K</text>'
    +'<text x="200" y="40">abu-abu: logam biasa; biru: NbTi (sama di atas suhu transisi)</text>';
   $('a3-tv').textContent=koma(T,1);
   const sk=T<=TC;
   $('a3-o').textContent=sk?'Hambatan kawat NbTi = 0 (superkonduktif)':'Kawat NbTi punya hambatan (belum superkonduktif)';
   $('a3-k').textContent=sk?'Di bawah suhu transisi, arus mengalir tanpa kehilangan energi. Helium cair (4,2 K) berada di bawah suhu transisi.':(T<=100?'Dingin, tetapi masih di atas suhu transisi: hambatan masih ada. Nitrogen cair belum cukup untuk NbTi.':'Suhu tinggi: hambatan besar, arus besar akan menjadi panas.');
  }
  $('a3-t').oninput=gambar;
  $('a3-pre').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('a3-t').value=b.dataset.k;gambar();});
  gambar();
  /* ---------- Mode 2 ---------- */
  const ST={up:{ps:true,sw:'resistif (pemanas ON)',t:'Ramping up: pemanas ON membuat saklar resistif, sehingga arus dari catu daya mengalir ke solenoid dan dinaikkan bertahap sampai target.'},
            per:{ps:false,sw:'superkonduktor (pemanas OFF)',t:'Persisten: pemanas OFF, saklar menjadi superkonduktor dan membentuk lingkaran tertutup dengan solenoid. Catu daya dilepas; arus bertahan.'},
            down:{ps:true,sw:'resistif (pemanas ON)',t:'Ramping down: catu daya disambungkan lagi, pemanas ON, arus diturunkan bertahap. Energi dibuang sebagai panas pada resistor dump.'}};
  let tahap='up', I=0, riw=[];
  function tampilRangkaian(){
   const s=ST[tahap];
   $('rp-ps').setAttribute('fill',s.ps?'var(--aksen)':'var(--lembut)');
   $('rp-pst').textContent='Catu daya: '+(s.ps?'ON':'OFF');
   $('rp-sw').setAttribute('fill',tahap==='per'?'var(--benar)':'var(--t1)');
   $('rp-swt').textContent='Saklar: '+s.sw;
   ['up','per','down'].forEach(k=>$('rp-'+k).classList.toggle('on',k===tahap));
   $('rp-t').textContent=s.t;
  }
  function grafik(){
   const n=riw.length; let d='';
   riw.forEach((v,i)=>{d+=(i?'L':'M')+(30+i/150*360)+' '+(120-v/100*100);});
   $('rp-g').innerHTML='<line class="sb" x1="30" y1="120" x2="395" y2="120"/><line class="sb" x1="30" y1="10" x2="30" y2="120"/>'
    +'<text x="34" y="14">Arus solenoid (%)</text><text x="340" y="136">Waktu</text>'
    +(n?'<path class="kv" stroke="var(--b0)" d="'+d+'"/>':'');
   $('rp-i').textContent='Arus: '+koma(I,0)+'% | Medan B0 sekitar '+koma(I/100*1.5,2)+' T (contoh pesawat 1,5 T)';
  }
  function tik(){
   const tg=+$('rp-tg').value;
   if(tahap==='up'){I=I<tg?Math.min(I+1.5,tg):Math.max(I-1.5,tg);}
   else if(tahap==='down'){I=Math.max(I-1.5,0);}
   riw.push(I); if(riw.length>150) riw.shift(); grafik();
  }
  grup('rp-b',k=>{tahap=k;tampilRangkaian();});
  $('rp-tg').oninput=()=>{$('rp-tgv').textContent=$('rp-tg').value;};
  $('rp-reset').onclick=()=>{I=0;riw=[];tahap='up';[...$('rp-b').children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k==='up'));tampilRangkaian();grafik();};
  $('rp-tgv').textContent=$('rp-tg').value;
  tampilRangkaian(); grafik();
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(tik,120); else setInterval(tik,400);
 }
});
