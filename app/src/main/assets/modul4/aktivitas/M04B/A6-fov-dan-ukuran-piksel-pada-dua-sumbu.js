/* A6 FOV dan ukuran piksel pada dua sumbu. Memakai pembantu dari js/inti.js. */
/* FOV dan ukuran piksel pada dua sumbu: FOV = 1/dk, piksel = FOV/N, jangkauan k = N.dk */
function updFP(){
 const ff=+$('gf').value,pp=+$('gpp').value,nf=+$('gnf').value,np=+$('gnp').value,fp=ff*pp/100;
 $('gfv').textContent=ff;$('gppv').textContent=pp;
 const pxf=ff/nf,pxp=fp/np,dkx=10/ff,dky=10/fp,c=$('cfp').getContext('2d'),W=600,H=260;
 c.clearRect(0,0,W,H);c.textAlign='center';c.font='12px sans-serif';
 /* kiri: citra */
 const wL=ff/500*220,hL=fp/500*220,cxL=140,cyL=125;
 c.fillStyle=warna('--permukaan');c.fillRect(cxL-wL/2,cyL-hL/2,wL,hL);
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.beginPath();
 const gx=Math.min(nf,48),gy=Math.min(np,48);
 for(let i=1;i<gx;i++){const x=cxL-wL/2+i*wL/gx;c.moveTo(x,cyL-hL/2);c.lineTo(x,cyL+hL/2);}
 for(let j=1;j<gy;j++){const y=cyL-hL/2+j*hL/gy;c.moveTo(cxL-wL/2,y);c.lineTo(cxL+wL/2,y);}
 c.stroke();c.strokeStyle=warna('--t1');c.lineWidth=2.5;c.strokeRect(cxL-wL/2,cyL-hL/2,wL,hL);
 c.fillStyle=warna('--teks');c.fillText('Citra: FOV '+ff+' \u00d7 '+fp.toFixed(0)+' mm',cxL,250);
 /* kanan: ruang-k (skala relatif terhadap nilai awal) */
 const cxR=445,cyR=125,rw=230,rh=220,spx=22*10/ff*24,spy=22*10/fp*24;
 c.save();c.beginPath();c.rect(cxR-rw/2,cyR-rh/2,rw,rh);c.clip();
 c.fillStyle=warna('--permukaan');c.fillRect(cxR-rw/2,cyR-rh/2,rw,rh);
 c.fillStyle=warna('--lembut');
 for(let i=-14;i<=14;i++)for(let j=-14;j<=14;j++){const x=cxR+i*spx,y=cyR+j*spy;if(x>cxR-rw/2&&x<cxR+rw/2&&y>cyR-rh/2&&y<cyR+rh/2){c.beginPath();c.arc(x,y,2,0,2*Math.PI);c.fill();}}
 c.strokeStyle=warna('--aksen');c.lineWidth=3;c.strokeRect(cxR-nf*spx/2,cyR-np*spy/2,nf*spx,np*spy);
 c.restore();
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.strokeRect(cxR-rw/2,cyR-rh/2,rw,rh);
 c.fillStyle=warna('--teks');c.fillText('Ruang-k: titik = jarak antar titik, kotak biru = jangkauan',cxR,250);
 const ex=nf*dkx,ey=np*dky;
 $('ketfp').textContent='Ukuran piksel = FOV / N: arah frekuensi '+pxf.toFixed(2)+' mm, arah fase '+pxp.toFixed(2)+' mm'+(Math.abs(pxf-pxp)<0.005?' (piksel persegi).':' (piksel persegi panjang).')+' Di ruang-k: jarak antar titik \u0394k = 1/FOV adalah '+dkx.toFixed(3)+' siklus/cm (frekuensi) dan '+dky.toFixed(3)+' siklus/cm (fase). Jangkauan k = N \u00d7 \u0394k adalah '+ex.toFixed(2)+' dan '+ey.toFixed(2)+' siklus/cm, dan jangkauan itulah yang menentukan ukuran piksel (piksel = 1/jangkauan). FOV dua kali lebih besar berarti \u0394k setengah (titik lebih rapat). Waktu pindai berbanding lurus dengan matriks fase ('+np+' garis, dikali NEX).';
}
['gf','gpp'].forEach(k=>$(k).addEventListener('input',updFP));['gnf','gnp'].forEach(k=>$(k).addEventListener('change',updFP));
$('reset20').onclick=()=>{$('gf').value=240;$('gpp').value=100;$('gnf').value=128;$('gnp').value=128;updFP();};

updFP();
