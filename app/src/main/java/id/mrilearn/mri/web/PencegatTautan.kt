package id.mrilearn.mri.web

import android.net.Uri
import id.mrilearn.mri.data.DataAplikasi
import id.mrilearn.mri.data.JenisAturan

/** Keputusan untuk satu tautan yang diklik di dalam WebView (D-08, D-24, D-25). */
sealed interface AksiTautan {
    /** Tautan biasa di dalam isi modul: biarkan WebView membukanya. */
    data object Izinkan : AksiTautan

    /** Jangan buka; tampilkan [pesan] bila ada. */
    data class Blokir(val pesan: String?) : AksiTautan

    /** Setara `../index.html` di cangkang web: kembali ke dasbor native. */
    data object KeDasbor : AksiTautan

    /** Buka layar modul native untuk [modulId] pada [berkas] (dan [anchor] bila ada). */
    data class BukaModul(val modulId: String, val berkas: String, val anchor: String?) : AksiTautan
}

/**
 * Mencegat tautan keluar modul. Urutan pemeriksaan:
 * 1. Bukan https di host asset loader: diblokir (aplikasi offline, D-03).
 * 2. Aturan khusus di `link-rules.json` (cocokJalur sama persis dengan path URL).
 * 3. `/assets/index.html` (akar, bukan folder modul): dasbor.
 * 4. `/assets/modul.html?m=ID[&hal=NAMA]`: layar modul native. NAMA hanya dipakai bila ada di
 *    `pecahan`; jika tidak, jatuh ke halaman masuk (sama dengan aturan `modul.html` asli).
 * 5. Selain itu: tautan di dalam modul, diizinkan.
 */
class PencegatTautan(private val data: DataAplikasi) {

    fun putuskan(uri: Uri): AksiTautan {
        if (uri.scheme != "https" || uri.host != WebConfig.ASSET_HOST) {
            return AksiTautan.Blokir(PESAN_TAUTAN_LUAR)
        }
        val path = uri.path ?: return AksiTautan.Blokir(null)
        val anchor = uri.encodedFragment

        data.aturan.firstOrNull { it.cocokJalur == path }?.let { aturan ->
            return when (aturan.jenis) {
                JenisAturan.TIDAK_TERSEDIA ->
                    AksiTautan.Blokir(aturan.pesan ?: PESAN_TIDAK_TERSEDIA)
                JenisAturan.ARAHKAN ->
                    bukaModul(aturan.tujuanModul, aturan.tujuanPecahan, anchor)
            }
        }

        if (path == WebConfig.ASSET_PREFIX + "index.html") return AksiTautan.KeDasbor

        if (path == WebConfig.ASSET_PREFIX + "modul.html") {
            return bukaModul(uri.getQueryParameter("m"), uri.getQueryParameter("hal"), anchor)
        }

        return AksiTautan.Izinkan
    }

    private fun bukaModul(modulId: String?, pecahanId: String?, anchor: String?): AksiTautan {
        val modul = modulId?.let { data.cariModul(it) }
            ?: return AksiTautan.Blokir(PESAN_MODUL_TIDAK_ADA)
        if (modul.segeraHadir) return AksiTautan.Blokir(PESAN_SEGERA_HADIR)
        val berkas = pecahanId
            ?.let { id -> modul.pecahan.firstOrNull { it.id == id }?.berkas }
            ?: modul.halamanMasuk
        return AksiTautan.BukaModul(modul.id, berkas, anchor)
    }

    private companion object {
        const val PESAN_TAUTAN_LUAR = "Tautan luar tidak dibuka. Aplikasi ini bekerja offline."
        const val PESAN_TIDAK_TERSEDIA = "Halaman ini tidak tersedia di aplikasi."
        const val PESAN_MODUL_TIDAK_ADA = "Modul tidak ditemukan."
        const val PESAN_SEGERA_HADIR = "Modul ini segera hadir."
    }
}
