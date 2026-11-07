/* INTI: pembantu umum + tempat mendaftarkan materi dan aktivitas. */
const $=(id)=>document.getElementById(id);
const koma=(n,d)=>(+n).toFixed(d===undefined?0:d).replace('.',',');
const MATERI={}, AKTIVITAS={};
/* Dipanggil oleh tiap file di folder materi/ */
function daftarMateri(m){ MATERI[m.id]=m; }
/* Dipanggil oleh tiap file di folder aktivitas/ */
function daftarAktivitas(a){ AKTIVITAS[a.id]=a; }
function acak(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
/* Pengelompokan tombol pilihan: grup('id-wadah', fungsi(nilaiDataK)) */
function grup(id,fn){const bs=[...$(id).querySelectorAll('button')];bs.forEach(b=>b.onclick=()=>{bs.forEach(x=>x.setAttribute('aria-pressed',x===b));fn(b.dataset.k);});}
