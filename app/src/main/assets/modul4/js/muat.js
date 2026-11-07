/* =====================================================================
   PEMUAT HALAMAN MODUL
   Membaca struktur/<kode>.json (pohon kode T/A), mengambil file materi dan
   simulasi, menyusunnya menjadi halaman, lalu memuat skrip simulasi.
   Perlu server lokal (VS Code: ekstensi "Live Server"), bukan file://
   ===================================================================== */
(function(){
const kode=document.body.dataset.modul;
const app=document.getElementById('app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function ambil(u){const r=await fetch(u);if(!r.ok)throw new Error(u+' (HTTP '+r.status+')');return r.text();}
function muatSkrip(src){return new Promise((ok,gagal)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=ok;s.onerror=()=>gagal(new Error('Gagal memuat '+src));document.body.appendChild(s);});}

/* daftar datar semua node materi dan simulasi (termasuk anak) */
function datar(a){const h=[];(a||[]).forEach(n=>{h.push(n);datar(n.anak).forEach(x=>h.push(x));});return h;}

async function mulai(){
 let S;
 try{S=JSON.parse(await ambil('struktur/'+kode+'.json'));}
 catch(e){
  app.innerHTML='<div class="galat"><b>Modul tidak dapat dimuat.</b><p>'+esc(e.message)+'</p><p>Halaman ini mengambil file lewat <code>fetch</code>, jadi harus dibuka lewat server lokal. Di VS Code: pasang ekstensi <b>Live Server</b>, klik kanan <code>index.html</code> di folder utama Grand Design, lalu pilih <b>Open with Live Server</b>. Membuka file langsung (file://) tidak berfungsi.</p></div>';
  return;
 }
 document.title=S.id+' · '+S.judul;
 const semuaMat=datar(S.materi.node),semuaSim=datar(S.simulasi);
 const jMat={},jSim={};semuaMat.forEach(n=>jMat[n.kode]=n);semuaSim.forEach(n=>jSim[n.kode]=n);

 /* ambil semua file sekaligus */
 const tugas=[];
 const minta=(u)=>{const t=ambil(u);tugas.push(t);return t;};
 const frag={};
 const daftarFile=[];
 if(S.materi.pengantar)daftarFile.push(S.materi.pengantar.file);
 semuaMat.forEach(n=>{if(n.file)daftarFile.push(n.file);(n.ilustrasi||[]).forEach(f=>daftarFile.push(f));});
 semuaSim.forEach(n=>{if(n.html)daftarFile.push(n.html);});
 try{
  const isi=await Promise.all(daftarFile.map(ambil));
  daftarFile.forEach((f,i)=>frag[f]=isi[i]);
 }catch(e){
  app.innerHTML='<div class="galat"><b>Ada file materi/simulasi yang tidak ditemukan.</b><p>'+esc(e.message)+'</p><p>Periksa nama file di <code>struktur/'+esc(kode)+'.json</code>.</p></div>';
  return;
 }

 const linkMat=ks=>(ks||[]).map(k=>'<a href="#'+esc(k)+'" title="'+esc(jMat[k]?jMat[k].judul:'')+'">'+esc(k)+'</a>').join(', ');
 const linkSim=ks=>(ks||[]).map(k=>'<a href="#'+esc(k)+'" title="'+esc(jSim[k]?jSim[k].judul:'')+'">'+esc(k)+'</a>').join(', ');
 const lencana=n=>n.baru?'<span class="lencana" title="Simpul usulan, perlu dikonfirmasi">BARU</span>':'';

 /* peta pohon */
 function petaMat(a){return '<ul>'+a.map(n=>'<li><span class="kode">'+esc(n.kode)+'</span><a href="#'+esc(n.kode)+'">'+esc(n.judul)+'</a>'+(n.simulasi&&n.simulasi.length?' <span class="lembut">▶ '+esc(n.simulasi.join(', '))+'</span>':'')+(n.anak?petaMat(n.anak):'')+'</li>').join('')+'</ul>';}
 function petaSim(a){return '<ul>'+a.map(n=>'<li><span class="kode">'+esc(n.kode)+'</span><a href="#'+esc(n.kode)+'">'+esc(n.judul)+'</a> <span class="lembut">menjelaskan: '+esc((n.menjelaskan||[]).join(', '))+'</span>'+(n.anak?petaSim(n.anak):'')+'</li>').join('')+'</ul>';}

 function kartuMat(n){
  const f=n.file?frag[n.file]:'';
  const sim=n.simulasi&&n.simulasi.length?'<p class="tautan-sim">▶ Simulasi untuk materi ini: '+linkSim(n.simulasi)+'</p>':'';
  const il=(n.ilustrasi||[]).map(u=>frag[u]).join('\n');
  return '<div class="kartu bm'+(n.lanjut?' lanjut':'')+'" id="'+esc(n.kode)+'"><span class="tag"><span class="kode">'+esc(n.kode)+'</span> '+esc(n.judul)+lencana(n)+'</span>\n'+f+'\n'+sim+'</div>\n'+il;
 }
 function bagianMat(a){
  return a.map(n=>{
   if(n.anak&&!n.file){
    const sim=n.simulasi&&n.simulasi.length?'<p class="tautan-sim">▶ Simulasi untuk kelompok ini: '+linkSim(n.simulasi)+'</p>':'';
    return '<h3 class="kel-fakta" id="'+esc(n.kode)+'"><span class="kode">'+esc(n.kode)+'</span> '+esc(n.judul)+'</h3>'+(n.pengantar?'<p class="lembut">'+esc(n.pengantar)+'</p>':'')+sim+bagianMat(n.anak);
   }
   return kartuMat(n);
  }).join('\n');
 }
 function bagianSim(a,sub){
  return a.map(n=>{
   const tag=sub?'h4':'h3';
   const mj=n.menjelaskan&&n.menjelaskan.length?'<p class="lembut">Menjelaskan materi: '+linkMat(n.menjelaskan)+'</p>':'';
   const badan=n.html?'<div class="kartu">\n'+frag[n.html]+'\n</div>':'';
   const anak=n.anak?'<div class="sim-sub">'+bagianSim(n.anak,true)+'</div>':'';
   return '<'+tag+' id="'+esc(n.kode)+'"><span class="kode">'+esc(n.kode)+'</span> '+esc(n.judul)+lencana(n)+'</'+tag+'>'+mj+badan+anak;
  }).join('\n');
 }

 const nv=S.nav||{};
 let h='<nav class="atas">'+(nv.kiri?'<a href="'+esc(nv.kiri.href)+'">'+esc(nv.kiri.teks)+'</a>':'<span></span>')+'<a href="'+esc(nv.induk?nv.induk.href:'index.html')+'">'+esc(nv.induk?nv.induk.teks:'Beranda')+'</a>'+(nv.kanan?'<a href="'+esc(nv.kanan.href)+'">'+esc(nv.kanan.teks)+'</a>':'<span></span>')+'</nav>';
 h+='<h1>'+esc(S.id)+': '+esc(S.judul)+'</h1>';
 h+='<p class="lembut">'+esc(S.pecahan)+' &middot; Media belajar, bukan untuk keputusan klinis.</p>';
 h+='<div class="kartu ringkas-modul"><p><b>Prasyarat:</b> '+esc(S.prasyarat.join(', '))+'</p><p><b>Dilanjutkan:</b> '+esc(S.dilanjutkan.join(', '))+'</p>'+(S.tujuan&&S.tujuan.length?'<p><b>Tujuan pembelajaran:</b></p><ul>'+S.tujuan.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'')+'</div>';
 h+='<details class="kartu peta"><summary>Peta isi modul (pohon kode)</summary><p><b>Materi</b></p>'+(S.materi.pengantar?'':'')+petaMat(S.materi.node)+'<p><b>Simulasi</b></p>'+petaSim(S.simulasi)+'<p><b>Cek pemahaman</b></p><ul><li><a href="#kuis-bagian">'+esc(S.kuis.judul)+'</a></li></ul></details>';
 h+='<h2>Materi</h2><p class="lembut">Tiap kartu punya pilihan sendiri: materi singkat, materi lengkap, atau analogi. Kode (T = materi, A = simulasi) mengikuti pohon modul. Tanda ▶ pada kartu menunjuk simulasi yang menjelaskan materi itu.</p>';
 h+='<h3 class="kel-fakta">'+esc(S.materi.judul)+'</h3>';
 if(S.materi.pengantar){const p=S.materi.pengantar;h+='<div class="kartu bm" id="pengantar"><span class="tag">'+esc(p.judul)+'</span>\n'+frag[p.file]+'\n</div>';}
 h+=bagianMat(S.materi.node);
 h+='<h2>Simulasi</h2>'+bagianSim(S.simulasi,false);
 h+='<h2 id="kuis-bagian">Cek pemahaman</h2><p class="lembut">'+esc(S.kuis.judul)+'</p><div id="kuis"></div>';
 if(S.tautan&&S.tautan.length)h+='<h2>Tautan silang</h2><ul>'+S.tautan.map(t=>'<li>'+esc(t.teks)+' &mdash; <b>'+esc(t.tujuan)+'</b></li>').join('')+'</ul>';
 app.innerHTML=h;

 pasangTabMateri(app);
 pasangIlustrasi(app);

 /* skrip simulasi, berurutan */
 try{
  for(const n of semuaSim){if(n.js)await muatSkrip(n.js);}
  await muatSkrip(S.kuis.file);
  jalankanKuis(document.getElementById('kuis'),SOAL);
 }catch(e){
  app.insertAdjacentHTML('beforeend','<div class="galat"><b>Skrip gagal dimuat.</b><p>'+esc(e.message)+'</p></div>');
  console.error(e);
 }
 if(location.hash){const e=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(e)e.scrollIntoView();}
 document.dispatchEvent(new Event('modul-siap'));
}
mulai();
})();
