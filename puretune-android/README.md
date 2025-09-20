# PureTune – Offline Guitar & Bass Tuner (Android)

**PureTune** ist ein schlanker, komplett **offline** arbeitender Tuner für Gitarre (6 Saiten) und Bass (4-/5-Saiter).  
Der Fokus liegt auf **Sicherheit, Einfachheit und Präzision**:

- Keine Internet-Permission
- Keine Werbung im Open-Source-Build
- Mikrofon nur **manuell** aktivierbar
- Frequenzanalyse mit automatischer Saite-Erkennung
- Opt-in-Werbung im Play-Flavor (fair, schließbar)
- Open Source (MIT/Apache Lizenz)

---

## 🎯 Zielsetzung
1. **Reiner Tuner** – kein Metronom, keine Effekte, keine Extras.  
2. **Sicherheit & Datenschutz** – Mikro nur während Messung, kein Logging, keine Datenübertragung.  
3. **Langfristige Nutzbarkeit** – „Install once, keep working“.  
4. **Kostenlos** – kein Pflichtkauf, nur freiwillige Unterstützung (opt-in Werbung).  
5. **Instrumente** – Gitarre (E2–E4), Bass 4-Saiter (E1–G2), Bass 5-Saiter (B0–G2).

---

## 📱 Features (MVP)
- Automatik-Tuning: Saite wird erkannt, Cent-Abweichung + Richtungshinweis („anziehen/lockern“).  
- Fehlerfall: Zeigt auch bei „grün auf falscher Saite“ den **korrekten Zielton** an.  
- Manuell: Saite fixieren, Referenzton abspielen.  
- Kalibrierung: A4 (432–445 Hz).  
- UI: Nadel-Meter ±50 Cent, StringRail (oben tief, unten hoch), farbfehlsicher, haptisches Feedback.  

---

## 🛠 Architektur
- **Sprache:** Kotlin  
- **UI:** Jetpack Compose (Material 3)  
- **DSP:** MPM/YIN + FFT-Fallback  
- **Build:** Gradle mit Flavors  
  - `freeNoAds` → FOSS-Release (GitHub, F-Droid)  
  - `playWithAds` → Play Store mit opt-in Werbung  

---

## 🔒 Sicherheit
- Manifest ohne INTERNET (außer Play-Flavor mit Ads).  
- Mikrofon wird **gestartet und gestoppt** ausschließlich durch Nutzeraktion.  
- Nach `stop()` → `release()` → kein Zugriff mehr.  
- Keine Hintergrund-Services, keine Overlays, kein Backup (`allowBackup=false`).  

---

## 📂 Projektstruktur
```
puretune-android/
  app/
    src/
      main/               # Quellcode
        java/dev/puretune/app/
          MainActivity.kt
          MainViewModel.kt
          MainScene.kt
          PitchDetector.kt
          Tuning.kt
          Note.kt
          composables/…
      freeNoAds/           # Flavor ohne Werbung
      playWithAds/         # Flavor mit Ad SDK (optional)
    build.gradle.kts
    proguard-rules.pro
  README.md
  PROJECT_STATUS.md
  LICENSE
  settings.gradle.kts
  build.gradle.kts
```

---

## 🧾 Entwicklungsverlauf (Fehler & Learnings)

### ✅ Stand 1 – Grundidee
- Reiner Gitarren-Tuner ohne Extras.  
- Fokus auf Privacy (kein Internet, nur RECORD_AUDIO).  

### ✅ Stand 2 – Sicherheit
- Mikrofon muss **manuell** aktiviert werden.  
- Nach Messung sofort `release()`.  
- `allowBackup=false` gesetzt.  

### ✅ Stand 3 – UI & Instrumente
- StringRail von oben (tief) nach unten (hoch).  
- Unterstützt Gitarre 6-Saiter, Bass 4-/5-Saiter.  
- Falsche-Saite-Logik ergänzt.  

### ⚠️ Fehler / Stolperfallen
1. **Gemini-Studio-Reste** (index.tsx, hooks/, etc.) im Repo gelandet → Bereinigt.  
   → Lösung: `.gitignore` ergänzt, nur Android-Code behalten.  
2. **Exit-Ads** überlegt → verworfen, da Google Policy-Verstoß.  
   → Lösung: Nur **opt-in Ads** nach erfolgreichem Stimmen.  
3. **Berechtigungen**: Versuch, Mikro-Permission automatisch zu entziehen → nicht möglich (Nutzer muss das manuell in Android tun).  
   → Lösung: klar im Onboarding erklären.  

### 🔜 To-Do
- DSP-Kern testen (Unit-Tests mit synthetischen Tönen).  
- Compose-Meter fertigstellen (EMA-Glättung).  
- Privacy Policy für Play Store schreiben.  
- Keystore generieren & CI für APK-Build einrichten.  

---

## 📦 Builds
- `./gradlew assembleFreeNoAdsRelease` → APK für GitHub / manuelle Installation.  
- `./gradlew bundlePlayWithAdsRelease` → AAB für Play Store.  
- Min SDK = 31 (Android 12), Target = 35 (Android 15).  

---

## 📜 Lizenz
MIT oder Apache-2.0.  
