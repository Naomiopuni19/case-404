import { ArrowRight, ShieldAlert } from 'lucide-react'
import { incident } from '../data/caseData'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function Briefing() {
  const { dispatch } = useIncidentEngine()

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4">
      <div className="w-full max-w-lg rounded-lg border border-line bg-panel/80 p-7">
        <div className="mb-5 flex items-center gap-2">
          <ShieldAlert size={16} className="text-critical" />
          <span className="font-mono text-[11px] tracking-[0.15em] text-critical">INCOMING ASSIGNMENT</span>
        </div>

        <p className="font-mono text-[11px] text-signal">{incident.caseName.toUpperCase()}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">{incident.id} - {incident.type}</h1>

        <p className="mt-4 text-[13.5px] leading-relaxed text-ink-dim">
          Anomalous authentication activity has been detected within A.F.I.A. Group Finance.
          A login to the finance environment occurred using valid credentials from an
          unrecognized external address, moments after a suspicious email reached the account holder.
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-dim">
          You've been assigned as primary analyst. Nobody has told you what happened -
          that's your job to determine. The situation is still active.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line-soft pt-4 text-[11px]">
          <div>
            <p className="text-ink-faint">Severity</p>
            <p className="mt-0.5 font-medium text-critical">{incident.severity}</p>
          </div>
          <div>
            <p className="text-ink-faint">Division</p>
            <p className="mt-0.5 text-ink">A.F.I.A. Finance</p>
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