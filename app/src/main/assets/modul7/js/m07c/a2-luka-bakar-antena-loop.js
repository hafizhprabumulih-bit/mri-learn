/* A2 · Luka bakar: efek antena pada kawat dan loop konduktif
   Menjelaskan: T2.4, T2.5   [← M07 #18 + #19] */
daftarAktivitas('A2',{
 judul:'Luka bakar: efek antena pada kawat dan loop konduktif',menjelaskan:["T2.4", "T2.5"],mode:[["antena", "Efek antena pada kawat"], ["loop", "Loop konduktif pada tubuh"]],
 html:`<div data-panel='antena'>
<p class='lembut'>Pilih B0 dan medium, lalu geser panjang kawat. Pemanasan di ujung terbesar saat panjang kawat sekitar setengah panjang gelombang (gambaran kualitatif).</p>
<div class='pilih' id='anb0' role='group' aria-label='Pilih B0'></div>
<div class='pilih' id='anmd' role='group' aria-label='Pilih medium'></div>
<label for='anl'>Panjang kawat: <span id='anlv'></span> cm</label>
<input type='range' id='anl'>
<svg id='ansvg' viewBox='0 0 600 170' role='img' aria-label='Kawat dengan gelombang berdiri dan pemanasan di ujung'></svg>
<p class='hasil' id='ank' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='anr'>Reset</button></div>
</div>
<div data-panel='loop'>
<p class='lembut'>Nyalakan postur. Titik kontak kulit yang kecil memusatkan arus dan memanas (merah). Bantalan isolasi memutus loop.</p>
<div class='pilih' id='lpbtn' role='group' aria-label='Postur dan bantalan'></div>
<svg id='lpsvg' viewBox='0 0 300 300' role='img' aria-label='Siluet tubuh dengan titik kontak kulit'></svg>
<p class='hasil' id='lpk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='lpr'>Reset</button></div>
</div>
`,
 mulai(root){
/* --- dari aktivitas asli #18 --- */
const RFD=DATA.RF,anl=$('anl');anl.min=5;anl.max=300;anl.step=1;let anB=B0S[0],anM='d';
B0S.forEach(k=>{const b=document.createElement('button');b.type='button';b.textContent='B0 '+fmt(+k,k==='3'?0:1)+' T';b.dataset.k=k;b.onclick=()=>{anB=k;gambarAn();};$('anb0').appendChild(b);});
[['u','Udara atau vakum'],['a','Air'],['d','Darah']].forEach(a=>{const b=document.createElement('button');b.type='button';b.textContent=a[1];b.dataset.k=a[0];b.onclick=()=>{anM=a[0];gambarAn();};$('anmd').appendChild(b);});
function gambarAn(){
 const L=+anl.value;$('anlv').textContent=L;
 const f=DATA.FISIKA.larmor_MHz[anB],lam=RFD.c/(f*Math.sqrt(RFD.eps[anM])),half=lam*50,r=L/half;
 const heat=Math.max(Math.exp(-Math.pow((r-1)/.12,2)),Math.exp(-Math.pow((r-3)/.12,2)));
 const X=cm=>40+cm/300*520,x1=X(L);
 let pts='';for(let cm=0;cm<=L;cm+=Math.max(L/120,.5))pts+=X(cm).toFixed(1)+','+(95-(.25+.75*heat)*60*Math.cos(2*Math.PI*cm/(lam*100))).toFixed(1)+' ';
 let h=`<line x1='40' y1='95' x2='${x1}' y2='95' stroke='var(--teks)' stroke-width='5' stroke-linecap='round'/><polyline points='${pts}' fill='none' stroke='var(--aksen)' stroke-width='3'/>`;
 [40,x1].forEach(x=>{h+=`<circle cx='${x}' cy='95' r='${6+16*heat}' fill='var(--salah)' fill-opacity='${.15+.6*heat}'/>`;});
 h+=Tf(300,160,'garis biru: gelombang berdiri; lingkaran merah: pemanasan di ujung kawat','var(--lembut)','middle',11);
 $('ansvg').innerHTML=h;
 [...$('anb0').children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===anB));[...$('anmd').children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===anM));
 $('ank').textContent='Panjang gelombang di medium ini sekitar '+fmt(lam*100,0)+' cm, jadi setengahnya sekitar '+fmt(half,0)+' cm. Kawat '+L+' cm: '+(heat>.7?'mendekati resonansi, ujung kawat memanas kuat.':(heat>.3?'agak dekat resonansi.':'jauh dari resonansi, pemanasan ujung kecil.'))+' Pemanasan relatif (gambaran): '+fmt(heat*100,0)+' persen.';
}
anl.oninput=gambarAn;$('anr').onclick=()=>{anB=B0S[0];anM='d';anl.value=RFD.dip;gambarAn();};
$('anr').onclick();
/* --- dari aktivitas asli #19 --- */
const LPS=['Tangan di atas kepala bertemu','Tangan menyentuh paha','Tumit bersentuhan','Bantalan isolasi'];let lpA=[false,false,false,false];
LPS.forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.onclick=()=>{lpA[i]=!lpA[i];gambarLp();};$('lpbtn').appendChild(b);});
function gambarLp(){
 const lp=lpA[3],ov=lpA[0],th=lpA[1]&&!ov,he=lpA[2],B=`fill='#ced4da' stroke='#868e96'`;
 let h=`<circle cx='150' cy='46' r='22' fill='#f1c27d' stroke='#7a5a2a'/><rect x='116' y='72' width='68' height='110' rx='20' ${B}/><rect x='120' y='180' width='27' height='95' rx='10' ${B}/><rect x='153' y='180' width='27' height='95' rx='10' ${B}/>`;
 if(ov)h+=`<polyline points='120,88 96,50 147,12' fill='none' stroke='#adb5bd' stroke-width='14' stroke-linecap='round' stroke-linejoin='round'/><polyline points='180,88 204,50 153,12' fill='none' stroke='#adb5bd' stroke-width='14' stroke-linecap='round' stroke-linejoin='round'/>`;
 else if(th)h+=`<polyline points='120,88 96,135 124,178' fill='none' stroke='#adb5bd' stroke-width='14' stroke-linecap='round' stroke-linejoin='round'/><polyline points='180,88 204,135 176,178' fill='none' stroke='#adb5bd' stroke-width='14' stroke-linecap='round' stroke-linejoin='round'/>`;
 else h+=`<rect x='92' y='80' width='22' height='100' rx='10' ${B}/><rect x='186' y='80' width='22' height='100' rx='10' ${B}/>`;
 const pts=[];if(ov)pts.push([150,12,14]);if(th){pts.push([124,178,16]);pts.push([176,178,16]);}if(he)pts.push([150,276,14]);
 pts.forEach(q=>{h+=lp?`<rect x='${q[0]-14}' y='${q[1]-7}' width='28' height='14' rx='4' fill='var(--benar)' fill-opacity='.85'/>`:`<circle cx='${q[0]}' cy='${q[1]}' r='${q[2]}' fill='var(--salah)' fill-opacity='.65'/>`;});
 $('lpsvg').innerHTML=h;
 [...$('lpbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',lpA[i]));
 $('lpk').textContent=pts.length===0?'Tidak ada loop alami yang terbentuk pada postur ini.':(lp?'Bantalan isolasi memutus loop, jadi arus tidak lagi terkonsentrasi di satu titik kulit.':pts.length+' titik kontak: arus induksi terkonsentrasi di area kulit yang hanya beberapa sentimeter persegi, sehingga pemanasan tajam (merah). Pasien yang dibius tidak dapat melaporkannya.');
}
$('lpr').onclick=()=>{lpA=[false,false,false,false];gambarLp();};
gambarLp();
 }
});
