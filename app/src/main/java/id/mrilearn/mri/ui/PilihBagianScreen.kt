package id.mrilearn.mri.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import id.mrilearn.mri.R
import id.mrilearn.mri.data.Modul

/**
 * Daftar halaman untuk modul yang punya pecahan: "Halaman utama modul" lalu tiap pecahan.
 * Label pecahan memakai id apa adanya (mis. m03a), sesuai jawaban pengguna.
 */
@Composable
fun PilihBagianScreen(modul: Modul, onBuka: (String) -> Unit, onKembali: () -> Unit) {
    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = { BilahAtas(judul = modul.judul, onKembali = onKembali) },
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(
                start = 16.dp,
                end = 16.dp,
                top = innerPadding.calculateTopPadding() + 16.dp,
                bottom = innerPadding.calculateBottomPadding() + 24.dp,
            ),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            modul.deskripsi?.let { deskripsi ->
                item {
                    Text(
                        text = deskripsi,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            item {
                BarisBagian(stringResource(R.string.halaman_utama_modul)) {
                    onBuka(modul.halamanMasuk)
                }
            }
            items(modul.pecahan, key = { it.id }) { p ->
                BarisBagian(p.id) { onBuka(p.berkas) }
            }
        }
    }
}

@Composable
private fun BarisBagian(teks: String, onKlik: () -> Unit) {
    Card(
        onClick = onKlik,
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
    ) {
        Text(
            text = teks,
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.padding(16.dp),
        )
    }
}
