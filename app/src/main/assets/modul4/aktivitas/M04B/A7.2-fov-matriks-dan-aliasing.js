/* A7.2 FOV, matriks, dan aliasing. Memakai pembantu dari js/inti.js. */
/* Aktivitas 2: FOV dan aliasing (lipatan pada arah fase) */
function updA(){
 const s=+$('fov').value/100,N=+$('mat').value;
 $('fovv').textContent=Math.round(s*100);
 const out=new Array(N*N);
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const x=-s+(i+0.5)*2*s/N,y=-s+(j+0.5)*2*s/N;
  let v=0;
  for(let m=-3;m<=3;m++)v+=fantom(x,y+m*2*s);
  out[j*N+i]=Math.min(1,v);
 }
 gambar($('ca'),N,out);
 const vok=(s/N*100).toFixed(2);
 $('keta').textContent=(s<1?'Aliasing: FOV lebih kecil dari objek, bagian atas dan bawah terlipat ke dalam citra. ':'Tidak ada aliasing pada arah fase. ')+'Ukuran voksel = FOV/N = '+vok+'% dari ukuran objek. Di ruang-k: jarak antar garis \u0394k = 1/FOV = '+(1/s).toFixed(2)+' siklus per ukuran objek, dan jangkauan k = N \u00d7 \u0394k = '+(N/s).toFixed(1)+' siklus per ukuran objek. FOV lebih kecil berarti \u0394k lebih besar (laci lebih dalam).';
}
$('fov').addEventListener('input',updA);$('mat').addEventListener('change',updA);
$('reset2').onclick=()=>{$('fov').value=100;$('mat').value=64;updA();};

updA();
