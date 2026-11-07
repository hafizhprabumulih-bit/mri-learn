package id.mrilearn.mri

import android.graphics.Color
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.SystemBarStyle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import id.mrilearn.mri.ui.MriLearnApp
import id.mrilearn.mri.ui.theme.MriLearnTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Aplikasi selalu gelap (D-12): bilah sistem memakai ikon terang.
        enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.dark(Color.TRANSPARENT),
            navigationBarStyle = SystemBarStyle.dark(Color.TRANSPARENT),
        )
        setContent {
            MriLearnTheme {
                MriLearnApp()
            }
        }
    }
}
