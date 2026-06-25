# Contributing to YC Blacklist

This registry only works if it stays **fair, sourced, and correctable**. Please read this before adding or editing an entry.

## The one rule

> Every claim needs a source a stranger can verify.

A source is a news article, a court filing, an archived page, a public post, a pattern of reviews — anything someone else can open and check. "Trust me, I worked there" is a starting point, not a source. Opinions are welcome **as long as they're labeled as opinions** and the factual claims around them carry receipts.

## What belongs here

- Y Combinator companies that, based on documented evidence, you'd warn others **not to work for, not to use, or not to pay for**.
- Concrete, checkable behavior: wage theft, dark-pattern billing, undisclosed breaches, mass layoffs handled badly, misrepresented products, etc.

## What does **not** belong here

- Private individuals. This is about companies. **No names of non-public people, no doxxing.**
- Fabricated claims, rumors with no source, or competitive smears.
- "I didn't like their UI." Disappointment isn't a blacklist offense.

## How to add an entry

### Option A — open a guided issue (no Git needed)

Use the **[🚩 Report a startup](https://github.com/smakosh/yc-blacklist/issues/new?template=add-startup.yml)** issue form. A maintainer will turn a well-sourced submission into a pull request.

### Option B — edit the JSON yourself

The entire database is one file: [`data/startups.json`](./data/startups.json). Add an object to the `startups` array following [`data/startups.schema.json`](./data/startups.schema.json):

```json
{
  "id": "acme-co",
  "name": "Acme Co",
  "ycBatch": "W21",
  "website": "https://acme.example",
  "status": "active",
  "verdicts": ["work", "pay"],
  "severity": "high",
  "summary": "One sentence on why it's here.",
  "reasons": [
    {
      "claim": "What happened",
      "detail": "Context a stranger can verify.",
      "sources": ["https://link-to-proof"]
    }
  ],
  "tags": ["wage-theft"],
  "dateAdded": "2026-06-25",
  "submittedBy": "your-github-handle"
}
```

### Field reference

| Field | Required | Notes |
| --- | --- | --- |
| `id` | yes | Unique kebab-case slug. Used in the URL. |
| `name` | yes | Company name. |
| `ycBatch` | no | `W21`, `S23`, … or `""` if unknown. |
| `website` | no | `https://…` or `""`. |
| `status` | no | `active`, `acquired`, `defunct`, `unknown`. |
| `verdicts` | yes | One or more of `work`, `use`, `pay`. |
| `severity` | yes | `low`, `medium`, `high`. |
| `summary` | yes | One sentence, ≤ 280 chars. |
| `reasons` | yes | Each needs a `claim`; real entries need ≥ 1 http(s) `source`. |
| `tags` | no | Lowercase, hyphenated. |
| `dateAdded` | yes | `YYYY-MM-DD`. |
| `submittedBy` | no | Your GitHub handle, no `@`. |

## Validate before you push

```bash
npm install
npm run validate
```

CI runs the same check on every pull request. Invalid JSON, duplicate ids, or real entries without sources will fail the build.

## Disputes and corrections

Anyone — including a company that's listed — can dispute an entry by opening an issue or a pull request. **Corrections and removals backed by evidence take priority over keeping an entry up.** The goal is a list founders themselves would call fair.

## Licensing

By contributing, you agree your data contributions are released under **[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)** (public domain) and any code contributions under the **MIT License**.
