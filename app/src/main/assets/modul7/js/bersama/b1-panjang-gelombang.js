/* Komponen bersama: panjang gelombang RF di jaringan, 1,5 T vs 3 T, pola B1 tidak rata   [BARU]
   Dipakai M07C A5; satu komponen dengan M06B A7. Muat sebelum m07c/a5.
   Model kualitatif: ketidakrataan membesar bila lebar tubuh mendekati panjang gelombang di jaringan. */
function bikinB1Panjang(){return {
 html:`<p class='lembut'>Pilih B0 dan geser lebar tubuh. Panjang gelombang RF di jaringan lebih pendek pada medan tinggi. Bila sebanding dengan lebar tubuh, gelombang saling menjumlah dan menghapus, sehingga pola B1 tidak rata. Gambaran kualitatif.</p>
<div class='pilih' id='bwb0' role='group' aria-label='Pilih B0'></div>
<label for='bwl'>Lebar tubuh: <span id='bwlv'></span> cm</label>
<input type='range' id='bwl'>
<svg id='bwsvg' viewBox='0 0 600 240' role='img' aria-label='Penampang tubuh dengan pola intensitas B1 dan grafik profilnya'></svg>
<p class='hasil' id='bwk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='bwr'>Reset</button></div>`,
 mulai(root){
  const R=DATA.RF,Bd=DATA.B1,sl=$('bwl');let B=B0S[0];
  sl.min=Bd.lebar_cm[0];sl.max=Bd.lebar_cm[1];sl.step=1;sl.value=Bd.lebar_cm[2];
  B0S.forEach(k=>{const b=document.createElement('button');b.type='button';b.textContent='B0 '+fmt(+k,k==='3'?0:1)+' T';b.dataset.k=k;b.onclick=()=>{B=k;gambarB1();};$('bwb0').appendChild(b);});
  function gambarB1(){
   const wd=+sl.value,f=DATA.FISIKA.larmor_MHz[B],lam=R.c/(f*Math.sqrt(R.eps.d))*100;
   const m=Math.min(.6,.5*Math.pow(wd/lam,2)),N=60,p=[];
   for(let i=0;i<N;i++){const x=(i+.5)/N*wd-wd/2;p.push(1+m*Math.cos(2*Math.PI*x/lam));}
   const mn=Math.min(...p),mx=Math.max(...p),ket=(mx-mn)/(mx+mn)*100,rx=wd*5,x0=300-rx,lb=wd*10/N;
   let h=`<defs><clipPath id='bwclip'><ellipse cx='300' cy='80' rx='${rx}' ry='64'/></clipPath></defs><g clip-path='url(#bwclip)'>`;
   p.forEach((v,i)=>{h+=`<rect x='${(x0+i*lb).toFixed(1)}' y='10' width='${(lb+.6).toFixed(1)}' height='140' fill='var(--b0)' fill-opacity='${(.1+.8*(v-.4)/1.2).toFixed(2)}'/>`;});
   h+=`</g><ellipse cx='300' cy='80' rx='${rx}' ry='64' fill='none' stroke='var(--teks)' stroke-width='2'/>`+Tf(300,160,'penampang tubuh (gelap = B1 lemah, terang = B1 kuat)','var(--lembut)','middle',11);
   let pts='';p.forEach((v,i)=>{pts+=(x0+(i+.5)*lb).toFixed(1)+','+(205-(v-1)*60).toFixed(1)+' ';});
   h+=`<line x1='${x0}' y1='205' x2='${x0+wd*10}' y2='205' stroke='var(--garis)' stroke-dasharray='5 4'/><polyline points='${pts}' fill='none' stroke='var(--aksen)' stroke-width='3'/>`+Tf(x0,232,'profil B1 melintang (garis putus-putus: rata)','var(--lembut)','start',11);
   $('bwsvg').innerHTML=h;$('bwlv').textContent=wd;
   [...$('bwb0').children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===B));
   const r=wd/lam;
   $('bwk').textContent='Pada '+fmt(+B,B==='3'?0:1)+' T (frekuensi '+fmt(f,1)+' MHz) panjang gelombang di jaringan sekitar '+fmt(lam,0)+' cm. Lebar tubuh '+wd+' cm adalah '+fmt(r,1)+' kali panjang gelombang. Ketidakrataan B1 (gambaran) sekitar '+fmt(ket,0)+' persen. '+(r>.9?'Sebanding dengan panjang gelombang: interferensi kuat, ada area terang dan gelap pada citra, dan pemanasan (SAR) pun tidak merata.':(r>.7?'Mulai mendekati panjang gelombang: pola mulai tidak rata.':'Jauh lebih pendek dari panjang gelombang: pola relatif rata.'));
  }
  sl.oninput=gambarB1;
  $('bwr').onclick=()=>{B=B0S[0];sl.value=Bd.lebar_cm[2];gambarB1();};
  gambarB1();
 }
};}
