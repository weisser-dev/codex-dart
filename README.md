# Dart WebApp fuer Darts-Spiele

Dieses Projekt beschreibt eine Beispiel-WebApp, die dabei hilft, Darts-Spiele im Freundes- oder Familienkreis zu verwalten. Das Ziel ist es, typische Spielmodi und Regeln digital abzubilden, um Spiele bequem am Bildschirm zu verfolgen.

## Hauptfunktionen

- **Neues Spiel starten**: Auswahl des Spielmodus (z.B. 301, 501, "Tannenbaum" usw.).
- **Double Out ein-/ausschalten**: Beim Start eines Spiels kann definiert werden, ob das Spiel mit "Double Out" beendet werden muss.
- **Spieler anlegen**: Hauptspieler mit Namen speichern. Diese bleiben dauerhaft erhalten und koennen Statistikdaten sammeln.
- **Gaeste hinzufuegen**: Gaeste erscheinen nur fuer das aktuelle Spiel, ihr Name wird nicht gespeichert.
- **Schnelles Spiel**: Fuer einen schnellen Start lassen sich Spielmodus, Spieleranzahl und Double-Out-Einstellung ueber ein Dropdown bzw. einfache Schalter auswaehlen.
- **Spiel- und Wurf-Statistiken**: Fuer Hauptspieler koennen Statistiken ueber alle Spiele hinweg gespeichert und gefiltert werden (z.B. letzte 5 Spiele, alle Spiele eines Jahres usw.).
- **Regelerklaerungen**: Zu jedem Spielmodus gibt es eine kurze Beschreibung und Hinweise (in einer Hinweisbox) zu Besonderheiten der Regeln.
- **Grafische Darstellung**: Treffer und Scores werden visuell angezeigt, um den Spielverlauf besser nachvollziehen zu koennen.
- **Speicherung in localStorage**: Saemtliche Daten (Spielstaende, Statistiken) werden im Browser gespeichert.
- **App-Installation**: Beim ersten Oeffnen erscheint ein Popup, das anbietet, die Seite als App zu speichern und als Kachel (PWA) auf dem Smartphone abzulegen.

## Perspektivische Erweiterungen

- Speicherung aller Daten ausschliesslich im Browser (localStorage), kein Backend.
- Grafische Darstellung von Treffern und Scores.

Diese README dient lediglich als Uebersicht der moeglichen Funktionen. Der Quellcode fuer eine vollstaendige Umsetzung ist hier nicht enthalten.
