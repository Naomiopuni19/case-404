import { useState } from 'react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

const TABS = ['ip', 'domain', 'hash']

export default function ThreatIntelPanel() {
  const { state, dispatch } = useIncidentEngine()
  const { threatIntel, defaultThreatIntelQuery } = state.caseData
  const [tab, setTab] = useState('ip')
  const [query, setQuery] = useState(defaultThreatIntelQuery)
  const [result, setResult] = useState(threatIntel.ip[defaultThreatIntelQuery])
  const [searched, setSearched] = useState(true)

  function runSearch() {
    const key = query.trim()
    const found = threatIntel[tab][key]
    setResult(found || null)
    setSearched(true)
    dispatch({ type: 'THREAT_INTEL_LOOKUP', value: key })
  }

  return (
    <Panel title="Threat Intelligence" className="h-full" bodyClassName="flex flex-col p-3">
      <div className="mb-3 flex gap-1 rounded-md bg-panel-raised p-0.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setSearched(false); setResult(null) }}
            className={`flex-1 rounded px-2 py-1 text-[11px] capitalize transition ${
              tab === t ? 'bg-signal/15 text-signal' : 'text-ink-dim hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-3 flex gap-1.5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && runSearch()}
          placeholder={tab === 'ip' ? defaultThreatIntelQuery : tab === 'domain' ? 'suspicious-domain.com' : 'sha256 hash'}
          className="min-w-0 flex-1 rounded border border-line bg-panel px-2.5 py-1.5 font-mono text-[11px] text-ink placeholder:text-ink-faint focus:border-signal/50 focus:outline-none"
        />
        <button onClick={runSearch} className="rounded bg-signal px-3 text-[11px] font-medium text-void hover:bg-signal/90">
          Search
        </button>
      </div>

      {searched && !result && (
        <p className="text-[11px] text-ink-faint">No intelligence on record for this indicator.</p>
      )}

      {result && (
        <div className="flex flex-1 flex-col gap-2.5">
          <span className={`inline-flex w-fit items-center rounded px-2 py-1 text-[10px] font-semibold ${
            result.reputation === 'MALICIOUS' ? 'bg-critical/15 text-critical' :
            result.reputation === 'HIGH RISK' ? 'bg-high/15 text-high' :
            'bg-line-soft text-ink-dim'
          }`}>
            {result.reputation}
          </span>
          <dl className="space-y-1.5 text-[11px]">
            <div className="flex justify-between border-b border-line-soft pb-1.5">
              <dt className="text-ink-faint">First Observed</dt><dd className="text-ink">{result.firstObserved}</dd>
            </div>
            <div className="flex justify-between border-b border-line-soft pb-1.5">
              <dt className="text-ink-faint">Associated Campaigns</dt><dd className="text-ink">{result.campaigns}</dd>
            </div>
            <div>
              <dt className="mb-1 text-ink-faint">Related Activity</dt>
              <dd className="flex flex-wrap gap-1">
                {result.activity.map((a) => (
                  <span key={a} className="rounded bg-panel-raised px-1.5 py-0.5 text-[10px] text-ink-dim">{a}</span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </Panel>
  )
}