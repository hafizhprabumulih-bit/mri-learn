package id.mrilearn.mri.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import id.mrilearn.mri.R
import id.mrilearn.mri.data.Modul
import id.mrilearn.mri.data.StatusBelajar

/**
 * Daftar halaman untuk modul yang punya pecahan: "Halaman utama modul" lalu tiap pecahan.
 * Fase 6: tiap baris menampilkan status (Dibuka, Selesai) dan ★ bila ada bookmark.
 */
@Composable
fun PilihBagianScreen(
    modul: Modul,
    status: StatusBelajar,
    onBuka: (String) -> Unit,
    onKembali: () -> Unit,
) {
    fun keterangan(berkas: String): String {
        val k = StatusBelajar.kunci(modul.id, berkas)
        val bintang = if (status.adaPenanda(k)) "★ " else ""
        val keadaan = when {
            k in status.selesai -> "Selesai ✓"
            k in status.dibuka -> "Dibuka"
            else -> ""
        }
        return bintang + keadaan
    }

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
                BarisBagian(stringResource(R.string.halaman_utama_modul), keterangan(modul.halamanMasuk)) {
                    onBuka(modul.halamanMasuk)
                }
            }
            items(modul.pecahan, key = { it.id }) { p ->
                BarisBagian(p.id, keterangan(p.berkas)) { onBuka(p.berkas) }
            }
        }
    }
}

@Composable
private fun BarisBagian(teks: String, keterangan: String, onKlik: () -> Unit) {
    Card(
        onClick = onKlik,
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                text = teks,
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f),
            )
            if (keterangan.isNotEmpty()) {
                Text(
                    text = keterangan,
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.secondary,
                )
            }
        }
    }
}
