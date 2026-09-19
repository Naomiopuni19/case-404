import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine, computeScore } from '../state/IncidentEngine'

const METRICS = [
  ['detection', 'Detection'],
  ['investigation', 'Investigation'],
  ['correlation', 'Evidence Correlation'],
  ['response', 'Response'],
  ['containment', 'Containment'],
  ['documentation', 'Documentation'],
]

function buildFeedback(state) {
  const good = []
  const missed = []

  if (state.investigated.emailInspected) good.push('Reviewed the phishing email and identified the spoofed domain.')
  else missed.push('The phishing email was never opened - the initial access vector went unverified.')

  if (state.investigated.endpointInspected) good.push('Inspected FIN-FINANCE-04 and found the malicious process and dropped file.')
  else missed.push('The compromised endpoint was never inspected directly.')

  if (state.investigated.threatIntelLookups.length > 0) good.push('Checked threat intelligence on the attacker\'s indicators.')
  else missed.push('No threat intelligence lookups were run on the IP or domain involved.')

  if (state.investigated.evidencePinned.length >= 4) good.push('Reconstructed most of the attack chain on the evidence board.')
  else if (state.investigated.evidencePinned.length > 0) missed.push('The evidence board was only partially built out.')
  else missed.push('No evidence was pinned to reconstruct the attack chain.')

  if (state.contained) good.push('Contained the incident before data left the network.')
  else if (state.breached) missed.push('Containment actions came after the attacker had already exfiltrated data.')
  else missed.push('The incident was not fully contained - not all critical response actions were taken.')

  return { good, missed }
}

export default function PerformanceReport() {
  const { state, dispatch } = useIncidentEngine()
  const score = computeScore(state)
  const { good, missed } = buildFeedback(state)

  return (
    <div className="min-h-screen bg-void px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <p className={`font-mono text-xs tracking-[0.3em] ${state.contained ? 'text-ok' : 'text-high'}`}>
            {state.contained ? 'INCIDENT CONTAINED' : state.breached ? 'INCIDENT RESOLVED - LATE CONTAINMENT' : 'INCIDENT RESOLVED'}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Analyst Performance</h1>
        </div>

        <Panel bodyClassName="p-5" className="mb-4">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-ink-dim">Overall Score</p>
              <p className="text-3xl font-semibold text-ink">{score.overall}%</p>
            </div>
            <span className="rounded-md border border-signal/30 bg-signal/10 px-3 py-1.5 text-[12px] font-medium text-signal">
              {score.rating}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {METRICS.map(([key, label]) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-ink-dim">{label}</span>
                  <span className="text-ink">{score[key]}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-line-soft">
                  <div className="h-1.5 rounded-full bg-signal" style={{ width: `${score[key]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2">
          <Panel title="What you did well" bodyClassName="p-4">
            <ul className="flex flex-col gap-2">
              {good.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-ink-dim">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-ok" />
                  {g}
                </li>
              ))}
              {good.length === 0 && <li className="text-[12px] text-ink-faint">Nothing recorded yet.</li>}
            </ul>
          </Panel>
          <Panel title="What you missed" bodyClassName="p-4">
            <ul className="flex flex-col gap-2">
              {missed.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-ink-dim">
                  <XCircle size={13} className="mt-0.5 shrink-0 text-critical" />
                  {m}
                </li>
              ))}
              {missed.length === 0 && <li className="text-[12px] text-ink-faint">Nothing - full marks.</li>}
            </ul>
          </Panel>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mx-auto mt-8 flex items-center gap-2 rounded-md border border-line px-4 py-2 text-[12px] text-ink-dim hover:text-ink"
        >
          <RotateCcw size={13} /> Replay the case
        </button>
      </div>
    </div>
  )
}
