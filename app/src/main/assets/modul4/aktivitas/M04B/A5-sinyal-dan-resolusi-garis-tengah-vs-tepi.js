/* A5 Sinyal dan resolusi: garis tengah vs tepi. Memakai pembantu dari js/inti.js. */
/* Sinyal dan resolusi: garis tengah vs tepi */
function metrik(h){let s=0,e=0;for(let y=0;y<N1;y++)for(let x=0;x<N1;x++){s+=h[y*N1+x];if(y<N1-1)e+=Math.abs(h[(y+1)*N1+x]-h[y*N1+x]);}return[s/(N1*N1),e];}
const REF=(()=>{const re=Float64Array.from(KRe),im=Float64Array.from(KIm),h=[];fft2(re,im,N1,true);for(let i=0;i<N1*N1;i++)h.push(Math.hypot(re[i],im[i])/acuan);return metrik(h);})();
function updG(){
 const mode=document.querySelector('input[name=gmode]:checked').value,m=+$('gl').value;
 $('glv').textContent=m;
 const re=new Float64Array(N1*N1),im=new Float64Array(N1*N1),tamp=new Array(N1*N1).fill(0),dc=Math.log(1+Math.hypot(KRe[0],KIm[0]));
 let mky=0;
 for(let dr=0;dr<N1;dr++){
  const tengah=dr>=N1/2-m/2&&dr<N1/2+m/2,tepi=dr<m/2||dr>=N1-m/2;
  if(!(mode==='tengah'?tengah:tepi))continue;
  mky=Math.max(mky,Math.abs(dr-N1/2));
  const v=(dr+N1/2)%N1;
  for(let du=0;du<N1;du++){const i=v*N1+((du+N1/2)%N1);re[i]=KRe[i];im[i]=KIm[i];tamp[dr*N1+du]=Math.log(1+Math.hypot(KRe[i],KIm[i]))/dc;}
 }
 gambar($('cg1'),N1,tamp);
 fft2(re,im,N1,true);
 const h=new Array(N1*N1);
 for(let i=0;i<N1*N1;i++)h[i]=Math.hypot(re[i],im[i])/acuan;
 gambar($('cg2'),N1,h);
 const mt=metrik(h),rs=mt[0]/REF[0],rr=mky/(N1/2);
 $('msv').textContent=Math.round(rs*100)+'% dari citra penuh';$('msb').style.width=Math.min(100,rs*100)+'%';
 $('mrv').textContent=Math.round(rr*100)+'% dari maksimum (ky tertinggi '+mky+' dari '+(N1/2)+')';$('mrb').style.width=Math.min(100,rr*100)+'%';
 $('ketg2').textContent=m===N1?'Semua garis dipakai: citra penuh, sinyal dan resolusi lengkap.':mode==='tengah'?'Garis tengah saja: kecerahan dan kontras bertahan, tetapi ky tertinggi yang terpakai kecil, jadi resolusi pada arah fase turun. Citra mengabur secara vertikal, dan pola riak bisa muncul karena data terpotong. Ini mirip mengurangi matriks fase.':'Garis tepi saja: sinyal hampir hilang (citra gelap), yang tersisa hanya tepi-tepi tajam. Resolusi ada, tetapi kontras tidak.';
}
document.querySelectorAll('input[name=gmode]').forEach(e=>e.addEventListener('change',updG));
$('gl').addEventListener('input',updG);
$('reset12').onclick=()=>{document.querySelector('input[name=gmode][value=tengah]').checked=true;$('gl').value=16;updG();};

updG();
