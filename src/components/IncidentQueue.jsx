import { Lock } from 'lucide-react'
import { Panel, SeverityBadge } from './ui'
import { caseSummaries, lockedIncidents } from '../data/caseRegistry'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function IncidentQueue() {
  const { state, dispatch } = useIncidentEngine()

  function openIncident(id) {
    if (state.caseId === id) {
      dispatch({ type: 'SET_PANEL', panel: 'incident-workspace' })
    } else {
      dispatch({ type: 'SELECT_CASE', caseId: id })
    }
  }

  return (
    <Panel title="Incident Queue" className="h-full" bodyClassName="overflow-y-auto">
      {caseSummaries.map((inc) => {
        const active = state.caseId === inc.id && state.activePanel === 'incident-workspace'
        return (
          <button
            key={inc.id}
            onClick={() => openIncident(inc.id)}
            className={`flex w-full items-center justify-between border-b border-line-soft px-4 py-3 text-left transition hover:bg-panel-raised/60 ${
              active ? 'bg-panel-raised' : ''
            }`}
          >
            <div>
              <p className="font-mono text-[12px] text-ink">{inc.id}</p>
              <p className="mt-0.5 text-[12px] text-ink-dim">{inc.type}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <SeverityBadge level={inc.severity} />
              <span className="font-mono text-[10px] text-ink-faint">{inc.time}</span>
            </div>
          </button>
        )
      })}

      {lockedIncidents.map((inc) => (
        <div
          key={inc.id}
          className="flex items-center justify-between border-b border-line-soft px-4 py-3 opacity-50"
          title="This case isn't built yet"
        >
          <div>
            <p className="font-mono text-[12px] text-ink">{inc.id}</p>
            <p className="mt-0.5 text-[12px] text-ink-dim">{inc.type}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="flex items-center gap-1 rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-faint">
              <Lock size={9} /> Locked
            </span>
            <span className="font-mono text-[10px] text-ink-faint">{inc.time}</span>
          </div>
        </div>
      ))}
      <div className="px-4 py-3 text-[11px] text-ink-faint">
        {caseSummaries.length} of {caseSummaries.length + lockedIncidents.length} cases are playable right now. More are on the way.
      </div>
    </Panel>
  )
}