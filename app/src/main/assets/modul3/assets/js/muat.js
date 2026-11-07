/* Pemuat halaman: menyisipkan potongan HTML (data-sertakan), memuat skrip aktivitas (data-skrip),
   lalu menyalakan tab materi dan kuis. Perlu server lokal (Live Server di VS Code) karena memakai fetch.
   Versi satu file tanpa server dibuat dengan: python bangun.py  (hasil di folder dist/) */
(function(){
 function kartuMode(){
  document.querySelectorAll('.bm').forEach(k=>{
   if(k.dataset.mode) return;
   k.dataset.mode='singkat';
   const g=document.createElement('div');g.className='pilih';g.setAttribute('role','group');g.setAttribute('aria-label','Kedalaman materi kartu ini');
   [['singkat','Materi singkat'],['lengkap','Materi lengkap'],['analogi','Analogi']].forEach(([m,t])=>{
    const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',m==='singkat');
    b.onclick=()=>{k.dataset.mode=m;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));};
    g.appendChild(b);});
   (k.querySelector('.sub')||k.querySelector('.tag')).after(g);
  });
 }
 function kuisTingkat(){
  const el=document.getElementById('kuis');
  if(!el||typeof SOAL==='undefined'||typeof jalankanKuis==='undefined') return;
  const ada=[...new Set(SOAL.map(s=>s.tingkat).filter(Boolean))].sort();
  const bar=document.createElement('div');bar.className='nav-tingkat';bar.setAttribute('role','group');bar.setAttribute('aria-label','Pilih tingkat kuis');
  const isi=document.createElement('div');el.before(bar);el.appendChild(isi);
  const pilihan=[['semua','Semua tingkat']].concat(ada.map(t=>[String(t),'Tingkat '+t]));
  function jalan(v){
   bar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
   isi.innerHTML='';
   jalankanKuis(isi,v==='semua'?SOAL:SOAL.filter(s=>String(s.tingkat)===v));
  }
  pilihan.forEach(([v,t])=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.dataset.v=v;b.onclick=()=>jalan(v);bar.appendChild(b);});
  jalan('semua');
 }
 function muatSkrip(src){return new Promise((ok,gagal)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>gagal(new Error('Gagal memuat '+src));document.body.appendChild(s);});}
 function galat(e){
  const d=document.createElement('div');d.className='galat';d.setAttribute('role','alert');
  d.innerHTML='<b>Halaman ini perlu server lokal.</b><p>Buka lewat ekstensi Live Server di VS Code, atau jalankan <code>python -m http.server</code> di folder ini lalu buka <code>http://localhost:8000</code>. Atau buat versi satu file dengan <code>python bangun.py</code>.</p><p class="lembut">'+String(e.message||e)+'</p>';
  document.querySelector('main').prepend(d);
 }
 async function mulai(){
  try{
   const els=[...document.querySelectorAll('[data-sertakan]')];
   if(els.length){
    const hasil=await Promise.all(els.map(e=>fetch(e.dataset.sertakan).then(r=>{if(!r.ok)throw new Error(r.status+' '+e.dataset.sertakan);return r.text();})));
    els.forEach((e,i)=>{e.insertAdjacentHTML('afterend',hasil[i]);e.remove();});
   }
   const daftar=(document.body.dataset.skrip||'').split(/\s+/).filter(Boolean);
   for(const s of daftar) await muatSkrip(s);
  }catch(e){galat(e);return;}
  kartuMode();kuisTingkat();
  if(location.hash){const t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView();}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mulai);else mulai();
})();
