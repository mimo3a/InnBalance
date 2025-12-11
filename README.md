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

InnBalance setzt hier an: Die NutzerInnen geben ihre aktuelle Stimmung an, und die App schlägt darauf basierend kurze, alltagstaugliche Micro-Breaks vor. Zu den Funktionen gehören geführte Atemübungen mit sanften Animationen, GPS-basierte Empfehlungen für Ruheorte, die zur Stimmung passen, sowie eine kompakte Statistik, die zeigt, wie regelmäßig NutzerInnen achtsame Pausen einbauen.
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
- TypeScript oder JavaScript  
- Expo (optional)

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

# 6. Entwicklung mobile Systeme (EMS) (wird noch angepasst!)

## App-Architektur (Entwurf)
- Navigationsstruktur:  
  - Hauptscreens: <Screen 1>, <Screen 2>, <Screen 3>  
  - Navigation: Stack / Tabs / Drawer
- Datenmodell
- API-Anbindung
- Device Features (z. B. Kamera, Location)

---

## API & Backend
- API: `<URL>`
- Authentifizierung: `<OAuth, API Key, etc.>`
- Datenfluss:  
  - Client → API → Response → UI

---

## UI / UX
- Farbkonzept  
- Layout  
- Wireframes / Mockups  

---

## Testing
- Kein kritischer Bug offen  
- UI getestet  
- Testfälle dokumentiert

---

# 7. Setup & Installation

## Voraussetzungen
- Node.js  
- npm / yarn  
- Expo CLI (optional)

## Projekt starten (wird noch angepasst!, expo?)
```bash
npm install
npm start
```

---

# 🔗 8. Wichtige Links (wird noch angepasst!)

| Tool | Link |
|------|------|
| **GitHub Repo** | https://github.com/meowmellow3/automatic-octo-garbanzo |
| **Jira Board** | <Link> |
| **Miro Storymap** | <Link> |
| **Discord Server** | https://discord.gg/WsRa44uC |

---

# 9. Templates (wird noch angepasst!)

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

## Template: Sprint Retrospective (wird noch angepasst!)

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

# 10. Finale Präsentation (PPM & EMS) (wird noch angepasst!)

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
