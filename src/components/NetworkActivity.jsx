import { User, Monitor, Globe, Server, Database } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

function NodeBox({ icon: Icon, label, sub, tone = 'default' }) {
  const toneStyles = {
    default: 'border-line text-ink-dim',
    compromised: 'border-critical/50 text-critical bg-critical/5',
    external: 'border-critical/50 text-critical bg-critical/5',
  }
  return (
    <div className={`flex w-28 flex-col items-center gap-1 rounded-md border px-2 py-2.5 text-center ${toneStyles[tone]}`}>
      <Icon size={16} />
      <p className="text-[10px] font-medium text-ink">{label}</p>
      {sub && <p className="text-[9px] text-ink-faint">{sub}</p>}
    </div>
  )
}

export default function NetworkActivity() {
  const { state } = useIncidentEngine()
  const lineTone = state.contained ? 'stroke-ok' : 'stroke-critical'

  return (
    <Panel title="Network Activity" className="h-full">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
        <div className="flex items-center gap-3">
          <NodeBox icon={User} label="s.mensah" sub="User" />
          <svg width="28" height="2"><line x1="0" y1="1" x2="28" y2="1" className={lineTone} strokeWidth="1.5" /></svg>
          <NodeBox icon={Monitor} label="FIN-FINANCE-04" sub={state.contained ? 'Isolated' : 'Compromised'} tone="compromised" />
          <svg width="28" height="2"><line x1="0" y1="1" x2="28" y2="1" className={lineTone} strokeWidth="1.5" strokeDasharray="3 3" /></svg>
          <NodeBox icon={Globe} label="185.232.41.77" sub="External IP" tone="external" />
        </div>
        <svg width="2" height="20"><line x1="1" y1="0" x2="1" y2="20" className="stroke-line" strokeWidth="1.5" strokeDasharray="2 2" /></svg>
        <div className="flex items-center gap-3">
          <NodeBox icon={Server} label="File Server" sub="10.20.10.12" />
          <NodeBox icon={Database} label="Database" sub="10.20.20.8" />
        </div>
      </div>
    </Panel>
  )
}
