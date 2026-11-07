/* Registri aktivitas. Tiap file aktivitas memanggil daftarAktivitas('An',{...}).
   Field: judul, menjelaskan:[T..], mode:[[panel,label]] (opsional), html, mulai(root), lanjut, asal */
const AKTIVITAS={};
function daftarAktivitas(kode,d){AKTIVITAS[kode]=d;}
function renderAktivitas(wadahId){
 const w=$(wadahId);
 Object.keys(AKTIVITAS).sort((a,b)=>parseInt(a.slice(1))-parseInt(b.slice(1))).forEach(kode=>{
  const d=AKTIVITAS[kode],k=document.createElement('div');k.className='kartu'+(d.lanjut?' lanjut':'');k.id=kode;
  const mj=d.menjelaskan.map(t=>`<a href='#${t}'>${t}</a>`).join(', ');
  k.innerHTML=`<b>${kode}. ${d.judul}</b><p class='sumber lembut'>Menjelaskan: ${mj}.</p>`;
  if(d.mode){
   const g=document.createElement('div');g.className='pilih';g.setAttribute('role','group');g.setAttribute('aria-label','Pilih tampilan aktivitas');
   d.mode.forEach(([id,t],i)=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',i===0);
    b.onclick=()=>{[...g.children].forEach(x=>x.setAttribute('aria-pressed',x===b));k.querySelectorAll('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==id);};
    g.appendChild(b);});
   k.appendChild(g);
  }
  k.insertAdjacentHTML('beforeend',d.html);
  w.appendChild(k);
  if(d.mode)k.querySelectorAll('[data-panel]').forEach((p,i)=>p.hidden=i!==0);
  d.mulai(k);
 });
}
