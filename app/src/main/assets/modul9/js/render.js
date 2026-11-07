/* RENDER: menyusun halaman dari URUTAN + MATERI + AKTIVITAS. Biasanya tidak perlu diubah. */
(function(){
 const isi=$('isi'), di=$('daftar-isi');
 const tab=[['singkat','Materi singkat'],['lengkap','Materi lengkap'],['analogi','Analogi']];
 di.className='daftar'; 
 const mulaiFn=[];
 function kartuMateri(m){
  const k=document.createElement('div'); k.className='kartu bm'; k.id=m.id; k.dataset.mode='singkat';
  let h='<span class="tag"><span class="kode">'+m.id+'</span>'+m.judul+'</span>';
  if(m.prasyarat) h+='<p class="meta">&#9873; Prasyarat: '+m.prasyarat+'</p>';
  if(m.opsional) h+='<p class="meta">Opsional.</p>';
  if(m.tujuan) h+='<p><b>Tujuan belajar:</b> '+m.tujuan+'</p>';
  h+='<div class="s">'+m.singkat+'</div><div class="l">'+m.lengkap+'</div><p class="a"><b>Analogi:</b> '+m.analogi+'</p>';
  if(m.tautan&&m.tautan.length) h+=m.tautan.map(t=>'<p class="tautan">&rarr; '+t+'</p>').join('');
  if(m.aktivitas&&m.aktivitas.length) h+='<p class="meta">Aktivitas terkait: '+m.aktivitas.map(a=>'<a href="#'+a+'">'+a+'</a>').join(', ')+'</p>';
  k.innerHTML=h;
  const g=document.createElement('div'); g.className='pilih'; g.setAttribute('role','group'); g.setAttribute('aria-label','Kedalaman materi kartu ini');
  tab.forEach(([mode,teks])=>{const b=document.createElement('button');b.type='button';b.textContent=teks;b.setAttribute('aria-pressed',mode==='singkat');
   b.onclick=()=>{k.dataset.mode=mode;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));};g.appendChild(b);});
  k.querySelector('.tag').after(g);
  return k;
 }
 function kartuAktivitas(a){
  const k=document.createElement('div'); k.className='kartu m5x akt'; k.id=a.id;
  k.innerHTML='<b><span class="kode akt">'+a.id+'</span>'+a.judul+'</b><p class="meta">Menjelaskan: '+a.menjelaskan.join(', ')+'</p>'+a.html;
  mulaiFn.push(a.mulai);
  return k;
 }
 URUTAN.forEach(t=>{
  const h=document.createElement('h2'); h.className='judul-tingkat'; h.textContent=t.judul; isi.appendChild(h);
  t.isi.forEach(kode=>{
   const m=MATERI[kode], a=AKTIVITAS[kode];
   if(!m&&!a){console.warn('Kode tidak ditemukan di folder materi/ atau aktivitas/: '+kode);return;}
   isi.appendChild(m?kartuMateri(m):kartuAktivitas(a));
   const l=document.createElement('a'); l.href='#'+kode; l.textContent=kode+' '+(m?m.judul:a.judul); if(a) l.className='akt'; di.appendChild(l);
  });
 });
 mulaiFn.forEach(f=>f());
 $('sumber').textContent=SUMBER;
 mulaiKuis($('kuis'),SOAL);
})();
