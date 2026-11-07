package id.mrilearn.mri.web

import android.content.Context
import android.os.Build
import android.webkit.WebView
import org.json.JSONTokener

/**
 * Alat uji Fase 5, HANYA muncul di build debug. Hanya MEMBACA keadaan halaman (tidak mengubah
 * isi modul). Hasilnya ditampilkan di dialog supaya bisa difoto/di-screenshot sebagai bukti.
 */
object Diagnostik {

    fun infoPerangkat(context: Context, wv: WebView, pegangan: PeganganWeb): String = buildString {
        val res = context.resources
        appendLine("Ponsel: ${Build.MANUFACTURER} ${Build.MODEL}, Android ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})")
        if (Build.VERSION.SDK_INT >= 26) {
            val p = WebView.getCurrentWebViewPackage()
            appendLine("WebView: ${p?.packageName} ${p?.versionName}")
        }
        appendLine("Kepadatan: ${res.displayMetrics.densityDpi} dpi, skala font sistem: ${res.configuration.fontScale}")
        appendLine("textZoom WebView: ${wv.settings.textZoom}%")
        appendLine("Waktu muat (native): ${if (pegangan.muatMs >= 0) "${pegangan.muatMs} ms" else "belum selesai"}")
        appendLine("URL: ${wv.url}")
    }

    /** Skrip baca-saja. Tanpa tanda dolar dan tanpa template literal agar aman di string Kotlin. */
    const val SKRIP = """
(function(){
  var o=[]; var d=window.devicePixelRatio||1;
  o.push('dpr='+d+'  viewport='+innerWidth+'x'+innerHeight+'  layar='+screen.width+'x'+screen.height);
  o.push('orientasi='+(screen.orientation?screen.orientation.type:'?')+'  zoom visual='+(window.visualViewport?window.visualViewport.scale:'?'));
  o.push('prefers-color-scheme gelap='+matchMedia('(prefers-color-scheme: dark)').matches);
  var b=document.body, de=document.documentElement;
  if(b){var cs=getComputedStyle(b); o.push('latar body='+cs.backgroundColor+'  teks='+cs.color+'  font dasar='+getComputedStyle(de).fontSize);}
  o.push('lebar konten='+de.scrollWidth+' vs viewport '+innerWidth+(de.scrollWidth>innerWidth+1?'  <-- GULIR MENDATAR':'  ok'));
  var mv=document.querySelector('meta[name=viewport]'); o.push('meta viewport='+(mv?mv.content:'TIDAK ADA'));
  o.push('jumlah elemen='+document.getElementsByTagName('*').length+'  iframe='+document.getElementsByTagName('iframe').length);
  var n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];
  if(n){o.push('muat (JS): DOMContentLoaded '+Math.round(n.domContentLoadedEventEnd)+' ms, load '+Math.round(n.loadEventEnd)+' ms');}
  if(performance.memory){o.push('heap JS terpakai='+Math.round(performance.memory.usedJSHeapSize/1048576)+' MB');}
  var cv=document.querySelectorAll('canvas'); var buram=0, ta={}, baris=[];
  for(var i=0;i<cv.length;i++){
    var c=cv[i], w=c.clientWidth, r=w?c.width/w:0, t=getComputedStyle(c).touchAction;
    ta[t]=(ta[t]||0)+1;
    var kabur=(d>1&&w>0&&r<d*0.9); if(kabur)buram++;
    if(i<15)baris.push('  #'+(c.id||c.className||i)+' piksel '+c.width+'x'+c.height+' tampil '+w+'x'+c.clientHeight+' rasio '+r.toFixed(2)+(kabur?' KABUR?':'')+' touch-action='+t);
  }
  o.push('kanvas='+cv.length+'  tidak-dikalikan-dpr='+buram+'  touch-action='+JSON.stringify(ta));
  for(var k=0;k<baris.length;k++)o.push(baris[k]);
  return o.join('\n');
})()
"""

    /** `evaluateJavascript` mengembalikan string JSON; ubah jadi teks biasa. */
    fun urai(hasil: String?): String {
        if (hasil == null || hasil == "null") return "(tidak ada hasil)"
        return runCatching { JSONTokener(hasil).nextValue() as? String }.getOrNull() ?: hasil
    }
}
