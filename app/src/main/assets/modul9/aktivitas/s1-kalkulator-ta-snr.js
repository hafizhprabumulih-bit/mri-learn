/* S1: Kalkulator TA, voksel, dan SNR (komponen bersama; mode ringkas dipakai di M04B).
   Menjelaskan T1.1-T1.4, T2.1-T2.3, T3.1, T3.2. Mode irisan dipindah dari M04 Lab #3.
   Nilai awal, slider, dan preset ada di bagian atas fungsi mulai().
   Revisi: tata letak 3 kolom (kanvas | kartu hasil | tombol preset), tombol preset seragam.
   Revisi 2: citra + 3 batang diperbesar; di bawah citra ada 3 toggle ( < ) ( nama citra ) ( > )
   untuk citra sebelumnya/berikutnya. Fantom: kepala sagital, kepala axial, knee sagital,
   knee coronal (semua digambar prosedural, ilustrasi). Fantom lumbal dan kepala coronal dihapus. */
daftarAktivitas({
 id:'S1', judul:'Kalkulator TA, voksel, dan SNR', menjelaskan:['T1.1','T1.2','T1.3','T1.4','T2.1','T2.2','T2.3','T3.1','T3.2'],
 html:`
<style>
.s1w{--s1-tombol-w:124px;--s1-tombol-h:38px}
.s1w .s1-kartu{border:1px solid var(--garis,#334);border-radius:12px;padding:10px;background:var(--kartu,rgba(127,127,127,.07));box-sizing:border-box}
.s1w .s1-atas{display:grid;grid-template-columns:minmax(0,1fr) 168px;gap:10px;align-items:stretch;margin:0}
.s1w .s1-kv{position:relative;min-width:0}
.s1w #s1-kanvas{width:100%;height:auto;display:block;border-radius:8px;background:#000;margin:0}
.s1w #s1-ganti{position:absolute;display:grid;grid-template-columns:15% 1fr 15%;grid-template-rows:1fr;gap:4px;margin:0;padding:0;box-sizing:border-box}
.s1w #s1-ganti button,.s1w #s1-ganti .s1-nama{height:100%;min-width:0;margin:0;padding:0 4px;box-sizing:border-box;font-size:13px;line-height:1.1;text-align:center;display:flex;align-items:center;justify-content:center;border-radius:6px;
 background:#1f2937;color:#9ca3af;border:1px solid #374151}
.s1w #s1-ganti button{width:100%;cursor:pointer;font-size:17px;font-weight:700}
.s1w #s1-ganti button:hover,.s1w #s1-ganti button:focus-visible{background:var(--aksen,#3b82f6);color:#fff;border-color:var(--aksen,#3b82f6)}
.s1w #s1-ganti .s1-nama{color:#e5e7eb;font-weight:600}
.s1w #s1-hasil{display:flex;flex-direction:column;gap:8px;margin:0;padding:0;background:none;border:0}
.s1w #s1-hasil>div{flex:1;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:10px 12px;border-radius:8px;border:1px solid var(--garis,#334);font-size:12.5px;line-height:1.25;box-sizing:border-box;width:100%;min-height:0}
.s1w #s1-hasil>div strong{display:block;font-size:17px;white-space:nowrap}
.s1w .s1-bawah{display:grid;grid-template-columns:minmax(0,1fr) var(--s1-tombol-w);gap:14px;align-items:start;margin-top:10px}
.s1w #s1-sl{display:grid;grid-template-columns:1fr 1fr;gap:8px 22px;margin:0}
.s1w #s1-sl>div{min-width:0}
.s1w #s1-sl label{display:flex;justify-content:space-between;gap:8px;font-size:13px}
.s1w #s1-sl input[type=range]{width:100%;margin:4px 0 0;box-sizing:border-box}
.s1w #s1-pre{display:grid;grid-auto-rows:var(--s1-tombol-h);gap:6px;margin:0;padding:0}
.s1w #s1-pre button{width:100%;height:100%;min-width:0;margin:0;padding:0 4px;box-sizing:border-box;font-size:12.5px;line-height:1.15;white-space:normal;text-align:center;display:flex;align-items:center;justify-content:center}
.s1w .lembut{margin:0 0 6px}
@media (max-width:760px){
 .s1w .s1-atas{grid-template-columns:1fr}
 .s1w #s1-hasil{display:grid;grid-template-columns:1fr 1fr}
 .s1w .s1-bawah{grid-template-columns:1fr}
 .s1w #s1-pre{grid-template-columns:repeat(3,1fr)}
 .s1w #s1-sl{grid-template-columns:1fr}
}
</style>
<div class="s1w">
<p class="lembut">Geser parameter. Gambar fantom (ilustrasi; ganti potongan dengan tombol &lt; &gt; di bawah citra) berbintik bila SNR turun; batang membandingkan dengan protokol awal (garis putus = 1&times;). Slider ETL dan partisi (T3.1) serta R (T3.2) adalah materi Tingkat 3.</p>
<div class="s1-kartu">
 <div class="s1-atas">
  <div class="s1-kv">
   <canvas id="s1-kanvas" width="800" height="492" role="img" aria-label="Fantom kepala sagital, kisi voksel, dan batang perbandingan SNR, resolusi, dan waktu"></canvas>
   <div id="s1-ganti" role="group" aria-label="Ganti citra fantom"></div>
  </div>
  <div class="hasil" role="status" aria-live="polite" id="s1-hasil"></div>
 </div>
 <div class="s1-bawah">
  <div class="sl" id="s1-sl"></div>
  <div id="s1-pre" role="group" aria-label="Preset protokol"></div>
 </div>
</div>
<div class="rumus">TA = TR &times; N<sub>fase</sub> &times; NEX &times; N<sub>partisi</sub> &divide; (ETL &times; R) | voksel = (FoV/N<sub>frek</sub>) &times; (FoV/N<sub>fase</sub>) &times; tebal | SNR &prop; voksel &times; &radic;(NEX&middot;N<sub>fase</sub>&middot;N<sub>partisi</sub>/BW/R)</div>
<p id="s1-misi" class="lembut"></p>
<div class="kartu lanjut"><h3>Studi kasus S1 (terkait T1.4)</h3>
<p>Pasien gelisah, protokol awal berjalan lebih dari 3 menit. Pilih preset "Kasus: pasien gelisah", lalu cari kombinasi dengan TA &le; 2 menit tanpa SNR turun di bawah 0,6&times;. Angka bersifat ilustrasi, bukan dari laporan pasien.</p></div>
<div class="kartu lanjut"><h3>Mode irisan (dipindah dari M04 Lab #3)</h3>
<p class="lembut">Tebal irisan &Delta;z = BW pulsa RF &divide; (&gamma; &times; Gz). Nilai Gz dibatasi rentang dari data.js.</p>
<label for="s1-bwrf">BW pulsa RF (kHz)</label><input type="number" id="s1-bwrf" min="0.5" max="5" step="0.1" value="1">
<label for="s1-gz">Gradien Gz: <span id="s1-gzv"></span> mT/m</label><input type="range" id="s1-gz">
<p class="hasil" id="s1-dz" aria-live="polite"></p></div>
</div>`,
 mulai(){
  /* ===== BAGIAN YANG BOLEH DIEDIT: nilai awal, slider, preset ===== */
  const B0={TR:500,FOV:240,NF:256,NP:192,TK:5,NEX:2,BW:200,ETL:1,NS:1,R:1};
  const B=B0,P={...B};
  // [kunci, label, min, maks, langkah]
  const SL=[['TR','TR (ms)',10,3000,10],['FOV','FoV (mm)',100,450,10],['NF','Matriks frekuensi',64,512,32],['NP','Matriks fase',64,512,16],['TK','Tebal irisan (mm)',1,10,0.5],['NEX','NEX',1,6,1],['BW','Bandwidth (Hz/piksel)',100,500,10],
   ['ETL','Turbo factor / ETL (T3.1)',1,32,1],['NS','Jumlah partisi 3D, 1 = 2D (T3.1)',1,64,1],['R','Faktor iPAT/SENSE R (T3.2)',1,4,1]];
  const MISI_NAMA='Kasus: pasien gelisah';
  const PRE=[['Awal',B],['Maks SNR',{...B,NEX:4,TK:8,BW:100,NF:192,NP:160}],['Maks resolusi',{...B,NF:512,NP:384,TK:3}],['Tercepat',{...B,TR:300,NP:128,NEX:1}],
   ['Turbo (TSE)',{...B,TR:4000,NP:256,NEX:1,ETL:16}],[MISI_NAMA,{...B,TR:700,NP:256,NEX:3,TK:4}]];
  /* ===== UKURAN KANVAS, FANTOM, BATANG, DAN TOGGLE (ubah di sini) ===== */
  const CW=800,CH=492;      // ukuran kanvas
  const S=400,X=12,Y=26;    // fantom: 400 x 400 px (sebelumnya 340)
  const TT=456,TH=30;       // toggle < nama > : posisi atas dan tinggi (px kanvas); lebar = S, kiri = X
  const BX=440,BW=348,BH=40;// batang: kiri, lebar, tinggi (diperbesar)
  const NMAKS=128;          // jumlah sel maksimum per sisi pada tampilan fantom
  /* ===== RUMUS ===== */
  function ukur(p){const px=p.FOV/p.NF,py=p.FOV/p.NP,vol=px*py*p.TK;
   return{px,py,vol,ta:p.TR/1000*p.NP*p.NEX*p.NS/(p.ETL*p.R),snr:vol*Math.sqrt(p.NEX*p.NP*p.NS/p.BW/p.R)};}
  /* ===== MESIN KALKULATOR ===== */
  const sl=document.getElementById('s1-sl'),inp={},val={};
  SL.forEach(([k,n,mn,mx,st])=>{
   const l=document.createElement('label');l.innerHTML='<span>'+n+'</span><b id="v'+k+'"></b>';
   const r=document.createElement('input');r.type='range';r.min=mn;r.max=mx;r.step=st;r.value=P[k];r.setAttribute('aria-label',n);
   r.oninput=()=>{P[k]=+r.value;hitung();};
   const w=document.createElement('div');w.append(l,r);sl.appendChild(w);inp[k]=r;val[k]=l.querySelector('b');
  });
  const pre=document.getElementById('s1-pre');
  PRE.forEach(([n,v])=>{const b=document.createElement('button');b.type='button';b.textContent=n;
   b.onclick=()=>{Object.assign(P,v);SL.forEach(([k])=>inp[k].value=P[k]);pre.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));misi=n===MISI_NAMA;hitung();};
   pre.appendChild(b);});
  let misi=false,R={},D={snr:1,res:1,ta:1};
  const U0=ukur(B);
  function hitung(){
   const u=ukur(P);
   R={...u,rs:u.snr/U0.snr,rr:Math.sqrt(U0.px*U0.py/(u.px*u.py)),rt:u.ta/U0.ta};
   SL.forEach(([k])=>val[k].textContent=P[k]);
   const m=Math.floor(u.ta/60),s=Math.round(u.ta%60);
   document.getElementById('s1-hasil').innerHTML=
    '<div>TA<strong>'+m+' mnt '+s+' dtk</strong></div><div>Piksel (frek × fase)<strong>'+u.px.toFixed(2)+' × '+u.py.toFixed(2)+' mm</strong></div>'+
    '<div>Volume voksel<strong>'+u.vol.toFixed(2)+' mm³</strong></div><div>SNR relatif<strong>'+R.rs.toFixed(2)+'×</strong></div>';
   const ms=document.getElementById('s1-misi');
   ms.textContent=(u.ta>300?'Peringatan: TA di atas 5 menit meningkatkan risiko gerakan pasien. ':'')+(misi?(u.ta<=120&&R.rs>=0.6?'Misi tercapai: TA ≤ 2 menit dan SNR ≥ 0,6×.':'Misi: capai TA ≤ 2 menit dan SNR ≥ 0,6×.'):'');
  }

  /* ===== FANTOM (gambar prosedural pada kanvas 256 x 256, ilustrasi) =====
     Nilai abu-abu 0..1 menyerupai citra T1: lemak dan sumsum tulang terang; CSF, cairan sendi,
     tendon, meniskus, dan tulang kortikal gelap. Setiap fungsi menerima konteks kanvas c dan
     alat T = {g, el, rc, poli}. */
  function fSagKepala(c,T){const{g,el}=T;
   // leher dan tulang belakang
   c.fillStyle=g(.38);c.beginPath();c.moveTo(100,170);c.lineTo(176,160);c.lineTo(192,256);c.lineTo(112,256);c.closePath();c.fill();
   for(let i=0;i<5;i++){c.fillStyle=g(.7);c.fillRect(160+i*5,174+i*16,17,12);}
   c.fillStyle=g(.1);c.fillRect(178,150,3,106);
   // wajah (menghadap kiri)
   c.fillStyle=g(.4);c.beginPath();c.moveTo(60,70);c.quadraticCurveTo(44,110,50,128);c.lineTo(30,148);c.quadraticCurveTo(32,156,48,158);
   c.lineTo(50,172);c.lineTo(46,184);c.quadraticCurveTo(52,204,78,206);c.lineTo(110,190);c.lineTo(110,100);c.closePath();c.fill();
   // kulit kepala, tengkorak, otak
   el(130,100,84,92,.45);
   el(130,100,78,86,.1);
   el(130,100,72,80,.5);
   el(130,100,64,72,.72);
   // sinus frontal, jalan napas hidung, rongga mulut
   el(58,110,4,10,.02);el(72,150,16,4,.03,-.25);el(82,183,13,5,.04);
   // korpus kalosum dan ventrikel lateral
   c.strokeStyle=g(.95);c.lineWidth=6;c.beginPath();c.ellipse(122,92,44,22,0,Math.PI*1.08,Math.PI*1.95);c.stroke();
   el(122,101,30,6,.08);
   el(126,118,14,10,.62);
   // batang otak
   c.save();c.translate(130,128);c.rotate(.28);c.fillStyle=g(.68);c.fillRect(-9,0,19,64);c.restore();
   // serebelum dengan lipatan
   el(168,142,32,22,.62,-.2);
   c.strokeStyle=g(.42);c.lineWidth=1.5;
   for(let i=1;i<=4;i++){c.beginPath();c.ellipse(168,142,32-i*6,22-i*4,-.2,0,6.2832);c.stroke();}
   el(149,140,4,7,.05);
  }
  function fAxKepala(c,T){const{g,el,rc}=T;
   el(128,28,9,10,.55);                       // hidung (anterior di atas)
   el(128,132,90,106,.82);                    // kulit kepala (lemak)
   el(128,132,84,100,.1);                     // tengkorak
   el(128,132,80,96,.14);                     // ruang subaraknoid (CSF)
   el(128,132,77,93,.5);                      // korteks (substansia grisea)
   el(128,132,68,83,.72);                     // substansia alba
   rc(127,44,2,176,.14);                      // fisura interhemisfer
   el(113,116,8,26,.08,.18);el(143,116,8,26,.08,-.18);   // ventrikel lateral
   el(128,138,2.5,10,.08);                    // ventrikel III
   el(111,140,10,13,.56);el(145,140,10,13,.56);          // talamus
   c.strokeStyle=g(.3);c.lineWidth=1.2;       // beberapa sulkus
   for(let i=0;i<7;i++){const a=i*0.9+.3;c.beginPath();c.moveTo(128+Math.cos(a)*70,132+Math.sin(a)*86);c.lineTo(128+Math.cos(a)*58,132+Math.sin(a)*72);c.stroke();}
  }
  function fSagKnee(c,T){const{g,el,rc,poli}=T;
   rc(44,0,168,256,.45);                      // otot dan jaringan lunak (anterior kiri, posterior kanan)
   rc(44,0,8,256,.85);rc(204,0,8,256,.85);    // lemak subkutan
   el(176,60,24,52,.5);el(178,222,24,44,.52); // otot hamstring dan betis (gastroknemius)
   // femur: korteks gelap + sumsum terang
   rc(98,0,56,104,.12);rc(104,0,44,104,.75);
   el(130,112,46,40,.12);el(130,112,41,35,.75);
   // tibia
   rc(100,178,58,78,.12);rc(106,178,46,78,.75);
   el(130,176,38,14,.12);el(130,176,33,10,.75);
   // tulang rawan sendi + celah sendi (cairan gelap)
   rc(92,148,76,4,.5);rc(96,162,68,4,.5);
   rc(92,152,76,10,.15);
   // lemak Hoffa, kantong suprapatela
   el(100,142,11,14,.85);
   el(92,74,6,20,.2);
   // patela (anterior)
   el(74,108,12,24,.12);el(74,108,8,19,.75);
   // tendon kuadrisep dan tendon patela
   poli([[66,48],[80,48],[84,86],[68,86]],.1);
   poli([[68,130],[82,130],[96,190],[84,190]],.1);
   el(92,190,6,9,.12);
   // meniskus (anterior dan posterior)
   poli([[94,152],[116,152],[106,164]],.08);
   poli([[146,152],[170,152],[160,164]],.08);
   // ligamen krusiatum
   c.strokeStyle=g(.1);c.lineWidth=4;c.beginPath();c.moveTo(134,146);c.lineTo(152,166);c.moveTo(150,148);c.lineTo(136,168);c.stroke();
   // pembuluh poplitea (flow void)
   el(170,138,5,5,.06);
  }
  function fCorKnee(c,T){const{g,el,rc,poli}=T;
   rc(60,0,136,256,.45);                      // otot dan jaringan lunak
   rc(60,0,8,256,.85);rc(188,0,8,256,.85);    // lemak subkutan
   // femur: korteks gelap + sumsum terang, kondilus medial dan lateral
   rc(104,0,50,100,.12);rc(109,0,40,100,.75);
   el(150,112,28,32,.12);el(106,112,28,32,.12);
   el(150,112,23,27,.75);el(106,112,23,27,.75);
   // tibia (dataran + batang) dan fibula
   rc(86,156,84,22,.12);rc(90,160,76,14,.75);
   rc(104,176,48,80,.12);rc(109,176,38,80,.75);
   rc(70,178,20,78,.12);rc(74,178,12,78,.7);
   el(80,172,12,10,.12);el(80,172,8,6,.7);
   // eminensia interkondilar, celah sendi, tulang rawan
   poli([[122,156],[128,142],[134,156]],.12);
   rc(88,146,80,10,.15);
   rc(88,142,80,3,.5);rc(88,156,80,2,.5);
   // meniskus medial dan lateral
   poli([[92,148],[116,148],[112,157],[94,157]],.08);
   poli([[140,148],[164,148],[162,157],[144,157]],.08);
   // ligamen krusiatum di fosa interkondilar
   c.strokeStyle=g(.1);c.lineWidth=4;c.beginPath();c.moveTo(122,114);c.lineTo(132,146);c.moveTo(134,114);c.lineTo(124,146);c.stroke();
   // ligamen kolateral medial dan lateral
   rc(178,116,5,52,.1);rc(74,116,4,50,.1);
  }
  // [kunci, teks di toggle, nama di caption, FoV (mm) saat fantom pas, fungsi gambar]
  const FAN=[
   ['kepala_sagital','Kepala Sagital','Fantom kepala sagital',240,fSagKepala],
   ['kepala_axial','Kepala Axial','Fantom kepala axial',220,fAxKepala],
   ['knee_sagital','Knee Sagital','Fantom knee sagital',200,fSagKnee],
   ['knee_coronal','Knee Coronal','Fantom knee coronal',200,fCorKnee]];
  let aktif=0;
  function gambarFantom(c,s,f){
   const g=v=>{const k=Math.round(v*255);return 'rgb('+k+','+k+','+k+')';};
   const T={g,
    el:(x,y,rx,ry,v,rot)=>{c.fillStyle=g(v);c.beginPath();c.ellipse(x,y,rx,ry,rot||0,0,6.2832);c.fill();},
    rc:(x,y,w,h,v)=>{c.fillStyle=g(v);c.fillRect(x,y,w,h);},
    poli:(pts,v)=>{c.fillStyle=g(v);c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();}};
   c.setTransform(1,0,0,1,0,0);c.fillStyle='#000';c.fillRect(0,0,256,256);
   c.save();c.translate(128,128);c.scale(s,s);c.translate(-128,-128);
   f(c,T);
   c.restore();
  }
  const base=document.createElement('canvas');base.width=base.height=256;const bc=base.getContext('2d');
  const kecil=document.createElement('canvas'),kc=kecil.getContext('2d');
  let kunci='',dasar=null,nxC=0,nyC=0;
  function siapkan(){
   const f=FAN[aktif];
   const s=Math.min(1.5,Math.max(.55,f[3]/P.FOV));
   const nx=Math.min(NMAKS,Math.max(32,Math.round(P.NF/4))),ny=Math.min(NMAKS,Math.max(32,Math.round(P.NP/4)));
   const k=aktif+'|'+s.toFixed(3)+'|'+nx+'|'+ny;
   if(k===kunci)return;
   kunci=k;gambarFantom(bc,s,f[4]);
   kecil.width=nx;kecil.height=ny;kc.imageSmoothingEnabled=true;kc.drawImage(base,0,0,nx,ny);
   dasar=kc.getImageData(0,0,nx,ny);nxC=nx;nyC=ny;
  }

  /* ===== TOGGLE ( < ) ( nama citra ) ( > ) di bawah citra, lebar = lebar citra ===== */
  const ganti=document.getElementById('s1-ganti');
  ganti.style.left=(X/CW*100)+'%';ganti.style.width=(S/CW*100)+'%';
  ganti.style.top=(TT/CH*100)+'%';ganti.style.height=(TH/CH*100)+'%';
  const bSblm=document.createElement('button'),bNama=document.createElement('div'),bSsdh=document.createElement('button');
  bSblm.type=bSsdh.type='button';bSblm.textContent='<';bSsdh.textContent='>';
  bSblm.setAttribute('aria-label','Citra sebelumnya');bSsdh.setAttribute('aria-label','Citra berikutnya');
  bNama.className='s1-nama';bNama.setAttribute('aria-live','polite');
  function pilih(i){
   aktif=(i+FAN.length)%FAN.length;kunci='';
   bNama.textContent=FAN[aktif][1]+'  ('+(aktif+1)+'/'+FAN.length+')';
   document.getElementById('s1-kanvas').setAttribute('aria-label',FAN[aktif][2]+', kisi voksel, dan batang perbandingan SNR, resolusi, dan waktu');
  }
  bSblm.onclick=()=>pilih(aktif-1);bSsdh.onclick=()=>pilih(aktif+1);
  ganti.append(bSblm,bNama,bSsdh);pilih(0);

  hitung();pre.firstChild.setAttribute('aria-pressed',true);
  const cv=document.getElementById('s1-kanvas'),cx=cv.getContext('2d');
  const warna=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  let tl=0;
  function gambar(t){
   requestAnimationFrame(gambar);
   if(t-tl<80)return;tl=t;
   D.snr+=(R.rs-D.snr)*.25;D.res+=(R.rr-D.res)*.25;D.ta+=(R.rt-D.ta)*.25;
   cx.clearRect(0,0,CW,CH);
   siapkan();
   const amp=Math.min(1.1,0.3/Math.max(D.snr,.05));
   const im=kc.createImageData(nxC,nyC),src=dasar.data,dst=im.data;
   for(let i=0;i<src.length;i+=4){
    let v=src[i]/255+(Math.random()-.5)*amp;
    v=Math.max(0,Math.min(1,v));const gr=Math.round(v*255);
    dst[i]=dst[i+1]=dst[i+2]=gr;dst[i+3]=255;}
   kc.putImageData(im,0,0);
   cx.imageSmoothingEnabled=false;
   cx.drawImage(kecil,0,0,nxC,nyC,X,Y,S,S);
   cx.strokeStyle=warna('--aksen');cx.lineWidth=2;cx.strokeRect(X,Y,S,S);
   cx.fillStyle=warna('--lembut');cx.font='12px system-ui';
   cx.fillText(FAN[aktif][2]+' (FoV '+P.FOV+' mm), '+nxC+'×'+nyC+' sel ilustrasi',X,20);
   cx.fillText('Tebal irisan: '+P.TK+' mm',X,Y+S+18);
   cx.fillStyle=warna('--t2');cx.fillRect(X+S-P.TK*8-4,Y+S+8,P.TK*8,6);
   const bars=[['SNR',D.snr,warna('--t2')],['Resolusi',D.res,warna('--aksen')],['Waktu (TA)',D.ta,warna('--t1')]];
   const jarak=(S-3*BH-34)/2+BH;      // batang tersebar mengisi tinggi citra
   bars.forEach(([n,v,c],i)=>{const y=Y+34+i*jarak;
    cx.fillStyle=warna('--teks');cx.font='16px system-ui';cx.fillText(n+'  '+v.toFixed(2)+'×',BX,y-12);
    cx.fillStyle=warna('--garis');cx.fillRect(BX,y,BW,BH);
    cx.fillStyle=c;cx.fillRect(BX,y,Math.min(v,3)/3*BW,BH);
    cx.strokeStyle=warna('--teks');cx.setLineDash([4,3]);cx.lineWidth=1;cx.beginPath();cx.moveTo(BX+BW/3,y-4);cx.lineTo(BX+BW/3,y+BH+4);cx.stroke();cx.setLineDash([]);});
   cx.fillStyle=warna('--lembut');cx.font='11px system-ui';cx.fillText('garis putus = protokol awal (1×); skala maks 3×',BX,Y+S+18);
  }
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){D.snr=R.rs;D.res=R.rr;D.ta=R.rt;}
  requestAnimationFrame(gambar);


  /* Mode irisan */
  const G=DATA.INSTRUMEN.gradien_mT_per_m, gz=$('s1-gz'), bwr=$('s1-bwrf');
  gz.min=G[0];gz.max=G[1];gz.value=G[0];
  function irisan(){$('s1-gzv').textContent=gz.value;
   const dz=(+bwr.value*1000)/(DATA.FISIKA.gamma_MHz_per_T*1e6*gz.value/1000)*1000;
   $('s1-dz').textContent='Tebal irisan \u0394z = '+dz.toFixed(2)+' mm';}
  gz.oninput=irisan;bwr.oninput=irisan;irisan();
 }
});
