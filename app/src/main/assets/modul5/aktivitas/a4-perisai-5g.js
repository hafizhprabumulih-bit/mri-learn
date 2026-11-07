/* A4: Perisai medan tepi 5 gauss. Menjelaskan T2.5. Satu komponen dengan M07B A1 (mode gaya tarik). */
daftarAktivitas({
 id:'A4', judul:'Perisai medan tepi (5 G)', menjelaskan:['T2.5'],
 html:`
<p class="lembut">Bandingkan tanpa perisai, perisai pasif, dan perisai aktif. Ilustrasi disederhanakan, tidak sesuai skala sebenarnya. Elips terisi pekat di dalam menunjukkan area medan yang lebih kuat.</p>
<div class="pilih" id="sh-b" role="group" aria-label="Pilih jenis perisai">
<button type="button" data-k="none" aria-pressed="true">Tanpa perisai</button>
<button type="button" data-k="pas" aria-pressed="false">Perisai pasif (baja)</button>
<button type="button" data-k="akt" aria-pressed="false">Perisai aktif (bucking coil)</button>
</div>
<label for="sh-f">Medan</label>
<select id="sh-f"><option value="1.5">1,5 T</option><option value="3">3 T</option></select>
${SVG_A4_PERISAI}
<p class="m5-out" id="sh-s"></p><p id="sh-t" role="status" aria-live="polite"></p>`,
 mulai(){
  const U={none:{o:[300,100],i:[180,60],t:'Tanpa perisai, garis 5 G meluas jauh ke segala arah dan dapat mengenai area publik.'},
           pas:{o:[150,54],i:[95,36],t:'Perisai pasif: pelat baja membelokkan garis fluks sehingga garis 5 G menyempit. Berat dan mahal.'},
           akt:{o:[120,44],i:[78,30],t:'Perisai aktif: bucking coil berarus berlawanan menyempitkan garis 5 G tanpa baja. Gradien medan di tepinya curam, sehingga waspada proyektil.'}};
  let k='none';
  function gambar(){
   const f=Math.pow(+$('sh-f').value/1.5,1/3), u=U[k], o=u.o, i=u.i, ox=o[0]*f, oy=o[1]*f;
   $('sh-o').setAttribute('rx',ox);$('sh-o').setAttribute('ry',oy);
   $('sh-i').setAttribute('rx',i[0]*f);$('sh-i').setAttribute('ry',i[1]*f);
   $('sh-pl').setAttribute('visibility',k==='pas'?'visible':'hidden');
   $('sh-c1').setAttribute('visibility',k==='akt'?'visible':'hidden');
   $('sh-c2').setAttribute('visibility',k==='akt'?'visible':'hidden');
   const aman=(620-350)>ox;
   $('sh-p').setAttribute('fill',aman?'var(--benar)':'var(--salah)');
   $('sh-s').textContent=aman?'Orang di area publik: di luar garis 5 G':'Orang di area publik: di dalam garis 5 G (tidak aman)';
   $('sh-t').textContent=u.t+(+$('sh-f').value>1.5?' Pada medan lebih tinggi jejaknya lebih lebar.':'');
  }
  grup('sh-b',x=>{k=x;gambar();}); $('sh-f').oninput=gambar; gambar();
 }
});
