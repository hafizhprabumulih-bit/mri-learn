// Berkas build tingkat atas. Hanya mendeklarasikan plugin; penerapannya di app/build.gradle.kts.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
