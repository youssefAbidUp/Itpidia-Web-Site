<div align="center">
  <img src="./assets/itpidia-logo-light.png" alt="ITPidia logo" width="200"/>

  # ITPidia: company website

  **You name it. We build it.**

  Source of [itpidia.com](https://itpidia.com), a static one-page site for ITPidia, a software company in Sfax, Tunisia.
</div>

---

## Overview

- Plain HTML, CSS and JavaScript. No framework, no build step, no `npm install`.
- Dark and light themes (dark by default, the choice is remembered in the browser).
- Responsive down to small phones, with scroll-reveal animations that respect "reduce motion".
- Fully static: no backend, no database, nothing for visitors to send to the server.
- Built to run under a strict Content-Security-Policy (no inline scripts or styles).

### Page sections

| Section | Anchor | Content |
|---|---|---|
| Hero | `#top` | Headline, rotating "We build…" line, animated orbit of icons |
| About | `#about` | Who we are, plus facts (founded 2023, Sfax, end to end) |
| What we build | `#services` | 6 services |
| Why us | `#why` | 4 reasons to work with us |
| How we work | `#process` | 4 steps: Discover, Design, Build, Launch & grow |
| Contact | `#contact` | Email, phone, location, project form |

## Project structure

```
Itpidia-Web-Site/
├── index.html              Page markup and the CSP meta tag
├── styles.css              All styles (theme colours are the variables at the top)
├── script.js               Builds the lists, theme toggle, menu, animations, contact form
├── assets/
│   ├── itpidia-logo-light.png   Full logo (loading screen)
│   ├── itpidia-mark-light.png   Logo mark for the dark theme + favicon
│   └── itpidia-mark-dark.png    Logo mark for the light theme
├── deploy/
│   ├── nginx.conf               Hardened nginx config for the VPS
│   ├── cloudflare-origin.sh     Real-IP + firewall setup for running behind Cloudflare
│   └── SECURITY.md              Full deployment and hardening guide
└── .gitattributes          Keeps LF line endings on the deploy scripts
```

Only `index.html`, `styles.css`, `script.js` and `assets/` are uploaded to the server. Everything else stays in the repo.

## Run it locally

Serve the folder with any static server and open http://localhost:8000. Opening `index.html` directly works too, but a server matches production more closely.

```bash
python -m http.server 8000
# or
npx serve .
```

## Editing content

| What | Where |
|---|---|
| Services, "Why us" cards, process steps, rotating hero words, orbit icons | Arrays at the top of `script.js`: `SVC`, `WHY`, `STEPS`, `ROT`, `O1`/`O2` |
| Headline, About text, facts, section titles | `index.html` |
| Email, phone, location | `index.html` (contact section) and the `mailto:` address in `script.js` |
| Project types in the form | `<select>` in `index.html` **and** the `TYPES` list in `script.js` (keep them identical) |
| Colours | `:root`, `[data-theme="dark"]` and `[data-theme="light"]` at the top of `styles.css` |
| Fonts | Google Fonts links in `index.html` (Sora, DM Sans) |

Icons use [Material Symbols Rounded](https://fonts.google.com/icons). To change one, use the icon's name, e.g. `rocket_launch`.

### Contact form

The form does not send anything to our server. On submit it checks the fields, then opens the visitor's own email app with a message to `contact@itpidia.com` already filled in. The server never receives form data, so there is nothing to spam or exploit.

### Rules to keep the CSP working

The page sends a strict Content-Security-Policy (in `index.html` and in `deploy/nginx.conf`). When editing:

- **No inline code.** Don't use `<script>…</script>`, `onclick="…"` or `style="…"` attributes. Put JS in `script.js` and CSS in `styles.css`. Setting `element.style.x` from `script.js` is fine.
- **No `innerHTML` with content.** Build elements with the `el()` helper in `script.js`.
- **New external resource?** If you add a CDN script, image host or font, add its domain to the CSP in **both** `index.html` and `deploy/nginx.conf`. Otherwise the browser blocks it.
- Images must live in `assets/` (`.png`, `.jpg`, `.webp`). nginx refuses other paths.

## Deployment

The site runs on our VPS with nginx, behind Cloudflare (proxied). Summary:

1. Cloudflare: proxied A record for `itpidia.com` pointing at the VPS IP, SSL mode **Full (strict)**, Origin Certificate installed on the VPS.
2. Upload only the public files:
   ```bash
   rsync -av --delete index.html styles.css script.js assets user@VPS:/var/www/itpidia/
   ```
3. Install `deploy/nginx.conf`, then run `deploy/cloudflare-origin.sh` once on the VPS.

Never `git clone` the repo into the web root. Full steps, the VPS hardening checklist and post-deploy checks are in [deploy/SECURITY.md](deploy/SECURITY.md).

## Before publishing a change

- [ ] Check desktop and mobile widths, in both dark and light themes
- [ ] Browser console shows no CSP errors
- [ ] Mobile menu, theme toggle and the contact form (opens your mail app) all work
- [ ] After deploying, run the checks in [deploy/SECURITY.md](deploy/SECURITY.md#5-check-after-deploying)

## Contact

ITPidia · Sfax, Tunisia · [contact@itpidia.com](mailto:contact@itpidia.com) · +216 52 722 698

© ITPidia. All rights reserved.
