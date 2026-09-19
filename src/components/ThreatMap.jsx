import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

const NODES = [
  { x: 60, y: 60 }, { x: 120, y: 40 }, { x: 200, y: 70 },
  { x: 280, y: 45 }, { x: 340, y: 90 }, { x: 420, y: 55 },
  { x: 470, y: 100 }, { x: 90, y: 130 }, { x: 160, y: 160 },
  { x: 250, y: 140 }, { x: 380, y: 150 }, { x: 440, y: 180 },
  { x: 130, y: 210 }, { x: 300, y: 200 }, { x: 40, y: 170 },
]

const SOURCE_POS = { x: 100, y: 55 }
const DEST_POS = { x: 330, y: 175 }

export default function ThreatMap() {
  const { state } = useIncidentEngine()
  const { threatMapConfig } = state.caseData
  const flagged = state.contained ? 'CONTAINED' : state.breached ? 'ACTIVE - DATA LOSS' : 'ACTIVE'

  return (
    <Panel title="Global Threat Map" className="h-full">
      <div className="relative flex-1 overflow-hidden p-3">
        <svg viewBox="0 0 500 240" className="h-full w-full">
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="2" fill="#1C2532" />
          ))}

          <path
            d={`M ${SOURCE_POS.x} ${SOURCE_POS.y} Q ${(SOURCE_POS.x + DEST_POS.x) / 2} ${SOURCE_POS.y - 60}, ${DEST_POS.x} ${DEST_POS.y}`}
            fill="none"
            stroke={state.contained ? '#3FCB8C' : '#F0475C'}
            strokeWidth="1.5"
            className="flow-line"
            opacity="0.8"
          />

          <circle cx={SOURCE_POS.x} cy={SOURCE_POS.y} r="4" fill="#F0475C" className="pulse-dot" />
          <circle cx={SOURCE_POS.x} cy={SOURCE_POS.y} r="8" fill="none" stroke="#F0475C" strokeWidth="1" opacity="0.4" />
          <text x={SOURCE_POS.x + 10} y={SOURCE_POS.y + 3} fontSize="8" fill="#F0475C" fontFamily="IBM Plex Mono, monospace">
            {threatMapConfig.sourceIp}
          </text>

          <circle cx={DEST_POS.x} cy={DEST_POS.y} r="4" fill={state.contained ? '#3FCB8C' : '#35C4E8'} />
          <text x={DEST_POS.x + 10} y={DEST_POS.y + 3} fontSize="8" fill="#8B98AC" fontFamily="IBM Plex Mono, monospace">
            {threatMapConfig.destHostname}
          </text>
        </svg>

        <div className="absolute right-4 top-1 w-44 rounded-md border border-critical/30 bg-panel-raised/95 p-2.5 shadow-lg">
          <p className="text-[10px] font-semibold text-critical">Suspicious Connection</p>
          <dl className="mt-1.5 space-y-0.5 text-[10px] text-ink-dim">
            <div className="flex justify-between"><dt>Source</dt><dd className="font-mono text-ink">{threatMapConfig.sourceIp}</dd></div>
            <div className="flex justify-between"><dt>Destination</dt><dd className="font-mono text-ink">{threatMapConfig.destInternalIp}</dd></div>
            <div className="flex justify-between"><dt>Type</dt><dd className="text-ink">HTTPS</dd></div>
            <div className="flex justify-between"><dt>Status</dt><dd className={state.contained ? 'text-ok' : 'text-critical'}>{flagged}</dd></div>
          </dl>
        </div>
      </div>
    </Panel>
  )
}