/* A2 Sampling dan teorema Nyquist. Memakai pembantu dari js/inti.js. */
/* Sampling dan Nyquist */
function updN(){
 const f=+$('fs').value,N=+$('np2').value;
 $('fsv').textContent=f;$('npv').textContent=N;
 const c=$('cn').getContext('2d'),W=600,H=200,A=70,ph=0.35;
 c.clearRect(0,0,W,H);
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.beginPath();c.moveTo(0,H/2);c.lineTo(W,H/2);c.stroke();
 c.strokeStyle=warna('--lembut');c.lineWidth=2;c.beginPath();
 for(let x=0;x<=W;x++){const y=H/2-A*Math.cos(2*Math.PI*f*x/W+ph);x?c.lineTo(x,y):c.moveTo(x,y);}
 c.stroke();
 const pts=[];
 for(let j=0;j<N;j++)pts.push([j*W/N,H/2-A*Math.cos(2*Math.PI*f*j/N+ph)]);
 c.strokeStyle=warna('--t1');c.lineWidth=2.5;c.beginPath();
 pts.forEach((p,j)=>j?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
 c.fillStyle=warna('--aksen');
 pts.forEach(p=>{c.beginPath();c.arc(p[0],p[1],4,0,2*Math.PI);c.fill();});
 const fa=Math.abs(f-N*Math.round(f/N));
 let t='Titik per siklus = '+(N/f).toFixed(1)+'. ';
 if(N>=2*f)t+='Memenuhi Nyquist (minimal dua titik per siklus): frekuensi terbaca benar.'+(N===2*f?' Ini batas minimum, hanya cukup pas-pasan.':'');
 else if(fa===0)t+='Tepat satu titik per siklus (atau kelipatannya): gelombang tampak sebagai garis lurus, frekuensinya hilang.';
 else t+='Kurang dari dua titik per siklus: aliasing. Gelombang tampak berfrekuensi '+fa+' siklus per jendela, bukan '+f+'.';
 $('ketn').textContent=t;
}
$('fs').addEventListener('input',updN);$('np2').addEventListener('input',updN);
$('reset7').onclick=()=>{$('fs').value=3;$('np2').value=16;updN();};

if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',updN);
updN();
