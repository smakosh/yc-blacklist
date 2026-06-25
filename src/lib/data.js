import db from '@data/startups.json'

// --- Repo / contribution links -------------------------------------------
export const REPO = 'smakosh/yc-blacklist'
export const REPO_URL = `https://github.com/${REPO}`
export const DATA_FILE_URL = `${REPO_URL}/blob/main/data/startups.json`
export const EDIT_DATA_URL = `${REPO_URL}/edit/main/data/startups.json`
export const NEW_ISSUE_URL = `${REPO_URL}/issues/new?template=add-startup.yml&labels=submission`
export const CONTRIBUTING_URL = `${REPO_URL}/blob/main/CONTRIBUTING.md`

// --- Vocabulary -----------------------------------------------------------
export const VERDICTS = {
  work: {
    id: 'work',
    label: "Don't work for",
    code: 'DO-NOT-WORK',
    line: 'Avoid as an employer',
  },
  use: {
    id: 'use',
    label: "Don't use",
    code: 'DO-NOT-USE',
    line: 'Avoid as a product',
  },
  pay: {
    id: 'pay',
    label: "Don't pay for",
    code: 'DO-NOT-PAY',
    line: 'Avoid as a customer',
  },
}

export const VERDICT_ORDER = ['work', 'use', 'pay']

export const SEVERITY = {
  high: { id: 'high', label: 'Severe', rank: 3 },
  medium: { id: 'medium', label: 'Elevated', rank: 2 },
  low: { id: 'low', label: 'Caution', rank: 1 },
}

// --- Normalized dataset ---------------------------------------------------
export const updatedAt = db.updatedAt

export const startups = [...db.startups].sort((a, b) => {
  const sev = (SEVERITY[b.severity]?.rank ?? 0) - (SEVERITY[a.severity]?.rank ?? 0)
  if (sev !== 0) return sev
  return (b.dateAdded || '').localeCompare(a.dateAdded || '')
})

export function getStartup(id) {
  return startups.find((s) => s.id === id)
}

export const allTags = [...new Set(startups.flatMap((s) => s.tags || []))].sort()

export const stats = {
  companies: startups.length,
  reports: startups.reduce((n, s) => n + (s.reasons?.length || 0), 0),
  sources: startups.reduce(
    (n, s) => n + (s.reasons || []).reduce((m, r) => m + (r.sources?.length || 0), 0),
    0,
  ),
  byVerdict: VERDICT_ORDER.reduce((acc, v) => {
    acc[v] = startups.filter((s) => s.verdicts?.includes(v)).length
    return acc
  }, {}),
  allExamples: startups.length > 0 && startups.every((s) => s.example),
}

// --- Filtering ------------------------------------------------------------
export function filterStartups(list, { query = '', verdicts = [], severity = 'all', tag = 'all', sort = 'severity' } = {}) {
  const q = query.trim().toLowerCase()
  let out = list.filter((s) => {
    if (verdicts.length && !verdicts.some((v) => s.verdicts?.includes(v))) return false
    if (severity !== 'all' && s.severity !== severity) return false
    if (tag !== 'all' && !(s.tags || []).includes(tag)) return false
    if (q) {
      const hay = [
        s.name,
        s.ycBatch,
        s.summary,
        ...(s.tags || []),
        ...(s.reasons || []).map((r) => `${r.claim} ${r.detail || ''}`),
      ]
        .join(' ')
        .toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  if (sort === 'newest') {
    out = [...out].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''))
  } else if (sort === 'az') {
    out = [...out].sort((a, b) => a.name.localeCompare(b.name))
  } else {
    out = [...out].sort((a, b) => (SEVERITY[b.severity]?.rank ?? 0) - (SEVERITY[a.severity]?.rank ?? 0))
  }
  return out
}
