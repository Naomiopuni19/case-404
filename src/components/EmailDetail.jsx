import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Panel } from './ui'
import { email } from '../data/caseData'
import { useIncidentEngine } from '../state/IncidentEngine'

export default function EmailDetail() {
  const { dispatch } = useIncidentEngine()

  useEffect(() => {
    dispatch({ type: 'EMAIL_INSPECTED' })
  }, [])

  return (
    <div className="mx-auto max-w-2xl">
      <Panel title="Email Investigation" bodyClassName="p-5">
        <dl className="space-y-2 border-b border-line-soft pb-4 text-[12px]">
          <div className="flex gap-2"><dt className="w-16 shrink-0 text-ink-faint">From</dt><dd className="font-mono text-critical">{email.from}</dd></div>
          <div className="flex gap-2"><dt className="w-16 shrink-0 text-ink-faint">To</dt><dd className="font-mono text-ink">{email.to}</dd></div>
          <div className="flex gap-2"><dt className="w-16 shrink-0 text-ink-faint">Subject</dt><dd className="text-ink">{email.subject}</dd></div>
          <div className="flex gap-2"><dt className="w-16 shrink-0 text-ink-faint">Received</dt><dd className="font-mono text-ink-dim">{email.received}</dd></div>
        </dl>

        <p className="mt-4 whitespace-pre-line text-[12px] leading-relaxed text-ink-dim">{email.body}</p>

        <div className="mt-5">
          <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-critical">
            <AlertTriangle size={11} /> SUSPICIOUS ELEMENTS
          </p>
          <div className="flex flex-col gap-2">
            {email.suspiciousElements.map((s) => (
              <div key={s.label} className="rounded-md border border-critical/25 bg-critical/5 px-3 py-2">
                <p className="text-[11px] font-medium text-ink">{s.label}</p>
                <p className="text-[11px] text-ink-dim">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  )
}
