/* Pembantu bersama. Urutan muat: data.js, data-tambahan.js, util.js */
const $=(id)=>document.getElementById(id);
const fmt=(x,d)=>x.toFixed(d).replace('.',',');
const nf=(x,d)=>x.toLocaleString('id-ID',{maximumFractionDigits:d});
const g1=x=>fmt(x,Number.isInteger(x)?0:1);
const T=(x,y,t,c,a)=>`<text x='${x}' y='${y}' text-anchor='${a||'start'}' fill='${c||'var(--teks)'}' font-size='13'>${t}</text>`;
const Tf=(x,y,t,c,a,f)=>`<text x='${x}' y='${y}' text-anchor='${a||'start'}' fill='${c||'var(--teks)'}' font-size='${f||13}'>${t}</text>`;
const K=DATA.KESELAMATAN,BIS=DATA.BIS,KRI=DATA.KR;
const B0S=Object.keys(DATA.FISIKA.larmor_MHz).sort((a,b)=>a-b);
/* nilai untuk <span data-d='...'> di materi */
const NIL={g1:K.garis_gauss_mT.standar,g2:K.garis_gauss_mT.alternatif,sn:K.sar_tubuh_W_per_kg.normal,s1:K.sar_tubuh_W_per_kg.tingkat1,sk:K.sar_kepala_normal_W_per_kg,t7:DATA.EFEK.vertigo_T,t8:DATA.EFEK.icnirp_T,jam:DATA.ZONA.cadangan_jam,bln:DATA.ZONA.pelatihan_bulan,ut:DATA.ZONA.uji_T,sed:DATA.PSIKO.sedasi_persen,ct:DATA.PSIKO.ct_persen,mri:DATA.PSIKO.mri_persen,tiga:DATA.PSIKO.penurunan_kali};
