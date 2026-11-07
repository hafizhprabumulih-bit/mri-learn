package id.mrilearn.mri.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

// Hanya skema gelap (D-12). Sengaja tanpa dynamicColor dan tanpa isSystemInDarkTheme().
private val MriLearnColors = darkColorScheme(
    primary = Cryo,
    onPrimary = OnCryo,
    primaryContainer = CryoContainer,
    onPrimaryContainer = OnCryoContainer,
    secondary = Larmor,
    onSecondary = OnLarmor,
    secondaryContainer = LarmorContainer,
    onSecondaryContainer = OnLarmorContainer,
    tertiary = Periwinkle,
    onTertiary = OnPeriwinkle,
    background = Ink,
    onBackground = TextPrimary,
    surface = InkSurface,
    onSurface = TextPrimary,
    surfaceVariant = InkSurfaceHigh,
    onSurfaceVariant = TextSecondary,
    outline = Outline,
    outlineVariant = OutlineSoft,
)

@Composable
fun MriLearnTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = MriLearnColors,
        content = content,
    )
}
