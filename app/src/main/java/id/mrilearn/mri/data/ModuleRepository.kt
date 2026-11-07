package id.mrilearn.mri.data

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

/** Membaca `modules.json` dan `link-rules.json` dari akar `assets/` (org.json bawaan Android). */
object ModuleRepository {

    fun muat(context: Context): DataAplikasi {
        val modul = parseModul(bacaAsset(context, "modules.json"))
        val aturan = parseAturan(bacaAsset(context, "link-rules.json"))
        return DataAplikasi(modul = modul, aturan = aturan)
    }

    private fun bacaAsset(context: Context, nama: String): String =
        context.assets.open(nama).bufferedReader(Charsets.UTF_8).use { it.readText() }

    private fun JSONObject.stringAtauNull(kunci: String): String? =
        if (isNull(kunci)) null else getString(kunci)

    private fun parseModul(teks: String): List<Modul> {
        val larik: JSONArray = JSONObject(teks).getJSONArray("modul")
        return (0 until larik.length()).map { i ->
            val o = larik.getJSONObject(i)
            val pecahanJson = o.getJSONArray("pecahan")
            Modul(
                id = o.getString("id"),
                folder = o.getString("folder"),
                judul = o.getString("judul"),
                deskripsi = o.stringAtauNull("deskripsi"),
                halamanMasuk = o.getString("halamanMasuk"),
                pecahan = (0 until pecahanJson.length()).map { j ->
                    val p = pecahanJson.getJSONObject(j)
                    Pecahan(id = p.getString("id"), berkas = p.getString("berkas"))
                },
                status = o.getString("status"),
                dibawa = o.getBoolean("dibawa"),
            )
        }
    }

    private fun parseAturan(teks: String): List<AturanTautan> {
        val larik: JSONArray = JSONObject(teks).getJSONArray("aturan")
        return (0 until larik.length()).map { i ->
            val o = larik.getJSONObject(i)
            val tujuan = if (o.has("tujuan")) o.getJSONObject("tujuan") else null
            AturanTautan(
                id = o.getString("id"),
                jenis = when (o.getString("jenis")) {
                    "tidakTersedia" -> JenisAturan.TIDAK_TERSEDIA
                    "arahkan" -> JenisAturan.ARAHKAN
                    else -> error("Jenis aturan tidak dikenal: ${o.getString("jenis")}")
                },
                cocokJalur = o.getString("cocokJalur"),
                pesan = o.stringAtauNull("pesan"),
                tujuanModul = tujuan?.stringAtauNull("modul"),
                tujuanPecahan = tujuan?.stringAtauNull("pecahan"),
            )
        }
    }
}
