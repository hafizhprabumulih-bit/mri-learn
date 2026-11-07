package id.mrilearn.mri.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import id.mrilearn.mri.R
import id.mrilearn.mri.data.Modul
import id.mrilearn.mri.data.StatusBelajar

/**
 * Dasbor native: 10 kartu modul dari `modules.json` (D-07). Deskripsi null: judul saja (D-27).
 * Fase 6: tombol Bookmark dan kemajuan "Selesai X dari Y halaman" per modul.
 */
@Composable
fun DasborScreen(
    modul: List<Modul>,
    status: StatusBelajar,
    onBuka: (Modul) -> Unit,
    onBukaBookmark: () -> Unit,
) {
    Scaffold(containerColor = MaterialTheme.colorScheme.background) { innerPadding ->
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
            item {
                Text(
                    text = stringResource(R.string.app_name),
                    style = MaterialTheme.typography.displaySmall,
                    color = MaterialTheme.colorScheme.primary,
                )
            }
            item {
                FilledTonalButton(onClick = onBukaBookmark) {
                    Text("★ Bookmark (${status.penanda.size})")
                }
            }
            items(modul, key = { it.id }) { m -> KartuModul(m, status, onBuka) }
            item {
                Text(
                    text = stringResource(R.string.disclaimer),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.secondary,
                    modifier = Modifier.padding(top = 12.dp),
                )
            }
        }
    }
}

@Composable
private fun KartuModul(m: Modul, status: StatusBelajar, onBuka: (Modul) -> Unit) {
    val label = when {
        m.segeraHadir -> stringResource(R.string.status_segera_hadir)
        m.status == "sebagian" -> stringResource(R.string.status_sebagian)
        else -> null
    }
    val warnaJudul =
        if (m.segeraHadir) MaterialTheme.colorScheme.onSurfaceVariant
        else MaterialTheme.colorScheme.onSurface
    val total = StatusBelajar.halamanModul(m).size
    val selesai = status.jumlahSelesai(m)
    Card(
        onClick = { onBuka(m) },
        enabled = !m.segeraHadir,
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface,
            disabledContainerColor = MaterialTheme.colorScheme.surface,
        ),
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            Text(text = m.judul, style = MaterialTheme.typography.titleMedium, color = warnaJudul)
            m.deskripsi?.let {
                Text(
                    text = it,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            label?.let {
                Text(
                    text = it,
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.secondary,
                )
            }
            if (!m.segeraHadir && total > 0) {
                LinearProgressIndicator(
                    progress = { selesai.toFloat() / total },
                    modifier = Modifier.fillMaxWidth(),
                )
                Text(
                    text = "Selesai $selesai dari $total halaman",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}
