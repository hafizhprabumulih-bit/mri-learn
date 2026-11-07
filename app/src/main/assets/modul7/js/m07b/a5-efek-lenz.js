/* A5 · Efek Lenz: benda konduktor jatuh melalui medan, terlihat melambat   [BARU]
   Menjelaskan: T2.6. Gambaran kualitatif; angka ilustratif (DATA.LENZ di data-tambahan.js). */
daftarAktivitas('A5',{
 judul:'Efek Lenz: konduktor jatuh melalui medan',
 menjelaskan:['T2.6'],
 html:`<p class='lembut'>Dua blok dilepas bersamaan: pembanding jatuh bebas (kiri) dan blok pilihan Anda (kanan). Di medan statis, arus induksi melawan gerakan, jadi blok konduktor melambat walau bukan ferromagnetik. Gambaran kualitatif, diperlambat agar terlihat.</p>
<div class='pilih' id='lzb' role='group' aria-label='Pilih kekuatan medan'></div>
<div class='pilih' id='lzm' role='group' aria-label='Pilih bahan blok'></div>
<svg id='lzsvg' viewBox='0 0 600 240' role='img' aria-label='Dua blok jatuh melalui medan magnet'></svg>
<p class='hasil' id='lzk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='lzj'>Jatuhkan</button><button type='button' id='lzr'>Reset</button></div>`,
 mulai(root){
  const Lz=DATA.LENZ,g=9.8,H=Lz.tinggi,warna=['#868e96','#adb5bd','#c2763c'];
  let bi=2,mi=2,ti=null;
  const aa=()=>Lz.c*Lz.bahan[mi][1]*Math.pow(Lz.medan_T[bi],2);
  const yAt=(a,t)=>a<=0?.5*g*t*t:(g/a)*t-(g/(a*a))*(1-Math.exp(-a*t));
  const tFall=a=>{let t=0;while(yAt(a,t)<H&&t<200)t+=.002;return t;};
  Lz.medan_T.forEach((m,i)=>{const b=document.createElement('button');b.type='button';b.textContent=m===0?'Tanpa medan':fmt(m,m%1?1:0)+' T';b.onclick=()=>{hentiLz();bi=i;gambarLz(0);};$('lzb').appendChild(b);});
  Lz.bahan.forEach((m,i)=>{const b=document.createElement('button');b.type='button';b.textContent=m[0];b.onclick=()=>{hentiLz();mi=i;gambarLz(0);};$('lzm').appendChild(b);});
  function gambarLz(tt){
   const a=aa(),B=Lz.medan_T[bi],Y=y=>20+Math.min(y/H,1)*150;
   let h='';
   if(B>0)for(let x=60;x<=540;x+=30)h+=`<line x1='${x}' y1='10' x2='${x}' y2='200' stroke='var(--aksen)' stroke-opacity='${Math.min(.15+B/10,.6)}' stroke-width='2'/>`;
   h+=`<line x1='40' y1='200' x2='560' y2='200' stroke='var(--teks)' stroke-width='3'/>`;
   h+=`<rect x='140' y='${Y(yAt(0,tt))}' width='70' height='30' fill='${warna[0]}' stroke='var(--teks)'/>`+Tf(175,222,'pembanding (jatuh bebas)','var(--lembut)','middle',11);
   h+=`<rect x='390' y='${Y(yAt(a,tt))}' width='70' height='30' fill='${warna[mi]}' stroke='var(--teks)'/>`+Tf(425,222,Lz.bahan[mi][0],'var(--lembut)','middle',11);
   $('lzsvg').innerHTML=h;
   [...$('lzb').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===bi));[...$('lzm').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===mi));
   const t0=tFall(0),t1=tFall(a);
   $('lzk').textContent=a<=0?'Tanpa arus induksi (bahan non-konduktor atau tanpa medan): blok jatuh seperti pembanding, sekitar '+fmt(t0,2)+' detik untuk '+fmt(H,1)+' m.'
    :'Arus induksi melawan gerakan (hukum Lenz): blok melambat dan kecepatannya mendekati '+fmt(g/a,2)+' m/s. Waktu jatuh '+fmt(H,1)+' m sekitar '+fmt(t1,2)+' detik, dibanding '+fmt(t0,2)+' detik untuk jatuh bebas. Makin kuat medan dan makin konduktif bahan, makin lambat. Hal serupa terjadi bila logam bergerak melalui gradien medan statis, termasuk fungsi katup jantung logam lama pada uji in vitro.';
  }
  function hentiLz(){if(ti){clearInterval(ti);ti=null;}}
  $('lzj').onclick=()=>{
   hentiLz();const t0=tFall(0);
   if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){gambarLz(t0);return;}
   const mulai=Date.now(),tampil=1.5;
   ti=setInterval(()=>{const r=(Date.now()-mulai)/1000,tt=r*t0/tampil;gambarLz(tt);if(r>=Math.max(tampil,6)||tt>=tFall(aa())&&tt>=t0)hentiLz();},40);
  };
  $('lzr').onclick=()=>{hentiLz();bi=2;mi=2;gambarLz(0);};
  gambarLz(0);
 }
});
