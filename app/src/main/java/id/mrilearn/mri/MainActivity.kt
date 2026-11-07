package id.mrilearn.mri

import android.graphics.Color
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.SystemBarStyle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import id.mrilearn.mri.ui.MriLearnApp
import id.mrilearn.mri.ui.theme.MriLearnTheme
import id.mrilearn.mri.web.WebAktif

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

    // Fase 5: jeda WebView (animasi/timer simulasi) saat aplikasi ke latar agar hemat baterai.
    override fun onPause() {
        WebAktif.view?.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        WebAktif.view?.onResume()
    }
}
