# PureTune – Projektstatus

## Ziele
- Offline Tuner (Gitarre/Bass), manuelles Mikro-Gating.
- Automatische Saite-Erkennung + Richtungshinweise.
- Falsche-Saite-Erkennung (Badge „Ziel: …“).
- Referenztöne + A4-Kalibrierung.
- Keine Internet-Permission (außer Ads-Flavor).
- Opt-in Werbung nur im Play-Flavor.

---

## Erreicht
- Repo-Struktur definiert.
- UI-Konzept (StringRail + Meter).
- DSP-Algorithmen (MPM/YIN + FFT) spezifiziert.
- Sicherheitsprinzipien festgelegt.
- Build-Flavors dokumentiert.
- Fehlerquellen dokumentiert (Gemini-Reste, Exit-Ads, Mikro-Permission).

---

## Offen
- DSP-Kern implementieren + Tests.
- Compose UI fertigstellen.
- Privacy Policy schreiben.
- CI-Workflow (GitHub Actions) für APK/AAB-Build.
- Screenshots & Store-Material vorbereiten.

---

## Fehler & Learnings
- ❌ Gemini Studio Rest-Code im Repo → bereinigt.  
- ❌ Exit-Ads geplant → nicht konform → ersetzt durch Opt-in Ads.  
- ❌ Mikro-Permission automatisch entziehen → technisch nicht möglich → Nutzerinfo im Onboarding.  

---

## Nächste Schritte
1. PitchDetector.kt fertigstellen + Unit-Tests.  
2. Compose-Meter implementieren.  
3. CI für Release-Builds.  
4. Play Store Privacy Policy.  
