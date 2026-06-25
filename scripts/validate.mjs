// Validates data/startups.json against the JSON schema and project rules.
// Run with: npm run validate
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const here = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(here, '..', 'data', 'startups.json')
const schemaPath = path.join(here, '..', 'data', 'startups.schema.json')

let data, schema
try {
  data = JSON.parse(readFileSync(dataPath, 'utf8'))
  schema = JSON.parse(readFileSync(schemaPath, 'utf8'))
} catch (err) {
  console.error('✖ Could not read/parse data files:', err.message)
  process.exit(1)
}

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
const validate = ajv.compile(schema)

const problems = []

if (!validate(data)) {
  for (const e of validate.errors) {
    problems.push(`schema: ${e.instancePath || '/'} ${e.message}`)
  }
}

const ids = new Map()
for (const [i, s] of (data.startups || []).entries()) {
  if (!s || !s.id) continue
  if (ids.has(s.id)) {
    problems.push(`duplicate id "${s.id}" (entries #${ids.get(s.id)} and #${i})`)
  } else {
    ids.set(s.id, i)
  }
}

// Real (non-example) entries must cite at least one verifiable source.
for (const s of data.startups || []) {
  if (s.example) continue
  const hasSource = (s.reasons || []).some((r) =>
    (r.sources || []).some((u) => /^https?:\/\//i.test(u)),
  )
  if (!hasSource) {
    problems.push(`entry "${s.id}": real entries must include at least one http(s) source`)
  }
}

if (problems.length) {
  console.error(`\n✖ ${problems.length} problem(s) found in data/startups.json:\n`)
  for (const p of problems) console.error('  - ' + p)
  console.error('\nSee CONTRIBUTING.md for the rules.\n')
  process.exit(1)
}

console.log(
  `✓ data/startups.json is valid — ${data.startups.length} entries, all ids unique.`,
)
