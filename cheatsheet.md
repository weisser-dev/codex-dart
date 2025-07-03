# Cheatsheet: GitHub & Projekt starten

Diese Kurzanleitung hilft dir dabei, das Projekt lokal zu klonen und die WebApp zu starten.

## Voraussetzungen

- [Git](https://git-scm.com/) sollte installiert sein.
- [Node.js](https://nodejs.org/) und [npm](https://www.npmjs.com/) werden benoetigt, um die WebApp auszufuehren (fuer typische Dart-Webprojekte wird meistens `webdev` verwendet, welches ueber `pub` installiert wird).

## Projekt klonen

```bash
# Repository von GitHub auf deinen Rechner klonen
git clone <repository-url>
cd <projektordner>
```

## Abhaengigkeiten installieren

```bash
# Dart/Flutter kann mit folgendem Befehl eingerichtet werden (falls vorhanden)
# Bei Dart-Webprojekten: Abhaengigkeiten herunterladen
pub get
```

## Projekt starten (Beispiel)

```bash
# Fuer reine Dart-Webprojekte
webdev serve
```

Danach kannst du die WebApp in deinem Browser unter der angegebenen Adresse (meist `http://localhost:8080`) aufrufen.

## Wichtige Git-Befehle

- `git status` – Zeigt den aktuellen Status des Repositories an.
- `git add <datei>` – Fuegt eine Datei zum naechsten Commit hinzu.
- `git commit -m "Nachricht"` – Speichert deine Aenderungen im lokalen Repository.
- `git push` – Uebertraegt deine Commits zu GitHub.

Diese Befehle reichen aus, um kleine Anpassungen vorzunehmen und sie auf GitHub zu teilen.
