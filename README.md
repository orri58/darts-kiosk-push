# Darts Kiosk – Anmeldeseite für Handy-Nachrichten

Diese kleine Seite läuft auf GitHub Pages unter
**https://orri58.github.io/darts-kiosk-push/**. Über sie melden sich Handys
einmal für die Benachrichtigungen vom [Darts Kiosk](https://github.com/orri58/darts-kiosk)
an (Verwaltung → Handy-Nachrichten → „Handy hinzufügen“).

Handys erlauben Benachrichtigungen nur von HTTPS-Seiten. Der Kiosk selbst
läuft im lokalen Netz ohne HTTPS; deshalb übernimmt diese Seite die Anmeldung
und gibt sie danach an den Kiosk im WLAN weiter. Sie enthält nichts Geheimes
und speichert nur im Browser des Handys, zu welchem Kiosk es gehört.

| Datei | Zweck |
|---|---|
| `index.html` | Anmeldung, danach Weiterleitung zur Theke |
| `sw.js` | zeigt die Nachrichten an, Antippen öffnet die Theke |
| `manifest.webmanifest`, `icon-*.png` | App-Symbol für den Home-Bildschirm (iPhone) |

Die Quelle liegt im Hauptprojekt unter `push-page/`; Änderungen dort machen
und hierher übernehmen.
