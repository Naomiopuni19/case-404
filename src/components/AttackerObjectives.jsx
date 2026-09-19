import { Check } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function AttackerObjectives() {
  const { state } = useIncidentEngine()
  const { objectives } = state.caseData

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