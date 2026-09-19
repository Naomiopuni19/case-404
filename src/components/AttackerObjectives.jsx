import { Check } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine, attackStages } from '../state/IncidentEngine'

const objectives = [
  { n: 1, title: 'Initial Access', sub: 'Phishing / Credential Theft', throughStage: 3 },
  { n: 2, title: 'Privilege Escalation', sub: 'Exploit vulnerable service', throughStage: 4 },
  { n: 3, title: 'Lateral Movement', sub: 'Internal network discovery', throughStage: 4 },
  { n: 4, title: 'Data Access', sub: 'Financial records / Payroll', throughStage: 5 },
  { n: 5, title: 'Exfiltration', sub: 'External transfer', throughStage: 6 },
]

export default function AttackerObjectives() {
  const { state } = useIncidentEngine()

  return (
    <Panel title="Top Attacker Objectives" className="h-full" bodyClassName="overflow-y-auto p-3">
      <div className="flex flex-col gap-1">
        {objectives.map((o) => {
          const done = state.stageRevealCount - 1 >= o.throughStage && !(o.n === 5 && state.contained)
          return (
            <div key={o.n} className="flex items-start gap-3 rounded-md px-2 py-2">
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${
                done ? 'border-critical/40 bg-critical/10 text-critical' : 'border-line text-ink-faint'
              }`}>
                {done ? <Check size={11} /> : o.n}
              </div>
              <div>
                <p className="text-[12px] font-medium text-ink">{o.title}</p>
                <p className="text-[11px] text-ink-faint">{o.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
