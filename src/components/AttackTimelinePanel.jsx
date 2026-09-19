import { Mail, MousePointerClick, KeyRound, LogIn, TerminalSquare, FileText, UploadCloud } from 'lucide-react'
import { Panel } from './ui'
import { attackStages, useIncidentEngine } from '../state/IncidentEngine'

const ICONS = {
  mail: Mail, cursor: MousePointerClick, key: KeyRound, login: LogIn,
  terminal: TerminalSquare, file: FileText, upload: UploadCloud,
}

export default function AttackTimelinePanel() {
  const { state } = useIncidentEngine()
  const revealed = attackStages.slice(0, state.stageRevealCount)

  return (
    <Panel title="Attack Timeline" className="h-full" bodyClassName="overflow-y-auto p-3">
      <div className="flex flex-col">
        {revealed.map((s, i) => {
          const Icon = ICONS[s.icon] || FileText
          const isLast = i === revealed.length - 1
          const critical = s.id === 'powershell' || s.id === 'exfil'
          return (
            <div key={s.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  critical ? 'border-critical/40 bg-critical/10 text-critical' : 'border-signal/40 bg-signal/10 text-signal'
                }`}>
                  <Icon size={12} />
                </div>
                {!isLast && <div className="w-px flex-1 bg-line" />}
              </div>
              <div className="pb-4">
                <p className="font-mono text-[10px] text-ink-faint">{s.time}</p>
                <p className="text-[12px] text-ink">{s.label}</p>
              </div>
            </div>
          )
        })}
        {state.contained && (
          <p className="rounded-md border border-ok/30 bg-ok/10 px-3 py-2 text-[11px] text-ok">
            Attack chain broken. Remaining stages did not occur.
          </p>
        )}
      </div>
    </Panel>
  )
}
