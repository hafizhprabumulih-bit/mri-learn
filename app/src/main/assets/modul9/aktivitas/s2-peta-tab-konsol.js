/* S2: Peta tab konsol (contoh antarmuka). Menjelaskan T2.4 dan T3.3.
   Data tab ada di bawah (TAB, NM); tabel vendor T3.3 di VENDOR. */
const TAB=[
 ['Routine','Parameter utama yang paling sering diubah.',[['TR','ta snr kon'],['TE','snr kon'],['Flip angle','snr kon'],['FoV','res snr'],['Jumlah irisan &amp; tebal','snr res'],['NEX / averages','ta snr'],['Waktu pindai (TA)','ta']]],
 ['Contrast','Pembobotan gambar.',[['TR','kon ta'],['TE','kon snr'],['Flip angle','kon'],['Saturasi lemak, MTC','kon'],['Inversion time (TI)','kon ta']]],
 ['Resolution','Ukuran matriks dan akselerasi.',[['Matriks dasar (frekuensi)','res'],['Resolusi fase (%)','res ta'],['Interpolasi','res'],['Partial Fourier','ta snr'],['Paralel imaging (iPAT)','ta snr'],['Bandwidth','snr']]],
 ['Geometry','Posisi, orientasi, dan cakupan.',[['FoV &amp; FoV fase (%)','res ta'],['Orientasi, arah fase','res'],['Gap irisan','snr'],['Saturation band','res']]],
 ['System','Koil dan perangkat keras.',[['Pemilihan elemen koil','snr'],['Posisi meja / isocenter','res'],['Shim / penyetelan','kon']]],
 ['Physio','Sinkronisasi fisiologis via PGM.',[['Gating EKG / pulse','res ta'],['Trigger napas','res ta'],['Trigger delay','ta']]],
 ['Inline','Pascapemrosesan otomatis.',[['Subtraksi','kon'],['MIP','kon'],['Peta (mis. ADC)','kon']]],
 ['Sequence','Tipe dan detail sekuens.',[['Tipe sekuens','kon ta'],['Turbo factor / ETL','ta snr'],['Bandwidth &amp; echo spacing','snr res'],['Fase encoding order','res']]]
];
const NM={ta:'waktu',snr:'SNR',res:'resolusi',kon:'kontras'};

const VENDOR_KOL=["Fungsi","Siemens","GE","Philips"];
const VENDOR=[
 ["Rata-rata sinyal","Averages","NEX","NSA"],
 ["Akselerasi paralel","iPAT (mis. GRAPPA)","ASSET / ARC","SENSE"],
 ["Jumlah echo per TR (turbo)","Turbo factor","Echo train length (ETL)","TSE factor"],
 ["Bandwidth","Bandwidth (Hz/piksel)","Receive bandwidth (kHz)","Water-fat shift (piksel)"],
 ["FoV arah fase","FoV phase (%)","Phase FOV","Rectangular FOV (%)"],
 ["Pengurangan langkah fase","Phase partial Fourier","Fractional NEX","Half scan"]
];
daftarAktivitas({
 id:'S2', judul:'Peta tab konsol', menjelaskan:['T2.4','T3.3'],
 html:`
<p class="lembut">Pilih tab untuk melihat parameter yang biasanya ada di sana. Nama dan susunan tab berbeda antar vendor; peta ini contoh antarmuka.</p>
<div class="pilih" id="s2-tabs" role="group" aria-label="Tab konsol"></div>
<div id="s2-isi" role="status" aria-live="polite"></div>
<p class="lembut">Warna chip: <span class="chip ta">waktu</span><span class="chip snr">SNR</span><span class="chip res">resolusi</span><span class="chip kon">kontras</span></p>
<h3>T3.3: Pemetaan nama antar-vendor</h3>
<div class="gulir" id="s2-vendor"></div>
<p class="lembut">Nama dapat berubah antar versi perangkat lunak; cocokkan dengan manual unit Anda.</p>`,
 mulai(){
  const tb=document.getElementById('s2-tabs'),ti=document.getElementById('s2-isi');
  function pilihTab(j){
   tb.querySelectorAll('button').forEach((x,i)=>x.setAttribute('aria-pressed',i===j));
   const [n,d,ps]=TAB[j];
   ti.innerHTML='<div class="kartu konsol" style="animation:masuk .3s ease"><b>'+n+'</b> &mdash; '+d+'<ul>'+ps.map(([p,c])=>'<li>'+p+' '+c.split(' ').map(x=>'<span class="chip '+x+'">'+NM[x]+'</span>').join('')+'</li>').join('')+'</ul></div>';
  }
  TAB.forEach((t,j)=>{const b=document.createElement('button');b.type='button';b.textContent=t[0];b.onclick=()=>pilihTab(j);tb.appendChild(b);});
  pilihTab(0);


  $('s2-vendor').innerHTML='<table class="tabel"><thead><tr>'+VENDOR_KOL.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+VENDOR.map(r=>'<tr>'+r.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
 }
});
