# Bread of the Presence – PWA

**▶ Open the app: [keithintrinidad.github.io/Bread-of-the-Presence](https://keithintrinidad.github.io/Bread-of-the-Presence/)**. Use it in the browser, or install it on your phone (see [Installing on a phone](#installing-on-a-phone)).

A companion for Mass and Eucharistic Adoration. It walks through every part of the Mass, offers prayers for a season of preparation before receiving Communion, guides a Holy Hour, and gathers classic Eucharistic prayers. It works offline once installed, and runs entirely in the browser as static files: no build step, no server code.

The name comes from *lechem ha-panim* (לֶחֶם הַפָּנִים), the bread set "before the face" of God in the tabernacle (Exodus 25:30). The app explains it under the title.

## About this app

This app was built by **Claude**, an AI model created by **Anthropic**, under the guidance of **Keith Francis** ([keithintrinidad](https://github.com/keithintrinidad)).

- **Inspiration.** The concept was inspired by the *Mass and Adoration Companion* of Vinny Flynn and Erin Flynn. No text from that book is used.
- **Original content.** The prayers before Mass, the notes on each of the 26 parts of the Mass, the Communion prayers, the Holy Hour guide, and the meditations on seven divine names were written by Claude, drawing on Keith Francis's conversations with it about Scripture, its Hebrew and Greek background, and worship.
- **Traditional prayers.** The Anima Christi, Adoro te devote (Hopkins translation), O Salutaris Hostia, Tantum Ergo (Caswall translation), St Thomas Aquinas's prayer before Mass, St Alphonsus Liguori's Act of Spiritual Communion, the Divine Praises, and the Fátima prayer.
- **Design and build.** Keith Francis directed the app's content, features, and packaging through conversation with Claude, but did not write the code directly.

It is a companion to two other apps, made the same way:

| App | Open the app | Source code |
|---|---|---|
| Rosary Helper | [keithintrinidad.github.io/Rosary-Helper](https://keithintrinidad.github.io/Rosary-Helper/) | [github.com/keithintrinidad/Rosary-Helper](https://github.com/keithintrinidad/Rosary-Helper) |
| Prayers for Catholics | [keithintrinidad.github.io/Catholic-Prayers](https://keithintrinidad.github.io/Catholic-Prayers/) | [github.com/keithintrinidad/Catholic-Prayers](https://github.com/keithintrinidad/Catholic-Prayers) |

## What's in the package

| File | Purpose |
|---|---|
| `index.html` | The app (Mass, Communion, Adoration with Holy Hour timer, Prayers, personal pages, light/dark, About page with credits and licence) |
| `manifest.webmanifest` | Name, colours and icons used when installed |
| `sw.js` | Service worker: caches everything so the app works offline |
| `icons/` | App icons (192, 512, maskable 512, Apple touch, favicon) |
| `fonts/` | EB Garamond (Latin and Greek) and Frank Ruhl Libre (Hebrew), self-hosted (SIL OFL licences included) |
| `LICENSE.md` | The terms this project is shared under (see below) |

## Deploying

Upload the folder contents as-is to any static host that serves **HTTPS** (service workers require it). All paths are relative, so it works at a domain root or in a subfolder.

- **Netlify:** drag the unzipped folder onto app.netlify.com/drop.
- **Cloudflare Pages:** Create project → Direct upload → select the folder.
- **GitHub Pages:** push the files to the repo root, then Settings → Pages → deploy from the `main` branch, root folder. For this repo the app is live at [keithintrinidad.github.io/Bread-of-the-Presence](https://keithintrinidad.github.io/Bread-of-the-Presence/).
- **Existing site:** copy into a subfolder, e.g. `/presence/`.

## Installing on a phone

- **Android (Chrome):** open the link → menu → *Install app* / *Add to Home screen*.
- **iPhone (Safari):** open the link → Share → *Add to Home Screen*.

After the first visit the app works fully offline.

## Your entries

Intentions, saved prayers and after-Mass notes on the *Mine* tab are stored on each device only, in the browser's local storage. Nothing is sent anywhere. Use *Copy all as text* on that tab to keep a backup.

## Updating the app

1. Edit `index.html`. Mass notes and prayers are in the HTML sections; the divine names are in the `NAMES` array and the Holy Hour movements in the `MOVES` array, both in the script near the bottom.
2. In `sw.js`, change `VERSION` (e.g. `botp-v1` → `botp-v2`). Do this every release or installed copies may keep the old files.
3. Upload the changed files. Users get the update the next time they open the app while online.

## Testing locally

Service workers need `https://` or `localhost`, so opening the file directly won't register it:

```
python3 -m http.server 8080
```

then visit http://localhost:8080.

## License & authorship

This app is free to share and adapt, but never to sell, and any version made from it must stay free too. It is licensed under **CC BY-NC-SA 4.0**.

It was built by Claude (Anthropic) under the guidance of **Keith Francis** (keithintrinidad). Any copy or derivative must keep that credit. The same credit and a licence summary are shown inside the app itself, behind the (i) button, for anyone who only ever sees the installed app. The traditional prayers are in the public domain, and the fonts carry their own SIL Open Font License. Full terms are in `LICENSE.md`.
