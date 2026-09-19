import { useState } from 'react'
import { Pause, Play, KeyRound, Terminal as TerminalIcon, Network, FileText, Mail, Upload } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

const ICONS = {
  AUTHENTICATION: KeyRound,
  ENDPOINT: TerminalIcon,
  NETWORK: Network,
  'FILE ACCESS': FileText,
  EMAIL: Mail,
}

const SEVERITY_COLOR = {
  critical: 'text-critical',
  high: 'text-high',
  medium: 'text-medium',
  low: 'text-ink-dim',
}

export default function LiveEventStream() {
  const { state } = useIncidentEngine()
  const [paused, setPaused] = useState(false)
  const events = paused ? state.events : state.events
  const ordered = [...events].reverse()

  return (
    <Panel
      title="Live Event Stream"
      action={
        <button onClick={() => setPaused((p) => !p)} className="flex items-center gap-1 text-[10px] text-ink-dim hover:text-ink">
          {paused ? <Play size={11} /> : <Pause size={11} />}
          {paused ? 'Resume' : 'Pause'}
        </button>
      }
      className="h-full"
      bodyClassName="overflow-y-auto"
    >
      {ordered.map((e, i) => {
        const Icon = ICONS[e.category] || Upload
        return (
          <div key={`${e.time}-${i}`} className="flex gap-2.5 border-b border-line-soft px-4 py-2.5">
            <div className="mt-0.5 font-mono text-[10px] text-ink-faint">{e.time}</div>
            <Icon size={13} className={`mt-0.5 shrink-0 ${SEVERITY_COLOR[e.severity]}`} />
            <div className="min-w-0">
              <p className={`text-[10px] font-semibold tracking-wide ${SEVERITY_COLOR[e.severity]}`}>{e.category}</p>
              <p className="text-[12px] text-ink">{e.summary}</p>
              <p className="truncate text-[10px] text-ink-faint">{e.detail}</p>
            </div>
          </div>
        )
      })}
    </Panel>
  )
}
