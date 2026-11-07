/* A4 · Oksigen dan ekspansi helium
   Menjelaskan: T2.7, T3.1   [← M07 #14] */
daftarAktivitas('A4',{
 judul:'Oksigen dan ekspansi helium',menjelaskan:["T2.7", "T3.1"],
 html:`<p class='lembut'>Bagian pertama: turunkan kadar oksigen ruang. Bagian kedua: lihat berapa gas yang dihasilkan helium cair saat quench.</p>
<label for='kgo'>Kadar oksigen ruang: <span id='kgov'></span> persen</label>
<input type='range' id='kgo'>
<svg id='kgsvg' viewBox='0 0 600 95' role='img' aria-label='Skala kadar oksigen'></svg>
<p class='hasil' id='kgk' role='status' aria-live='polite'></p>
<label for='kgh'>Helium cair: <span id='kghv'></span> L</label>
<input type='range' id='kgh'>
<div class='meter' aria-hidden='true'><i id='kgmeter'></i></div>
<p class='hasil' id='kgk2' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='kgr'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #14 --- */
const kgo=$('kgo'),kgh=$('kgh');kgo.min=0;kgo.max=24;kgo.step=.5;kgh.min=0;kgh.max=KRI.L;kgh.step=50;
function gambarO2(){
 const v=+kgo.value,X=d=>40+d/24*520;$('kgov').textContent=fmt(v,1);
 let h='';
 [[0,KRI.f,'var(--salah)'],[KRI.f,KRI.s,'var(--t1)'],[KRI.s,KRI.lo,'#f2c94c'],[KRI.lo,KRI.hi,'var(--benar)'],[KRI.hi,24,'var(--garis)']].forEach(z=>{h+=`<rect x='${X(z[0])}' y='20' width='${X(z[1])-X(z[0])}' height='26' fill='${z[2]}' fill-opacity='.8'/>`;});
 [KRI.f,KRI.s,KRI.lo,KRI.hi].forEach(b=>{h+=Tf(X(b),64,fmt(b,b%1?1:0),'var(--lembut)','middle',11);});
 h+=`<polygon points='${X(v)-8},8 ${X(v)+8},8 ${X(v)},20' fill='var(--teks)'/>`+Tf(300,88,'persen oksigen','var(--lembut)','middle',11);
 $('kgsvg').innerHTML=h;
 $('kgk').textContent=(v>=KRI.lo&&v<=KRI.hi)?'Rentang optimal untuk aktivitas normal (menurut OSHA).':(v>KRI.hi?'Di atas rentang optimal.':(v>=KRI.s?'Di bawah '+fmt(KRI.lo,1)+' persen: alarm sensor oksigen berbunyi, persepsi dan penilaian terganggu sehingga sulit menyelamatkan diri.':(v>=KRI.f?'Di bawah '+KRI.s+' persen: sangat mungkin pingsan.':'Di bawah '+KRI.f+' persen: pingsan dalam sekitar '+KRI.dt+' detik, gagal jantung dan kematian dalam '+KRI.m1+' sampai '+KRI.m2+' menit.')));
}
function gambarHe(){
 const l=+kgh.value,gas=l*KRI.e;$('kghv').textContent=nf(l,0);$('kgmeter').style.width=(l/KRI.L*100)+'%';
 $('kgk2').textContent='Helium cair '+nf(l,0)+' L menjadi sekitar '+nf(gas,0)+' L gas ('+nf(gas/1e6,2)+' juta liter), karena tiap liter menguap menjadi '+KRI.e+' L gas. Cerobong kriogen harus membuangnya dalam waktu singkat, dan titik buang luar sedikitnya '+KRI.j+' m dari area akses umum.';
}
kgo.oninput=gambarO2;kgh.oninput=gambarHe;
$('kgr').onclick=()=>{kgo.value=KRI.o;kgh.value=KRI.L;gambarO2();gambarHe();};
$('kgr').onclick();
 }
});
