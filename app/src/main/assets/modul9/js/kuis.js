/* MESIN KUIS: pilih tingkat, opsi diacak. Soal ada di kuis/soal.js. */
function mulaiKuis(wadah,semua){
 let filter=0, daftar=[], i=0, st=[];
 function siap(){
  daftar=semua.filter(s=>!filter||s.tingkat===filter).map(s=>{
   const urut=acak(s.pilihan.map((t,k)=>k)); return {s, urut, benarPos:urut.indexOf(s.jawaban)};
  });
  st=daftar.map(()=>({salah:new Set(),benar:-1})); i=0;
 }
 const skor=()=>st.filter(x=>x.benar>=0&&x.salah.size===0).length;
 function tampil(){
  wadah.innerHTML='';
  const bar=document.createElement('div'); bar.className='pilih'; bar.setAttribute('role','group'); bar.setAttribute('aria-label','Pilih tingkat kuis');
  [[0,'Semua tingkat'],[1,'Tingkat 1'],[2,'Tingkat 2'],[3,'Tingkat 3']].forEach(([n,t])=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',filter===n);b.onclick=()=>{filter=n;siap();tampil();};bar.appendChild(b);});
  wadah.appendChild(bar);
  const kartu=document.createElement('div'); kartu.className='kartu'; wadah.appendChild(kartu);
  if(i>=daftar.length){
   kartu.innerHTML='<b>Skor: '+skor()+' / '+daftar.length+'</b><p class="lembut">Dihitung dari soal yang benar pada percobaan pertama.</p>';
   const n=document.createElement('div'); n.className='navkuis';
   const b1=document.createElement('button'); b1.textContent='\u2190 Kembali ke soal'; b1.onclick=()=>{i=daftar.length-1;tampil();};
   const b2=document.createElement('button'); b2.textContent='Ulangi kuis'; b2.onclick=()=>{siap();tampil();};
   n.append(b1,b2); kartu.appendChild(n); return;
  }
  const d=daftar[i], s=d.s, t=st[i];
  const p=document.createElement('p'); p.innerHTML='<b>'+(i+1)+'/'+daftar.length+'.</b> <span class="meta">['+s.simpul+']</span> '+s.pertanyaan; kartu.appendChild(p);
  d.urut.forEach((asli,k)=>{
   const teks=s.pilihan[asli], b=document.createElement('button'); b.className='opsi'; b.type='button';
   if(t.benar===k){b.classList.add('benar');b.textContent='\u2713 '+teks;}
   else if(t.salah.has(k)){b.classList.add('salah');b.textContent='\u2717 '+teks;}
   else b.textContent=teks;
   b.disabled=(t.benar>=0&&t.benar!==k)||t.salah.has(k);
   b.onclick=()=>{if(t.benar>=0)return;if(k===d.benarPos)t.benar=k;else t.salah.add(k);tampil();};
   kartu.appendChild(b);
  });
  const info=document.createElement('p'); info.setAttribute('role','status'); info.setAttribute('aria-live','polite');
  if(t.benar>=0){info.className='ok';info.textContent='Benar. '+s.penjelasan;}
  else if(t.salah.size){info.className='no';info.textContent='Belum tepat. Coba pilihan lain.';}
  kartu.appendChild(info);
  const n=document.createElement('div'); n.className='navkuis';
  const bk=document.createElement('button'); bk.textContent='\u2190 Kembali'; bk.disabled=i===0; bk.onclick=()=>{i--;tampil();};
  const bl=document.createElement('button'); bl.textContent=i===daftar.length-1?'Selesai':'Lanjut \u2192'; bl.onclick=()=>{i++;tampil();};
  n.append(bk,bl); kartu.appendChild(n);
 }
 siap(); tampil();
}
