# MRI learn (kerangka Fase 3)

Aplikasi Android: Kotlin + Jetpack Compose (Material 3), selalu tema gelap, offline penuh.
Isi modul (WebView) menyusul di Fase 4.

## Versi (diverifikasi 7 Nov 2026)
| Komponen | Versi |
|---|---|
| Android Gradle Plugin | 9.5.0 |
| Gradle | 9.6.0 |
| Kotlin (+ plugin Compose) | 2.4.20 |
| Compose BOM | 2026.09.00 (Compose 1.12.1, Material3 1.4.0) |
| activity-compose | 1.13.0 |
| JDK untuk build | 17 |
| compileSdk / targetSdk / minSdk | 37 / 36 / 24 |

Periksa versi terbaru: lihat `gradle/libs.versions.toml` dan bandingkan dengan
developer.android.com/build/releases/about-agp (AGP, Gradle, Studio),
developer.android.com/jetpack/androidx/versions (AndroidX),
developer.android.com/develop/ui/compose/bom/bom-mapping (BOM),
kotlinlang.org/docs/releases.html (Kotlin).

## Build
**Android Studio** (perlu Rabbit 2 | 2026.2.2 atau lebih baru untuk AGP 9.5):
File > Open > pilih folder ini > tunggu sync > Build > Build Bundle(s) / APK(s) > Build APK(s).
Hasil: `app/build/outputs/apk/debug/app-debug.apk`

**GitHub Actions**: unggah folder ini ke repositori GitHub (cabang main). Tab Actions >
"Build debug APK" berjalan otomatis; unduh APK dari bagian Artifacts di akhir proses.

**Baris perintah** (opsional): butuh `gradlew`. Berkas wrapper (`gradlew`, `gradlew.bat`,
`gradle/wrapper/gradle-wrapper.jar`) belum disertakan. Salin dari proyek baru Android Studio,
atau jalankan `gradle wrapper --gradle-version 9.6.0` bila Gradle terpasang. Lalu:
`./gradlew :app:assembleDebug`

## Struktur
- `ui/` layar Compose dan tema (`ui/theme/`)
- `data/` sumber data (daftar modul, kemajuan) , diisi Fase 4 dan 6
- `web/` WebView, asset loader, pencegat tautan , diisi Fase 4 dan 5
