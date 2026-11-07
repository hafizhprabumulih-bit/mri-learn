/* A1 · Denah zona dan akses personel
   Menjelaskan: T1.1, T2.1, T2.2   [← M07 #1 + #7] */
daftarAktivitas('A1',{
 judul:'Denah zona dan akses personel',menjelaskan:["T1.1", "T2.1", "T2.2"],mode:[["zona", "Denah zona"], ["akses", "Akses personel"]],
 html:`<div data-panel='zona'>
<p class='lembut'>Pilih zona untuk membaca aturannya. Ubah garis 5 gauss untuk melihat batas pengaman.</p>
<div class='pilih' id='zbtn' role='group' aria-label='Pilih zona'></div>
<div class='pilih' id='gbtn' role='group' aria-label='Pilih garis 5 gauss'></div>
<svg id='zsvg' viewBox='0 0 600 340' role='img' aria-label='Denah empat zona keselamatan MR'></svg>
<p class='hasil' id='zket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='zr'>Reset</button></div>
</div>
<div data-panel='akses'>
<p class='lembut'>Pilih siapa yang ingin masuk. Hijau: bebas. Kuning: dengan pengawasan. Merah: tidak boleh. Abu-abu: ikuti SOP. Ubah juga kondisi lampu Zona IV.</p>
<fieldset class='grup'><legend>1. Siapa yang ingin masuk?</legend>
<div class='pilih' id='pbtn' role='group' aria-label='Pilih orang yang ingin masuk'></div></fieldset>
<fieldset class='grup'><legend>2. Kondisi fasilitas: lampu peringatan Zona IV</legend>
<div class='pilih' role='group' aria-label='Kondisi fasilitas'><button type='button' id='plis' aria-pressed='false'></button><button type='button' id='pres' aria-pressed='false'></button></div>
<p class='lembut'>Ini bukan orang, melainkan kondisi yang mengubah lampu The Magnet is On.</p></fieldset>
<svg id='psvg' viewBox='0 0 600 340' role='img' aria-label='Denah lantai fasilitas MRI dilihat dari atas, dengan dinding, pintu, dan magnet'></svg>
<p class='hasil' id='pket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='pr'>Reset</button></div>
</div>
`,
 mulai(root){
/* --- dari aktivitas asli #1 --- */
const ZONA=[
 ['Zona I: umum','Area yang bebas dimasuki siapa saja, misalnya pintu masuk dan ruang tunggu.'],
 ['Zona II: antara','Pasien diterima, ditanyai, dan diberi penjelasan. Pengawasan dimulai di sini.'],
 ['Zona III: terkontrol','Hanya orang yang sudah diskrining. Akses dikendalikan karena dekat ruang magnet.'],
 ['Zona IV: ruang magnet','Ruang pemindai. B0 selalu menyala. Hanya orang yang lolos skrining dan benda aman-MR yang boleh masuk.']];
let zA=0,gA=0;
const GV=[NIL.g1,NIL.g2],GN=['standar','alternatif'];
ZONA.forEach((z,i)=>{const b=document.createElement('button');b.type='button';b.textContent='Zona '+['I','II','III','IV'][i];b.onclick=()=>{zA=i;gambarZona();};$('zbtn').appendChild(b);});
GV.forEach((g,i)=>{const b=document.createElement('button');b.type='button';b.textContent='Garis '+fmt(g,1)+' mT ('+GN[i]+')';b.onclick=()=>{gA=i;gambarZona();};$('gbtn').appendChild(b);});
function gambarZona(){
 const r=70*Math.pow(GV[0]/GV[gA],1/3);
 const R=[[10,10,580,320],[40,38,520,264],[70,66,460,208],[100,92,400,156]];
 let h='';
 R.forEach((a,i)=>{h+=`<rect x='${a[0]}' y='${a[1]}' width='${a[2]}' height='${a[3]}' rx='10' fill='var(--aksen)' fill-opacity='${.06+.09*i}' stroke='${i===zA?'var(--teks)':'var(--garis)'}' stroke-width='${i===zA?4:1}' style='cursor:pointer'/>`+T(a[0]+10,a[1]+20,'Zona '+['I','II','III','IV'][i]);});
 h+=`<circle cx='300' cy='170' r='${r}' fill='none' stroke='var(--t1)' stroke-width='2' stroke-dasharray='6 4'/><circle cx='300' cy='170' r='30' fill='var(--b0)' fill-opacity='.7'/>`+T(300,175,'magnet',null,'middle')+T(388,150,'Garis 5 gauss',null)+T(388,168,'('+fmt(GV[gA],1)+' mT)',null);
 $('zsvg').innerHTML=h;
 $('zsvg').querySelectorAll('rect').forEach((e,i)=>e.onclick=()=>{zA=i;gambarZona();});
 [...$('zbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===zA));
 [...$('gbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===gA));
 $('zket').textContent=ZONA[zA][0]+'. '+ZONA[zA][1]+' Garis 5 gauss: '+fmt(GV[gA],1)+' mT. Medan menurun dengan jarak, jadi garis yang lebih besar nilainya letaknya lebih dekat ke magnet.';
}
$('zr').onclick=()=>{zA=0;gA=0;gambarZona();};
gambarZona();
/* --- dari aktivitas asli #7 --- */
const Z=DATA.ZONA;
const AK=[
 ['Pengunjung atau staf non-MRI',['ok','ok','no','no'],'Belum menjalani pelatihan keselamatan formal dalam '+Z.pelatihan_bulan+' bulan terakhir.'],
 ['Pasien belum diskrining',['ok','awas','no','no'],'Disambut di Zona II dan tidak bebas bergerak. Jawaban skrining dan riwayat diambil di sini.'],
 ['Pasien sudah diskrining',['ok','awas','awas','awas'],'Berada di bawah pengawasan langsung personel MRI saat memasuki Zona III dan IV.'],
 ['Personel Level 1',['ok','ok','ok','sop'],'Staf kantor dan pembantu pasien dengan pendidikan keselamatan minimal untuk bekerja di Zona III. Akses ke Zona IV tidak diuraikan pada teks sumber.'], // TODO-VERIFIKASI: akses Level 1 ke Zona IV
 ['Personel Level 2',['ok','ok','ok','ok'],'Teknolog MRI, radiolog, dan perawat yang dilatih mendalam tentang pemanasan, luka bakar, dan rangsangan saraf-otot akibat gradien.']];
let pI=0,pL=false,pR=false;
const WS={ok:'var(--benar)',awas:'var(--t1)',no:'var(--salah)',sop:'var(--lembut)'},WT={ok:'bebas',awas:'dengan pengawasan',no:'tidak boleh',sop:'ikuti SOP'};
function orang(i){
 const kulit='#f1c27d',rambut=['#3b2f2f','#8d5524','#2b2b2b','#c0841f','#5c3b1e'][i],kaki=['#495057',kulit,kulit,'#495057','#12b886'][i];
 let h=`<rect x='20' y='62' width='8' height='22' rx='3' fill='${kaki}'/><rect x='32' y='62' width='8' height='22' rx='3' fill='${kaki}'/>`;
 const lencana=(c,t)=>`<circle cx='50' cy='10' r='8' fill='${c}'/><text x='50' y='14' text-anchor='middle' font-size='11' font-weight='700' fill='#fff'>${t}</text>`;
 if(i===0)h+=`<rect x='9' y='30' width='8' height='26' rx='4' fill='#868e96'/><rect x='43' y='30' width='8' height='26' rx='4' fill='#868e96'/><rect x='17' y='28' width='26' height='36' rx='8' fill='#868e96'/><path d='M22 28 L50 50' stroke='#a9743f' stroke-width='2'/><rect x='44' y='46' width='13' height='15' rx='3' fill='#a9743f'/>`;
 if(i===1||i===2)h+=`<rect x='9' y='30' width='8' height='24' rx='4' fill='#a5d8ff'/><rect x='43' y='30' width='8' height='24' rx='4' fill='#a5d8ff'/><path d='M16 28 H44 L48 66 H12 Z' fill='#a5d8ff' stroke='#4c6ef5'/>`+(i===1?lencana('#f08c00','?'):`<rect x='9' y='50' width='8' height='4' fill='#2b8a3e'/>`+lencana('#2b8a3e','✓'));
 if(i===3)h+=`<rect x='9' y='30' width='8' height='26' rx='4' fill='#e9ecef' stroke='#adb5bd'/><rect x='43' y='30' width='8' height='26' rx='4' fill='#e9ecef' stroke='#adb5bd'/><rect x='17' y='28' width='26' height='36' rx='6' fill='#e9ecef' stroke='#adb5bd'/><path d='M30 28 l-3 8 3 14 3 -14 z' fill='#1c7ed6'/><rect x='34' y='42' width='9' height='11' fill='#fff' stroke='#1c7ed6'/>`+lencana('#1c7ed6','1');
 if(i===4)h+=`<rect x='17' y='28' width='26' height='36' rx='6' fill='#12b886'/><path d='M15 28 H27 L24 70 H12 Z M45 28 H33 L36 70 H48 Z' fill='#fff' stroke='#868e96'/><rect x='6' y='30' width='9' height='28' rx='4' fill='#fff' stroke='#868e96'/><rect x='45' y='30' width='9' height='28' rx='4' fill='#fff' stroke='#868e96'/><path d='M24 28 Q30 46 36 28' fill='none' stroke='#343a40' stroke-width='2'/>`+lencana('#7048e8','2');
 return h+`<circle cx='30' cy='16' r='10' fill='${kulit}' stroke='#7a5a2a'/><path d='M20 15 A10 10 0 0 1 40 15 Q30 9 20 15 Z' fill='${rambut}'/>`;
}
AK.forEach((a,i)=>{const b=document.createElement('button');b.type='button';b.className='org';b.setAttribute('aria-label',a[0]);b.innerHTML=`<svg viewBox='0 0 60 90' width='50' height='75' aria-hidden='true'>${orang(i)}</svg><span>${a[0]}</span>`;b.onclick=()=>{pI=i;gambarAkses();};$('pbtn').appendChild(b);});
function gambarAkses(){
 const st=AK[pI][1],WP={ok:'✓ bebas',awas:'! diawasi',no:'✕ dilarang',sop:'? ikuti SOP'};
 const Ts=(x,y,t,c,a,f)=>`<text x='${x}' y='${y}' text-anchor='${a||'start'}' fill='${c||'var(--teks)'}' font-size='${f||13}'>${t}</text>`;
 const F=(x,y,w,hh,t)=>`<rect x='${x}' y='${y}' width='${w}' height='${hh}' rx='4' fill='var(--permukaan)' stroke='var(--lembut)'/>`+(t?Ts(x+w/2,y+hh/2+4,t,'var(--lembut)','middle',11):'');
 const Zr=[[10,180,225,150],[10,10,225,170],[235,10,115,320],[350,10,240,320]],zl=[[20,202],[20,30],[245,30],[360,30]],zn=['Zona I','Zona II','Zona III','Zona IV'];
 let h=`<defs><clipPath id='m7akses'><rect x='350' y='10' width='240' height='320'/></clipPath></defs>`;
 Zr.forEach((r,i)=>{h+=`<rect x='${r[0]}' y='${r[1]}' width='${r[2]}' height='${r[3]}' fill='${WS[st[i]]}' fill-opacity='.3'/>`+Ts(zl[i][0],zl[i][1],zn[i],'var(--teks)','start',14)+Ts(zl[i][0],zl[i][1]+16,WP[st[i]],WS[st[i]],'start',12);});
 /* perabot */
 h+=F(20,66,64,26,'skrining')+F(98,66,126,26,'loker logam');
 for(let i=0;i<5;i++)h+=F(20+i*42,130,30,26);
 h+=Ts(120,172,'ruang tunggu','var(--lembut)','middle',11)+Ts(120,270,'lobi','var(--lembut)','middle',11)+Ts(110,322,'pintu masuk','var(--lembut)','middle',11);
 h+=F(284,100,56,28,'konsol')+Ts(292,166,'ruang kontrol','var(--lembut)','middle',11);
 /* ruang magnet dilihat dari atas */
 h+=`<g clip-path='url(#m7akses)'><ellipse cx='505' cy='155' rx='135' ry='125' fill='var(--salah)' fill-opacity='.12' stroke='var(--salah)' stroke-dasharray='6 4' stroke-width='2'/></g>`;
 h+=`<rect x='372' y='146' width='170' height='18' rx='6' fill='var(--permukaan)' stroke='var(--lembut)'/><rect x='392' y='149' width='70' height='12' rx='6' fill='var(--t2)' fill-opacity='.8'/><circle cx='472' cy='155' r='9' fill='var(--t2)' fill-opacity='.8'/>`;
 h+=`<rect x='450' y='70' width='110' height='170' rx='16' fill='var(--b0)' fill-opacity='.78' stroke='var(--teks)' stroke-width='2'/><rect x='450' y='138' width='110' height='34' fill='none' stroke='var(--latar)' stroke-dasharray='4 3'/>`;
 h+=Ts(505,100,'magnet','var(--latar)','middle',13)+Ts(505,132,'bore','var(--latar)','middle',11)+Ts(420,184,'meja pasien','var(--lembut)','middle',11);
 h+=Ts(505,312,'garis 5 gauss ('+fmt(GV[0],1)+' mT)','var(--salah)','middle',11);
 h+=`<circle cx='366' cy='296' r='7' fill='var(--salah)'/>`+Ts(378,300,'tombol quench','var(--lembut)','start',11);
 h+=`<g transform='translate(36,222) scale(.95)'>${orang(pI)}</g>`+Ts(102,236,'ingin masuk','var(--lembut)','start',11);
 /* lampu dan tanda Zona IV */
 h+=`<rect x='241' y='186' width='104' height='22' rx='5' fill='${pR?'var(--garis)':'var(--salah)'}'/>`+Ts(293,201,'The Magnet is On',pR?'var(--lembut)':'#fff','middle',11);
 if(pL&&!pR)h+=Ts(293,224,'cadangan: '+Z.cadangan_jam+' jam','var(--lembut)','middle',11);
 /* dinding dan pintu */
 const W=[[10,10,590,10],[590,10,590,330],[10,10,10,330],[10,330,90,330],[130,330,590,330],[10,180,100,180],[140,180,235,180],[235,10,235,80],[235,120,235,330],[350,10,350,60],[350,140,350,210],[350,250,350,330]];
 W.forEach(w=>{h+=`<line x1='${w[0]}' y1='${w[1]}' x2='${w[2]}' y2='${w[3]}' stroke='var(--teks)' stroke-width='7' stroke-linecap='square'/>`;});
 h+=`<line x1='350' y1='60' x2='350' y2='140' stroke='var(--t2)' stroke-width='7'/>`+Ts(342,56,'kaca','var(--t2)','end',10);
 [['M 130 330 A 40 40 0 0 0 90 290',90,330,90,290],['M 140 180 A 40 40 0 0 0 100 140',100,180,100,140],['M 235 120 A 40 40 0 0 0 275 80',235,80,275,80],['M 350 250 A 40 40 0 0 0 390 210',350,210,390,210]].forEach(d=>{h+=`<path d='${d[0]}' fill='none' stroke='var(--lembut)' stroke-dasharray='3 3'/><line x1='${d[1]}' y1='${d[2]}' x2='${d[3]}' y2='${d[4]}' stroke='var(--lembut)' stroke-width='3'/>`;});
 h+=`<rect x='230' y='96' width='10' height='12' rx='2' fill='var(--t1)'/>`+Ts(241,138,'kunci','var(--t1)','start',11);
 $('psvg').innerHTML=h;
 [...$('pbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===pI));
 $('plis').setAttribute('aria-pressed',pL);$('plis').textContent='Listrik padam: '+(pL?'hidup':'mati');
 $('pres').setAttribute('aria-pressed',pR);$('pres').textContent='Sistem resistif: '+(pR?'hidup':'mati');
 $('pket').textContent=AK[pI][0]+'. '+AK[pI][2]+' '+(pR?'Sistem resistif dikecualikan dari aturan lampu yang menyala terus.':'Lampu merah dan tanda di Zona IV menyala terus'+(pL?', juga saat listrik padam, lewat sumber cadangan sedikitnya '+Z.cadangan_jam+' jam.':'.'));
}
$('plis').onclick=()=>{pL=!pL;gambarAkses();};$('pres').onclick=()=>{pR=!pR;gambarAkses();};
$('pr').onclick=()=>{pI=0;pL=false;pR=false;gambarAkses();};
gambarAkses();
 }
});
