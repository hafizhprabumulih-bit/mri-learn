/* A3 · Skala medan dan efek sementara
   Menjelaskan: T2.4   [← M07 #6] */
daftarAktivitas('A3',{
 judul:'Skala medan dan efek sementara',menjelaskan:["T2.4"],
 html:`<p class='lembut'>Pilih kekuatan medan. Lihat efek sementara yang dilaporkan.</p>
<div class='pilih' id='ebtn' role='group' aria-label='Pilih kekuatan medan'></div>
<div class='pilih'><button type='button' id='elam' aria-pressed='false'></button></div>
<svg id='esvg' viewBox='0 0 600 130' role='img' aria-label='Skala kekuatan medan'></svg>
<p class='hasil' id='eket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='er'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #6 --- */
const E=DATA.EFEK;let eI=0,eL=false;
const EF=[
 ['Bumi',fmt(E.bumi_mT,2)+' mT. Medan bumi sangat kecil. Puluhan spesies hewan peka padanya, dan burung tertentu serta beberapa bakteri memakainya untuk menentukan arah.',false],
 [fmt(+B0S[0],1)+' T','Efek sementara terutama dibahas pada sistem medan sangat tinggi, bukan pada kekuatan klinis umum ini.',false],
 [fmt(+B0S[1],0)+' T','Pada rentang '+fmt(E.rasa_logam_T[0],0)+' sampai '+fmt(E.rasa_logam_T[1],0)+' T sebagian orang melaporkan rasa logam di mulut dan pusing, terutama saat bergerak melewati medan tepi.',false],
 [fmt(E.vertigo_T,0)+' T','Vertigo (pusing, mual, gerak mata tak sengaja, goyah) terutama muncul pada '+fmt(E.vertigo_T,0)+' T ke atas. Pasien merasa bergerak melengkung walau meja lurus. Biasanya pulih sekitar '+E.pulih_menit+' menit setelah keluar. Sebagian disarankan tidak mengemudi dulu.',true],
 [fmt(E.icnirp_T,0)+' T','ICNIRP menyatakan tidak ada bukti efek kesehatan serius pada paparan seluruh tubuh sampai '+fmt(E.icnirp_T,0)+' T. Sebagian keluhan bisa bersifat psikologis.',true]];
EF.forEach((e,i)=>{const b=document.createElement('button');b.type='button';b.textContent=e[0];b.onclick=()=>{eI=i;gambarEfek();};$('ebtn').appendChild(b);});
function gambarEfek(){
 let h=`<line x1='70' y1='50' x2='530' y2='50' stroke='var(--garis)' stroke-width='4'/>`;
 EF.forEach((e,i)=>{const x=70+i*115;h+=`<circle cx='${x}' cy='50' r='${i===eI?16:9}' fill='${i===eI?'var(--aksen)':'var(--garis)'}' stroke='var(--teks)'/>`+T(x,92,e[0],i===eI?'var(--teks)':'var(--lembut)','middle');});
 h+=T(300,120,'Skala bertingkat: jarak antar titik tidak sebanding dengan kekuatan medan','var(--lembut)','middle');
 $('esvg').innerHTML=h;
 [...$('ebtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===eI));
 $('elam').setAttribute('aria-pressed',eL);$('elam').textContent='Meja digerakkan lambat: '+(eL?'hidup':'mati');
 const e=EF[eI];$('eket').textContent=e[0]+': '+e[1]+(e[2]?' '+(eL?'Meja lambat: keparahan vertigo cenderung lebih rendah.':'Makin cepat meja bergerak, makin berat vertigo.'):'');
}
$('elam').onclick=()=>{eL=!eL;gambarEfek();};
$('er').onclick=()=>{eI=0;eL=false;gambarEfek();};
gambarEfek();
 }
});
