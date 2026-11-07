/* =====================================================================
   INTI BERSAMA (dipakai banyak simulasi). Dimuat sebelum simulasi mana pun.
   Isi: pembantu $, fantom, FFT 1D/2D, gambar(), data ruang-k fantom (KRe/KIm),
   warna(), nomorLaci(), konstanta gradien G dan ukuran lemari TN/TS/TM.
   ===================================================================== */
const $=id=>document.getElementById(id);

/* Fantom sederhana pada koordinat -1..1 (bukan data fisika). Dibuat tidak simetris agar aliasing terlihat. */
function fantom(x,y){
 let v=0;
 if(x*x/0.81+y*y/0.9<1)v=0.5;
 if(x*x/0.55+y*y/0.6<1)v=0.8;
 [[-0.3,-0.2,0.1,1],[0.3,0.25,0.08,0.2],[0,0.45,0.05,1],[0.35,-0.3,0.04,1]].forEach(c=>{
  if((x-c[0])*(x-c[0])+(y-c[1])*(y-c[1])<c[2]*c[2])v=c[3];
 });
 return v;
}

/* FFT 1D radix-2, ditulis sendiri tanpa library. */
function fft1(re,im,inv){
 const n=re.length;
 for(let i=1,j=0;i<n;i++){
  let bit=n>>1;
  for(;j&bit;bit>>=1)j^=bit;
  j^=bit;
  if(i<j){let t=re[i];re[i]=re[j];re[j]=t;t=im[i];im[i]=im[j];im[j]=t;}
 }
 for(let len=2;len<=n;len<<=1){
  const ang=(inv?2:-2)*Math.PI/len,wr=Math.cos(ang),wi=Math.sin(ang);
  for(let i=0;i<n;i+=len){
   let cr=1,ci=0;
   for(let k=0;k<len/2;k++){
    const a=i+k,b=i+k+len/2;
    const xr=re[b]*cr-im[b]*ci,xi=re[b]*ci+im[b]*cr;
    re[b]=re[a]-xr;im[b]=im[a]-xi;re[a]+=xr;im[a]+=xi;
    const t=cr*wr-ci*wi;ci=cr*wi+ci*wr;cr=t;
   }
  }
 }
 if(inv)for(let i=0;i<n;i++){re[i]/=n;im[i]/=n;}
}
/* FFT 2D: baris lalu kolom. Larik datar N*N. */
function fft2(re,im,N,inv){
 const r=new Float64Array(N),q=new Float64Array(N);
 for(let y=0;y<N;y++){
  for(let x=0;x<N;x++){r[x]=re[y*N+x];q[x]=im[y*N+x];}
  fft1(r,q,inv);
  for(let x=0;x<N;x++){re[y*N+x]=r[x];im[y*N+x]=q[x];}
 }
 for(let x=0;x<N;x++){
  for(let y=0;y<N;y++){r[y]=re[y*N+x];q[y]=im[y*N+x];}
  fft1(r,q,inv);
  for(let y=0;y<N;y++){re[y*N+x]=r[y];im[y*N+x]=q[y];}
 }
}
function gambar(cv,N,nilai){
 cv.width=N;cv.height=N;
 const c=cv.getContext('2d'),d=c.createImageData(N,N);
 for(let i=0;i<N*N;i++){const g=Math.max(0,Math.min(255,Math.round(nilai[i]*255)));d.data[4*i]=d.data[4*i+1]=d.data[4*i+2]=g;d.data[4*i+3]=255;}
 c.putImageData(d,0,0);
}

/* Data ruang-k fantom 64x64 (dipakai A7, A7.1-A7.3 di M04B dan simulasi M04C) */
const N1=64;
const KRe=new Float64Array(N1*N1),KIm=new Float64Array(N1*N1);
for(let y=0;y<N1;y++)for(let x=0;x<N1;x++)KRe[y*N1+x]=fantom((x+0.5)/N1*2-1,(y+0.5)/N1*2-1);
fft2(KRe,KIm,N1,false);
let acuan=0;
{
 const a=Float64Array.from(KRe),b=Float64Array.from(KIm);
 fft2(a,b,N1,true);
 for(let i=0;i<N1*N1;i++)acuan=Math.max(acuan,Math.hypot(a[i],b[i]));
}

/* Pembantu tampilan */
function warna(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
function nomorLaci(r,N){return r<N/2?N/2-r:-(r-N/2);}

/* Rentang gradien (mT/m) dari DATA */
const G=DATA.INSTRUMEN.gradien_mT_per_m;

/* Lemari laci contoh: TN laci (garis fase), TS lemari (irisan), TM titik data per laci.
   Dipakai A4 (M04A) dan A5 (M04C). */
const TN=16,TS=3,TM=12;
