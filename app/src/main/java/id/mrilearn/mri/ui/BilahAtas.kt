package id.mrilearn.mri.ui

import androidx.compose.foundation.layout.RowScope
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import id.mrilearn.mri.R

/** Bilah atas bersama: judul, tombol kembali (panah teks), dan [aksi] opsional di kanan. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BilahAtas(
    judul: String,
    onKembali: () -> Unit,
    aksi: @Composable RowScope.() -> Unit = {},
) {
    val deskripsiKembali = stringResource(R.string.kembali)
    TopAppBar(
        title = { Text(text = judul, maxLines = 1, overflow = TextOverflow.Ellipsis) },
        navigationIcon = {
            IconButton(
                onClick = onKembali,
                modifier = Modifier.semantics { contentDescription = deskripsiKembali },
            ) {
                Text(text = "←", style = MaterialTheme.typography.titleLarge)
            }
        },
        actions = aksi,
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = MaterialTheme.colorScheme.surface,
            titleContentColor = MaterialTheme.colorScheme.onSurface,
            navigationIconContentColor = MaterialTheme.colorScheme.onSurface,
            actionIconContentColor = MaterialTheme.colorScheme.onSurface,
        ),
    )
}
