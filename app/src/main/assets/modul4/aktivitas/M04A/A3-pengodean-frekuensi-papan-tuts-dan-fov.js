/* A3 Pengodean frekuensi: papan tuts dan FOV. Memakai pembantu dari js/inti.js. */
/* Pengodean frekuensi: papan tuts dan FOV = RBW/(gamma.G) */
$('fg').max=G[1];
function updFE(){
 const rbw=+$('fr').value,g=+$('fg').value,n=+$('fn').value,px=+$('fx').value,B0=+$('fb0').value;
 $('frv').textContent=rbw;$('fgv').textContent=g;$('fxv').textContent=px;
 const gam=DATA.FISIKA.gamma_MHz_per_T,f0=DATA.FISIKA.larmor_MHz[B0];
 const fov=rbw/(gam*g)*1000,pix=fov/n,bwp=rbw*1000/n,xmm=px/100*fov,dfk=gam*g*xmm/1000,fr=f0+dfk/1000;
 const c=$('cpf').getContext('2d'),W=600;c.clearRect(0,0,W,250);c.textAlign='left';c.font='12px sans-serif';
 const x0=40,x1=560,gr=c.createLinearGradient(x0,0,x1,0);gr.addColorStop(0,warna('--b0'));gr.addColorStop(1,warna('--t1'));
 c.fillStyle=gr;c.fillRect(x0,32,x1-x0,36);
 c.strokeStyle=warna('--latar');c.lineWidth=1;c.globalAlpha=0.6;
 const nd=Math.min(n,64);c.beginPath();for(let i=1;i<nd;i++){const x=x0+i*(x1-x0)/nd;c.moveTo(x,32);c.lineTo(x,68);}c.stroke();c.globalAlpha=1;
 c.fillStyle=warna('--lembut');c.fillText('frekuensi rendah',x0,24);c.textAlign='right';c.fillText('frekuensi tinggi',x1,24);
 c.textAlign='center';c.fillStyle=warna('--teks');c.fillText('FOV = '+fov.toFixed(0)+' mm',300,24);
 const xm=300+px/100*(x1-x0),nW=21,kw=(x1-x0)/nW,ky=130,kh=100,sel=Math.round((px+50)/100*(nW-1));
 c.strokeStyle=warna('--aksen');c.lineWidth=3;c.beginPath();c.moveTo(xm,32);c.lineTo(xm,76);c.stroke();
 c.fillStyle=warna('--aksen');c.beginPath();c.arc(xm,80,6,0,2*Math.PI);c.fill();
 c.strokeStyle=warna('--t2');c.lineWidth=1.5;c.setLineDash([4,4]);c.beginPath();c.moveTo(xm,86);c.lineTo(x0+(sel+0.5)*kw,ky);c.stroke();c.setLineDash([]);
 for(let i=0;i<nW;i++){
  const x=x0+i*kw,t=i/(nW-1);
  c.fillStyle=warna('--latar');c.fillRect(x,ky,kw,kh);
  c.globalAlpha=0.55*(1-t);c.fillStyle=warna('--b0');c.fillRect(x,ky,kw,kh);
  c.globalAlpha=0.55*t;c.fillStyle=warna('--t1');c.fillRect(x,ky,kw,kh);c.globalAlpha=1;
  c.strokeStyle=warna('--lembut');c.lineWidth=1;c.strokeRect(x,ky,kw,kh);
 }
 for(let i=0;i<nW-1;i++){if([0,1,3,4,5].includes(i%7)){c.fillStyle=warna('--teks');c.fillRect(x0+i*kw+kw*0.65,ky,kw*0.7,kh*0.6);}}
 c.strokeStyle=warna('--aksen');c.lineWidth=3;c.strokeRect(x0+sel*kw,ky,kw,kh);
 c.fillStyle=warna('--lembut');c.textAlign='center';c.fillText('papan tuts: tiap posisi punya nada (frekuensi) sendiri',300,ky+kh+22);
 $('ketf2').textContent='FOV = RBW / (\u03b3\u00b7G) = '+rbw+' kHz / ('+gam+' MHz/T \u00d7 '+g+' mT/m) = '+fov.toFixed(1)+' mm. Dengan matriks '+n+', ukuran piksel = FOV/N = '+pix.toFixed(2)+' mm dan bandwidth per piksel = RBW/N = '+bwp.toFixed(0)+' Hz. Spin di '+xmm.toFixed(1)+' mm dari isosenter berpresesi pada '+fr.toFixed(4)+' MHz (Larmor '+f0+' MHz '+(dfk>=0?'+':'\u2212')+' '+Math.abs(dfk).toFixed(2)+' kHz). Di tepi FOV selisihnya \u00b1'+(rbw/2)+' kHz, yaitu setengah RBW. Gradien lebih curam membuat FOV lebih kecil.';
}
['fr','fg','fx'].forEach(k=>$(k).addEventListener('input',updFE));$('fn').addEventListener('change',updFE);$('fb0').addEventListener('change',updFE);
$('reset15').onclick=()=>{$('fb0').value='1.5';$('fr').value=25;$('fg').value=2.5;$('fn').value=128;$('fx').value=20;updFE();};

updFE();
