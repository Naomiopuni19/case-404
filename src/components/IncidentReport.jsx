import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

const FIELDS = [
  { key: 'incidentType', label: 'Incident Type', placeholder: 'e.g. Ransomware outbreak via malicious attachment' },
  { key: 'initialAccess', label: 'Initial Access', placeholder: 'How did the attacker get in?' },
  { key: 'affectedUsers', label: 'Affected Users', placeholder: 'Who was impacted?' },
  { key: 'affectedSystems', label: 'Affected Systems', placeholder: 'Which hosts or services?' },
  { key: 'iocs', label: 'Indicators of Compromise', placeholder: 'IPs, domains, hashes' },
  { key: 'timeline', label: 'Attack Timeline', placeholder: 'Summarize the sequence of events' },
  { key: 'rootCause', label: 'Root Cause', placeholder: 'What made this possible?' },
  { key: 'actionsTaken', label: 'Actions Taken', placeholder: 'What did you do to contain it?' },
  { key: 'recommendations', label: 'Recommendations', placeholder: 'What should change going forward?' },
]

export default function IncidentReport() {
  const { state, dispatch } = useIncidentEngine()
  const [report, setReport] = useState(Object.fromEntries(FIELDS.map((f) => [f.key, ''])))

  function update(key, value) {
    setReport((r) => ({ ...r, [key]: value }))
  }

  function submit() {
    dispatch({ type: 'SUBMIT_REPORT', report })
  }

  return (
    <div className="min-h-screen bg-void px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => dispatch({ type: 'GO_TO', view: 'soc' })}
          className="mb-4 flex items-center gap-1.5 text-[12px] text-ink-dim hover:text-ink"
        >
          <ArrowLeft size={13} /> Back to SOC
        </button>

        <Panel title={`Incident Report - ${state.caseData.incident.id}`} bodyClassName="p-5">
          <div className="flex flex-col gap-4">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-ink-dim">{f.label}</label>
                <textarea
                  value={report[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={f.key === 'timeline' ? 3 : 2}
                  className="w-full resize-none rounded-md border border-line bg-panel px-3 py-2 text-[12.5px] text-ink placeholder:text-ink-faint focus:border-signal/50 focus:outline-none"
                />
              </div>
            ))}

            <button
              onClick={submit}
              className="mt-2 rounded-md bg-signal py-2.5 text-[13px] font-medium text-void hover:bg-signal/90"
            >
              Submit report
            </button>
          </div>
        </Panel>
      </div>
    </div>
  )
}