/* Komponen bersama: medan tepi dan gaya tarik.
   Dipakai M07B A1; satu komponen dengan M05 A4 (mode kontur 5 G). Muat sebelum m07b/a1. */
function bikinMedanTepi(){return {
 html:`<p class='lembut'>Geser jarak dari isosenter. Lihat medan, gaya tarik relatif, dan perangkat yang berisiko (kotak merah). Nilai dibaca kasar dari Gambar 10.3 dan berbeda antar model.</p>
<label for='mj'>Jarak dari isosenter: <span id='mjv'></span> m</label>
<input type='range' id='mj' min='1' max='6' step='0.1' value='4'>
<svg id='msvg' viewBox='0 0 600 230' role='img' aria-label='Grafik medan terhadap jarak dari isosenter'></svg>
<p class='hasil' id='mket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='mr'>Reset</button></div>`,
 mulai(root){
const KON=DATA.KONTUR,LG=Math.log10;
function medanB(d){let i=0;while(i<KON.length-2&&d>KON[i+1][0])i++;const a=KON[i],b=KON[i+1],m=(LG(b[1])-LG(a[1]))/(b[0]-a[0]);return Math.pow(10,LG(a[1])+m*(d-a[0]));}
const gayaRel=d=>medanB(d)*Math.abs(medanB(d+.05)-medanB(d-.05))/.1;
const G0=gayaRel(KON[2][0]);
const PER=[['Pacu jantung',.5],['Kartu kredit',1],['Jam tangan',3]]; // TODO-VERIFIKASI: ambang dibaca kasar dari Gambar 10.3
const mj=$('mj');
function gambarMedan(){
 const d=+mj.value,B=medanB(d),F=gayaRel(d)/G0;$('mjv').textContent=fmt(d,1);
 const X=v=>60+(v-1)/5*480,Y=v=>20+(LG(6)-LG(v))/(LG(6)-LG(.04))*150;
 let h='',pts='';
 for(let v=1;v<=6.001;v+=.1)pts+=X(v).toFixed(1)+','+Y(medanB(v)).toFixed(1)+' ';
 for(let v=1;v<=6;v++)h+=T(X(v),186,v+' m','var(--lembut)','middle');
 h+=`<line x1='60' y1='${Y(.5)}' x2='540' y2='${Y(.5)}' stroke='var(--t1)' stroke-dasharray='6 4'/>`+T(545,Y(.5)+4,'0,5 mT','var(--t1)');
 h+=`<polyline points='${pts}' fill='none' stroke='var(--aksen)' stroke-width='3'/><circle cx='${X(d)}' cy='${Y(B)}' r='8' fill='${B>=.5?'var(--salah)':'var(--benar)'}' stroke='var(--teks)'/>`;
 PER.forEach((q,i)=>{const x=60+i*180,r=B>=q[1];h+=`<rect x='${x}' y='198' width='170' height='26' rx='6' fill='${r?'var(--salah)':'var(--benar)'}' fill-opacity='.85'/>`+T(x+85,215,q[0],'#fff','middle');});
 $('msvg').innerHTML=h;
 $('mket').textContent='Jarak '+fmt(d,1)+' m: medan sekitar '+fmt(B,B<1?2:1)+' mT. Gaya tarik relatif '+fmt(F,1)+' kali nilai di garis 0,5 mT. '+(B>=.5?'Di dalam garis 0,5 mT.':'Di luar garis 0,5 mT.')+' Gaya naik sangat tajam saat mendekat.';
}
mj.oninput=gambarMedan;$('mr').onclick=()=>{mj.value=4;gambarMedan();};
gambarMedan();
 }
};}
