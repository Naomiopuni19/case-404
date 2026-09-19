import { ArrowRight, ShieldAlert } from 'lucide-react'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function Briefing() {
  const { state, dispatch } = useIncidentEngine()
  const { incident, briefingIntro, divisionLabel } = state.caseData

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4">
      <div className="w-full max-w-lg rounded-lg border border-line bg-panel/80 p-7">
        <div className="mb-5 flex items-center gap-2">
          <ShieldAlert size={16} className="text-critical" />
          <span className="font-mono text-[11px] tracking-[0.15em] text-critical">INCOMING ASSIGNMENT</span>
        </div>

        <p className="font-mono text-[11px] text-signal">{incident.caseName.toUpperCase()}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">{incident.id} - {incident.type}</h1>

        {briefingIntro.map((para, i) => (
          <p key={i} className="mt-4 text-[13.5px] leading-relaxed text-ink-dim">
            {para}
          </p>
        ))}

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line-soft pt-4 text-[11px]">
          <div>
            <p className="text-ink-faint">Severity</p>
            <p className="mt-0.5 font-medium text-critical">{incident.severity}</p>
          </div>
          <div>
            <p className="text-ink-faint">Division</p>
            <p className="mt-0.5 text-ink">{divisionLabel}</p>
          </div>
          <div>
            <p className="text-ink-faint">First detected</p>
            <p className="mt-0.5 font-mono text-ink">{incident.firstDetected}</p>
          </div>
        </div>

        <button
          onClick={() => dispatch({ type: 'GO_TO', view: 'soc' })}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-signal py-2.5 text-[13px] font-medium text-void hover:bg-signal/90"
        >
          Begin Incident
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}