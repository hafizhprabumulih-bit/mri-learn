package id.mrilearn.mri.web

import android.content.Context
import android.content.pm.ApplicationInfo
import android.webkit.WebSettings
import androidx.webkit.WebSettingsCompat
import androidx.webkit.WebViewFeature

/**
 * Paket `web`: segala hal tentang WebView (asset loader, pencegat tautan, keamanan, tema gelap).
 * Fase 5 menambah [terapkanKeamanan], [terapkanTemaGelap], dan [apakahDebug].
 */
object WebConfig {
    /** Alamat virtual tempat WebViewAssetLoader menyajikan isi `assets/` (D-02). */
    const val ASSET_HOST = "appassets.androidplatform.net"

    /** Awalan jalur: https://ASSET_HOST/assets/... dipetakan ke folder `assets/` di APK. */
    const val ASSET_PREFIX = "/assets/"

    /** Warna latar WebView (sama dengan latar tema) supaya tidak berkedip putih saat memuat. */
    val LATAR_GELAP: Int = 0xFF0C1220.toInt()

    fun urlAsset(folder: String, berkas: String, anchor: String?): String = buildString {
        append("https://").append(ASSET_HOST).append(ASSET_PREFIX)
        append(folder).append('/').append(berkas)
        if (!anchor.isNullOrEmpty()) append('#').append(anchor)
    }

    /** true hanya pada build debug (APK uji pribadi). Rilis: false, jadi alat uji tidak muncul. */
    fun apakahDebug(context: Context): Boolean =
        (context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0

    /**
     * Keamanan WebView (Fase 5): tidak ada akses berkas, konten, lokasi, atau jendela baru;
     * konten campuran ditolak. Isi modul hanya datang dari asset loader (https, host sendiri).
     */
    @Suppress("DEPRECATION")
    fun terapkanKeamanan(s: WebSettings) {
        s.javaScriptEnabled = true // wajib: seluruh simulasi memakai JavaScript
        s.allowFileAccess = false
        s.allowContentAccess = false
        s.setAllowFileAccessFromFileURLs(false)
        s.setAllowUniversalAccessFromFileURLs(false)
        s.setGeolocationEnabled(false)
        s.setSupportMultipleWindows(false)
        s.javaScriptCanOpenWindowsAutomatically = false
        s.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
    }

    /**
     * Tema gelap paksa (D-12). Aplikasi bertema gelap, jadi WebView melaporkan
     * `prefers-color-scheme: dark` ke halaman. Pada Android 13+ pelaku penggelapan otomatis
     * harus diizinkan; halaman yang sudah punya tema gelap sendiri tetap memakai temanya.
     * Android 10-12 mengikuti tema aplikasi secara otomatis (tanpa API usang).
     */
    fun terapkanTemaGelap(s: WebSettings) {
        if (WebViewFeature.isFeatureSupported(WebViewFeature.ALGORITHMIC_DARKENING)) {
            WebSettingsCompat.setAlgorithmicDarkeningAllowed(s, true)
        }
    }
}
