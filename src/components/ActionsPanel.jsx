import { UserX, MonitorX, ShieldOff, RotateCcw, KeyRound, ArrowUpCircle, FileCheck2 } from 'lucide-react'
import { Panel } from './ui'
import { actionsCatalog } from '../data/caseData'
import { useIncidentEngine } from '../state/IncidentEngine'

const ICONS = {
  'disable-account': UserX,
  'isolate-endpoint': MonitorX,
  'block-ip': ShieldOff,
  'revoke-session': RotateCcw,
  'reset-credentials': KeyRound,
  escalate: ArrowUpCircle,
}

const TONE_STYLE = {
  'critical-response': 'border-critical/30 hover:border-critical/50 hover:bg-critical/5',
  supporting: 'border-signal/30 hover:border-signal/50 hover:bg-signal/5',
  escalation: 'border-line hover:border-ink-faint/50 hover:bg-panel-raised',
}

export default function ActionsPanel() {
  const { state, dispatch } = useIncidentEngine()

  return (
    <Panel title="Actions" className="h-full" bodyClassName="overflow-y-auto p-3">
      <div className="flex flex-col gap-1.5">
        {actionsCatalog.map((a) => {
          const Icon = ICONS[a.id]
          const taken = state.actionsTaken.some((t) => t.id === a.id)
          return (
            <button
              key={a.id}
              disabled={taken}
              onClick={() => dispatch({ type: 'TAKE_ACTION', id: a.id })}
              className={`flex items-center gap-2.5 rounded-md border px-3 py-2 text-left transition ${
                taken ? 'border-line-soft bg-panel-raised/40 opacity-50' : TONE_STYLE[a.kind]
              }`}
            >
              <Icon size={14} className={taken ? 'text-ink-faint' : 'text-ink-dim'} />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-ink">{a.label}</p>
                {a.target && <p className="truncate text-[10px] text-ink-faint">{a.target}</p>}
              </div>
              {taken && <span className="text-[10px] text-ok">Done</span>}
            </button>
          )
        })}

        <button
          onClick={() => dispatch({ type: 'GO_TO', view: 'report' })}
          className="mt-2 flex items-center justify-center gap-2 rounded-md bg-signal py-2 text-[12px] font-medium text-void hover:bg-signal/90"
        >
          <FileCheck2 size={14} />
          Write Incident Report
        </button>
      </div>
    </Panel>
  )
}
