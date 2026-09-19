import { Panel } from './ui'
import { incident } from '../data/caseData'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function CaseFiles() {
  const { dispatch } = useIncidentEngine()

  return (
    <div className="mx-auto max-w-2xl">
      <Panel title={`Case File - ${incident.id}`} bodyClassName="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] text-signal">{incident.caseName.toUpperCase()}</p>
            <h1 className="mt-1 text-lg font-semibold text-ink">{incident.type}</h1>
          </div>
          <span className="rounded border border-critical/30 bg-critical/10 px-2 py-1 text-[10px] font-semibold text-critical">
            {incident.severity}
          </span>
        </div>

        <p className="mb-5 text-[13px] leading-relaxed text-ink-dim">
          Anomalous authentication activity has been detected within A.F.I.A. Group Finance.
          A login to the finance environment occurred using valid credentials from an
          unrecognized external address. You have been assigned as primary analyst on
          this incident. Investigate the SIEM, email system, affected endpoint, and
          network activity to determine how access was obtained, what the attacker did,
          and whether the incident can still be contained.
        </p>

        <dl className="grid grid-cols-2 gap-4 border-t border-line-soft pt-4 text-[12px] sm:grid-cols-3">
          <div>
            <dt className="text-ink-faint">Division</dt>
            <dd className="mt-0.5 text-ink">A.F.I.A. Group Finance</dd>
          </div>
          <div>
            <dt className="text-ink-faint">Affected user</dt>
            <dd className="mt-0.5 text-ink">{incident.affectedUser}</dd>
          </div>
          <div>
            <dt className="text-ink-faint">Affected endpoint</dt>
            <dd className="mt-0.5 font-mono text-ink">{incident.affectedEndpoint}</dd>
          </div>
          <div>
            <dt className="text-ink-faint">First detected</dt>
            <dd className="mt-0.5 font-mono text-ink">{incident.firstDetected}</dd>
          </div>
          <div>
            <dt className="text-ink-faint">Assigned to</dt>
            <dd className="mt-0.5 text-ink">{incident.assigned}</dd>
          </div>
          <div>
            <dt className="text-ink-faint">Status</dt>
            <dd className="mt-0.5 text-ink">Investigation required</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-4">
          <button onClick={() => dispatch({ type: 'SET_PANEL', panel: 'email' })} className="rounded-md border border-line px-3 py-1.5 text-[11px] text-ink-dim hover:text-ink">
            Open email evidence
          </button>
          <button onClick={() => dispatch({ type: 'SET_PANEL', panel: 'endpoints' })} className="rounded-md border border-line px-3 py-1.5 text-[11px] text-ink-dim hover:text-ink">
            Inspect endpoint
          </button>
          <button onClick={() => dispatch({ type: 'SET_PANEL', panel: 'siem' })} className="rounded-md border border-line px-3 py-1.5 text-[11px] text-ink-dim hover:text-ink">
            Search SIEM
          </button>
          <button onClick={() => dispatch({ type: 'SET_PANEL', panel: 'overview' })} className="rounded-md bg-signal px-3 py-1.5 text-[11px] font-medium text-void hover:bg-signal/90">
            Return to SOC
          </button>
        </div>
      </Panel>
    </div>
  )
}