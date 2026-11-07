package id.mrilearn.mri.ui

import android.os.SystemClock
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
import androidx.compose.material3.IconButton
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import id.mrilearn.mri.data.Modul
import id.mrilearn.mri.data.Penanda
import id.mrilearn.mri.data.StatusBelajar
import id.mrilearn.mri.web.AksiTautan
import id.mrilearn.mri.web.Diagnostik
import id.mrilearn.mri.web.PeganganWeb
import id.mrilearn.mri.web.PencegatTautan
import id.mrilearn.mri.web.PosisiGulir
import id.mrilearn.mri.web.WebAktif
import id.mrilearn.mri.web.WebConfig
import id.mrilearn.mri.web.buatWebView
import kotlinx.coroutines.launch

/** Penyimpan keadaan pelacakan gulir untuk satu layar modul (bukan state Compose). */
private class PelacakGulir {
    var terakhirMs = 0L
    var abaikanSampaiMs = 0L
    var sudahPulih = false
    var tunda: Runnable? = null
}

/**
 * Layar isi modul: WebView memuat halaman dari assets lewat asset loader.
 * Back: mundur di riwayat WebView dulu; bila sudah di halaman pertama, kembali ke layar native.
 * Fase 5: tombol "Muat ulang" bila proses render mati; tombol "Diag" di build debug.
 * Fase 6: halaman yang sedang tampil dicatat "dibuka"; menggulir sampai sekitar 90% bawah (atau
 * tombol ✓) menandainya "selesai"; tombol ☆ menyimpan bookmark beserta posisi gulir (D-37, D-38).
 */
@Composable
fun ModulScreen(
    modulId: String,
    daftarModul: List<Modul>,
    status: StatusBelajar,
    judul: String,
    folder: String,
    berkas: String,
    anchor: String?,
    posisiAwal: Float?,
    pencegat: PencegatTautan,
    onBukaModul: (AksiTautan.BukaModul) -> Unit,
    onKeDasbor: () -> Unit,
    onKembali: () -> Unit,
) {
    val context = LocalContext.current
    val snackbar = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    val pegangan = remember { PeganganWeb() }
    val pelacak = remember { PelacakGulir() }
    var bisaMundur by remember { mutableStateOf(false) }
    var renderHilang by remember { mutableStateOf(false) }
    var percobaan by remember { mutableIntStateOf(0) }
    var teksDiag by remember { mutableStateOf<String?>(null) }
    var kunciHalaman by remember { mutableStateOf(StatusBelajar.kunci(modulId, berkas)) }
    val bukaModulTerbaru by rememberUpdatedState(onBukaModul)
    val keDasborTerbaru by rememberUpdatedState(onKeDasbor)
    val urlAwal = remember(folder, berkas, anchor) { WebConfig.urlAsset(folder, berkas, anchor) }
    val modeDebug = remember { WebConfig.apakahDebug(context) }

    val sudahSelesai = kunciHalaman in status.selesai
    val adaPenanda = status.adaPenanda(kunciHalaman)

    fun mundurAtauKembali() {
        val wv = pegangan.view
        if (bisaMundur && wv != null) wv.goBack() else onKembali()
    }

    // Baca posisi gulir; bila sudah sekitar 90% ke bawah, tandai halaman selesai.
    fun periksaGulir() {
        val wv = pegangan.view ?: return
        wv.evaluateJavascript(PosisiGulir.SKRIP_BACA) { hasil ->
            val posisi = PosisiGulir.urai(hasil) ?: return@evaluateJavascript
            val k = kunciHalaman
            if (posisi.dasar >= 0.9f && k !in status.selesai) {
                status.aturSelesai(k, true)
                scope.launch { snackbar.showSnackbar("Halaman ditandai selesai") }
            }
        }
    }

    remember {
        pelacak.tunda = Runnable {
            if (SystemClock.elapsedRealtime() >= pelacak.abaikanSampaiMs) periksaGulir()
        }
        true
    }

    fun saatDigulir() {
        val sekarang = SystemClock.elapsedRealtime()
        if (sekarang < pelacak.abaikanSampaiMs) return
        if (sekarang - pelacak.terakhirMs >= 400) {
            pelacak.terakhirMs = sekarang
            periksaGulir()
        }
        // Pemeriksaan susulan setelah gulir berhenti, agar gulir terakhir ke dasar tidak terlewat.
        val wv = pegangan.view ?: return
        val tunda = pelacak.tunda ?: return
        wv.removeCallbacks(tunda)
        wv.postDelayed(tunda, 500)
    }

    fun saatUrl(url: String) {
        StatusBelajar.kunciDariUrl(url, daftarModul)?.let { k ->
            kunciHalaman = k
            status.tandaiDibuka(k)
        }
    }

    // Setelah halaman awal selesai dimuat, pulihkan posisi gulir dari bookmark (3 percobaan,
    // karena Modul 3 dan 4 mengisi isi halaman lewat fetch setelah dimuat).
    fun saatMuatSelesai(url: String) {
        val tujuan = posisiAwal ?: return
        if (pelacak.sudahPulih) return
        if (StatusBelajar.kunciDariUrl(url, daftarModul) != StatusBelajar.kunci(modulId, berkas)) return
        pelacak.sudahPulih = true
        pelacak.abaikanSampaiMs = SystemClock.elapsedRealtime() + 4500
        val wv = pegangan.view ?: return
        for (ms in longArrayOf(400, 1200, 2800)) {
            wv.postDelayed({ wv.evaluateJavascript(PosisiGulir.skripPulih(tujuan), null) }, ms)
        }
    }

    fun gantiPenanda() {
        val k = kunciHalaman
        if (status.adaPenanda(k)) {
            status.hapusPenanda(k)
            scope.launch { snackbar.showSnackbar("Bookmark dihapus") }
            return
        }
        val wv = pegangan.view ?: return
        wv.evaluateJavascript(PosisiGulir.SKRIP_BACA) { hasil ->
            val p = PosisiGulir.urai(hasil)?.atas ?: 0f
            val bagian = k.split('|', limit = 2)
            status.simpanPenanda(
                Penanda(bagian[0], bagian.getOrElse(1) { berkas }, p, System.currentTimeMillis()),
            )
            scope.launch { snackbar.showSnackbar("Bookmark disimpan") }
        }
    }

    BackHandler { mundurAtauKembali() }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            BilahAtas(
                judul = judul,
                onKembali = { mundurAtauKembali() },
                aksi = {
                    val dBookmark = if (adaPenanda) "Hapus bookmark" else "Simpan bookmark"
                    IconButton(
                        onClick = { gantiPenanda() },
                        modifier = Modifier.semantics { contentDescription = dBookmark },
                    ) {
                        Text(
                            text = if (adaPenanda) "★" else "☆",
                            style = MaterialTheme.typography.titleLarge,
                            color = if (adaPenanda) MaterialTheme.colorScheme.primary else Color.Unspecified,
                        )
                    }
                    val dSelesai = if (sudahSelesai) "Batalkan tanda selesai" else "Tandai selesai"
                    IconButton(
                        onClick = { status.aturSelesai(kunciHalaman, !sudahSelesai) },
                        modifier = Modifier.semantics { contentDescription = dSelesai },
                    ) {
                        Text(
                            text = if (sudahSelesai) "✓" else "○",
                            style = MaterialTheme.typography.titleLarge,
                            color = if (sudahSelesai) MaterialTheme.colorScheme.primary else Color.Unspecified,
                        )
                    }
                },
            )
        },
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
                                onUrl = { saatUrl(it) },
                                onMuatSelesai = { saatMuatSelesai(it) },
                            ).also { wv ->
                                pegangan.view = wv
                                WebAktif.view = wv
                                wv.setOnScrollChangeListener { _, _, _, _, _ -> saatDigulir() }
                            }
                        },
                        onRelease = { wv ->
                            pelacak.tunda?.let { wv.removeCallbacks(it) }
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
