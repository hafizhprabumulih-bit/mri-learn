/* A7 Laboratorium ruang-k: mulai dari kosong. Memakai pembantu dari js/inti.js. */
/* Laboratorium ruang-k: mulai dari kosong (memakai KRe/KIm, acuan, fft2, gambar dari inti.js) */
const isi=new Uint8Array(N1*N1);let cx=N1/2,cy=N1/2;
function tandai(du,dr,nilai){
 if(du<0||dr<0||du>=N1||dr>=N1)return;
 isi[dr*N1+du]=nilai;
 isi[((N1-dr)%N1)*N1+((N1-du)%N1)]=nilai;
}
function kuasi(u0,r0,nilai){
 const b=+$('kuas').value;
 for(let r=r0-b;r<=r0+b;r++)for(let u=u0-b;u<=u0+b;u++)if((u-u0)*(u-u0)+(r-r0)*(r-r0)<=b*b+0.5)tandai(u,r,nilai);
}
function terap(){kuasi(cx,cy,document.querySelector('input[name=kmode]:checked').value==='isi'?1:0);}
function updL(){
 $('kuasv').textContent=$('kuas').value;
 const re=new Float64Array(N1*N1),im=new Float64Array(N1*N1),tamp=new Array(N1*N1).fill(0);
 const dc=Math.log(1+Math.hypot(KRe[0],KIm[0]));
 let n=0,nc=0,ne=0;
 for(let r=0;r<N1;r++)for(let u=0;u<N1;u++){
  if(!isi[r*N1+u])continue;
  n++;
  const i=((r+N1/2)%N1)*N1+((u+N1/2)%N1);
  re[i]=KRe[i];im[i]=KIm[i];
  tamp[r*N1+u]=0.2+0.8*Math.log(1+Math.hypot(KRe[i],KIm[i]))/dc;
  if(Math.hypot(u-N1/2,r-N1/2)<=8)nc++;else ne++;
 }
 gambar($('kk'),N1,tamp);
 const c=$('kk').getContext('2d');
 c.strokeStyle='#ff922b';c.lineWidth=1;c.beginPath();c.arc(cx+0.5,cy+0.5,+$('kuas').value+0.5,0,2*Math.PI);c.stroke();
 fft2(re,im,N1,true);
 const h=new Array(N1*N1);
 for(let i=0;i<N1*N1;i++)h[i]=Math.hypot(re[i],im[i])/acuan;
 gambar($('cp'),N1,h);
 const kx=cx-N1/2,ky=cy-N1/2,g=new Array(N1*N1);
 for(let y=0;y<N1;y++)for(let x=0;x<N1;x++)g[y*N1+x]=0.5+0.5*Math.cos(2*Math.PI*(kx*x+ky*y)/N1);
 gambar($('cg'),N1,g);
 let t;
 if(n===0)t='Ruang-k kosong, citra hitam. Tanpa sinyal tidak ada gambar.';
 else if(n===1&&isi[(N1/2)*N1+N1/2])t='Hanya titik pusat (rata-rata sinyal): citra datar tanpa bentuk.';
 else t=(ne===0?'Hanya pusat terisi: kontras ada, detail halus belum.':nc===0?'Hanya tepi terisi: sinyal dan kontras hilang, tinggal garis tepi.':'Pusat dan tepi terisi: kontras dan detail bertambah.')+' Terisi '+Math.round(n/(N1*N1)*100)+'%.';
 $('ketl').textContent=t;
 $('ketg').textContent='Titik terpilih (kx = '+kx+', ky = '+ky+') adalah pola garis dengan '+Math.abs(kx)+' siklus horizontal dan '+Math.abs(ky)+' siklus vertikal per FOV. '+(Math.hypot(kx,ky)<3?'Dekat pusat: garis lebar atau hampir rata.':'Makin jauh dari pusat, makin rapat garisnya.');
}
function posisi(e){
 const r=$('kk').getBoundingClientRect();
 return[Math.min(N1-1,Math.max(0,Math.floor((e.clientX-r.left)/r.width*N1))),Math.min(N1-1,Math.max(0,Math.floor((e.clientY-r.top)/r.height*N1)))];
}
$('kk').addEventListener('pointerdown',e=>{[cx,cy]=posisi(e);$('kk').setPointerCapture(e.pointerId);$('kk').focus();terap();updL();});
$('kk').addEventListener('pointermove',e=>{const p=posisi(e);if(p[0]===cx&&p[1]===cy)return;cx=p[0];cy=p[1];if(e.buttons)terap();updL();});
$('kk').addEventListener('keydown',e=>{
 const d={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
 if(d){cx=Math.min(N1-1,Math.max(0,cx+d[0]));cy=Math.min(N1-1,Math.max(0,cy+d[1]));e.preventDefault();updL();}
 else if(e.key===' '||e.key==='Enter'){e.preventDefault();terap();updL();}
});
$('kuas').addEventListener('input',updL);
document.querySelectorAll('input[name=kmode]').forEach(e=>e.addEventListener('change',updL));
function preset(f){for(let r=0;r<N1;r++)for(let u=0;u<N1;u++)if(f(u-N1/2,r-N1/2))isi[r*N1+u]=1;updL();}
$('bpusat').onclick=()=>preset((x,y)=>Math.hypot(x,y)<=8);
$('btepi').onclick=()=>preset((x,y)=>Math.hypot(x,y)>8);
$('bbaris').onclick=()=>preset((x,y)=>y===0);
$('bkol').onclick=()=>preset((x,y)=>x===0);
$('bsemua').onclick=()=>preset(()=>true);
$('reset5').onclick=()=>{isi.fill(0);cx=cy=N1/2;$('kuas').value=2;document.querySelector('input[name=kmode][value=isi]').checked=true;updL();};

updL();
