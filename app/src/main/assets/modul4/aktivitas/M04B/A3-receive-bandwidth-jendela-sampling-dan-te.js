/* A3 Receive bandwidth, jendela sampling, dan TE. Memakai pembantu dari js/inti.js. */
/* RBW, jendela sampling, dan TE */
const RB0={rbw:25,mf:128};
function updR(){
 const b0=+$('b0r').value,f0=DATA.FISIKA.larmor_MHz[b0],rbw=+$('rbw').value,mf=+$('mf').value,tp=+$('tpre').value;
 $('rbwv').textContent=rbw;
 const dt=1/rbw,jend=mf*dt,jend0=RB0.mf/RB0.rbw;
 const c=$('cr').getContext('2d'),W=600,H=150,k=W/(Math.max(jend,jend0)*1.1);
 c.clearRect(0,0,W,H);c.font='12px sans-serif';
 function bar(y,j,isi,teks){
  const w=j*k;c.lineWidth=2;
  if(isi){c.globalAlpha=0.3;c.fillStyle=warna('--aksen');c.fillRect(0,y,w,34);c.globalAlpha=1;c.strokeStyle=warna('--aksen');c.setLineDash([]);
   const nt=Math.min(mf,128);c.lineWidth=1;c.beginPath();for(let i=0;i<=nt;i++){const x=i*w/nt;c.moveTo(x,y+22);c.lineTo(x,y+34);}c.stroke();c.lineWidth=2;}
  else{c.strokeStyle=warna('--lembut');c.setLineDash([6,4]);}
  c.strokeRect(0,y,w,34);c.setLineDash([]);
  c.strokeStyle=warna('--t1');c.lineWidth=3;c.beginPath();c.moveTo(w/2,y-6);c.lineTo(w/2,y+40);c.stroke();
  c.fillStyle=warna('--teks');c.fillText(teks,6,y+54);
 }
 bar(14,jend0,false,'Awal: jendela '+jend0.toFixed(2)+' ms');
 bar(86,jend,true,'Sekarang: jendela '+jend.toFixed(2)+' ms (garis oranye = puncak gema)');
 $('ketr').textContent='Frekuensi pembawa (Larmor) = '+f0+' MHz. RBW '+rbw+' kHz = pembawa \u00b1 '+(rbw/2)+' kHz, hanya sekitar '+Math.round(rbw*1000/f0)+' ppm dari pembawa. Frekuensi Nyquist = '+(rbw/2)+' kHz, frekuensi sampling = '+rbw+' kHz, interval \u0394Ts = '+dt.toFixed(3)+' ms. Jendela sampling = '+mf+' \u00d7 '+dt.toFixed(3)+' = '+jend.toFixed(2)+' ms. Puncak gema ada sekitar '+(jend/2).toFixed(2)+' ms setelah gradien frekuensi menyala. '+(jend>jend0*1.001?'Jendela lebih panjang dari awal: TE minimum cenderung naik.':jend<jend0*0.999?'Jendela lebih pendek dari awal: TE minimum cenderung turun.':'Sama dengan pengaturan awal.')+' TE minimum = '+tp+' + '+(jend/2).toFixed(2)+' = '+(tp+jend/2).toFixed(2)+' ms (awal: '+(tp+jend0/2).toFixed(2)+' ms).';
 $('tprev').textContent=tp;
 const hzpx=rbw*1000/mf,geser=f0*DATA.FISIKA.geser_kimia_lemak_air_ppm;
 $('ketr2').textContent='Tampilan lain di pemindai: RBW per piksel = '+(rbw*1000)+' Hz / '+mf+' = '+hzpx.toFixed(0)+' Hz/piksel. Pergeseran kimia lemak-air = '+f0+' MHz \u00d7 '+DATA.FISIKA.geser_kimia_lemak_air_ppm+' ppm = '+geser.toFixed(0)+' Hz, atau '+(geser/hzpx).toFixed(2)+' piksel.';
}
$('b0r').addEventListener('change',updR);$('tpre').addEventListener('input',updR);$('rbw').addEventListener('input',updR);$('mf').addEventListener('change',updR);
$('reset8').onclick=()=>{$('b0r').value='1.5';$('rbw').value=RB0.rbw;$('mf').value=RB0.mf;$('tpre').value=5;updR();};

if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',updR);
updR();
