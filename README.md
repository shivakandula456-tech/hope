## Mobile composition

The mobile experience uses a dedicated presentation layer in `css/mobile-composition-final.css`. It preserves the desktop composition while intentionally reflowing the landing hero, command menu, internal panels, galleries, team and contact views for 320–430px phones and short-height screens.

Key behavior:
- Separate mobile hero composition using the existing mobile hero video.
- Centered, independent logo so the menu control cannot cover it.
- Full-screen light command menu with scrollable navigation and fixed conversion actions.
- One-column editorial internal pages with responsive image focal points.
- `svh`/`dvh` and safe-area handling for modern mobile browsers.
- Reduced grid opacity and restrained motion on touch layouts.
- Reduced-motion support remains enabled.

# Maitra Solar Solutions — Website Prototype

A premium, state-of-the-art local website prototype for **Maitra Solar Solutions** —
an advanced renewable-energy engineering company based in Dighi, Pune, Maharashtra.

Built with **HTML5, CSS3 and vanilla JavaScript only**. No frameworks, no build step,
no backend, no database.

---

## 1. How to run

Open the file in any modern browser:

```
C:\Users\Welcome\OneDrive\Desktop\Maitri Web\proto\index.html
```

That's it — the site runs entirely from the local folder and needs no server.

> Tip: If you prefer a local web server (helps some browsers with video/mime types),
> run one from the project folder, e.g. `npx serve .` or `python -m http.server` in
> PowerShell/terminal, then open `http://localhost:3000`.

---

## 2. Folder structure

```
proto/
├── index.html          # Single-page experience (hero → contact → footer)
├── css/
│   ├── style.css       # Existing design system, sections, panels and responsive rules
│   └── refinement.css  # Final 2026 visual, responsive, accessibility and motion refinement
├── js/
│   └── script.js       # Navigation engine, renderers, gallery, lightbox, forms
├── assets/
│   ├── logo/           # loogo.png  (supplied Maitra logo — do not replace/rename)
│   ├── team/           # 5 supplied team photographs (named by role)
│   ├── video/          # desktop + mobile hero video delivery
│   ├── site/           # supplied field photographs, organised by work category
│   │   ├── plant/              # plant-site.jpg (hero poster + gallery)
│   │   ├── module-cleaning/    # cleaning-1..6
│   │   ├── inverter-maintenance/ # inverter-1..6
│   │   ├── communication/      # communication-1..3
│   │   ├── thermography/       # thermography-1..4
│   │   ├── revamp/             # revamping.jpg
│   │   ├── plant-monitoring/   # plant-monitoring.jpg
│   │   ├── solution-cleaning/  # solution-cleaning-1..2
│   └── icons/          # favicon.svg
└── README.md
```

Original supplied files (video, `loogo.png`, team photos) remain untouched at the
project root — the working copies live inside `assets/`.

---

## 3. Browser requirements

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Recommended minimum:

- Desktop: any browser released 2021 or later
- Mobile: iOS Safari / Android Chrome (recent versions)

Features used: CSS custom properties, `clip-path` transitions, `IntersectionObserver`,
`<dialog>`-style overlays (custom), inline SVG, `prefers-reduced-motion`,
`100svh` for the hero.

---

## 4. Navigation model

This site does **not** scroll-jump on navigation. Selecting any item in the menu
(Services, EPC, O&M, Due Diligence, Projects, Team, Contact) opens a **full-screen
experience panel** in the same page with a cinematic reveal. The page itself scrolls
naturally from hero through to footer; every panel, capability card and gallery
preview stays inside the site.

---

## 5. How to replace images

All image paths are relative to `index.html`:

```
assets/logo/loogo.png
assets/team/<name>.jpg
assets/site/<workstream>/<descriptive-file>.jpg
```

To replace an image: drop your new file into the same folder and keep the same
filename, or update the path in:

- `index.html` — logo, hero poster, intro photos, contact/footer logos
- `js/script.js` — the `GALLERY` array (captions), `SERVICES` images, and `TEAM` array

Gallery captions are descriptive only — add real project names/locations in the
`GALLERY` array when the client supplies them.

---

## 6. How to replace the hero video

The hero keeps the original cinematic animation as the primary desktop asset and uses
a lighter derivative on small screens.

1. Replace `assets/video/maitra-hero-unified.mp4` if a future master is supplied.
2. The same unified hero source is intentionally used for desktop and mobile; CSS controls the mobile crop.
   1280×720 or smaller.
3. Replace `assets/optimized/hero/maitra-hero-poster.webp` with a representative still frame.
4. Keep the video **muted**, **looping**, **playsinline** and autoplay-capable.
5. The site automatically falls back to the poster for reduced-motion users, constrained
   data connections, unsupported playback or video errors.

The desktop master is never replaced by the mobile derivative; the JavaScript chooses
the appropriate source at runtime.

---

## 7. How to edit company information

All company facts live in **one place** — the top of `js/script.js`:

- `SERVICES` — capability modules (name, description, detail, bullets, images)
- `EPC_STAGES` — the 10-stage execution sequence
- `OM_ITEMS` — the 13-item O&M dashboard
- `DD_ZONES` — the 6 due-diligence zones
- `GALLERY` — gallery items + `GALLERY_FILTERS`
- `TEAM` — team names and roles

Contact details (phone, email, address) appear directly in `index.html`
(hero, contact section, footer) and inside the Contact panel renderer in `script.js`.

> Rule: only add statistics, client names, capacities or certifications when the
> client supplies them. The prototype intentionally uses neutral wording.

---

## 8. How to modify services

1. Open `js/script.js` → `SERVICES`.
2. Copy an object, change `id`, `num`, `name`, `icon`, `desc` and `detail`.
3. Add `bullets` and `images` for a detail modal, or set `openPanel` to link the
   card straight to one of the experience panels (`epc`, `om`, `dd`).
4. Capability cards on the landing page and the Services panel update automatically.

Icons are inline SVG symbols defined in `index.html` (`#icon-sun`, `#icon-bolt`,
etc.). Use any symbol id in the `icon` field.

---

## 9. How to deploy later

The site is fully static:

1. Upload the **entire `proto` folder** to any static host
   (Netlify, Vercel, GitHub Pages, S3/CloudFront, cPanel, nginx, IIS).
2. No build step, no environment variables, no server config required.
3. Keep relative paths (`assets/...`) — the site works from any base URL.
4. Optionally compress images (`squoosh`, ImageOptim) and serve over HTTPS.

---

## 10. Notes

- All supplied assets are used as-is; no assets were overwritten or deleted.
- The consultation form prepares an email via `mailto:` (no backend) — replace with
  a real form endpoint when going live.
- Privacy Policy and Terms links open placeholder dialogs.
- `prefers-reduced-motion` is respected: motion and the hero video are replaced by
  static fallbacks. The service worker uses network-first HTML, cache-first static
  assets and deliberately does not cache large MP4 files.

© Maitra Solar Solutions

### Current branding treatment
The landing hero uses the client-supplied complete Maitra Solar Solutions logo as the primary brand lockup. The hero headline is separated from the logo, the cinematic video remains visible, and the landing navigation remains the main interaction layer.

## Image asset credits

Bundled third-party/online imagery is documented in `ASSET-CREDITS.md`. Representative reference images are explicitly labelled so they are not presented as Maitra project photographs.

## Internal experience — 2026 refinement

The internal About, Services, O&M, EPC, Due Diligence, Projects, Team and Contact views use a unified full-screen experience shell. The shell deliberately resets the earlier right-drawer positioning model so internal content remains centered on desktop and becomes full-viewport on mobile. Projects uses a darker field-report surface; the other views use the Maitra white / navy / amber system with restrained technical blue accents.

The internal scroll position is represented by a lightweight technical rail. No framework or animation dependency is used; the experience remains HTML/CSS/vanilla JavaScript.


### Command menu refinement (2026)

The global hamburger navigation is implemented as a full-screen, namespaced Maitra command layer. It includes active-section state, contextual menu copy, desktop image previews, consultation/call/email actions, responsive mobile layout, reduced-motion handling, keyboard focus trapping, and a restrained technical visual system. The stylesheet is `css/menu-experience.css` and the service-worker cache is `maitra-shell-v7`.

## Dedicated mobile composition
The current build keeps the approved desktop layouts unchanged and adds `css/mobile-composition.css` as the final responsive layer. It intentionally recomposes the hero, command menu, internal About/Services/O&M/EPC/Due Diligence/Projects/Team/Contact views, detail dialogs and lightbox for 320–430px phones, short-height phones and touch interaction. It uses `svh`/`dvh`, safe-area insets, compact vertical information architecture, one-column project media, portrait-safe team imagery, and touch-sized controls without introducing a framework or dependency.


## Current working base
This package is the polished mobile composition baseline. The same user-supplied `new_gwr_video_mvp.mp4` is used as the unified desktop and mobile hero source at `assets/video/maitra-hero-unified.mp4`. Desktop composition is preserved; mobile uses its dedicated responsive composition layer.
