/* A3 · Label perangkat dan alur keputusan pasien dengan perangkat
   Menjelaskan: T2.3   [← M07 #8 + #9] */
daftarAktivitas('A3',{
 judul:'Label perangkat dan alur keputusan pasien dengan perangkat',menjelaskan:["T2.3"],mode:[["label", "Label perangkat"], ["alur", "Alur keputusan"]],
 html:`<div data-panel='label'>
<p class='lembut'>Pilih perangkat untuk melihat ikon labelnya. Untuk MR Conditional, atur kondisi pemakaian. Contoh ini fiktif.</p>
<div class='pilih' id='lbtn' role='group' aria-label='Pilih perangkat'></div>
<div id='lcond'><div class='pilih' id='lb0' role='group' aria-label='Pilih B0'></div><label><input type='checkbox' id='lk'> Kabel dirutekan sesuai petunjuk</label></div>
<svg id='lsvg' viewBox='0 0 600 150' role='img' aria-label='Ikon label perangkat'></svg>
<p class='hasil' id='lket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='lr'>Reset</button></div>
</div>
<div data-panel='alur'>
<p class='lembut'>Atur tiga kondisi dan lihat ke mana alurnya bergerak. Latihan konsep, bukan SOP.</p>
<label><input type='checkbox' id='al1' checked> Jenis perangkat diketahui dan ada bukti dokumen</label>
<label><input type='checkbox' id='al2' checked> Syarat MR Conditional terpenuhi (atau perangkat MR Safe)</label>
<label><input type='checkbox' id='al3'> Ada temuan baru saat kedatangan (misalnya tindik)</label>
<svg id='asvg' viewBox='0 0 600 240' role='img' aria-label='Alur keputusan risiko dan manfaat'></svg>
<p class='hasil' id='aket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='ar'>Reset</button></div>
</div>
`,
 mulai(root){
/* --- dari aktivitas asli #8 --- */
const LB=[
 ['Cawan petri plastik','safe','Tidak menghantar listrik, tidak berlogam, dan tidak magnetik. Tidak ada bahaya yang diketahui di semua lingkungan MR.'],
 ['Gunting ferromagnetik','unsafe','Benda magnetik yang diketahui berbahaya di semua lingkungan MR.'],
 ['Neurostimulator (contoh fiktif)','cond','Contoh syarat: B0 tidak lebih dari '+fmt(+B0S[0],1)+' T dan kabel dirutekan sesuai petunjuk.'],
 ['Implan tanpa label dan tanpa dokumen','none','Tanpa label dan dokumen: jangan dianggap aman.']];
let lI=0,lB=B0S[0];
LB.forEach((a,i)=>{const b=document.createElement('button');b.type='button';b.textContent=a[0];b.onclick=()=>{lI=i;gambarLabel();};$('lbtn').appendChild(b);});
B0S.forEach(k=>{const b=document.createElement('button');b.type='button';b.textContent='B0 '+fmt(+k,k==='3'?0:1)+' T';b.dataset.k=k;b.onclick=()=>{lB=k;gambarLabel();};$('lb0').appendChild(b);});
function gambarLabel(){
 const it=LB[lI],ty=it[1];let h='',ln='';
 if(ty==='safe')h=`<rect x='40' y='20' width='110' height='110' fill='none' stroke='var(--benar)' stroke-width='10'/><text x='95' y='93' fill='var(--benar)' font-size='44' font-weight='700' text-anchor='middle'>MR</text>`,ln='MR Safe';
 else if(ty==='cond')h=`<polygon points='95,12 162,134 28,134' fill='#f2c94c' stroke='var(--teks)' stroke-width='4'/><text x='95' y='112' fill='#1b1f24' font-size='30' font-weight='700' text-anchor='middle'>MR</text>`,ln='MR Conditional';
 else if(ty==='unsafe')h=`<circle cx='95' cy='75' r='58' fill='none' stroke='var(--salah)' stroke-width='10'/><text x='95' y='88' fill='var(--teks)' font-size='36' font-weight='700' text-anchor='middle'>MR</text><line x1='54' y1='34' x2='136' y2='116' stroke='var(--salah)' stroke-width='10'/>`,ln='MR Unsafe';
 else h=`<circle cx='95' cy='75' r='58' fill='none' stroke='var(--lembut)' stroke-width='6' stroke-dasharray='8 6'/><text x='95' y='96' fill='var(--lembut)' font-size='60' text-anchor='middle'>?</text>`,ln='Tanpa label';
 h+=T(200,60,it[0],'var(--teks)')+T(200,86,'Label: '+ln,'var(--lembut)');
 $('lsvg').innerHTML=h;
 $('lcond').style.display=ty==='cond'?'':'none';
 [...$('lbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===lI));
 [...$('lb0').children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===lB));
 let t=it[2];
 if(ty==='cond'){const ok=+lB<=+B0S[0]&&$('lk').checked;t+=ok?' Syarat contoh terpenuhi: boleh dilanjutkan sesuai syarat label dan SOP.':' Syarat belum terpenuhi. Aman bersyarat pada satu kondisi belum tentu aman pada kondisi lain, misalnya medan yang lebih tinggi.';}
 $('lket').textContent=ln+': '+t;
}
$('lk').onchange=gambarLabel;
$('lr').onclick=()=>{lI=0;lB=B0S[0];$('lk').checked=false;gambarLabel();};
$('lr').onclick();
/* --- dari aktivitas asli #9 --- */
const AL=[['Tunda:','cari bukti dulu','','Tanpa bukti dokumen, pemeriksaan ditunda sampai bukti cukup. Keterangan lisan saja tidak cukup.'],
 ['Syarat belum','terpenuhi:','tunda atau batalkan','Syarat label belum terpenuhi. Aman bersyarat pada satu kondisi belum tentu aman pada kondisi lain.'],
 ['Tinjau ulang','risiko-manfaat,','minta saran','Temuan baru dapat muncul saat pasien datang. Tinjau ulang risiko dan manfaat, dan minta saran fisikawan medis atau ahli lain.'],
 ['Dapat lanjut','sesuai SOP','fasilitas','Bukti cukup dan syarat terpenuhi. Tanggung jawab utama ada pada dokter perujuk dan radiology lead, dan praktisi MRI tetap boleh menunda bila bukti kurang.']];
function gambarAlur(){
 const a1=$('al1').checked,a2=$('al2').checked,a3=$('al3').checked,o=!a1?0:(!a2?1:(a3?2:3));
 let h=`<rect x='150' y='8' width='300' height='36' rx='8' fill='var(--permukaan)' stroke='var(--garis)'/>`+T(300,31,'Dokter perujuk meminta pemeriksaan','var(--teks)','middle');
 h+=`<rect x='150' y='70' width='300' height='36' rx='8' fill='var(--permukaan)' stroke='var(--garis)'/>`+T(300,93,'Praktisi MRI menimbang bukti','var(--teks)','middle');
 h+=`<line x1='300' y1='44' x2='300' y2='70' stroke='var(--lembut)' stroke-width='2'/>`;
 AL.forEach((a,i)=>{const x=10+i*145,c=i===o?(i===3?'var(--benar)':'var(--t1)'):'var(--garis)';
  h+=`<line x1='300' y1='106' x2='${x+65}' y2='140' stroke='${i===o?c:'var(--garis)'}' stroke-width='${i===o?4:2}'/><rect x='${x}' y='140' width='130' height='74' rx='8' fill='${c}' fill-opacity='${i===o?.35:.1}' stroke='${c}' stroke-width='${i===o?4:1}'/>`+T(x+65,162,a[0],'var(--teks)','middle')+T(x+65,180,a[1],'var(--teks)','middle')+T(x+65,198,a[2],'var(--teks)','middle');});
 $('asvg').innerHTML=h;$('aket').textContent=AL[o][3];
}
['al1','al2','al3'].forEach(id=>$(id).onchange=gambarAlur);
$('ar').onclick=()=>{$('al1').checked=true;$('al2').checked=true;$('al3').checked=false;gambarAlur();};
gambarAlur();
 }
});
