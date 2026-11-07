/* Render kartu materi dari array MATERI (lihat js/m07x/materi.js).
   Field: kode, tingkat, judul, singkat, lengkap, analogi, sim:[An], tautan:[[Mxx Tn.m, keterangan]], baru */
function renderMateri(wadahId,daftar){
 const w=$(wadahId),JUD={1:'Tingkat 1 (Dasar)',2:'Tingkat 2 (Menengah)',3:'Tingkat 3 (Lanjut)'};let tk=0;
 daftar.forEach(n=>{
  if(n.tingkat!==tk){tk=n.tingkat;const h=document.createElement('h3');h.textContent=JUD[tk];w.appendChild(h);}
  const k=document.createElement('div');k.className='kartu bm'+(n.tingkat===3?' lanjut':'')+(n.baru?' baru':'');k.id=n.kode;
  const sim=(n.sim||[]).map(a=>`<a href='#${a}'>${a}</a>`).join(', ');
  const tl=(n.tautan||[]).map(t=>t[0]+' ('+t[1]+')').join('; ');
  k.innerHTML=`<span class='tag'>${n.kode} \u00b7 ${n.judul}</span><p class='s'>${n.singkat}</p><div class='l'>${n.lengkap}</div><p class='a'><b>Analogi:</b> ${n.analogi}</p>`+((sim||tl)?`<p class='sumber lembut'>${sim?'\u25b6 Simulasi: '+sim+'. ':''}${tl?'\u2192 Tautan: '+tl+'.':''}</p>`:'');
  w.appendChild(k);
 });
 document.querySelectorAll('.bm').forEach(k=>{
  k.dataset.mode='singkat';
  const g=document.createElement('div');g.className='pilih';g.setAttribute('role','group');g.setAttribute('aria-label','Kedalaman materi kartu ini');
  [['singkat','Materi singkat'],['lengkap','Materi lengkap'],['analogi','Analogi']].forEach(([m,t])=>{
   const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',m==='singkat');
   b.onclick=()=>{k.dataset.mode=m;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));};
   g.appendChild(b);});
  k.querySelector('.tag').after(g);
 });
}
/* isi <span data-d='kunci'> (dari NIL) dan <span data-p='A.B'> (dari DATA) */
function isiNilai(){
 document.querySelectorAll('[data-d]').forEach(e=>{const v=NIL[e.dataset.d];e.textContent=fmt(v,Number.isInteger(v)?0:1);});
 document.querySelectorAll('[data-p]').forEach(e=>{const v=e.dataset.p.split('.').reduce((o,k)=>o[k],DATA);e.textContent=fmt(v,Number.isInteger(v)?0:1);});
}
