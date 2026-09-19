import { useEffect } from 'react'
import { Monitor, AlertTriangle } from 'lucide-react'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

function EndpointCard({ endpoint }) {
  const compromised = endpoint.status === 'compromised'
  return (
    <Panel
      title={endpoint.hostname}
      action={
        <span className={`flex items-center gap-1 text-[10px] font-semibold ${compromised ? 'text-critical' : 'text-high'}`}>
          <AlertTriangle size={11} /> {compromised ? 'COMPROMISED' : 'AT RISK'}
        </span>
      }
      bodyClassName="p-5"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${compromised ? 'bg-critical/10 text-critical' : 'bg-high/10 text-high'}`}>
          <Monitor size={18} />
        </div>
        <div>
          <p className="text-sm text-ink">{endpoint.user}</p>
          <p className="text-[11px] text-ink-faint">Primary user</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <p className="mb-2 text-[10px] font-semibold tracking-wide text-ink-dim">PROCESSES</p>
          <ul className="space-y-1.5">
            {endpoint.processes.map((p) => (
              <li key={p.name} className={`font-mono text-[11px] ${p.malicious ? 'text-critical' : 'text-ink-dim'}`}>
                {p.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold tracking-wide text-ink-dim">NETWORK CONNECTIONS</p>
          <ul className="space-y-1.5">
            {endpoint.connections.map((c) => (
              <li key={c.ip} className={`font-mono text-[11px] ${c.malicious ? 'text-critical' : 'text-ink-dim'}`}>
                {c.ip}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold tracking-wide text-ink-dim">RECENT FILES</p>
          <ul className="space-y-1.5">
            {endpoint.files.map((f) => (
              <li key={f.name} className={`truncate font-mono text-[11px] ${f.malicious ? 'text-critical' : 'text-ink-dim'}`}>
                {f.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  )
}

export default function EndpointDetail() {
  const { state, dispatch } = useIncidentEngine()
  const { endpoints } = state.caseData

  useEffect(() => {
    dispatch({ type: 'ENDPOINT_INSPECTED' })
  }, [])

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {endpoints.map((ep) => (
        <EndpointCard key={ep.hostname} endpoint={ep} />
      ))}
    </div>
  )
}