import { Pin } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function EvidenceBoard() {
  const { state, dispatch } = useIncidentEngine()
  const { evidencePieces } = state.caseData
  const pinned = state.investigated.evidencePinned

  return (
    <Panel title="Evidence Board" className="h-full" bodyClassName="overflow-y-auto p-3">
      <div className="flex flex-col gap-1.5">
        {evidencePieces.map((e, i) => {
          const isPinned = pinned.includes(e.id)
          const parentPinned = !e.connectsTo || pinned.includes(e.connectsTo)
          return (
            <div key={e.id}>
              {i > 0 && <div className="ml-3 h-2.5 w-px bg-line" />}
              <button
                onClick={() => dispatch({ type: 'PIN_EVIDENCE', id: e.id })}
                disabled={isPinned}
                className={`flex w-full items-center gap-2.5 rounded-md border px-3 py-2 text-left transition ${
                  isPinned
                    ? 'border-signal/40 bg-signal/10'
                    : parentPinned
                    ? 'border-line bg-panel-raised hover:border-signal/30'
                    : 'border-line-soft bg-panel-raised/40 opacity-50'
                }`}
              >
                <Pin size={12} className={isPinned ? 'text-signal' : 'text-ink-faint'} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-ink">{e.label}</p>
                  <p className="text-[10px] text-ink-faint">via {e.source}</p>
                </div>
              </button>
            </div>
          )
        })}
      </div>
      {pinned.length === evidencePieces.length && (
        <p className="mt-3 rounded-md border border-ok/30 bg-ok/10 px-3 py-2 text-[11px] text-ok">
          Full attack chain reconstructed, from initial access to the final stage.
        </p>
      )}
    </Panel>
  )
}