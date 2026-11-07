/* A4 · Kalkulator bising dan lama paparan
   Menjelaskan: T2.7   [← M07 #13] */
daftarAktivitas('A4',{
 judul:'Kalkulator bising dan lama paparan',menjelaskan:["T2.7"],
 html:`<p class='lembut'>Pilih contoh bunyi atau geser tingkat bunyinya. Lihat intensitas relatif dan batas paparan harian.</p>
<label for='nssel'>Contoh bunyi</label><select id='nssel'></select>
<label for='nsd'>Tingkat bunyi: <span id='nsdv'></span> dB</label>
<input type='range' id='nsd'>
<svg id='nssvg' viewBox='0 0 600 95' role='img' aria-label='Skala tingkat bunyi dalam desibel'></svg>
<p class='hasil' id='nsk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='nsr'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #13 --- */
const nsS=$('nssel'),nsD=$('nsd');nsD.min=10;nsD.max=170;
const op0=document.createElement('option');op0.value='-1';op0.textContent='Atur sendiri dengan slider';nsS.appendChild(op0);
BIS.tabel.forEach((a,i)=>{const o=document.createElement('option');o.value=i;o.textContent=a[0]+' ('+a[1]+' dB)';nsS.appendChild(o);});
nsS.onchange=()=>{if(+nsS.value>=0)nsD.value=BIS.tabel[+nsS.value][1];gambarBising();};
nsD.oninput=()=>{nsS.value='-1';gambarBising();};
const durasi=m=>m>=60?nf(m/60,1)+' jam':(m>=1?nf(m,0)+' menit':nf(m*60,0)+' detik');
function gambarBising(){
 const L=+nsD.value,rel=Math.pow(2,(L-BIS.ref)/BIS.tkr),mnt=BIS.mnt/rel,X=d=>40+d/170*520;
 $('nsdv').textContent=L;
 let h=`<rect x='40' y='14' width='520' height='24' rx='6' fill='var(--garis)'/><rect x='40' y='14' width='${X(L)-40}' height='24' rx='6' fill='${L>=BIS.ny?'var(--salah)':(L>=BIS.ref?'var(--t1)':(L>=BIS.ic?'#f2c94c':'var(--benar)'))}'/>`;
 [[BIS.gg,''],[BIS.ic,''],[BIS.ref,''],[BIS.m15,'MRI 1,5 T'],[BIS.m3,'MRI 3 T EPI'],[BIS.ny,'nyeri']].forEach(a=>{h+=`<line x1='${X(a[0])}' y1='14' x2='${X(a[0])}' y2='44' stroke='var(--teks)'/>`+Tf(X(a[0]),58,a[0],'var(--lembut)','middle',11)+(a[1]?Tf(X(a[0]),74,a[1],'var(--lembut)','middle',11):'');});
 $('nssvg').innerHTML=h;
 const st=L>=BIS.ny?'Nyeri dan berisiko memecahkan gendang telinga.':(L>=BIS.ref?'Di atas patokan paparan harian, jadi durasi harus dibatasi.':(L>=BIS.ic?'ICNIRP menyarankan pelindung telinga pada tingkat ini.':(L>=BIS.gg?'Mulai mengganggu bagi banyak orang.':'Relatif aman.')));
 $('nsk').textContent=L+' dB: intensitas sekitar '+nf(rel,rel<1?3:(rel<10?1:0))+' kali patokan '+BIS.ref+' dB. '+(L>=BIS.ref?'Batas paparan harian sekitar '+durasi(mnt)+'. ':'')+st;
}
$('nsr').onclick=()=>{nsS.value='-1';nsD.value=BIS.m15;gambarBising();};
$('nsr').onclick();
 }
});
