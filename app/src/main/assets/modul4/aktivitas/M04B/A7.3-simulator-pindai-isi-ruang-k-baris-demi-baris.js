/* A7.3 Simulator pindai: isi ruang-k baris demi baris. Memakai pembantu dari js/inti.js. */
/* Aktivitas 4: simulator pindai baris demi baris (memakai KRe/KIm dari js/inti.js) */
let timer=null;
function urutan(){
 const a=[...Array(N1).keys()];
 return $('urut').value==='pk'?a.sort((x,y)=>Math.abs(x-N1/2)-Math.abs(y-N1/2)||x-y):a;
}
function updS(){
 const n=+$('brs').value;$('brsv').textContent=n;
 const re=new Float64Array(N1*N1),im=new Float64Array(N1*N1),tamp=new Array(N1*N1).fill(0);
 const dc=Math.log(1+Math.hypot(KRe[0],KIm[0]));
 urutan().slice(0,n).forEach(dr=>{
  const v=(dr+N1/2)%N1;
  for(let u=0;u<N1;u++){
   const i=v*N1+u;re[i]=KRe[i];im[i]=KIm[i];
   tamp[dr*N1+((u+N1/2)%N1)]=Math.log(1+Math.hypot(KRe[i],KIm[i]))/dc;
  }
 });
 gambar($('ks'),N1,tamp);
 fft2(re,im,N1,true);
 const h=new Array(N1*N1);
 for(let i=0;i<N1*N1;i++)h[i]=Math.hypot(re[i],im[i])/acuan;
 gambar($('cs'),N1,h);
 const t=(+$('tr').value)*n*(+$('nx').value)/1000;
 $('ketp').textContent=n+' baris terisi ('+Math.round(n/N1*100)+'%). Waktu berlalu = '+t.toFixed(1)+' s. '+(n===0?'Belum ada sinyal.':($('urut').value==='pk'?'Pusat terisi lebih dulu, jadi bentuk dan kontras cepat tampak.':'Pengisian linier: citra baru utuh setelah semua baris terisi.'));
}
function hentikan(){if(timer){clearInterval(timer);timer=null;}$('play').textContent='Putar';}
$('brs').addEventListener('input',()=>{hentikan();updS();});
$('urut').addEventListener('change',updS);
$('play').onclick=()=>{
 if(timer){hentikan();return;}
 if(+$('brs').value>=N1)$('brs').value=0;
 $('play').textContent='Jeda';
 timer=setInterval(()=>{const b=$('brs');if(+b.value>=N1){hentikan();return;}b.value=+b.value+1;updS();},120);
};
$('reset4').onclick=()=>{hentikan();$('tr').value=500;$('nx').value=1;$('brs').value=0;$('urut').value='lin';updS();};
$('tr').addEventListener('input',updS);$('nx').addEventListener('input',updS);

updS();
