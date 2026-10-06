# ResumeForge

A React + Vite resume builder with eight templates, a live A4 preview, local draft saving, PDF export, and JSON backups. The frontend works without a server or account.

## Develop

Use Node.js 22 (or a Vite 7 compatible release).

```sh
cd client
npm ci
npm run dev
```

The local site is available at http://localhost:5173.

## Check a change

```sh
cd client
npm run lint
npm test
npm run test:pdf
npm run build
npm run preview
```

The tests cover malformed backups, legacy migration, preservation of user content, and completion checks. PDF regressions generate 26 documents across all eight templates, all seven fonts, long resumes, oversized entries, compact layouts, blank content, and hidden sections. Checks cover text boundaries, missing content, orphan headings, page numbers, and empty pages. GitHub Actions runs these checks when the source is pushed. Also verify navigation, refresh on `/resume-builder`, template selection, mobile edit/preview, and PDF generation in a browser.

## Deploy to Vercel

Use the **Vite** preset with **Root Directory: `client`**, build command `npm run build`, and output directory `dist`.

`client/vercel.json` rewrites incoming routes to `index.html` so React Router can handle direct links and page refreshes. Keep this file in the configured root directory. The backend's `server/vercel.json` does not configure frontend routing.

For an already linked project, run from the repository root:

```sh
npx vercel --prod
```

The existing production project is `resume-forge` in `anirs-projects-00fff74e`. Its production domain is https://resume-forge-rust.vercel.app. The Vercel project currently uses CLI deployments rather than a connected Git repository.

## Saving and exporting

- Drafts use the `resume-builder-data` localStorage key in the current browser. They do not sync across devices; clearing browser data removes them.
- **Export JSON** creates an editable backup. **Import JSON** validates and restores a backup up to 2 MB. Partial older backups do not acquire sample achievements.
- **Download PDF** saves a selectable-text A4 document from the current resume data. Once the preview finishes updating, it displays pages from that same PDF. Native pagination repeats page margins, keeps headings with content, and wraps long entries. Fonts are bundled locally.
- **Open PDF** opens that exact document in a new tab for printing. Choose Minimalist ATS for a single-column layout. Results depend on the receiving system; inspect the uploaded application.
- Templates support colors, fonts, spacing, visibility, and section order. Profile images require an accessible PNG/JPEG URL and may require cross-origin permission. A failed image shows an actionable error instead of silently omitting it.

## Project structure

- `client/src/pages`: landing page and editor
- `client/src/templates`: eight resume layouts
- `client/src/utils`: defaults, safe data migration, completion checks, export
- `client/src/pdf`: shared PDF layout and local font registration
- `client/scripts/test-pdf.mjs`: generated-document regression checks
- `server`: legacy Express/MongoDB API; not used by the current local-draft frontend

The optional API requires a separately configured MongoDB connection and deployment. It is not needed for the production frontend described above.

## Editing and preview

Undo/redo retains the last 60 edits within the current editor session. Compact layout adjusts font size, spacing, and margins together; it does not guarantee a single page. The PDF preview updates after a pause in editing and shows one page at a time; use the page controls to inspect the rest. The previous page stays visible while an update is prepared. On narrow screens, PDF generation pauses while the editor is shown. Download always uses the current resume data.

