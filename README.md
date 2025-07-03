# Dart WebApp fuer Darts-Spiele

Dieses Projekt ist eine einfache Progressive Web App (PWA), mit der Darts-Spiele im Freundes- oder Familienkreis verwaltet werden koennen. Die Anwendung laeuft im Browser und kann sowohl auf dem Handy, Tablet als auch am PC installiert werden.

## Hauptfunktionen

- **Neues Spiel starten**: Auswahl des Spielmodus (z.B. 301, 501, "Tannenbaum").
- **Double Out ein-/ausschalten**: Beim Start eines Spiels kann definiert werden, ob das Spiel mit "Double Out" beendet werden muss.
- **Spieler anlegen**: Spieler koennen dauerhaft gespeichert werden und sammeln Statistikdaten.
- **Gaeste hinzufuegen**: Gaeste erscheinen nur fuer das aktuelle Spiel.
- **Schnelles Spiel**: Spielmodus und Einstellungen lassen sich schnell auswaehlen.
- **Spiel- und Wurf-Statistiken**: Einfache Statistiken der Spieler werden in `localStorage` hinterlegt.
- **Regelerklaerungen**: Kurze Beschreibung zu jedem Spielmodus.
- **Grafische Darstellung**: Ein einfaches Scoreboard zeigt die aktuellen Punkte.
- **Speicherung in localStorage**: Saemtliche Daten werden im Browser gespeichert.
- **App-Installation**: Die Anwendung kann als PWA installiert werden.
- **Responsive Design**: Dank eingebundenem Bootstrap passt sich die Oberflaeche an unterschiedliche Bildschirmgroessen an.

## Nutzung

1. Repository klonen oder herunterladen.
2. Die Datei `index.html` in einem Browser oeffnen. Fuer eine Installation als PWA sollte die Seite ueber einen lokalen Webserver ausgeliefert werden (z.B. mit `npx serve`).
3. Beim ersten Besuch kann die App dem Startbildschirm hinzugefuegt werden.
4. Bootstrap wird per CDN eingebunden, um ein responsives Layout fuer Handy, Tablet und PC zu ermoeglichen.

### Deployment auf GitHub Pages

Diese Anwendung kann direkt ueber GitHub Pages veroeffentlicht werden. Im Repository befindet sich ein Workflow `.github/workflows/pages.yml`, der bei jedem Push auf den Branch `main` ausgefuehrt wird und den aktuellen Stand automatisch auf der `gh-pages` Umgebung bereitstellt. Nach dem Aktivieren von GitHub Pages in den Repository-Einstellungen wird die WebApp unter der dort angegebenen URL erreichbar sein.

## Dateien

- `index.html` – Einstiegspunkt der WebApp
- `styles.css` – Grundlegendes Styling; Bootstrap wird per CDN eingebunden
- `app.js` – Logik zum Starten von Spielen und Speichern der Daten
- `manifest.json` – Einstellungen fuer die PWA-Installation
- `service-worker.js` – Offline-Unterstuetzung
- Icons sind direkt im `manifest.json` als Base64-Daten eingebettet

Diese README fasst die Funktionen der Beispielanwendung zusammen. Die Implementierung ist bewusst minimal gehalten und kann nach Bedarf erweitert werden.
