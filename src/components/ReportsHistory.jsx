import { FileText, ArrowRight } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

const FIELD_LABELS = {
  incidentType: 'Incident Type',
  initialAccess: 'Initial Access',
  affectedUsers: 'Affected Users',
  affectedSystems: 'Affected Systems',
  iocs: 'Indicators of Compromise',
  timeline: 'Attack Timeline',
  rootCause: 'Root Cause',
  actionsTaken: 'Actions Taken',
  recommendations: 'Recommendations',
}

export default function ReportsHistory() {
  const { state, dispatch } = useIncidentEngine()
  const report = state.report
  const incident = state.caseData.incident

  if (!report) {
    return (
      <div className="mx-auto max-w-md pt-16 text-center">
        <FileText size={22} className="mx-auto mb-3 text-ink-faint" />
        <p className="text-sm text-ink-dim">No report has been submitted for this incident yet.</p>
        <p className="mt-1 text-[12px] text-ink-faint">
          Once you've investigated {incident.id}, write it up to see it here.
        </p>
        <button
          onClick={() => dispatch({ type: 'GO_TO', view: 'report' })}
          className="mx-auto mt-5 flex items-center gap-1.5 rounded-md bg-signal px-4 py-2 text-[12px] font-medium text-void hover:bg-signal/90"
        >
          Write Incident Report <ArrowRight size={13} />
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Panel title={`Submitted Report - ${incident.id}`} bodyClassName="p-5">
        <div className="flex flex-col gap-4">
          {Object.entries(FIELD_LABELS).map(([key, label]) => (
            <div key={key}>
              <p className="mb-1 text-[10px] font-semibold tracking-wide text-ink-dim">{label.toUpperCase()}</p>
              <p className="whitespace-pre-line text-[12.5px] text-ink">
                {report[key]?.trim() ? report[key] : <span className="text-ink-faint">Not provided</span>}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}