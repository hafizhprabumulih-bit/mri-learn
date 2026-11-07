package id.mrilearn.mri.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import id.mrilearn.mri.web.AksiTautan
import id.mrilearn.mri.web.Diagnostik
import id.mrilearn.mri.web.PeganganWeb
import id.mrilearn.mri.web.PencegatTautan
import id.mrilearn.mri.web.WebAktif
import id.mrilearn.mri.web.WebConfig
import id.mrilearn.mri.web.buatWebView
import kotlinx.coroutines.launch

/**
 * Layar isi modul: WebView memuat halaman dari assets lewat asset loader.
 * Back: mundur di riwayat WebView dulu; bila sudah di halaman pertama, kembali ke layar native
 * sebelumnya (bukan menutup aplikasi).
 * Fase 5: bila proses render WebView mati (memori), tampil tombol "Muat ulang"; di build debug
 * ada tombol "Diag" yang menampilkan hasil pemeriksaan halaman (lihat [Diagnostik]).
 */
@Composable
fun ModulScreen(
    judul: String,
    folder: String,
    berkas: String,
    anchor: String?,
    pencegat: PencegatTautan,
    onBukaModul: (AksiTautan.BukaModul) -> Unit,
    onKeDasbor: () -> Unit,
    onKembali: () -> Unit,
) {
    val context = LocalContext.current
    val snackbar = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    val pegangan = remember { PeganganWeb() }
    var bisaMundur by remember { mutableStateOf(false) }
    var renderHilang by remember { mutableStateOf(false) }
    var percobaan by remember { mutableIntStateOf(0) }
    var teksDiag by remember { mutableStateOf<String?>(null) }
    val bukaModulTerbaru by rememberUpdatedState(onBukaModul)
    val keDasborTerbaru by rememberUpdatedState(onKeDasbor)
    val urlAwal = remember(folder, berkas, anchor) { WebConfig.urlAsset(folder, berkas, anchor) }
    val modeDebug = remember { WebConfig.apakahDebug(context) }

    fun mundurAtauKembali() {
        val wv = pegangan.view
        if (bisaMundur && wv != null) wv.goBack() else onKembali()
    }

    BackHandler { mundurAtauKembali() }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = { BilahAtas(judul = judul, onKembali = { mundurAtauKembali() }) },
        snackbarHost = { SnackbarHost(snackbar) },
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
        ) {
            if (renderHilang) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(32.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterVertically),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    Text(
                        text = "Halaman dihentikan oleh sistem (memori habis).",
                        color = MaterialTheme.colorScheme.onBackground,
                        textAlign = TextAlign.Center,
                    )
                    Button(onClick = {
                        renderHilang = false
                        percobaan += 1
                    }) { Text("Muat ulang") }
                }
            } else {
                // key(percobaan): "Muat ulang" membuat WebView baru, tanpa mengubah tumpukan layar.
                androidx.compose.runtime.key(percobaan) {
                    AndroidView(
                        modifier = Modifier.fillMaxSize(),
                        factory = {
                            buatWebView(
                                context = context,
                                urlAwal = urlAwal,
                                pencegat = pencegat,
                                pegangan = pegangan,
                                onAksi = { aksi ->
                                    when (aksi) {
                                        is AksiTautan.BukaModul -> bukaModulTerbaru(aksi)
                                        AksiTautan.KeDasbor -> keDasborTerbaru()
                                        is AksiTautan.Blokir -> aksi.pesan?.let { pesan ->
                                            scope.launch { snackbar.showSnackbar(pesan) }
                                        }
                                        AksiTautan.Izinkan -> Unit
                                    }
                                },
                                onRiwayat = { bisaMundur = it },
                                onRenderHilang = { renderHilang = true },
                            ).also {
                                pegangan.view = it
                                WebAktif.view = it
                            }
                        },
                        onRelease = { wv ->
                            wv.stopLoading()
                            wv.destroy()
                            if (pegangan.view === wv) pegangan.view = null
                            if (WebAktif.view === wv) WebAktif.view = null
                        },
                    )
                }
            }

            if (modeDebug && !renderHilang) {
                FilledTonalButton(
                    onClick = {
                        val wv = pegangan.view ?: return@FilledTonalButton
                        val info = Diagnostik.infoPerangkat(context, wv, pegangan)
                        wv.evaluateJavascript(Diagnostik.SKRIP) { hasil ->
                            teksDiag = info + "\n" + Diagnostik.urai(hasil)
                        }
                    },
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .padding(8.dp),
                ) { Text("Diag", fontSize = 12.sp) }
            }
        }
    }

    teksDiag?.let { teks ->
        AlertDialog(
            onDismissRequest = { teksDiag = null },
            title = { Text("Diagnostik halaman (debug)") },
            text = {
                Text(
                    text = teks,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 11.sp,
                    modifier = Modifier.verticalScroll(rememberScrollState()),
                )
            },
            confirmButton = { TextButton(onClick = { teksDiag = null }) { Text("Tutup") } },
        )
    }
}
