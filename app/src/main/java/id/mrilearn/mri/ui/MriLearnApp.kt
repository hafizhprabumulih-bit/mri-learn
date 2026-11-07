package id.mrilearn.mri.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import id.mrilearn.mri.R
import id.mrilearn.mri.data.ModuleRepository
import id.mrilearn.mri.web.PencegatTautan

/**
 * Layar akar (Fase 4): tumpukan layar native sederhana.
 * Dasbor -> (PilihBagian) -> IsiModul. Tautan dari dalam WebView yang menunjuk modul lain
 * mendorong IsiModul baru ke tumpukan, jadi Back kembali ke modul sebelumnya.
 */
@Composable
fun MriLearnApp() {
    val context = LocalContext.current
    val hasil = remember { runCatching { ModuleRepository.muat(context) } }
    val data = hasil.getOrNull()

    var tumpukan by rememberSaveable { mutableStateOf(Layar.Dasbor.kode()) }
    val daftar = tumpukan.split("\n").map(::kodeKeLayar)
    val layar = daftar.last()

    fun dorong(l: Layar) {
        tumpukan = tumpukan + "\n" + l.kode()
    }

    fun kembali() {
        if ("\n" in tumpukan) tumpukan = tumpukan.substringBeforeLast("\n")
    }

    fun keDasbor() {
        tumpukan = Layar.Dasbor.kode()
    }

    // Layar IsiModul mengurus tombol Back sendiri (riwayat WebView dulu).
    BackHandler(enabled = layar !is Layar.IsiModul && daftar.size > 1) { kembali() }

    if (data == null) {
        GalatScreen(pesan = hasil.exceptionOrNull()?.message)
        return
    }
    val pencegat = remember(data) { PencegatTautan(data) }

    // key(tumpukan): setiap perubahan tumpukan membuat komposisi (dan WebView) baru.
    key(tumpukan) {
        when (layar) {
            Layar.Dasbor -> DasborScreen(
                modul = data.modul,
                onBuka = { m ->
                    if (m.pecahan.isEmpty()) {
                        dorong(Layar.IsiModul(m.id, m.halamanMasuk, null))
                    } else {
                        dorong(Layar.PilihBagian(m.id))
                    }
                },
            )

            is Layar.PilihBagian -> {
                val m = data.cariModul(layar.modulId)
                if (m == null) {
                    GalatScreen(pesan = "Modul ${layar.modulId} tidak ditemukan.")
                } else {
                    PilihBagianScreen(
                        modul = m,
                        onBuka = { berkas -> dorong(Layar.IsiModul(m.id, berkas, null)) },
                        onKembali = { kembali() },
                    )
                }
            }

            is Layar.IsiModul -> {
                val m = data.cariModul(layar.modulId)
                if (m == null) {
                    GalatScreen(pesan = "Modul ${layar.modulId} tidak ditemukan.")
                } else {
                    ModulScreen(
                        judul = m.judul,
                        folder = m.folder,
                        berkas = layar.berkas,
                        anchor = layar.anchor,
                        pencegat = pencegat,
                        onBukaModul = { aksi ->
                            dorong(Layar.IsiModul(aksi.modulId, aksi.berkas, aksi.anchor))
                        },
                        onKeDasbor = { keDasbor() },
                        onKembali = { kembali() },
                    )
                }
            }
        }
    }
}

@Composable
private fun GalatScreen(pesan: String?) {
    Scaffold(containerColor = MaterialTheme.colorScheme.background) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(32.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp, Alignment.CenterVertically),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(
                text = stringResource(R.string.galat_muat),
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onBackground,
                textAlign = TextAlign.Center,
            )
            if (!pesan.isNullOrBlank()) {
                Text(
                    text = pesan,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center,
                )
            }
        }
    }
}
