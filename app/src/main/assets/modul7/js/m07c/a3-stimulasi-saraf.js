/* A3 · Ambang stimulasi saraf oleh gradien
   Menjelaskan: T2.6   [← M07 #12] */
daftarAktivitas('A3',{
 judul:'Ambang stimulasi saraf oleh gradien',menjelaskan:["T2.6"],
 html:`<p class='lembut'>Atur tingkat gradien sebagai persen dari ambang saraf tepi. Lihat ambang mana yang terlampaui.</p>
<div class='pilih' id='stbtn' role='group' aria-label='Pilih mode gradien'></div>
<label for='stl'>Tingkat gradien: <span id='stlv'></span> persen dari ambang saraf tepi</label>
<input type='range' id='stl'>
<svg id='stsvg' viewBox='0 0 600 190' role='img' aria-label='Tiga batang ambang stimulasi'></svg>
<p class='hasil' id='stk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='str'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #12 --- */
const STM=DATA.STIM,BIS=DATA.BIS,KRI=DATA.KR;
const Tf=(x,y,t,c,a,f)=>`<text x='${x}' y='${y}' text-anchor='${a||'start'}' fill='${c||'var(--teks)'}' font-size='${f||13}'>${t}</text>`;
const nf=(x,d)=>x.toLocaleString('id-ID',{maximumFractionDigits:d});
const stl=$('stl');stl.min=0;stl.max=1000;stl.step=10;
const STP=[['Mode normal',STM.n],['Batas maksimum',STM.m],['Mode riset',STM.r]];
STP.forEach(a=>{const b=document.createElement('button');b.type='button';b.textContent=a[0]+' ('+a[1]+'%)';b.onclick=()=>{stl.value=a[1];gambarStim();};$('stbtn').appendChild(b);});
function gambarStim(){
 const v=+stl.value;$('stlv').textContent=v;
 const R=[['Saraf tepi',STM.m],['Napas (studi anjing)',STM.a],['Jantung (studi anjing)',STM.j]];
 let h='';
 R.forEach((r,i)=>{const y=14+i*58,hit=v>=r[1];h+=Tf(10,y+17,r[0])+`<rect x='190' y='${y}' width='370' height='24' rx='6' fill='var(--garis)'/><rect x='190' y='${y}' width='${Math.min(v/r[1],1)*370}' height='24' rx='6' fill='${hit?'var(--salah)':'var(--aksen)'}'/>`+Tf(190,y+42,'ambang: '+r[1]+' persen'+(hit?' (terlampaui)':''),hit?'var(--salah)':'var(--lembut)','start',11);});
 $('stsvg').innerHTML=h;
 [...$('stbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',v===STP[i][1]));
 $('stk').textContent=(v<=STM.n?'Di dalam batas mode normal: tidak ada stimulasi.':(v<STM.m?'Di atas batas mode normal, tetapi belum melewati ambang saraf tepi.':'Melewati ambang saraf tepi: ketukan, kesemutan, atau denyutan di tungkai.'+(v>STM.r?' Di atas batas mode riset.':'')+(v>=STM.a?' Ambang napas pada studi anjing terlampaui.':'')+(v>=STM.j?' Ambang jantung pada studi anjing terlampaui.':'')))+' Pada pemindai diagnostik, slew rate dibatasi produsen (biasanya sampai '+STM.sl+' T/m/s), jadi ini jarang terjadi.';
}
stl.oninput=gambarStim;$('str').onclick=()=>{stl.value=STM.n;gambarStim();};
$('str').onclick();
 }
});
