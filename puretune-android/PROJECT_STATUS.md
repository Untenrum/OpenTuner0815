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
- Repo-Struktur definiert und von Web-Artefakten bereinigt.
- UI-Konzept (StringRail + Meter).
- DSP-Algorithmen (MPM/YIN + FFT) spezifiziert.
- **DSP-Kern (`PitchDetector.kt`) mit Autokorrelations-Algorithmus implementiert.**
- Sicherheitsprinzipien festgelegt.
- Build-Flavors dokumentiert.
- Fehlerquellen dokumentiert (Gemini-Reste, Exit-Ads, Mikro-Permission).
- UI/UX-Spezifikation für Farben, Layout und Logik definiert.
- 20 skalierbare SVG-Instrument-Icons erstellt und in die App integriert.

---

## Offen
- Unit-Tests für DSP-Kern.
- Compose UI fertigstellen (insb. PitchMeter-Visualisierung).
- Privacy Policy schreiben.
- CI-Workflow (GitHub Actions) für APK/AAB-Build.
- Screenshots & Store-Material vorbereiten.

---

## Fehler & Learnings
- ❌ Gemini Studio Rest-Code im Repo → bereinigt.  
- ❌ Exit-Ads geplant → nicht konform → ersetzt durch Opt-in Ads.  
- ❌ Mikro-Permission automatisch entziehen → technisch nicht möglich → Nutzerinfo im Onboarding.  

---

## UI/UX-Entscheidungen (Log)

### 2025-09-20 · UI-Spezifikation
- Instrument-Overlay eingeführt (Gitarren- und Bass-Icons).
- StringRail-Visualisierung ergänzt (oben tief → unten hoch).
- Meter jetzt farblich dreigeteilt: Rot (≥ ±20 ¢), Orange (±5–20 ¢), Grün (≤ ±5 ¢).
- Fehlerfall-Logik: zeigt Zielnote explizit an, auch wenn falsche Saite im „Grün“ landet.
- Erweiterung: Rhythmus-Zähler für stabile Stimmung (2 Sekunden).

### 2025-09-20 · UI-Assets
- 20 skalierbare SVG-Instrument-Icons erstellt (Gitarre, Bass, Streicher, Holz-/Blechbläser, Tasten, Drums).
- Manifest (JSON) hinzugefügt: version, viewport, palette, asset-ids.
- Vorgaben für responsive Einbindung (Compose) dokumentiert.
- Nächster Schritt: Icons in App binden (VectorDrawable oder Coil-SVG), per Instrument-Auswahl dynamisch laden.

---

## Nächste Schritte
1. Unit-Tests für PitchDetector.kt.  
2. Compose-Meter implementieren.  
3. CI für Release-Builds.  
4. Play Store Privacy Policy.