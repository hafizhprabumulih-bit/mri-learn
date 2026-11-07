/* kuis kasus sekuens */
(function(){
const K=[
 {t:'Anatomi pergelangan kaki potongan sagital dengan bobot T1.',a:'in',p:'Sekuens inkoheren hanya membaca FID, sehingga T1 dan PD dominan dan anatomi T1 tampak baik.'},
 {t:'Angiografi: dibutuhkan sinyal yang sangat peka terhadap aliran.',a:'co',p:'Sekuens koheren sangat peka terhadap aliran, sehingga berguna untuk angiografi.'},
 {t:'Citra T1 setelah injeksi gadolinium dalam satu tahan napas.',a:'in',p:'Sekuens inkoheren memakai TR pendek, cocok untuk citra T1 tahan napas dan anatomi serta kelainan setelah gadolinium.'},
 {t:'Citra berbobot T2 sejati dengan TR pendek (dahulu dipakai untuk otak dan sendi).',a:'rev',p:'Reverse-echo menghasilkan TE efektif yang lebih panjang daripada TR, sehingga bobot T2 sejati dapat dicapai dengan TR pendek.'},
 {t:'Pencitraan perfusi yang butuh akuisisi cepat dan TE panjang.',a:'rev',p:'Prinsip menggeser gema terstimulasi dipakai pada sekuens yang butuh akuisisi cepat dan TE panjang, misalnya perfusi.'}];
const el=$('m3x-kasus'),N={co:'Koheren',in:'Inkoheren',rev:'Reverse-echo'};let i=0,ok=null,sal=new Set();
function r(){
 el.innerHTML='';const p=document.createElement('p');p.innerHTML='<b>Kasus '+(i+1)+'/'+K.length+'.</b> '+K[i].t;el.appendChild(p);
 Object.keys(N).forEach(k=>{const b=document.createElement('button');b.type='button';b.className='opsi';
  b.textContent=(ok===k?'\u2713 ':sal.has(k)?'\u2717 ':'')+N[k];if(ok===k)b.classList.add('benar');if(sal.has(k))b.classList.add('salah');
  b.disabled=ok!==null||sal.has(k);b.onclick=()=>{if(k===K[i].a)ok=k;else sal.add(k);r();};el.appendChild(b);});
 const f=document.createElement('p');f.setAttribute('role','status');f.setAttribute('aria-live','polite');
 if(ok!==null){f.className='ok';f.textContent='Benar. '+K[i].p;}else if(sal.size){f.className='no';f.textContent='Belum tepat. Coba pilihan lain.';}
 el.appendChild(f);
 if(ok!==null){const n=document.createElement('button');n.type='button';n.textContent=i===K.length-1?'Ulangi dari kasus 1':'Kasus berikutnya \u2192';n.onclick=()=>{i=(i+1)%K.length;ok=null;sal=new Set();r();};el.appendChild(n);}
}
r();
})();
