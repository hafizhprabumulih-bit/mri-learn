package id.mrilearn.mri.ui

/**
 * Layar native. Tumpukan layar disimpan sebagai satu String (satu layar per baris) supaya aman
 * disimpan `rememberSaveable` saat aplikasi diputar/dibuat ulang, tanpa pustaka tambahan.
 */
sealed interface Layar {
    data object Dasbor : Layar
    data object Bookmark : Layar
    data class PilihBagian(val modulId: String) : Layar
    data class IsiModul(
        val modulId: String,
        val berkas: String,
        val anchor: String?,
        /** Posisi gulir awal 0..1 (dari bookmark), null = dari atas. */
        val posisi: Float? = null,
    ) : Layar
}

private const val PEMISAH = "|"

fun Layar.kode(): String = when (this) {
    Layar.Dasbor -> "D"
    Layar.Bookmark -> "B"
    is Layar.PilihBagian -> "P$PEMISAH$modulId"
    is Layar.IsiModul ->
        "M$PEMISAH$modulId$PEMISAH$berkas$PEMISAH${anchor.orEmpty()}$PEMISAH${posisi?.toString().orEmpty()}"
}

fun kodeKeLayar(kode: String): Layar {
    val bagian = kode.split(PEMISAH, limit = 5)
    return when (bagian[0]) {
        "B" -> Layar.Bookmark
        "P" -> Layar.PilihBagian(bagian.getOrElse(1) { "" })
        "M" -> Layar.IsiModul(
            modulId = bagian.getOrElse(1) { "" },
            berkas = bagian.getOrElse(2) { "index.html" },
            anchor = bagian.getOrNull(3)?.ifEmpty { null },
            posisi = bagian.getOrNull(4)?.toFloatOrNull(),
        )
        else -> Layar.Dasbor
    }
}
