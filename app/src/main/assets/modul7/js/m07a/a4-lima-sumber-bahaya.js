/* A4 · Lima sumber bahaya pada pemindai
   Menjelaskan: T1.3   [← M07 #10] */
daftarAktivitas('A4',{
 judul:'Lima sumber bahaya pada pemindai',menjelaskan:["T1.3"],
 html:`<p class='lembut'>Pilih satu sumber bahaya. Bagian pemindai yang berkaitan menyala pada potongan samping.</p>
<div class='pilih' id='hbtn' role='group' aria-label='Pilih sumber bahaya'></div>
<svg id='hsvg' viewBox='0 0 600 270' role='img' aria-label='Potongan samping pemindai MRI dengan lapisan magnet, gradient coil, dan RF coil'></svg>
<p class='hasil' id='hket' role='status' aria-live='polite'></p>
<div class='baris'><button type='button' id='hr'>Reset</button></div>`,
 mulai(root){
/* --- dari aktivitas asli #10 --- */
const HZ=[
 ['Psikologis','Bore sempit, bising, lama pemindaian, rasa terisolasi, dan takut hasil buruk dapat memicu cemas, klaustrofobia, sampai serangan panik.'],
 ['Medan statis','B0 selalu menyala dan berubah menurut jarak: efek sementara (vertigo, rasa logam), proyektil, dan torsi pada implan.'],
 ['Medan RF','Pulsa RF menghangatkan jaringan (SAR) dan dapat menyebabkan luka bakar, terutama lewat loop konduktif.'],
 ['Gradien','Medan yang berubah cepat menurut waktu dapat merangsang saraf dan otot, dan menimbulkan bising keras.'],
 ['Kriogen','Helium cair mendinginkan magnet. Saat quench, helium menjadi gas dalam jumlah besar dan dibuang lewat saluran khusus.']];
let hI=0;
HZ.forEach((a,i)=>{const b=document.createElement('button');b.type='button';b.textContent=a[0];b.onclick=()=>{hI=i;gambarBahaya();};$('hbtn').appendChild(b);});
function gambarBahaya(){
 const on=i=>hI===i,X=80,W=400;
 const st=(i,c)=>`fill='${c}' fill-opacity='${on(i)?.85:.25}' stroke='${on(i)?'var(--teks)':'var(--garis)'}' stroke-width='${on(i)?3:1}'`;
 let h=on(1)?`<ellipse cx='280' cy='134' rx='265' ry='128' fill='none' stroke='var(--salah)' stroke-dasharray='6 4' stroke-width='2'/>`+T(280,266,'medan tepi (garis putus-putus)','var(--salah)','middle'):'';
 h+=`<rect x='${X+340}' y='2' width='14' height='22' ${st(4,'var(--t2)')}/>`;
 [[24,'1'],[204,'1']].forEach(a=>{h+=`<rect x='${X}' y='${a[0]}' width='${W}' height='40' ${st(1,'var(--b0)')}/><rect x='${X+10}' y='${a[0]+8}' width='${W-20}' height='24' ${st(4,'var(--t2)')}/>`;});
 [64,179].forEach(y=>{h+=`<rect x='${X}' y='${y}' width='${W}' height='25' ${st(3,'var(--t1)')}/>`;});
 [89,164].forEach(y=>{h+=`<rect x='${X}' y='${y}' width='${W}' height='15' ${st(2,'var(--aksen)')}/>`;});
 h+=`<rect x='${X}' y='104' width='${W}' height='60' fill='var(--permukaan)' stroke='${on(0)?'var(--salah)':'var(--garis)'}' stroke-width='${on(0)?4:1}' stroke-dasharray='${on(0)?'6 4':'0'}'/>`;
 h+=`<rect x='40' y='150' width='${W+20}' height='8' rx='3' fill='var(--lembut)' fill-opacity='.5'/><rect x='170' y='124' width='150' height='26' rx='13' fill='#a5d8ff' stroke='#4c6ef5'/><circle cx='330' cy='137' r='13' fill='#f1c27d' stroke='#7a5a2a'/>`;
 if(on(0))h+=`<circle cx='330' cy='137' r='22' fill='none' stroke='var(--salah)' stroke-width='3'/>`;
 h+=T(X+W+8,48,'magnet')+T(X+W+8,80,'gradient coil')+T(X+W+8,100,'RF coil')+T(X+W+8,138,'bore');
 $('hsvg').innerHTML=h;
 [...$('hbtn').children].forEach((b,i)=>b.setAttribute('aria-pressed',i===hI));
 $('hket').textContent=HZ[hI][0]+': '+HZ[hI][1];
}
$('hr').onclick=()=>{hI=0;gambarBahaya();};
gambarBahaya();
 }
});
