import { useEffect, useRef, useState } from 'react'
import { Panel } from './ui'
import { siemLogs, threatIntel, incident, attackStages } from '../data/caseData'
import { useIncidentEngine } from '../state/IncidentEngine'

const HELP = `Available commands:
  search user=<name>            search SIEM logs by user
  investigate ip <address>      look up threat intel on an IP
  timeline incident <id>        load the attack timeline
  help                          show this list
  clear                         clear the terminal`

export default function Terminal() {
  const { state, dispatch } = useIncidentEngine()
  const [lines, setLines] = useState([
    { type: 'out', text: 'CASE:404 analyst terminal. Type "help" to see available commands.' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' })
  }, [lines])

  function run(cmd) {
    const trimmed = cmd.trim()
    if (!trimmed) return
    const out = [{ type: 'in', text: trimmed }]
    dispatch({ type: 'TERMINAL_USED' })

    if (trimmed === 'help') {
      out.push({ type: 'out', text: HELP })
    } else if (trimmed === 'clear') {
      setLines([])
      setInput('')
      return
    } else if (trimmed.startsWith('search user=')) {
      const user = trimmed.split('=')[1]
      const results = siemLogs.filter((l) => l.user.includes(user))
      out.push({ type: 'out', text: `Found ${results.length} results` })
      results.slice(0, 6).forEach((r) => out.push({ type: 'out', text: `  ${r.time}  ${r.event}  (${r.sourceIp})` }))
    } else if (trimmed.startsWith('investigate ip ')) {
      const ip = trimmed.replace('investigate ip ', '')
      const intel = threatIntel.ip[ip]
      dispatch({ type: 'THREAT_INTEL_LOOKUP', value: ip })
      if (intel) {
        out.push({ type: 'out', text: `Reputation: ${intel.reputation}` })
        out.push({ type: 'out', text: `Associated campaigns: ${intel.campaigns}` })
      } else {
        out.push({ type: 'out', text: 'No intelligence on record for this indicator.' })
      }
    } else if (trimmed.startsWith('timeline incident')) {
      const id = trimmed.split(' ').pop()
      if (id === incident.id) {
        const revealed = attackStages.slice(0, state.stageRevealCount)
        out.push({ type: 'out', text: `Timeline loaded (${revealed.length} events)` })
      } else {
        out.push({ type: 'out', text: `Incident ${id} not found or access restricted.` })
      }
    } else {
      out.push({ type: 'out', text: `Command not recognized. Type "help" for a list of commands.` })
    }

    setLines((prev) => [...prev, ...out])
    setInput('')
  }

  return (
    <Panel
      title="Analyst Terminal"
      action={<button onClick={() => setLines([])} className="text-[10px] text-ink-dim hover:text-ink">Clear</button>}
      className="h-full"
      bodyClassName="flex flex-col overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={l.type === 'in' ? 'text-signal' : 'whitespace-pre-wrap text-ink-dim'}>
            {l.type === 'in' && <span className="text-ink-faint">CASE404@SOC:~$ </span>}
            {l.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-1.5 border-t border-line-soft px-4 py-2.5">
        <span className="font-mono text-[11.5px] text-ink-faint">CASE404@SOC:~$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run(input)}
          className="flex-1 bg-transparent font-mono text-[11.5px] text-ink focus:outline-none"
          placeholder="type a command..."
          spellCheck={false}
        />
      </div>
    </Panel>
  )
}
