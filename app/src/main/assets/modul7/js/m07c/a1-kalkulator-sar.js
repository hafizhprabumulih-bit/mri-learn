/* A1 · Kalkulator SAR
   Menjelaskan: T2.2, T2.3, T3.1, T3.3, T3.4   [← M07 #3 + #16 + #17] */
daftarAktivitas('A1',{
 judul:'Kalkulator SAR',menjelaskan:["T2.2", "T2.3", "T3.1", "T3.3", "T3.4"],mode:[["mode", "Kalkulator mode SAR"], ["batas", "Pemeriksa batas (Tabel 10.1)"], ["turun", "Menurunkan SAR"]],
 html:`<div data-panel='mode'>
<p class='lembut'>Masukkan SAR awal, lalu ubah B0 atau sudut flip. SAR baru = SAR awal x (B0 baru / B0 awal) kuadrat x (skala sudut flip) kuadrat. Alat ini hanya latihan.</p>
<label for='kbag'>Bagian</label><select id='kbag'><option value='tubuh'>Seluruh tubuh</option><option value='kepala'>Kepala</option></select>
<label for='kmode'>Mode operasi</label><select id='kmode'><option value='normal'>Normal</option><option value='tingkat1'>Tingkat satu</option></select>
<label for='kb0a'>B0 awal</label><select id='kb0a'></select>
<label for='kb0b'>B0 baru</label><select id='kb0b'></select>
<label for='ksar'>SAR awal (W/kg)</label><input type='number' id='ksar' min='0' step='0.1'>
<label for='kfl'>Skala sudut flip: <span id='kfv'></span></label><input type='range' id='kfl' min='0.5' max='1.5' step='0.1' value='1'>
<p class='hasil' id='khasil' role='status' aria-live='polite'></p>
<div class='meter' aria-hidden='true'><i id='kmeter'></i></div>
<p>Status: <span id='kbadge' class='lencana'></span></p>
<div class='baris'><button type='button' id='kr'>Reset</button></div>
</div>
<div data-panel='batas'>
<p class='lembut'>Pilih mode dan wilayah, lalu isi SAR rata-rata dan SAR puncak. Ini latihan konsep.</p>
<label for='sxm'>Mode operasi</label><select id='sxm'><option value='n'>Normal</option><option value='t'>Tingkat satu</option></select>
<label for='sxw'>Wilayah dan jenis koil</label><select id='sxw'></select>
<label for='sxa'>SAR rata-rata 6 menit (W/kg)</label><input type='number' id='sxa' min='0' step='0.1'>
<label for='sxp'>SAR puncak 10 detik (W/kg)</label><input type='number' id='sxp' min='0' step='0.1'>
<p class='hasil' id='sxk' role='status' aria-live='polite'></p>
<div class='meter' aria-hidden='true'><i id='sxmt'></i></div>
<p>Status: <span id='sxb' class='lencana'></span></p>
<p class='lembut' id='sxs'></p>
<div class='baris'><button type='button' id='sxr'>Reset</button></div>
</div>
<div data-panel='turun'>
<p class='lembut'>Ubah parameter. SAR relatif dihitung dari hubungan di materi (kuadrat B0 dan sudut flip, kebalikan TR, sebanding dengan jumlah irisan). Gambaran sederhana: energi dianggap berasal dari pulsa refokus.</p>
<div class='pilih' id='srb0' role='group' aria-label='Pilih B0'></div>
<label for='srt'>Skala TR: <span id='srtv'></span></label><input type='range' id='srt' min='1' max='2' step='0.1' value='1'>
<label for='sri'>Skala jumlah irisan: <span id='sriv'></span></label><input type='range' id='sri' min='0.5' max='1' step='0.1' value='1'>
<label for='srf'>Skala sudut flip refokus: <span id='srfv'></span></label><input type='range' id='srf' min='0.5' max='1' step='0.1' value='1'>
<div class='meter' aria-hidden='true'><i id='srm'></i></div>
<p class='hasil' id='srk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='srr'>Reset</button></div>
</div>
`,
 mulai(root){
/* --- dari aktivitas asli #3 --- */
const B0S=Object.keys(DATA.FISIKA.larmor_MHz).sort((a,b)=>a-b);
['kb0a','kb0b'].forEach(id=>B0S.forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=fmt(+k,k==='3'?0:1)+' T';$(id).appendChild(o);}));
function hitungSAR(){
 const bag=$('kbag').value,mode=$('kmode').value,fl=+$('kfl').value;
 const batas=bag==='tubuh'?K.sar_tubuh_W_per_kg[mode]:(mode==='normal'?K.sar_kepala_normal_W_per_kg:null);
 $('kfv').textContent='x'+fmt(fl,1);
 if(batas===null){$('khasil').textContent='Batas kepala pada mode tingkat satu tidak ada di data modul ini.';$('kbadge').textContent='tanpa data';$('kbadge').className='lencana';$('kmeter').style.width='0';return;} // TODO-VERIFIKASI: batas kepala mode tingkat satu
 const awal=+$('ksar').value||0,baru=awal*Math.pow(+$('kb0b').value/+$('kb0a').value,2)*fl*fl,p=baru/batas*100,ok=p<=100;
 $('khasil').textContent='SAR menjadi sekitar '+fmt(baru,2)+' W/kg. Batas mode '+(mode==='normal'?'normal':'tingkat satu')+': '+fmt(batas,1)+' W/kg. Terpakai '+fmt(p,0)+' persen.';
 $('kmeter').style.width=Math.min(p,100)+'%';
 $('kbadge').textContent=ok?'di bawah batas':'melewati batas';$('kbadge').className='lencana '+(ok?'ok':'no');
}
['kbag','kmode','kb0a','kb0b','ksar','kfl'].forEach(id=>{$(id).addEventListener('input',hitungSAR);$(id).addEventListener('change',hitungSAR);});
$('kr').onclick=()=>{$('kbag').value='tubuh';$('kmode').value='normal';$('kb0a').value=B0S[0];$('kb0b').value=B0S[0];$('ksar').value=NIL.sn/2;$('kfl').value=1;hitungSAR();};
$('kr').onclick();
/* --- dari aktivitas asli #16 --- */
const g1=x=>fmt(x,Number.isInteger(x)?0:1);
const SXW=[['tubuh','Seluruh tubuh (koil transmit volume)'],['bag','Bagian tubuh terpapar (koil volume, rentang)'],['kep','Kepala (koil transmit volume)'],['lk','Koil transmit lokal: kepala'],['lb','Koil transmit lokal: badan'],['le','Koil transmit lokal: ekstremitas']];
SXW.forEach(a=>{const o=document.createElement('option');o.value=a[0];o.textContent=a[1];$('sxw').appendChild(o);});
function hitungSX(){
 const d=$('sxm').value==='n'?DATA.SN:DATA.ST,k=$('sxw').value,v=d[k],ar=Array.isArray(v),lo=ar?v[0]:v,hi=ar?v[1]:v,F=DATA.SX.fak;
 const a=+$('sxa').value||0,pk=+$('sxp').value||0,bad=a>hi||pk>F*hi,mid=!bad&&(a>lo||pk>F*lo);
 const L=x=>ar?g1(x*lo)+' sampai '+g1(x*hi):g1(x*lo);
 $('sxk').textContent='Batas rata-rata '+DATA.SX.mnt+' menit: '+L(1)+' W/kg. Batas 10 detik: '+DATA.SX.fak+' kali nilai itu ('+L(F)+' W/kg).'+(ar&&mid?' Nilai Anda berada di dalam rentang: batas tepatnya bergantung pada bagian tubuh yang terpapar.':'');
 $('sxmt').style.width=Math.min(a/hi*100,100)+'%';
 $('sxb').textContent=bad?'melewati batas':(mid?'bergantung bagian tubuh':'di bawah batas');$('sxb').className='lencana'+(bad?' no':(mid?'':' ok'));
 $('sxs').textContent='Suhu inti pada mode ini naik paling banyak '+g1(d.naik)+' °C dan suhu tubuh paling tinggi '+g1(d.maks)+' °C.'+(k[0]==='l'?' Dengan koil transmit lokal, suhu orbita dibatasi '+DATA.SX.orb+' °C.':'');
}
['sxm','sxw','sxa','sxp'].forEach(id=>{$(id).addEventListener('input',hitungSX);$(id).addEventListener('change',hitungSX);});
$('sxr').onclick=()=>{$('sxm').value='n';$('sxw').value='tubuh';$('sxa').value=DATA.SN.tubuh/2;$('sxp').value=DATA.SN.tubuh;hitungSX();};
$('sxr').onclick();
/* --- dari aktivitas asli #17 --- */
const srt=$('srt'),sri=$('sri'),srf=$('srf');let srB=B0S[B0S.length-1];
B0S.forEach(k=>{const b=document.createElement('button');b.type='button';b.textContent=fmt(+k,k==='3'?0:1)+' T';b.dataset.k=k;b.onclick=()=>{srB=k;gambarSR();};$('srb0').appendChild(b);});
function gambarSR(){
 const base=+B0S[B0S.length-1],t=+srt.value,n=+sri.value,f=+srf.value,r=Math.pow(+srB/base,2)*f*f*n/t;
 $('srtv').textContent='x'+fmt(t,1);$('sriv').textContent='x'+fmt(n,1);$('srfv').textContent='x'+fmt(f,1);
 [...$('srb0').children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===srB));
 $('srm').style.width=Math.min(r*100,100)+'%';
 const tr=[];if(+srB<base)tr.push('SNR turun, dan NSA yang lebih besar membuat waktu minimal dua kali lipat');if(t>1)tr.push('pembobotan citra berubah, terutama pada T1');if(n<1)tr.push('cakupan anatomi berkurang, atau akuisisi tambahan menambah waktu');if(f<1)tr.push('kualitas citra sedikit menurun');
 $('srk').textContent='SAR relatif sekitar '+fmt(r*100,0)+' persen dari kondisi awal. Konsekuensi: '+(tr.length?tr.join('; ')+'.':'belum ada perubahan.')+' Koil kuadratur lebih efisien daripada koil linear tanpa konsekuensi bila dipilih sejak awal.';
}
[srt,sri,srf].forEach(e=>e.oninput=gambarSR);
$('srr').onclick=()=>{srB=B0S[B0S.length-1];srt.value=1;sri.value=1;srf.value=1;gambarSR();};
$('srr').onclick();
 }
});
