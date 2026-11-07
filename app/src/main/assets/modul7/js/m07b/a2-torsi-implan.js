/* A2 · Torsi pada implan
   Menjelaskan: T2.5   [← M07 #5] */
daftarAktivitas('A2',{
 judul:'Torsi pada implan',menjelaskan:["T2.5"],
 html:`<p class='lembut'>Garis tegak adalah garis medan. Putar klip, atau tekan Biarkan menyelaras.</p>
<label for='tsa'>Sudut klip terhadap medan: <span id='tsav'></span> derajat</label>
<input type='range' id='tsa' min='0' max='90' step='1' value='45'>
<div class='baris'><button type='button' id='tsb' aria-pressed='false'>Implan tertambat pada tulang atau semen</button><button type='button' id='tsl'>Biarkan menyelaras</button></div>
<svg id='tsvg' viewBox='0 0 600 240' role='img' aria-label='Klip implan di dalam garis medan'></svg>
<div class='meter' aria-hidden='true'><i id='tsm'></i></div>
<p class='hasil' id='tsk' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='tsr'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #5 --- */
const tsa=$('tsa');let tsT=false,tsI=null;
function gambarTorsi(){
 const a=+tsa.value,r=a*Math.PI/180,tq=Math.sin(r);$('tsav').textContent=a;
 let h='';for(let x=40;x<=560;x+=40)h+=`<line x1='${x}' y1='10' x2='${x}' y2='230' stroke='var(--aksen)' stroke-opacity='.35' stroke-width='2'/>`;
 h+=`<g transform='rotate(${a} 300 195)'><rect x='293' y='55' width='14' height='140' rx='7' fill='var(--permukaan)' stroke='var(--teks)' stroke-width='2'/><circle cx='300' cy='67' r='11' fill='none' stroke='var(--teks)' stroke-width='3'/></g>`;
 h+=tsT?`<rect x='280' y='195' width='40' height='16' fill='var(--t1)' fill-opacity='.8'/>`+T(330,208,'tulang atau semen','var(--t1)'):`<circle cx='300' cy='195' r='6' fill='var(--t2)'/>`+T(312,212,'titik tumpu (jaringan lunak)','var(--t2)');
 if(a>0)h+=`<path d='M 300 45 A 150 150 0 0 1 ${(300+150*Math.sin(r)).toFixed(1)} ${(195-150*Math.cos(r)).toFixed(1)}' fill='none' stroke='var(--t1)' stroke-width='3' stroke-dasharray='5 4'/>`;
 $('tsvg').innerHTML=h;$('tsm').style.width=(tq*100)+'%';$('tsb').setAttribute('aria-pressed',tsT);
 $('tsk').textContent=a===0?'Klip sejajar dengan medan: tidak ada torsi.':'Torsi relatif '+fmt(tq*100,0)+' persen dari maksimum (gambaran sederhana). '+(tsT?'Implan tertambat: kecil kemungkinan berputar.':'Implan di jaringan lunak: cenderung berputar sampai sejajar medan dan dapat merusak jaringan sekitarnya.');
}
function hentiTs(){if(tsI){clearInterval(tsI);tsI=null;}}
tsa.oninput=()=>{hentiTs();gambarTorsi();};
$('tsb').onclick=()=>{hentiTs();tsT=!tsT;gambarTorsi();};
$('tsl').onclick=()=>{hentiTs();if(tsT){gambarTorsi();return;}
 if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){tsa.value=0;gambarTorsi();return;}
 tsI=setInterval(()=>{const v=+tsa.value-1;tsa.value=Math.max(v,0);gambarTorsi();if(v<=0)hentiTs();},25);};
$('tsr').onclick=()=>{hentiTs();tsT=false;tsa.value=45;gambarTorsi();};
gambarTorsi();
 }
});
