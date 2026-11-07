/* A5 · Perjalanan kecemasan pasien
   Menjelaskan: T2.4   [← M07 #11] */
daftarAktivitas('A5',{
 judul:'Perjalanan kecemasan pasien',menjelaskan:["T2.4"],
 html:`<p class='lembut'>Garis menunjukkan tingkat kecemasan selama pemeriksaan (ilustrasi kualitatif). Nyalakan langkah penenang dan lihat perubahannya.</p>
<div class='pilih' id='cbtn' role='group' aria-label='Langkah penenang'></div>
<svg id='csvg' viewBox='0 0 600 230' role='img' aria-label='Grafik kecemasan pasien selama pemeriksaan'></svg>
<p class='hasil' id='cket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='cr'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #11 --- */
const CT=['Persiapan','Masuk bore','Awal pindai','Pertengahan','Akhir'],CB=[.5,.9,.7,.55,.4];
const CL=[['Kipas di bore',[.1,.1,.1,.1,.1]],['Lampu dan panel pemandangan',[.05,.12,.1,.08,.05]],['Video dan hitung mundur',[.03,.1,.12,.12,.1]],['Bore lebih pendek dan lebar',[.05,.15,.12,.1,.08]]];
let cA=[false,false,false,false];
CL.forEach((a,i)=>{const b=document.createElement('button');b.type='button';b.textContent=a[0];b.onclick=()=>{cA[i]=!cA[i];gambarCemas();};$('cbtn').appendChild(b);});
function gambarCemas(){
 const v=CB.map((x,i)=>Math.max(.05,x-CL.reduce((t,c,k)=>t+(cA[k]?c[1][i]:0),0)));
 const X=i=>60+i*120,Y=a=>190-a*160,pk=v.indexOf(Math.max(...v)),mx=v[pk];
 const col=mx>=.7?'var(--salah)':(mx>=.45?'var(--t1)':'var(--benar)');
 let h=`<line x1='40' y1='190' x2='560' y2='190' stroke='var(--garis)' stroke-width='2'/>`+T(20,24,'kecemasan','var(--lembut)')+T(500,24,'tinggi','var(--lembut)','start').replace(`x='500' y='24'`,`x='540' y='24'`);
 h+=`<polyline points='${v.map((a,i)=>X(i)+','+Y(a)).join(' ')}' fill='none' stroke='var(--aksen)' stroke-width='4'/>`;
 v.forEach((a,i)=>{h+=`<circle cx='${X(i)}' cy='${Y(a)}' r='${i===pk?11:7}' fill='${i===pk?col:'var(--aksen)'}' stroke='var(--teks)'/>`+T(X(i),214,CT[i],'var(--lembut)','middle');});
 $('csvg').innerHTML=h;
 [...$('cbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',cA[i]));
 $('cket').textContent='Puncak kecemasan: '+CT[pk].toLowerCase()+'. '+(mx>=.7?'Tingkat tinggi. Risiko: sulit diam atau menahan napas (artefak pergeseran fase), serangan panik, pemeriksaan dihentikan lalu dirujuk ke CT, dan waktu mesin terbuang.':(mx>=.45?'Tingkat sedang. Sebagian pasien masih sulit mematuhi instruksi, jadi tetap perlu dipantau dan ditenangkan.':'Tingkat rendah. Pasien cenderung mampu menyelesaikan pemeriksaan.'))+' Kecemasan biasanya tertinggi saat dimasukkan ke bore, jadi strategi difokuskan pada tahap itu.';
}
$('cr').onclick=()=>{cA=[false,false,false,false];gambarCemas();};
gambarCemas();
 }
});
