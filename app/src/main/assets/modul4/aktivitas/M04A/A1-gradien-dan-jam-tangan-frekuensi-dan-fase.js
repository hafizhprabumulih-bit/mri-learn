/* A1 Gradien dan jam tangan: frekuensi dan fase. Memakai pembantu dari js/inti.js. */
/* Gradien dan jam tangan: B = B0 + G.p, frekuensi = gamma.B, fase relatif terhadap isosenter */
$('gg').min=G[0];$('gg').max=G[1];$('gg').value=G[0];
function updW(){
 const B0=+$('b0g').value,amp=+$('gg').value,pol=document.querySelector('input[name=gpol]:checked').value==='pos'?1:-1,p=+$('gp').value,t=+$('gt').value;
 $('ggv').textContent=amp;$('gpv').textContent=p;$('gtv').textContent=t;
 const gam=DATA.FISIKA.gamma_MHz_per_T,f0=DATA.FISIKA.larmor_MHz[B0];
 const dB=amp*p/100,df=gam*dB,fp=f0+pol*df/1000,fm=f0-pol*df/1000,cyc=pol*df*t/1000;
 const c=$('cgw').getContext('2d'),W=600,H=260;c.clearRect(0,0,W,H);
 const lo=warna('--b0'),hi=warna('--t1'),x0=40,x1=560,gr=c.createLinearGradient(x0,0,x1,0);
 gr.addColorStop(0,pol>0?lo:hi);gr.addColorStop(1,pol>0?hi:lo);
 c.fillStyle=gr;c.fillRect(x0,26,x1-x0,30);
 c.fillStyle=warna('--lembut');c.font='12px sans-serif';c.textAlign='left';
 c.fillText(pol>0?'medan lebih rendah':'medan lebih tinggi',x0,18);c.textAlign='right';c.fillText(pol>0?'medan lebih tinggi':'medan lebih rendah',x1,18);c.textAlign='center';
 const mx=[300-p*13,300,300+p*13],cx=[110,300,490],cy=170,R=36,ang=[-cyc,0,cyc],cols=[lo,warna('--lembut'),hi];
 for(let k=0;k<3;k++){
  c.strokeStyle=cols[k];c.lineWidth=2;c.setLineDash([4,4]);c.beginPath();c.moveTo(mx[k],56);c.lineTo(cx[k],cy-R-8);c.stroke();c.setLineDash([]);
  c.fillStyle=cols[k];c.beginPath();c.arc(mx[k],41,5,0,2*Math.PI);c.fill();
  c.fillStyle=warna('--permukaan');c.strokeStyle=warna('--garis');c.lineWidth=2;c.beginPath();c.arc(cx[k],cy,R,0,2*Math.PI);c.fill();c.stroke();
  c.strokeStyle=warna('--lembut');c.lineWidth=1;c.beginPath();c.moveTo(cx[k],cy-R);c.lineTo(cx[k],cy-R+6);c.stroke();
  const th=2*Math.PI*ang[k];c.strokeStyle=cols[k];c.lineWidth=3;c.beginPath();c.moveTo(cx[k],cy);c.lineTo(cx[k]+(R-4)*Math.sin(th),cy-(R-4)*Math.cos(th));c.stroke();
  c.fillStyle=warna('--teks');c.font='13px sans-serif';
  c.fillText(k===0?'\u2212'+p+' cm':k===1?'isosenter':'+'+p+' cm',cx[k],cy+R+20);
  c.fillStyle=warna('--lembut');c.font='12px sans-serif';
  c.fillText((k===0?fm:k===1?f0:fp).toFixed(4)+' MHz',cx[k],cy+R+38);
 }
 $('ketw').textContent='Di '+p+' cm dari isosenter, gradien mengubah medan sebesar '+dB.toFixed(2)+' mT, yaitu '+(dB/1000/B0*100).toFixed(3)+'% dari B0 (sangat kecil dibanding B0). Frekuensi: isosenter '+f0+' MHz, kanan '+fp.toFixed(4)+' MHz, kiri '+fm.toFixed(4)+' MHz, selisih '+df.toFixed(2)+' kHz terhadap isosenter. Setelah '+t+' \u00b5s, jam yang lebih cepat maju sekitar '+Math.abs(cyc*360).toFixed(0)+'\u00b0 ('+Math.abs(cyc).toFixed(2)+' siklus) dari isosenter, dan jam yang lebih lambat tertinggal sebesar itu. Gradien yang lebih curam atau jarak yang lebih jauh memperbesar selisih.';
}
['b0g','gg','gp','gt'].forEach(k=>$(k).addEventListener(k==='b0g'?'change':'input',updW));
document.querySelectorAll('input[name=gpol]').forEach(e=>e.addEventListener('change',updW));
$('reset13').onclick=()=>{$('b0g').value='1.5';document.querySelector('input[name=gpol][value=pos]').checked=true;$('gg').value=G[0];$('gp').value=10;$('gt').value=50;updW();};

updW();
