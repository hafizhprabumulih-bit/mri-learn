/* A3 Tarian ruang-k: gradien menelusuri ruang-k. Memakai pembantu dari js/inti.js. */
/* Tarian ruang-k: jalur titik pada gradient-echo dan spin-echo */
let tst=0;
function panah(c,x0,y0,x1,y1){c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();const a=Math.atan2(y1-y0,x1-x0);c.beginPath();c.moveTo(x1,y1);c.lineTo(x1-9*Math.cos(a-0.4),y1-9*Math.sin(a-0.4));c.lineTo(x1-9*Math.cos(a+0.4),y1-9*Math.sin(a+0.4));c.closePath();c.fill();}
function updTr(){
 const se=document.querySelector('input[name=tm]:checked').value==='se',sg=document.querySelector('input[name=tpl]:checked').value==='pos'?1:-1,ky=+$('tky').value,K=30,S=4.5;
 $('tkyv').textContent=(ky>0?'+':'')+ky;
 const mx=se?3:2;if(tst>mx)tst=mx;
 const X=k=>150+k*S,Y=k=>150-k*S,c=$('ctr').getContext('2d');
 c.clearRect(0,0,300,300);c.fillStyle=warna('--permukaan');c.fillRect(0,0,300,300);
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.strokeRect(X(-K-2),Y(K+2),(2*K+4)*S,(2*K+4)*S);
 c.strokeStyle=warna('--lembut');c.setLineDash([4,4]);c.beginPath();c.moveTo(X(-K-2),150);c.lineTo(X(K+2),150);c.moveTo(150,Y(K+2));c.lineTo(150,Y(-K-2));c.stroke();c.setLineDash([]);
 c.fillStyle=warna('--lembut');c.font='11px sans-serif';c.textAlign='left';c.fillText('kx (frekuensi) \u2192',200,164);c.fillText('ky (fase) \u2191',156,16);
 const P0=[0,0],P1=se?[sg*K,ky]:[-sg*K,ky],P2=se?[-sg*K,-ky]:null,fin=se?[sg*K,-ky]:[sg*K,ky],st0=se?P2:P1;
 const ar=(a,b,col,w,dash)=>{c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w;if(dash)c.setLineDash([6,4]);panah(c,X(a[0]),Y(a[1]),X(b[0]),Y(b[1]));c.setLineDash([]);};
 if(tst>=1)ar(P0,P1,warna('--aksen'),2.5,false);
 if(se&&tst>=2)ar(P1,P2,warna('--t1'),2.5,true);
 if(tst===mx&&tst>=1)ar(st0,fin,warna('--t2'),5,false);
 const cur=tst===0?P0:tst===1?P1:(se&&tst===2)?P2:fin;
 c.fillStyle=warna('--teks');c.beginPath();c.arc(X(cur[0]),Y(cur[1]),5,0,2*Math.PI);c.fill();
 const arah=sg>0?'kiri ke kanan':'kanan ke kiri',ps=sg>0?'positif':'negatif',pf=ky>=0?'positif':'negatif';
 let t;
 if(tst===0)t='Pulsa RF eksitasi memusatkan sistem di pusat ruang-k.';
 else if(!se&&tst===1)t='Lobus gradien frekuensi ('+(sg>0?'negatif':'positif')+') menggeser titik ke '+(sg>0?'kiri':'kanan')+' sejauh A. Gradien fase ('+pf+', amplitudo '+Math.abs(ky)+') menggeser titik '+(ky>=0?'ke atas':'ke bawah')+' sejauh B, yaitu ke garis '+(ky>0?'+':'')+ky+'.';
 else if(!se)t='Gradien frekuensi dinyalakan '+ps+': data dibaca dari '+arah+' sepanjang garis '+(ky>0?'+':'')+ky+'. Jarak tempuh menentukan ukuran piksel arah frekuensi.';
 else if(tst===1)t='Gradien frekuensi ('+ps+') dan gradien fase ('+pf+', garis '+(ky>0?'+':'')+ky+') menyala bersamaan: titik bergeser ke sisi '+(sg>0?'kanan':'kiri')+' garis itu.';
 else if(tst===2)t='Pulsa rephasing 180\u00b0 memutar titik ke sisi berlawanan: kini di sisi '+(sg>0?'kiri':'kanan')+' garis '+(-ky>0?'+':'')+(-ky)+'.';
 else t='Gradien frekuensi dinyalakan lagi ('+ps+'): data dibaca dari '+arah+' sepanjang garis '+(-ky>0?'+':'')+(-ky)+'.';
 $('kettr').textContent='Langkah '+tst+' / '+mx+'. '+t;
 $('tprev2').disabled=tst===0;$('tnext2').disabled=tst===mx;
}
document.querySelectorAll('input[name=tm],input[name=tpl]').forEach(e=>e.addEventListener('change',updTr));
$('tky').addEventListener('input',updTr);
$('tnext2').onclick=()=>{tst++;updTr();};$('tprev2').onclick=()=>{tst=Math.max(0,tst-1);updTr();};
$('reset16').onclick=()=>{tst=0;document.querySelector('input[name=tm][value=gre]').checked=true;document.querySelector('input[name=tpl][value=pos]').checked=true;$('tky').value=18;updTr();};

updTr();
