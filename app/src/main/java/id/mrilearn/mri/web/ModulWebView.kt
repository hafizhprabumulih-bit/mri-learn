package id.mrilearn.mri.web

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.os.SystemClock
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader
import java.io.ByteArrayInputStream

/** Tempat menyimpan WebView aktif (Back, diagnostik) dan ukuran waktu muat. */
class PeganganWeb {
    var view: WebView? = null
    var mulaiMs: Long = 0
    var muatMs: Long = -1
}

/** WebView yang sedang tampil; dipakai MainActivity untuk menjeda/melanjutkan saat aplikasi ke latar. */
object WebAktif {
    var view: WebView? = null
}

/**
 * Membuat WebView untuk satu layar modul.
 * - Isi `assets/` disajikan lewat WebViewAssetLoader di https://ASSET_HOST/assets/ (D-02).
 * - Tautan yang diklik dicegat oleh [PencegatTautan]; selain "Izinkan", diteruskan ke [onAksi].
 * - Fase 5: keamanan (WebConfig.terapkanKeamanan), tema gelap paksa, blokir permintaan ke host
 *   lain, debugging WebView hanya di build debug, dan penanganan proses render yang mati.
 */
@SuppressLint("SetJavaScriptEnabled")
fun buatWebView(
    context: Context,
    urlAwal: String,
    pencegat: PencegatTautan,
    pegangan: PeganganWeb,
    onAksi: (AksiTautan) -> Unit,
    onRiwayat: (Boolean) -> Unit,
    onRenderHilang: () -> Unit,
): WebView {
    // Debugging isi WebView (chrome://inspect) hanya boleh di build debug, tidak di rilis.
    WebView.setWebContentsDebuggingEnabled(WebConfig.apakahDebug(context))

    val assetLoader = WebViewAssetLoader.Builder()
        .setDomain(WebConfig.ASSET_HOST)
        .addPathHandler(WebConfig.ASSET_PREFIX, WebViewAssetLoader.AssetsPathHandler(context))
        .build()

    return WebView(context).apply {
        setBackgroundColor(WebConfig.LATAR_GELAP)
        WebConfig.terapkanKeamanan(settings)
        WebConfig.terapkanTemaGelap(settings)

        webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?,
            ): Boolean {
                val uri = request?.url ?: return true
                val aksi = pencegat.putuskan(uri)
                if (aksi is AksiTautan.Izinkan) return false
                onAksi(aksi)
                return true
            }

            override fun shouldInterceptRequest(
                view: WebView?,
                request: WebResourceRequest?,
            ): WebResourceResponse? {
                val uri = request?.url ?: return null
                val skema = uri.scheme
                // data: dan blob: dibuat oleh halaman sendiri (mis. gambar dari kanvas); biarkan.
                if (skema == "data" || skema == "blob" || skema == "about") return null
                if (skema == "https" && uri.host == WebConfig.ASSET_HOST) {
                    return assetLoader.shouldInterceptRequest(uri)
                }
                // Apa pun selain asset loader (http, file, host lain) diblokir (D-03, D-28).
                return WebResourceResponse(
                    "text/plain", "utf-8", 403, "Forbidden", emptyMap(),
                    ByteArrayInputStream(ByteArray(0)),
                )
            }

            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                pegangan.mulaiMs = SystemClock.elapsedRealtime()
                pegangan.muatMs = -1
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                pegangan.muatMs = SystemClock.elapsedRealtime() - pegangan.mulaiMs
            }

            override fun doUpdateVisitedHistory(view: WebView?, url: String?, isReload: Boolean) {
                super.doUpdateVisitedHistory(view, url, isReload)
                onRiwayat(view?.canGoBack() == true)
            }

            // Sistem bisa mematikan proses render saat memori habis. Tanpa ini, aplikasi ikut mati.
            override fun onRenderProcessGone(
                view: WebView?,
                detail: RenderProcessGoneDetail?,
            ): Boolean {
                onRenderHilang()
                return true
            }
        }

        loadUrl(urlAwal)
    }
}
