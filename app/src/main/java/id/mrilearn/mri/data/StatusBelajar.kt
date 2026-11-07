package id.mrilearn.mri.data

import android.content.Context
import android.net.Uri
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import id.mrilearn.mri.web.WebConfig

/** Satu bookmark: halaman + posisi gulir (0.0 = atas, 1.0 = paling bawah). Satu per halaman (D-38). */
data class Penanda(val modulId: String, val berkas: String, val posisi: Float, val waktu: Long) {
    val kunci: String get() = StatusBelajar.kunci(modulId, berkas)
}

/**
 * Kemajuan belajar dan bookmark (Fase 6, D-13). Disimpan di SharedPreferences (tanpa dependensi
 * baru) dan dibuat sebagai state Compose supaya layar ikut berubah. Murni sisi native: isi modul
 * tidak disentuh. Satu halaman dikenali dengan kunci "idModul|berkas.html".
 */
class StatusBelajar(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences(NAMA, Context.MODE_PRIVATE)

    var dibuka by mutableStateOf(bacaSet(K_DIBUKA))
        private set
    var selesai by mutableStateOf(bacaSet(K_SELESAI))
        private set
    var penanda by mutableStateOf(bacaPenanda())
        private set

    fun tandaiDibuka(kunci: String) {
        if (kunci in dibuka) return
        dibuka = dibuka + kunci
        simpanSet(K_DIBUKA, dibuka)
    }

    fun aturSelesai(kunci: String, nilai: Boolean) {
        selesai = if (nilai) selesai + kunci else selesai - kunci
        simpanSet(K_SELESAI, selesai)
        if (nilai) tandaiDibuka(kunci)
    }

    fun adaPenanda(kunci: String): Boolean = penanda.any { it.kunci == kunci }

    fun simpanPenanda(p: Penanda) {
        penanda = penanda.filterNot { it.kunci == p.kunci } + p
        simpanDaftarPenanda()
    }

    fun hapusPenanda(kunci: String) {
        penanda = penanda.filterNot { it.kunci == kunci }
        simpanDaftarPenanda()
    }

    fun jumlahSelesai(m: Modul): Int = halamanModul(m).count { it in selesai }

    private fun bacaSet(nama: String): Set<String> =
        prefs.getStringSet(nama, emptySet())?.toSet() ?: emptySet()

    private fun simpanSet(nama: String, isi: Set<String>) {
        prefs.edit().putStringSet(nama, isi.toSet()).apply()
    }

    private fun bacaPenanda(): List<Penanda> = bacaSet(K_PENANDA).mapNotNull { baris ->
        val b = baris.split('|')
        if (b.size != 4) return@mapNotNull null
        val posisi = b[2].toFloatOrNull() ?: return@mapNotNull null
        val waktu = b[3].toLongOrNull() ?: return@mapNotNull null
        Penanda(b[0], b[1], posisi, waktu)
    }

    private fun simpanDaftarPenanda() {
        simpanSet(K_PENANDA, penanda.map { "${it.modulId}|${it.berkas}|${it.posisi}|${it.waktu}" }.toSet())
    }

    companion object {
        private const val NAMA = "mri_belajar"
        private const val K_DIBUKA = "dibuka"
        private const val K_SELESAI = "selesai"
        private const val K_PENANDA = "penanda"

        fun kunci(modulId: String, berkas: String): String = "$modulId|$berkas"

        /** Halaman yang dihitung untuk sebuah modul: halaman masuk + semua pecahan. */
        fun halamanModul(m: Modul): List<String> =
            (listOf(m.halamanMasuk) + m.pecahan.map { it.berkas }).distinct().map { kunci(m.id, it) }

        /** Ubah URL asset loader menjadi kunci halaman, atau null bila bukan halaman modul. */
        fun kunciDariUrl(url: String?, daftar: List<Modul>): String? {
            if (url.isNullOrEmpty()) return null
            val uri = Uri.parse(url)
            if (uri.scheme != "https" || uri.host != WebConfig.ASSET_HOST) return null
            val jalur = uri.path ?: return null
            if (!jalur.startsWith(WebConfig.ASSET_PREFIX)) return null
            val bagian = jalur.removePrefix(WebConfig.ASSET_PREFIX).split('/')
            if (bagian.size < 2) return null
            val modul = daftar.firstOrNull { it.folder == bagian[0] } ?: return null
            val berkas = bagian.drop(1).joinToString("/")
            return if (berkas.isEmpty()) null else kunci(modul.id, berkas)
        }
    }
}
