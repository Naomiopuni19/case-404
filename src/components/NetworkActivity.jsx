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

const BOTTOM_ICONS = [Server, Database]

export default function NetworkActivity() {
  const { state } = useIncidentEngine()
  const { networkTopology } = state.caseData
  const lineTone = state.contained ? 'stroke-ok' : 'stroke-critical'

  return (
    <Panel title="Network Activity" className="h-full">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
        <div className="flex items-center gap-3">
          <NodeBox icon={User} label={networkTopology.user.label} sub={networkTopology.user.sub} />
          <svg width="28" height="2"><line x1="0" y1="1" x2="28" y2="1" className={lineTone} strokeWidth="1.5" /></svg>
          <NodeBox
            icon={Monitor}
            label={networkTopology.primary.label}
            sub={state.contained ? networkTopology.primary.subContained : networkTopology.primary.subCompromised}
            tone="compromised"
          />
          <svg width="28" height="2"><line x1="0" y1="1" x2="28" y2="1" className={lineTone} strokeWidth="1.5" strokeDasharray="3 3" /></svg>
          <NodeBox icon={Globe} label={networkTopology.external.label} sub={networkTopology.external.sub} tone="external" />
        </div>
        <svg width="2" height="20"><line x1="1" y1="0" x2="1" y2="20" className="stroke-line" strokeWidth="1.5" strokeDasharray="2 2" /></svg>
        <div className="flex items-center gap-3">
          {networkTopology.bottom.map((node, i) => {
            const Icon = BOTTOM_ICONS[i] || Server
            return <NodeBox key={node.label} icon={Icon} label={node.label} sub={node.sub} />
          })}
        </div>
      </div>
    </Panel>
  )
}