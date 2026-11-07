/* A6 Jalur ruang-k: EPI, spiral, dan propeller. Memakai pembantu dari js/inti.js. */
/* Jalur ruang-k: EPI, spiral, propeller */
const bk=document.createElement('canvas');
{const tp=new Array(N1*N1),dc=Math.log(1+Math.hypot(KRe[0],KIm[0]));for(let r=0;r<N1;r++)for(let u=0;u<N1;u++){const i=((r+N1/2)%N1)*N1+((u+N1/2)%N1);tp[r*N1+u]=0.8*Math.log(1+Math.hypot(KRe[i],KIm[i]))/dc;}gambar(bk,N1,tp);}
let jT=null;
function updJ(){
 const mode=$('jm').value,pa=+$('jp').value,p=+$('jt').value/100,S=300/N1,X=k=>150+k*S,Y=k=>150-k*S;
 $('jtv').textContent=Math.round(p*100);
 const c=$('cj').getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,300,300);c.drawImage(bk,0,0,300,300);
 c.strokeStyle=warna('--t1');c.lineWidth=2.5;c.lineJoin='round';
 let t,cur=[0,0];
 if(mode==='epi'){
  const L=pa*2,pts=[];
  for(let j=0;j<L;j++){const ky=28-j*56/(L-1),a=j%2===0?-28:28;pts.push([a,ky],[-a,ky]);}
  const seg=pts.length-1,q=p*seg,i0=Math.min(seg-1,Math.floor(q)),fr=q-i0;
  c.beginPath();c.moveTo(X(pts[0][0]),Y(pts[0][1]));
  for(let i=1;i<=i0;i++)c.lineTo(X(pts[i][0]),Y(pts[i][1]));
  const a=pts[i0],b=pts[i0+1];cur=[a[0]+(b[0]-a[0])*fr,a[1]+(b[1]-a[1])*fr];c.lineTo(X(cur[0]),Y(cur[1]));c.stroke();
  $('jpv').textContent='jumlah garis = '+L;
  t='EPI single-shot: seluruh '+L+' garis diisi dari satu eksitasi dan satu echo train, jadi tidak ada TR (TR tak terhingga). Gradien frekuensi berosilasi (positif lalu negatif) untuk mengisi garis kiri ke kanan lalu kanan ke kiri. Gradien fase hanya \u201cberkedip\u201d (blipping) turun satu garis tiap kali, dari atas ke bawah. Garis terisi: '+Math.min(L,Math.floor(q/2)+1)+' dari '+L+'.';
 }else if(mode==='spi'){
  const T=pa/2,n=600,tmax=2*Math.PI*T;
  c.beginPath();c.moveTo(X(0),Y(0));
  const m=Math.max(1,Math.round(p*n));
  for(let i=1;i<=m;i++){const th=tmax*i/n,r=28*th/tmax;cur=[r*Math.cos(th),r*Math.sin(th)];c.lineTo(X(cur[0]),Y(cur[1]));}
  c.stroke();
  $('jpv').textContent='jumlah putaran = '+T;
  t='Spiral: gradien frekuensi dan gradien fase sama-sama berosilasi. Penelusuran dimulai dari pusat dan menyebar ke luar tanpa pernah berhenti, jadi tidak ada TR dan seluruh ruang-k terisi dalam satu tembakan. Pusat (sinyal dan kontras) terisi lebih dulu.';
 }else{
  const B=Math.max(2,Math.round(pa/2)),nb=Math.min(B,Math.ceil(p*B-1e-9));
  c.fillStyle=warna('--t1');c.globalAlpha=0.35;
  for(let j=0;j<nb;j++){c.save();c.translate(150,150);c.rotate(j*Math.PI/B);c.fillRect(-28*S,-5*S,56*S,10*S);c.restore();}
  c.globalAlpha=1;c.strokeStyle=warna('--t1');c.lineWidth=1.5;
  for(let j=0;j<nb;j++){c.save();c.translate(150,150);c.rotate(j*Math.PI/B);c.strokeRect(-28*S,-5*S,56*S,10*S);c.restore();}
  $('jpv').textContent='jumlah strip = '+B;
  t='Propeller: '+nb+' dari '+B+' strip sudah diperoleh. Tiap strip diperoleh pada satu TR dan diputar mengelilingi pusat, sehingga pusat ruang-k (sinyal dan kontras) diambil pada setiap TR. Itu setara NSA ganda dan mengurangi artefak gerak, tetapi diperlukan algoritma rumit dan banyak data terbuang, sehingga waktu pindai lebih lama.';
 }
 if(mode!=='pro'){c.fillStyle=warna('--aksen');c.beginPath();c.arc(X(cur[0]),Y(cur[1]),5,0,2*Math.PI);c.fill();}
 $('ketj').textContent=t;
}
function jStop(){if(jT){clearInterval(jT);jT=null;}$('jplay').textContent='Putar';}
$('jm').addEventListener('change',()=>{jStop();updJ();});$('jp').addEventListener('input',updJ);$('jt').addEventListener('input',()=>{jStop();updJ();});
$('jplay').onclick=()=>{if(jT){jStop();return;}if(+$('jt').value>=100)$('jt').value=0;$('jplay').textContent='Jeda';jT=setInterval(()=>{const b=$('jt');if(+b.value>=100){jStop();return;}b.value=+b.value+1;updJ();},60);};
$('reset19').onclick=()=>{jStop();$('jm').value='epi';$('jp').value=12;$('jt').value=40;updJ();};

updJ();
