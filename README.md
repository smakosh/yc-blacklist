<div align="center">

# 🚫 YC Blacklist

**The open, community-maintained registry of Y Combinator startups people warn against — _don't work for, don't use, don't pay for_.**

YC vouches for these companies. This is the other side of the reference check.
Every entry is sourced. The whole database is one JSON file. Anyone can add to it with a pull request.

[**Live site**](https://yc-blacklist.pages.dev) · [Report a startup](https://github.com/smakosh/yc-blacklist/issues/new?template=add-startup.yml) · [Contribution rules](./CONTRIBUTING.md)

</div>

---

## What this is

A "wall of shame" for YC-backed startups, organized around three verdicts:

| Verdict | Meaning |
| --- | --- |
| `DO-NOT-WORK` | Avoid as an **employer** |
| `DO-NOT-USE` | Avoid as a **product** |
| `DO-NOT-PAY` | Avoid as a **customer** |

You can search, filter by verdict, severity and tag, and open a full dossier on each company with its sourced "case against."

> **The seed data is fictional.** Every entry currently in the repo is marked `"example": true` and exists only to demonstrate the format. Real, sourced reports arrive by pull request.

## The database is just JSON

There is no backend and no CMS. The entire registry lives in [`data/startups.json`](./data/startups.json), validated against [`data/startups.schema.json`](./data/startups.schema.json). Updating the site means editing that file and opening a PR — every merge to `main` redeploys.

```jsonc
{
  "id": "acme-co",
  "name": "Acme Co",
  "ycBatch": "W21",
  "verdicts": ["work", "pay"],
  "severity": "high",
  "summary": "One sentence on why it's here.",
  "reasons": [
    { "claim": "What happened", "detail": "Context.", "sources": ["https://proof"] }
  ],
  "tags": ["wage-theft"],
  "dateAdded": "2026-06-25"
}
```

## Contributing

1. **No Git?** Use the [🚩 Report a startup](https://github.com/smakosh/yc-blacklist/issues/new?template=add-startup.yml) issue form.
2. **Comfortable with a PR?** [Edit `data/startups.json`](https://github.com/smakosh/yc-blacklist/edit/main/data/startups.json) directly.

The one rule: **every claim needs a source a stranger can verify.** No private individuals, no doxxing, no fabricated claims. Entries can be disputed and corrected by anyone — including the companies listed. See [CONTRIBUTING.md](./CONTRIBUTING.md).

CI validates the JSON on every pull request (`npm run validate`).

## Tech stack

- **[Vite](https://vite.dev) + React 19** (JavaScript)
- **[TanStack Router](https://tanstack.com/router)** — code-based routing
- **[Tailwind CSS v4](https://tailwindcss.com)** + **[shadcn/ui](https://ui.shadcn.com)**
- Deployed on **[Cloudflare Pages](https://pages.cloudflare.com)** as a static SPA

## Local development

```bash
npm install
npm run dev        # start the dev server
npm run validate   # validate data/startups.json
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Deploying

The site is a static SPA. Build output goes to `dist/`.

```bash
npm run deploy     # vite build + wrangler pages deploy
```

For continuous deployment, connect the repo in the **Cloudflare Pages dashboard** with:

- **Build command:** `npm run build`
- **Output directory:** `dist`

Cloudflare then rebuilds and redeploys on every push to `main` — so a merged PR ships automatically. SPA routing is handled by [`public/_redirects`](./public/_redirects).

## Disclaimer & license

Entries reflect the opinions and reported experiences of community contributors, **not** statements of fact by the maintainers. **This project is not affiliated with, endorsed by, or connected to Y Combinator.**

Code is licensed **MIT**; the data in `data/` is released under **[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)**.
