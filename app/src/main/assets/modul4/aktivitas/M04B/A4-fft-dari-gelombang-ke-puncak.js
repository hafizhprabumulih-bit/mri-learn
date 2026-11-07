/* A4 FFT: dari gelombang ke puncak. Memakai pembantu dari js/inti.js. */
/* FFT: gelombang ke puncak */
function updF(){
 const N=128,f1=+$('f1').value,f2=+$('f2').value,a1=+$('a1').value/10,a2=+$('a2').value/10,pel=$('pel').checked;
 $('f1v').textContent=f1;$('f2v').textContent=f2;$('a1v').textContent=a1.toFixed(1);$('a2v').textContent=a2.toFixed(1);
 const W=600,H=130,sk=(H/2-10)/Math.max(1,a1+a2);
 const g=t=>(a1*Math.sin(2*Math.PI*f1*t)+a2*Math.sin(2*Math.PI*f2*t))*(pel?Math.exp(-3*t):1);
 const c=$('cf1').getContext('2d');c.clearRect(0,0,W,H);
 c.strokeStyle=warna('--garis');c.lineWidth=1;c.beginPath();c.moveTo(0,H/2);c.lineTo(W,H/2);c.stroke();
 c.strokeStyle=warna('--aksen');c.lineWidth=2;c.beginPath();
 for(let x=0;x<=W;x++){const y=H/2-g(x/W)*sk;x?c.lineTo(x,y):c.moveTo(x,y);}
 c.stroke();
 const re=new Float64Array(N),im=new Float64Array(N);
 for(let i=0;i<N;i++)re[i]=g(i/N);
 fft1(re,im,false);
 const d=$('cf2').getContext('2d'),B=41,bw=W/B;d.clearRect(0,0,W,H);
 for(let q=0;q<B;q++){
  const m=Math.min(1,Math.hypot(re[q],im[q])*2/N);
  d.fillStyle=((q===f1&&a1>0)||(q===f2&&a2>0))?warna('--t1'):warna('--aksen');
  d.fillRect(q*bw+1,H-18-m*(H-30),bw-2,m*(H-30));
 }
 d.fillStyle=warna('--lembut');d.font='12px sans-serif';d.fillText('frekuensi (siklus per jendela) \u2192',6,H-4);
 const n=(a1>0?1:0)+(a2>0?1:0);
 $('ketf').textContent=n===0?'Tidak ada sinyal, maka tidak ada puncak.':n===1?'Satu frekuensi menghasilkan satu puncak, di frekuensi '+(a1>0?f1:f2)+'.':f1===f2?'Dua komponen berfrekuensi sama menyatu menjadi satu puncak.':'Dua frekuensi menghasilkan dua puncak, di '+f1+' dan '+f2+'. Tinggi puncak mengikuti amplitudo tiap gelombang.';
}
['f1','a1','f2','a2'].forEach(k=>$(k).addEventListener('input',updF));$('pel').addEventListener('change',updF);
$('reset9').onclick=()=>{$('f1').value=5;$('a1').value=10;$('f2').value=12;$('a2').value=5;$('pel').checked=false;updF();};

if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',updF);
updF();
