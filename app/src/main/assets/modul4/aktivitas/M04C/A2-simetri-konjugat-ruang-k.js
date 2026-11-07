/* A2 Simetri konjugat ruang-k. Memakai pembantu dari js/inti.js. */
/* Simetri konjugat */
function updS2(){
 const mode=document.querySelector('input[name=smode]:checked').value,kx=+$('skx').value,ky=+$('sky').value;
 $('skxv').textContent=kx;$('skyv').textContent=ky;
 const du=N1/2+kx,dr=N1/2-ky,pu=N1-du,pr=N1-dr;
 const re=new Float64Array(N1*N1),im=new Float64Array(N1*N1),tamp=new Array(N1*N1).fill(0),dc=Math.log(1+Math.hypot(KRe[0],KIm[0]));
 for(let r=0;r<N1;r++)for(let u=0;u<N1;u++){
  const i=((r+N1/2)%N1)*N1+((u+N1/2)%N1);
  let a,b;
  if(mode==='penuh'||r<=N1/2){a=KRe[i];b=KIm[i];}
  else if(mode==='konj'){const r2=(N1-r)%N1,u2=(N1-u)%N1,j=((r2+N1/2)%N1)*N1+((u2+N1/2)%N1);a=KRe[j];b=-KIm[j];}
  else continue;
  re[i]=a;im[i]=b;tamp[r*N1+u]=Math.log(1+Math.hypot(a,b))/dc;
 }
 gambar($('cs2'),N1,tamp);
 const c=$('cs2').getContext('2d');c.lineWidth=1;
 c.strokeStyle=warna('--aksen');c.beginPath();c.arc(du+0.5,dr+0.5,2.5,0,2*Math.PI);c.stroke();
 c.strokeStyle=warna('--t1');c.beginPath();c.arc(pu+0.5,pr+0.5,2.5,0,2*Math.PI);c.stroke();
 fft2(re,im,N1,true);
 const h=new Array(N1*N1);
 for(let i=0;i<N1*N1;i++)h[i]=Math.hypot(re[i],im[i])/acuan;
 gambar($('ci2'),N1,h);
 const is=((dr+N1/2)%N1)*N1+((du+N1/2)%N1),io=((pr+N1/2)%N1)*N1+((pu+N1/2)%N1),d0=Math.hypot(KRe[0],KIm[0]);
 const ms=Math.hypot(KRe[is],KIm[is])/d0*100,mo=Math.hypot(KRe[io],KIm[io])/d0*100;
 $('kets').textContent='Titik (kx '+kx+', ky '+ky+') dan pasangannya (kx '+(-kx)+', ky '+(-ky)+'): besar sinyal '+ms.toFixed(3)+'% dan '+mo.toFixed(3)+'% dari puncak, sama besar. Bagian imajinernya berlawanan tanda ('+KIm[is].toFixed(1)+' dan '+KIm[io].toFixed(1)+'). '+(mode==='penuh'?'Data lengkap.':mode==='atas'?'Hanya separuh atas: separuh bawah kosong, citra rusak karena data tidak lengkap.':'Separuh bawah diisi dari konjugat separuh atas: citra pulih tanpa mengukur separuh bawah.');
}
document.querySelectorAll('input[name=smode]').forEach(e=>e.addEventListener('change',updS2));
$('skx').addEventListener('input',updS2);$('sky').addEventListener('input',updS2);
$('reset11').onclick=()=>{document.querySelector('input[name=smode][value=penuh]').checked=true;$('skx').value=6;$('sky').value=3;updS2();};

updS2();
