package id.mrilearn.mri.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
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
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import id.mrilearn.mri.data.Modul
import id.mrilearn.mri.data.Penanda
import id.mrilearn.mri.data.StatusBelajar

/** Nama halaman untuk ditampilkan: halaman masuk = "Halaman utama modul", lainnya = id berkas. */
internal fun labelHalaman(berkas: String): String =
    if (berkas == "index.html") "Halaman utama modul" else berkas.removeSuffix(".html")

/** Daftar bookmark (terbaru di atas). Ketuk untuk membuka di posisi gulir tersimpan. */
@Composable
fun BookmarkScreen(
    modul: List<Modul>,
    status: StatusBelajar,
    onBuka: (Penanda) -> Unit,
    onKembali: () -> Unit,
) {
    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = { BilahAtas(judul = "Bookmark", onKembali = onKembali) },
    ) { innerPadding ->
        val daftar = status.penanda.sortedByDescending { it.waktu }
        if (daftar.isEmpty()) {
            Text(
                text = "Belum ada bookmark. Saat membaca, ketuk ☆ di bilah atas untuk menyimpan halaman dan posisinya.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier
                    .padding(innerPadding)
                    .padding(24.dp),
            )
        } else {
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
                items(daftar, key = { it.kunci }) { p ->
                    val judulModul = modul.firstOrNull { it.id == p.modulId }?.judul ?: "Modul ${p.modulId}"
                    Card(
                        onClick = { onBuka(p) },
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    ) {
                        Row(
                            modifier = Modifier.padding(start = 16.dp, top = 8.dp, bottom = 8.dp, end = 8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = judulModul,
                                    style = MaterialTheme.typography.titleMedium,
                                    color = MaterialTheme.colorScheme.onSurface,
                                )
                                Text(
                                    text = "${labelHalaman(p.berkas)}, sekitar ${(p.posisi * 100).toInt()}% dari atas",
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                            TextButton(onClick = { status.hapusPenanda(p.kunci) }) { Text("Hapus") }
                        }
                    }
                }
            }
        }
    }
}
