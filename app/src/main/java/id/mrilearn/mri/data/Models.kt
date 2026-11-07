package id.mrilearn.mri.data

/** Satu halaman pecahan sebuah modul (mis. id "m03a" -> berkas "m03a.html"). */
data class Pecahan(val id: String, val berkas: String)

/** Satu modul, dibaca dari `assets/modules.json` (D-07, D-26). */
data class Modul(
    val id: String,
    val folder: String,
    val judul: String,
    /** null = deskripsi kosong di sumber; UI menampilkan judul saja (D-27). */
    val deskripsi: String?,
    val halamanMasuk: String,
    val pecahan: List<Pecahan>,
    val status: String,
    val dibawa: Boolean,
) {
    /** Modul 10: hanya kartu "Segera hadir", tidak dibuka (D-06, D-20). */
    val segeraHadir: Boolean get() = status == "segera_hadir" || !dibawa
}

enum class JenisAturan { TIDAK_TERSEDIA, ARAHKAN }

/** Satu aturan dari `assets/link-rules.json` (D-24, D-25, D-26). */
data class AturanTautan(
    val id: String,
    val jenis: JenisAturan,
    val cocokJalur: String,
    val pesan: String?,
    val tujuanModul: String?,
    val tujuanPecahan: String?,
)

data class DataAplikasi(
    val modul: List<Modul>,
    val aturan: List<AturanTautan>,
) {
    fun cariModul(id: String): Modul? = modul.firstOrNull { it.id == id }
}
