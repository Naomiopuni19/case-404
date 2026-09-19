import { Lock } from 'lucide-react'
import { Panel, SeverityBadge } from './ui'
import { incident, otherIncidents } from '../data/caseData'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function IncidentQueue() {
  const { state, dispatch } = useIncidentEngine()
  const active = state.activePanel === 'incident-workspace'

  return (
    <Panel title="Incident Queue" className="h-full" bodyClassName="overflow-y-auto">
      <button
        onClick={() => dispatch({ type: 'SET_PANEL', panel: 'incident-workspace' })}
        className={`flex w-full items-center justify-between border-b border-line-soft px-4 py-3 text-left transition hover:bg-panel-raised/60 ${
          active ? 'bg-panel-raised' : ''
        }`}
      >
        <div>
          <p className="font-mono text-[12px] text-ink">{incident.id}</p>
          <p className="mt-0.5 text-[12px] text-ink-dim">{incident.type}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SeverityBadge level={incident.severity} />
          <span className="font-mono text-[10px] text-ink-faint">{incident.firstDetected}</span>
        </div>
      </button>

      {otherIncidents.map((inc) => (
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
        These cases aren't built yet - only <span className="text-ink-dim">{incident.id}</span> is playable right now. More are on the way.
      </div>
    </Panel>
  )
}