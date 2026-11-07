package id.mrilearn.mri.web

import android.annotation.SuppressLint
import android.content.Context
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader

/** Tempat menyimpan WebView aktif agar tombol Back bisa memanggil `goBack()`. */
class PeganganWeb {
    var view: WebView? = null
}

/**
 * Membuat WebView untuk satu layar modul.
 * - Isi `assets/` disajikan lewat WebViewAssetLoader di https://ASSET_HOST/assets/ (D-02),
 *   sehingga `fetch()` Modul 3 dan 4 bekerja tanpa mengubah kode modul.
 * - Tautan yang diklik dicegat oleh [PencegatTautan]; selain "Izinkan", diteruskan ke [onAksi].
 * - [onRiwayat] dipanggil dengan `true` bila WebView bisa mundur ke halaman sebelumnya.
 * Pengaturan keamanan dan kinerja lanjutan menyusul di Fase 5.
 */
@SuppressLint("SetJavaScriptEnabled")
fun buatWebView(
    context: Context,
    urlAwal: String,
    pencegat: PencegatTautan,
    onAksi: (AksiTautan) -> Unit,
    onRiwayat: (Boolean) -> Unit,
): WebView {
    val assetLoader = WebViewAssetLoader.Builder()
        .setDomain(WebConfig.ASSET_HOST)
        .addPathHandler(WebConfig.ASSET_PREFIX, WebViewAssetLoader.AssetsPathHandler(context))
        .build()

    return WebView(context).apply {
        setBackgroundColor(WebConfig.LATAR_GELAP)
        settings.javaScriptEnabled = true
        settings.allowFileAccess = false
        settings.allowContentAccess = false

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
                return assetLoader.shouldInterceptRequest(uri)
            }

            override fun doUpdateVisitedHistory(view: WebView?, url: String?, isReload: Boolean) {
                super.doUpdateVisitedHistory(view, url, isReload)
                onRiwayat(view?.canGoBack() == true)
            }
        }

        loadUrl(urlAwal)
    }
}
