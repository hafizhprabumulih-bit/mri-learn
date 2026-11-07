/* Sistem tab materi singkat / lengkap / analogi untuk setiap kartu .bm (dari bagian UI template). */
function pasangTabMateri(akar){
 (akar||document).querySelectorAll('.bm').forEach(k=>{
  k.dataset.mode='singkat';
  const g=document.createElement('div');g.className='pilih';g.setAttribute('role','group');g.setAttribute('aria-label','Kedalaman materi kartu ini');
  [['singkat','Materi singkat'],['lengkap','Materi lengkap'],['analogi','Analogi']].forEach(([m,t])=>{
   const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',m==='singkat');
   b.onclick=()=>{k.dataset.mode=m;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));};
   g.appendChild(b);});
  k.querySelector('.tag').after(g);
 });
}
