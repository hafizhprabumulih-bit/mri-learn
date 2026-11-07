/* A4 Pilihan pengisian ruang-k: partial Fourier dan parallel imaging. Memakai pembantu dari js/inti.js. */
/* Pilihan pengisian: partial Fourier dan parallel imaging */
function updPil(){
 const m=document.querySelector('input[name=pm]:checked').value,f=+$('pf').value/100,cj=$('pk').checked,R=+$('pr').value,keep=Math.round(f*N1);
 $('pfv').textContent=Math.round(f*100);$('prv').textContent=R;
 const re=new Float64Array(N1*N1),im=new Float64Array(N1*N1),tamp=new Array(N1*N1).fill(0),dc=Math.log(1+Math.hypot(KRe[0],KIm[0]));
 let n=0;
 for(let r=0;r<N1;r++){
  const ada=m==='penuh'||(m==='partial'&&(r<keep||cj))||(m==='paralel'&&(((r-N1/2)%R)+R)%R===0);
  if(!ada)continue;n++;
  for(let u=0;u<N1;u++){
   const i=((r+N1/2)%N1)*N1+((u+N1/2)%N1);let a,b;
   if(m==='partial'&&r>=keep){const r2=(N1-r)%N1,u2=(N1-u)%N1,j=((r2+N1/2)%N1)*N1+((u2+N1/2)%N1);a=KRe[j];b=-KIm[j];}
   else{a=KRe[i];b=KIm[i];}
   re[i]=a;im[i]=b;tamp[r*N1+u]=Math.log(1+Math.hypot(a,b))/dc;
  }
 }
 gambar($('cq3'),N1,tamp);
 fft2(re,im,N1,true);
 const k=m==='paralel'?R:1,h=new Array(N1*N1);
 for(let i=0;i<N1*N1;i++)h[i]=Math.hypot(re[i],im[i])/acuan*k;
 gambar($('ci3'),N1,h);
 const ukur=m==='partial'?keep:n;
 let t='Garis yang diukur: '+ukur+' dari '+N1+' (waktu pindai relatif sekitar '+Math.round(ukur/N1*100)+'%). ';
 if(m==='penuh')t+='Semua garis diukur: resolusi dan sinyal lengkap.';
 else if(m==='partial')t+=cj?'Separuh sisanya dilengkapi dari simetri konjugat: citra pulih tanpa mengukur garis itu. Pada MRI nyata, simetri tidak sempurna dan SNR tetap berkurang karena data lebih sedikit.':'Garis sisanya diisi nol: citra lebih redup dan buram, dan artefak pemotongan mungkin muncul. Data lebih sedikit berarti SNR berkurang. Centang simetri konjugat untuk melengkapinya.';
 else t+='Tiap '+R+'-ke garis dilewati: waktu turun sekitar '+R+' kali, tetapi FOV fase menjadi 1/'+R+' sehingga bagian objek terlipat (aliasing). Parallel imaging nyata memakai profil sensitivitas coil untuk membuka lipatan, dengan harga SNR yang turun.';
 $('ketp2').textContent=t;
}
document.querySelectorAll('input[name=pm]').forEach(e=>e.addEventListener('change',updPil));$('pk').addEventListener('change',updPil);$('pf').addEventListener('input',updPil);$('pr').addEventListener('input',updPil);
$('reset17').onclick=()=>{document.querySelector('input[name=pm][value=penuh]').checked=true;$('pf').value=70;$('pk').checked=false;$('pr').value=2;updPil();};

updPil();
