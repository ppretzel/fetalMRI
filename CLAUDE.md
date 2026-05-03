# fetalMRI — Claude Code Context

## Project Overview
Static multi-page fetal MRI resource site. No build step, no framework, no backend. Deployed to GitHub Pages (`ppretzel.github.io/fetalMRI`). All computation is client-side.

## File Map
| File | Purpose |
|------|---------|
| `index.html` | Atlas Viewer — interactive multiplanar NIfTI viewer |
| `calculator.html` | Kyriakopoulou 2017 Centile Calculator |
| `css/style.css` | Single shared stylesheet for all pages |
| `atlas/STA21-35.nii` | Fetal brain NIfTI atlases, 15 gestational ages (21–35 weeks) |
| `Fetal-Brain-Centile-Calculator-Kyriakopoulou-V.xlsm` | Reference only — not used by the web app; source of normative coefficients |

## Navigation Pattern
- Sticky dark nav, `--nav-height: 56px`
- `.has-dropdown` + `.dropdown` for the Calculators submenu
- Hover works because `.has-dropdown` uses `align-self: stretch; display: flex; align-items: center` — the `<li>` fills the full nav height so there is no gap between the nav item and the dropdown (gap was the bug, this is the fix)
- `Calculators` parent link is `href="#"` intentionally — more calculators will be added as dropdown subentries later
- Remove nav items that aren't implemented yet rather than leaving `href="#"` placeholders

## CSS System (`css/style.css`)
- CSS custom properties at `:root`: `--bg`, `--surface`, `--surface2`, `--border`, `--text`, `--muted`, `--accent`, `--accent-glow`, `--accent-dim`, `--nav-height`
- Component-prefixed classes: `.nav-*`, `.viewer-*`, `.calc-*`, `.age-*`, `.meas-*`
- State modifiers: `.active`, `.switching`, `.unavailable`, `.has-value`, `.extreme`
- Single `@media (max-width: 600px)` breakpoint
- Do NOT split into multiple CSS files

## Atlas Viewer (`index.html`)
- NiiVue v0.57.0 from CDN (`jsdelivr`)
- All 15 atlases fetched in parallel as blobs on page load; STA21 rendered immediately when ready
- Blob URLs cached in a `Map`; pill buttons enabled as their atlas loads
- Ctrl/Cmd+Scroll zooms (range 0.5–8×); double-click resets zoom
- Pill states: `.active` (current), `.switching` (loading pulse), `.unavailable` (fetch failed)

## Centile Calculator (`calculator.html`)
- Normative data: Kyriakopoulou & Vatansever, King's College London, 2016
- Coefficients hard-coded in `NORMS` object — quadratic mean polynomial + linear SD polynomial per measurement
- Centile math: `NORMDIST(value, mean, SD)` via erf approximation; clamped to "<1st percentile" / ">99th percentile"
- **GA format**: `"X Y/7"` — e.g. `31 2/7` (not decimal, not `weeks+days`)
- **Auto-computed fields**: HC = `1.62 × (BPD_skull + OFD_skull)`; ECSF = `BPD_skull − BPD_brain`
- Date of scan pre-filled with today's date on load
- Report output: monospace fixed-width text for copy-paste into MRI reports; empty rows show `—`, never omitted
- UI says **"Percentile"** not "Centile"
- No input validation — trust user values

## Conventions
- Minimal whitespace: prefer merging labels into table `<th>` rather than separate heading elements
- No comments in code unless the WHY is non-obvious
- Ordinal suffixes: 1st, 2nd, 3rd, 4th … 11th, 12th, 13th (correct handling of teens)
- IDs: `snake_case`; CSS classes: `kebab-case`

## Do Not
- Add a build step or bundler
- Introduce JS frameworks
- Add backend or server-side logic
- Split `style.css` into multiple files
- Leave `href="#"` nav placeholders for sections that don't exist yet
