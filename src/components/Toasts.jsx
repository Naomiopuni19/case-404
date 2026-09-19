import { useEffect } from 'react'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function Toasts() {
  const { state, dispatch } = useIncidentEngine()

  useEffect(() => {
    if (state.toasts.length === 0) return
    const latest = state.toasts[state.toasts.length - 1]
    const t = setTimeout(() => dispatch({ type: 'DISMISS_TOAST', id: latest.id }), 5000)
    return () => clearTimeout(t)
  }, [state.toasts])

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {state.toasts.map((t) => {
        const Icon = t.tone === 'critical' ? AlertTriangle : CheckCircle2
        const tone = t.tone === 'critical' ? 'border-critical/40 bg-critical/10 text-critical' : 'border-ok/40 bg-ok/10 text-ok'
        return (
          <div key={t.id} className={`pointer-events-auto flex max-w-xs items-start gap-2 rounded-md border px-3 py-2.5 shadow-lg backdrop-blur-sm ${tone} bg-panel-raised/95`}>
            <Icon size={15} className="mt-0.5 shrink-0" />
            <p className="text-[12px] leading-snug text-ink">{t.text}</p>
          </div>
        )
      })}
    </div>
  )
}
