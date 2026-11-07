package id.mrilearn.mri.web

/**
 * Membaca dan memulihkan posisi gulir halaman lewat JavaScript baca-saja/`scrollTo`.
 * Tidak mengubah isi atau logika modul (D-04). Hanya menghitung gulir dokumen utama; halaman
 * yang menggulir di dalam wadah sendiri tidak terdeteksi (pakai tombol tandai manual).
 */
object PosisiGulir {
    /** Mengembalikan "dasar,atas": dasar = (gulir+tinggi layar)/tinggi dokumen; atas = gulir/(tinggi dokumen-tinggi layar). */
    const val SKRIP_BACA =
        "(function(){var e=document.scrollingElement||document.documentElement;" +
            "var h=e.scrollHeight,v=window.innerHeight,t=e.scrollTop;" +
            "return ((t+v)/h)+','+(h>v?t/(h-v):0);})()"

    data class Posisi(val dasar: Float, val atas: Float)

    fun urai(hasil: String?): Posisi? {
        val teks = hasil?.trim('"') ?: return null
        val bagian = teks.split(',')
        if (bagian.size != 2) return null
        val dasar = bagian[0].toFloatOrNull() ?: return null
        val atas = bagian[1].toFloatOrNull() ?: return null
        return Posisi(dasar, atas.coerceIn(0f, 1f))
    }

    /** Gulir ke [p] hanya bila pengguna belum menggulir (agar tidak menimpa gerakan jari). */
    fun skripPulih(p: Float): String =
        "(function(p){var e=document.scrollingElement||document.documentElement;" +
            "var m=e.scrollHeight-window.innerHeight;" +
            "if(m>0&&e.scrollTop<2){window.scrollTo(0,p*m);}})(" + p.coerceIn(0f, 1f) + ")"
}
