import { useState } from 'react'
import { Search } from 'lucide-react'
import { Panel, SeverityBadge } from './ui'
import { siemLogs } from '../data/caseData'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function SiemSearch() {
  const { dispatch } = useIncidentEngine()
  const [query, setQuery] = useState('user:s.mensah')
  const [results, setResults] = useState(siemLogs.filter((l) => l.user === 's.mensah'))

  function runSearch(value) {
    const q = value.toLowerCase().replace(/^\w+:/, '')
    const filtered = siemLogs.filter(
      (l) => l.user.toLowerCase().includes(q) || l.sourceIp.includes(q) || l.event.toLowerCase().includes(q)
    )
    setResults(q ? filtered : siemLogs)
    dispatch({ type: 'SIEM_SEARCHED' })
  }

  return (
    <Panel title="SIEM - Log Search" className="h-full" bodyClassName="flex flex-col">
      <div className="flex items-center gap-1.5 border-b border-line-soft px-4 py-2.5">
        <Search size={13} className="text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && runSearch(query)}
          placeholder="user:s.mensah"
          className="flex-1 bg-transparent font-mono text-[12px] text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <button onClick={() => runSearch(query)} className="rounded bg-signal px-3 py-1 text-[11px] font-medium text-void hover:bg-signal/90">
          Search
        </button>
      </div>

      <div className="grid grid-cols-[70px_90px_1fr_100px_70px] gap-2 border-b border-line-soft px-4 py-2 text-[10px] font-semibold tracking-wide text-ink-faint">
        <span>TIME</span><span>USER</span><span>EVENT</span><span>SOURCE IP</span><span>SEVERITY</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {results.map((l, i) => (
          <div key={i} className="grid grid-cols-[70px_90px_1fr_100px_70px] items-center gap-2 border-b border-line-soft px-4 py-2 text-[11px]">
            <span className="font-mono text-ink-faint">{l.time}</span>
            <span className="text-ink">{l.user}</span>
            <span className="truncate text-ink-dim">{l.event}</span>
            <span className="font-mono text-ink-faint">{l.sourceIp}</span>
            <SeverityBadge level={l.severity} />
          </div>
        ))}
        {results.length === 0 && <p className="px-4 py-3 text-[11px] text-ink-faint">No matching log events.</p>}
      </div>
    </Panel>
  )
}
