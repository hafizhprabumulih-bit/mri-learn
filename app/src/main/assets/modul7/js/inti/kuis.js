/* TETAP: awal */
// Mesin pemroses kuis bawaan template
function jalankanKuis(el,soal){
 let i=0;const st=soal.map(()=>({salah:new Set(),benar:-1}));
 function skor(){return st.filter(x=>x.benar>=0&&x.salah.size===0).length;}
 function tampil(){
  el.innerHTML='';
  const kartu=document.createElement('div');kartu.className='kartu';el.appendChild(kartu);
  if(i>=soal.length){
   kartu.innerHTML='<b>Skor: '+skor()+' / '+soal.length+'</b><p class=\'lembut\'>Dihitung dari soal yang benar pada percobaan pertama.</p>';
   const n=document.createElement('div');n.className='navkuis';
   const b1=document.createElement('button');b1.textContent='\u2190 Kembali ke soal';b1.onclick=()=>{i=soal.length-1;tampil();};
   const b2=document.createElement('button');b2.textContent='Ulangi kuis';b2.onclick=()=>{st.forEach(x=>{x.salah.clear();x.benar=-1;});i=0;tampil();};
   n.append(b1,b2);kartu.appendChild(n);return;
  }
  const s=soal[i],t=st[i];
  const p=document.createElement('p');p.innerHTML='<b>'+(i+1)+'/'+soal.length+'.</b> '+s.pertanyaan;kartu.appendChild(p);
  s.pilihan.forEach((teks,k)=>{
   const b=document.createElement('button');b.className='opsi';b.type='button';
   if(t.benar===k){b.classList.add('benar');b.textContent='\u2713 '+teks;}
   else if(t.salah.has(k)){b.classList.add('salah');b.textContent='\u2717 '+teks;}
   else b.textContent=teks;
   b.disabled=(t.benar>=0&&t.benar!==k)||t.salah.has(k);
   b.onclick=()=>{if(t.benar>=0)return;if(k===s.jawaban)t.benar=k;else t.salah.add(k);tampil();};
   kartu.appendChild(b);
  });
  const info=document.createElement('p');info.setAttribute('role','status');info.setAttribute('aria-live','polite');
  if(t.benar>=0){info.className='ok';info.textContent='Benar. '+s.penjelasan;}
  else if(t.salah.size){info.className='no';info.textContent='Belum tepat. Coba pilihan lain.';}
  kartu.appendChild(info);
  const n=document.createElement('div');n.className='navkuis';
  const bk=document.createElement('button');bk.textContent='\u2190 Kembali';bk.disabled=i===0;bk.onclick=()=>{i--;tampil();};
  const bl=document.createElement('button');bl.textContent=i===soal.length-1?'Selesai':'Lanjut \u2192';bl.onclick=()=>{i++;tampil();};
  n.append(bk,bl);kartu.appendChild(n);
 }
 tampil();
}
/* TETAP: akhir */

/* --- Tambahan: kuis dinamis per tingkat (di luar blok TETAP) --- */
function kuisBertingkat(el,soal,tingkat){
 const bar=document.createElement('div');bar.className='pilih';bar.setAttribute('role','group');bar.setAttribute('aria-label','Pilih tingkat kuis');
 const kotak=document.createElement('div');el.append(bar,kotak);
 const opsi=[['Semua tingkat',()=>true]].concat(tingkat.map(t=>['Tingkat '+t+(t===3?' (lanjut)':''),s=>s.tingkat===t]));
 opsi.forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.textContent=o[0];
  b.onclick=()=>{[...bar.children].forEach(x=>x.setAttribute('aria-pressed',x===b));jalankanKuis(kotak,soal.filter(o[1]));};
  bar.appendChild(b);});
 bar.children[0].click();
}
