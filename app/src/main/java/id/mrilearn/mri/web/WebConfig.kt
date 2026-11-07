package id.mrilearn.mri.web

/**
 * Paket `web`: segala hal tentang WebView (asset loader, pencegat tautan, tema gelap paksa).
 * Fase 4 mengisi asset loader dan pencegat tautan; Fase 5 menangani tema gelap paksa dan kinerja.
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
}
