# Us — shared dashboard

A tiny static dashboard with three sections — **Me**, **GF**, and **Both** —
each holding its own set of checklists. No backend: everything saves to
`localStorage` in the browser you're using.

## Files

- `index.html` — home page with the Me / GF / Both nav
- `list.html` — the list page (used for all three sections, via `?section=me|gf|both`)
- `style.css` — all styling
- `app.js` — list logic (add/remove lists and items, checkboxes, storage)

## Host it on GitHub Pages

1. Create a new repo on GitHub, e.g. `us-dashboard` (public repos get free Pages hosting).
2. Push these four files (`index.html`, `list.html`, `style.css`, `app.js`) to the root of the repo.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. GitHub will give you a URL like `https://<your-username>.github.io/us-dashboard/`.

It usually takes a minute to go live after the first push.

## One thing worth knowing

Lists are saved with `localStorage`, which is tied to one browser on one
device. If you and your partner each open the site on your own phones,
you'll each have your *own* separate copy of the lists — they won't sync
between you. That's fine for "to start with," but if you want lists that
actually stay in sync between you two, the next step would be swapping
`localStorage` for a small shared backend (e.g. Firebase, or Supabase's
free tier) — happy to help with that whenever you're ready.
