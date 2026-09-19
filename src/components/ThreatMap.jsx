import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

// Abstract node field standing in for a world map - deliberately stylized
// rather than literal cartography, in keeping with the console aesthetic.
const NODES = [
  { x: 60, y: 60, tone: 'faint' }, { x: 120, y: 40, tone: 'faint' }, { x: 200, y: 70, tone: 'faint' },
  { x: 280, y: 45, tone: 'faint' }, { x: 340, y: 90, tone: 'faint' }, { x: 420, y: 55, tone: 'faint' },
  { x: 470, y: 100, tone: 'faint' }, { x: 90, y: 130, tone: 'faint' }, { x: 160, y: 160, tone: 'faint' },
  { x: 250, y: 140, tone: 'faint' }, { x: 380, y: 150, tone: 'faint' }, { x: 440, y: 180, tone: 'faint' },
  { x: 130, y: 210, tone: 'faint' }, { x: 300, y: 200, tone: 'faint' }, { x: 40, y: 170, tone: 'faint' },
]

const SOURCE = { x: 100, y: 55, label: 'Source' }
const DEST = { x: 330, y: 175, label: 'FIN-FINANCE-04' }

export default function ThreatMap() {
  const { state } = useIncidentEngine()
  const flagged = state.contained ? 'CONTAINED' : state.breached ? 'ACTIVE - DATA LOSS' : 'ACTIVE'

  return (
    <Panel title="Global Threat Map" className="h-full">
      <div className="relative flex-1 overflow-hidden p-3">
        <svg viewBox="0 0 500 240" className="h-full w-full">
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="2" fill="#1C2532" />
          ))}

          <path
            d={`M ${SOURCE.x} ${SOURCE.y} Q ${(SOURCE.x + DEST.x) / 2} ${SOURCE.y - 60}, ${DEST.x} ${DEST.y}`}
            fill="none"
            stroke={state.contained ? '#3FCB8C' : '#F0475C'}
            strokeWidth="1.5"
            className="flow-line"
            opacity="0.8"
          />

          <circle cx={SOURCE.x} cy={SOURCE.y} r="4" fill="#F0475C" className="pulse-dot" />
          <circle cx={SOURCE.x} cy={SOURCE.y} r="8" fill="none" stroke="#F0475C" strokeWidth="1" opacity="0.4" />
          <text x={SOURCE.x + 10} y={SOURCE.y + 3} fontSize="8" fill="#F0475C" fontFamily="IBM Plex Mono, monospace">
            185.232.41.77
          </text>

          <circle cx={DEST.x} cy={DEST.y} r="4" fill={state.contained ? '#3FCB8C' : '#35C4E8'} />
          <text x={DEST.x + 10} y={DEST.y + 3} fontSize="8" fill="#8B98AC" fontFamily="IBM Plex Mono, monospace">
            {DEST.label}
          </text>
        </svg>

        <div className="absolute right-4 top-1 w-44 rounded-md border border-critical/30 bg-panel-raised/95 p-2.5 shadow-lg">
          <p className="text-[10px] font-semibold text-critical">Suspicious Connection</p>
          <dl className="mt-1.5 space-y-0.5 text-[10px] text-ink-dim">
            <div className="flex justify-between"><dt>Source</dt><dd className="font-mono text-ink">185.232.41.77</dd></div>
            <div className="flex justify-between"><dt>Destination</dt><dd className="font-mono text-ink">10.20.4.18</dd></div>
            <div className="flex justify-between"><dt>Type</dt><dd className="text-ink">HTTPS</dd></div>
            <div className="flex justify-between"><dt>Status</dt><dd className={state.contained ? 'text-ok' : 'text-critical'}>{flagged}</dd></div>
          </dl>
        </div>
      </div>
    </Panel>
  )
}
