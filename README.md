# PPM & EMS Projekt – Team <07>
Gemeinsames Semesterprojekt für **Projekt- & Prozessmanagement (PPM)** und **Entwicklung mobiler Systeme (EMS)**.  
Ziel ist die Planung und Umsetzung einer mobilen App mit **Scrum**, **Jira**, **Miro**, **React Native** und **GitHub**.

*Die Projektstrukturen sind noch nicht fixiert (nicht-fixierte Teile sind gekennzeichnet mit dem Zusatz "wird noch angepasst!").*

---

# 1. Projektüberblick

## Projektbeschreibung
**App Name:** InnBalance  
**Kurzbeschreibung:**  

Der Alltag in Städten fühlt sich 2025 schneller an denn je. Stress, Zeitdruck und volle Terminkalender lassen oft kaum Raum für echte Entspannung.
Wir brauchen Ruhe – aber wir haben kaum Zeit dafür.

InnBalance setzt hier an: Die Nutzer:innen geben ihren aktuellen Zustand an, und die App schlägt darauf basierend kurze, alltagstaugliche Micro-Breaks vor.

Zu den Funktionen gehören geführte Atemübungen mit sanften Animationen, GPS-basierte Empfehlungen für Ruheorte, die zum aktuellen Zustand passen, sowie eine kompakte Statistik, die zeigt, wie regelmäßig Nutzer:innen achtsame Pausen in ihren Alltag integrieren.

Abhängig von Tageszeit und Wetter empfiehlt die App entweder Atemübungen oder einen Spaziergang zu einem ruhigen Ort. Jede Übung ist individuell gestaltet und darauf ausgerichtet, den aktuellen Zustand der Nutzer:innen wieder in Balance zu bringen.

Die Statistik der absolvierten Übungen kann im StatisticsScreen eingesehen und im SettingsScreen zurückgesetzt werden.

Wählt der/die Benutzer:in einen Spaziergang, gelangt er/sie in den RuheorteScreen, der in zwei Modi unterteilt ist:

Kartenmodus: Die Ruheorte werden auf einer Karte dargestellt. Beim Anklicken eines Markers erscheinen der Name und eine kurze Beschreibung des Ortes. Bei erneutem Klick öffnet sich eine OrteCard mit vollständiger Beschreibung, Fotos, Bewertung und Entfernung.

Listenmodus: Die Benutzer:innen sehen eine Liste der Ruheorte mit einem kleinen Foto, kurzer Beschreibung, Bewertung und Entfernung. Beim Anklicken eines Listeneintrags wird ebenfalls die OrteCard geöffnet.

Im Listenmodus können eigene Lieblingsorte über ein Plus-Symbol hinzugefügt werden. In einem Formular lassen sich Name, Beschreibung, Koordinaten und Fotos des neuen Ruheortes erfassen. Diese Orte werden anschließend zu allen verfügbaren Ruheorten hinzugefügt.

Im SettingsScreen können selbst erstellte Ruheorte wieder gelöscht werden.

Ein Community-Feature ermöglicht es, neue entspannende Orte vorzuschlagen und bestehende Spots zu bewerten.

**TL;DR:** InnBalance empfiehlt passende Ruheorte auf Basis von Stimmung und Standort. Ergänzend bietet die App Atemübungen sowie einen Community-Bereich zum Teilen und Bewerten von Entspannungs-Spots.


**USP / Mehrwert:**  
- Kombination aus Emotion, Atemtechnik und realen GPS-basierten Orten
- Kurze Micro-Breaks statt langer Meditationseinheiten
- Gamification-Element: kleine Statistik zur Nutzungsfrequenz

**Zielgruppe:**  
- **Hauptzielgruppen**: Studierende, Eltern, Berufstätige und Pendler*innen – Menschen, die regelmäßig Stress erleben und oft nur wenige Minuten zur Erholung haben.

- **Sekundäre Zielgruppen**: Achtsamkeitsinteressierte, Stadt-Neulinge, TouristInnen

- **Weitere Stakeholder** Hochschulen (Fachhochschulen, Universitäten), Tourismusorganisationen, Gesundheitsstellen, API- & Technologieanbieter.

...und natürlich unser Projektteam!


---

# 2. Team & Rollen

| Name | Rolle | Beschreibung |
|------|--------|---------------|
| Valentina Bertelsen-Schreiner | **Product Owner (PO)** | Verantwortlich für Vision, Backlog & Priorisierung |
| Puneet Singh | **Scrum Master (SM)** | Unterstützt Team, moderiert Scrum Events |
| Manuele Badaloni | **Developer** | Implementierung |
| Oleksandr Demianov | **Developer** | Implementierung |
| Andrej Radulovic | **Developer** | Implementierung |

---

# 3. Tech Stack

### **Frontend / Mobile**
- React Native  
- JavaScript  
- Expo 

### **Tools**
- Jira (Scrum Board & Backlog)
- Miro (User Story Mapping)
- Discord (Team-Kommunikation)
- GitHub (Source Code & Doku)
- VS Code

---

# 4. Projektstruktur (Repository, wird noch angepasst)

```
automatic-octo-garbanzo/
│
├── src/                   # React Native Code
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── App.js / App.tsx
│
├── docs/                  # Finale PDFs, wie im PPM gefordert
│   ├── Sprint01_DoD.pdf
│   ├── Sprint01_Retro.pdf
│   ├── Sprint02_DoD.pdf
│   ├── Sprint02_Retro.pdf
│   ├── Final_Presentation.pdf
│   └── Pitch.pdf
│
├── sprint-artefacts/      # Notizen und Inhalte für PDFs
│   ├── sprint01_dod_notes.md
│   ├── sprint01_retro_notes.md
│   ├── sprint02_dod_notes.md
│   └── sprint02_retro_notes.md
│
└── README.md
```

---

# 5. Scrum-Projekt (PPM)

## Sprints & Timeline
| Sprint | Zeitraum | Inhalte |
|--------|----------|---------|
| **Sprint 01** | 15.12.2025 – 09.01.2026 | Definition App-Grundstruktur, Architektur, erste Features |
| **Sprint 02** | 12.01.2026 – 26.01.2026 | Fertige Kernfunktionalitäten & Demo-Vorbereitung |
| **Finalpräsentation** | 30.01.–31.01.2026 | Präsentation PPM + EMS |

---

## Product Backlog
Verwaltet in **Jira**.  
Link: `<Jira-Link>`  
Format: **Epics → User Stories → Tasks** (INVEST-Regeln beachten, wird noch angepasst!)

---

## Sprint 01 – Artefakte

### Definition of Done (DoD)
Datei: `/docs/Sprint01_DoD.pdf`

### Sprint Retrospective
Datei: `/docs/Sprint01_Retro.pdf`

### User Story Map (Miro)
Link: `<Miro-Link Sprint 01>`

---

## Sprint 02 – Artefakte

### Definition of Done (DoD)
Datei: `/docs/Sprint02_DoD.pdf`

### Sprint Retrospective
Datei: `/docs/Sprint02_Retro.pdf`

### User Story Map
Link: `<Miro-Link Sprint 02>`

---

# 6. Entwicklung mobile Systeme (EMS) 

App-Architektur (Sprint 1)
Navigation

Die App verwendet eine Bottom-Tab-Navigation mit drei Hauptbereichen:
Home
Statistic
Settings

Innerhalb der Tabs wird Stack-Navigation für Detail- und Flow-Screens genutzt.

Zentrale Screens
Home
Auswahl des aktuellen Zustands (z. B. Stress, Anxiety, Low Energy)
Anzeige der aktuellen Wetterdaten
Weiterleitung zu einer passenden Empfehlung

Recommendation
Entscheidung zwischen:
Atemübung
Spaziergang zu einem Ruhe-Ort
basierend auf Zustand, Tageszeit und Wetter

Breathing Exercise
Geführte Atemübung mit Animation
Zeitmessung
Speicherung der Session für die Statistik

Ruhe-Orte
Zwei Ansichten:
Karte mit Markern
Liste mit Kurzinfos
Detailansicht eines Ortes (Beschreibung, Bild, Bewertung, Distanz)
Möglichkeit, eigene Orte hinzuzufügen

Statistics
Übersicht über:
Anzahl Sessions
Gesamtdauer
Wochenübersicht und Verlauf

Settings
Löschen eigener Ruhe-Orte
Zurücksetzen der Statistik

Eingesetzte Device-Features
Standort (Entfernung zu Ruhe-Orten)
Kartenansicht
Timer für Atemübungen

Diese Architektur bildet die Grundlage für die Kernfunktionen und wird in Sprint 2 weiter ausgebaut.
---

## API & Backend
Backend: noch nicht angebunden
- Daten werden aktuell lokal (Mock-Daten) verwaltet
- Geplante Architektur:
  Client → REST API → Backend → Response → UI
---

## UI / UX
- Ruhiges, reduziertes Farbkonzept (Grün- und Pastelltöne)
- Klare Kartenstruktur mit Fokus auf Übersichtlichkeit
- Mobile-first Design
- Umsetzung orientiert sich an einfachen Mockups

---

## Testing
- Manuelle Tests der Kernfunktionen
- Navigation und UI geprüft
- Keine kritischen Fehler bekannt

---

# 7. Setup & Installation

- Node.js
- npm
- Expo (lokale Entwicklung)

## Projekt starten

```bash
npm install
npx expo start
---

# 🔗 8. Wichtige Links 

| Tool | Link |
|------|------|
| **GitHub Repo** | https://github.com/meowmellow3/automatic-octo-garbanzo |
| **Jira Board** | <Link> |
| **Miro Storymap** | <Link> |
| **Discord Server** | https://discord.gg/WsRa44uC |

---

# 9. Templates 

## Template: Definition of Done (DoD)

```md
# Definition of Done – Sprint <Nummer>

## 1. Code-Qualität
- Code läuft ohne Fehler
- Variablennamen klar und konsistent
- Keine ungenutzten Dateien

## 2. Funktionalität
- Alle Acceptance Criteria erfüllt
- Feature in App testbar

## 3. Testing
- Kein kritischer Bug offen
- UI getestet

## 4. Dokumentation
- README aktualisiert
- Jira Ticket abgeschlossen
```

---

## Template: Sprint Retrospective 
```md
# Sprint Retrospective – Sprint <Nummer>

## Was lief gut?
- …

## Was lief schlecht?
- …

## Was verbessern wir im nächsten Sprint?
- …

## Maßnahmen für bessere Zusammenarbeit
- …
```

---

# 10. Finale Präsentation (PPM & EMS) 

Die finale Präsentation umfasst:

### **PPM**
- Backlog  
- Scrum Events  
- Storymap (3 Versionen)  
- DoD & Retros  
- Teamorganisation  

### **EMS**
- App Demonstration  
- Architektur  
- Features  
- Learnings  

PDF-Datei: `/docs/Final_Presentation.pdf`

---

# 11. Lizenz (wird noch angepasst!)
Nach Bedarf ergänzen.
