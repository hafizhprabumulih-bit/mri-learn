package id.mrilearn.mri.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import id.mrilearn.mri.web.AksiTautan
import id.mrilearn.mri.web.PeganganWeb
import id.mrilearn.mri.web.PencegatTautan
import id.mrilearn.mri.web.WebConfig
import id.mrilearn.mri.web.buatWebView
import kotlinx.coroutines.launch

/**
 * Layar isi modul: WebView memuat halaman dari assets lewat asset loader.
 * Back: mundur di riwayat WebView dulu; bila sudah di halaman pertama, kembali ke layar native
 * sebelumnya (bukan menutup aplikasi).
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
    val context = androidx.compose.ui.platform.LocalContext.current
    val snackbar = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    val pegangan = remember { PeganganWeb() }
    var bisaMundur by remember { mutableStateOf(false) }
    val bukaModulTerbaru by rememberUpdatedState(onBukaModul)
    val keDasborTerbaru by rememberUpdatedState(onKeDasbor)
    val urlAwal = remember(folder, berkas, anchor) { WebConfig.urlAsset(folder, berkas, anchor) }

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
        AndroidView(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
            factory = {
                buatWebView(
                    context = context,
                    urlAwal = urlAwal,
                    pencegat = pencegat,
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
                ).also { pegangan.view = it }
            },
            onRelease = { wv ->
                wv.stopLoading()
                wv.destroy()
                pegangan.view = null
            },
        )
    }
}
