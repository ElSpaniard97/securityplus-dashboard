# Security+ Study Dashboard (GitHub Pages)

A lightweight, modern dashboard to study for CompTIA Security+, powered by static JSON files and client‑side JavaScript.

## Features
- Overview with progress chart (by chapter) using Chart.js
- Chapters table with search + "mark studied" toggles (saved in `localStorage`)
- Flashcards mode (Acronym/Name → Definition or Definition → Name)
- Zero back end — works on GitHub Pages

## Structure
```
securityplus-dashboard/
├── index.html
├── chapters.html
├── flashcards.html
├── style.css
├── script.js
└── data/
    ├── chapter1.json
    ├── chapter2.json
    ├── chapter3.json
    ├── chapter4.json
    └── chapter5.json
```

## Deploy to GitHub Pages
1. Create a new public repository (e.g., `securityplus-dashboard`).
2. Upload all files in this folder to the repo.
3. Commit and go to **Settings → Pages → Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** (or `master`), folder: **/root**
4. Your site will be served at `https://<your-username>.github.io/securityplus-dashboard/`

## Updating Data
- Replace JSON files in `/data` with updated versions to refresh content.
- The site auto-loads JSON at runtime.

## Notes
- All progress state is saved in the browser via `localStorage`.
- No analytics or tracking. No emojis.