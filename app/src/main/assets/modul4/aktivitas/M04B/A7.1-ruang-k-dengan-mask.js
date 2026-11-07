/* A7.1 Ruang-k dengan mask. Memakai pembantu dari js/inti.js. */
function jarak(u,v){const du=u<N1/2?u:u-N1,dv=v<N1/2?v:v-N1;return Math.hypot(du,dv);}
function updK(){
 const mode=document.querySelector('input[name=mask]:checked').value,r=+$('rad').value;
 $('radv').textContent=r;
 const re=new Float64Array(N1*N1),im=new Float64Array(N1*N1),tamp=new Array(N1*N1).fill(0);
 let mk=0;
 for(let v=0;v<N1;v++)for(let u=0;u<N1;u++){
  const d=jarak(u,v);
  const pakai=mode==='semua'||(mode==='pusat'?d<=r:d>r);
  const i=v*N1+u;
  if(pakai){re[i]=KRe[i];im[i]=KIm[i];}
  /* geser pusat ke tengah hanya untuk tampilan */
  const j=((v+N1/2)%N1)*N1+((u+N1/2)%N1);
  tamp[j]=pakai?Math.log(1+Math.hypot(KRe[i],KIm[i]))/Math.log(1+Math.hypot(KRe[0],KIm[0])):0;
 }
 gambar($('ck'),N1,tamp);
 if(mode!=='semua'){const c=$('ck').getContext('2d');c.strokeStyle='#ff922b';c.lineWidth=1;c.beginPath();c.arc(N1/2,N1/2,r,0,2*Math.PI);c.stroke();}
 fft2(re,im,N1,true);
 const hasil=new Array(N1*N1);
 for(let i=0;i<N1*N1;i++)hasil[i]=Math.hypot(re[i],im[i])/acuan;
 gambar($('cc'),N1,hasil);
 $('ketk').textContent=mode==='semua'?'Seluruh ruang-k dipakai: citra utuh.':mode==='pusat'?'Hanya pusat: kontras dan bentuk kasar tersisa, detail halus hilang (citra buram).':'Hanya tepi: sinyal dan kontras hilang, hanya garis tepi yang tampak.';
}
document.querySelectorAll('input[name=mask]').forEach(e=>e.addEventListener('change',updK));
$('rad').addEventListener('input',updK);
$('reset1').onclick=()=>{document.querySelector('input[name=mask][value=semua]').checked=true;$('rad').value=8;updK();};

updK();
