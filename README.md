# PPM & EMS Projekt – Team <07>
Gemeinsames Semesterprojekt für **Projekt- & Prozessmanagement (PPM)** und **Entwicklung mobiler Systeme (EMS)**.  
Ziel ist die Planung und Umsetzung einer mobilen App mit **Scrum**, **Jira**, **Miro**, **React Native** und **GitHub**.

---

# 1. Projektüberblick

## Projektbeschreibung
**App Name:** *Wird nach Idea Pitch ergänzt*  
**Kurzbeschreibung:**  
*Hier kommt eine prägnante Beschreibung der App-Idee hin.*

**USP / Mehrwert:**  
- <USP 1>  
- <USP 2>  
- <USP 3>

**Zielgruppe:**  
- <Wer nutzt die App?>

---

# 2. Team & Rollen

| Name | Rolle | Beschreibung |
|------|--------|---------------|
| <Name> | **Product Owner (PO)** | Verantwortlich für Vision, Backlog & Priorisierung |
| <Name> | **Scrum Master (SM)** | Unterstützt Team, moderiert Scrum Events |
| <Name> | **Developer** | Implementierung |
| <Name> | **Developer** | Implementierung |
| <Name> | **Developer** | Implementierung |

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

# 4. Projektstruktur (Repository)

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
Format: **Epics → User Stories → Tasks** (INVEST-Regeln beachten)

---

## Sprint 01 – Artefakte

### ✔ Definition of Done (DoD)
Datei: `/docs/Sprint01_DoD.pdf`

### ✔ Sprint Retrospective
Datei: `/docs/Sprint01_Retro.pdf`

### ✔ User Story Map (Miro)
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

## App-Architektur (Entwurf)
- Navigationsstruktur:  
  - Hauptscreens: <Screen 1>, <Screen 2>, <Screen 3>  
  - Navigation: Stack / Tabs / Drawer
- Datenmodell
- API-Anbindung
- Device Features (z. B. Kamera, Location, Sensoren)

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

## Projekt starten
```bash
npm install
npm start
```

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

# 11. Lizenz
MIT License oder nach Bedarf ergänzen.
