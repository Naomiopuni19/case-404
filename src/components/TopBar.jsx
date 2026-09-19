import { useEffect, useState } from 'react'
import { Search, Bell } from 'lucide-react'
import { StatusDot } from './ui'

const SIM_START_SECONDS = 3 * 3600 + 9 * 60 // 03:09:00

function formatClock(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600) % 24
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

export default function TopBar() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const time = formatClock(SIM_START_SECONDS + elapsed)

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-line bg-abyss px-5">
      <div className="hidden shrink-0 items-center gap-2 border-r border-line-soft pr-4 lg:flex">
        <span className="font-mono text-[13px] font-semibold tracking-[0.08em] text-ink">A.F.I.A.</span>
        <span className="rounded bg-panel-raised px-1.5 py-0.5 text-[10px] text-ink-dim">Finance</span>
      </div>
      <div className="flex max-w-md flex-1 items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5">
        <Search size={14} className="text-ink-faint" />
        <input
          placeholder="Search users, IPs, domains, events..."
          className="w-full bg-transparent text-[13px] text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">Ctrl K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-5 text-[12px] text-ink-dim">
        <div className="flex items-center gap-1.5">
          <StatusDot tone="ok" pulse />
          <span className="tracking-wide">SOC ONLINE</span>
        </div>
        <span className="hidden font-mono text-ink-faint sm:inline">SIM {time}</span>
        <Bell size={15} className="text-ink-faint" />
        <div className="flex items-center gap-2 border-l border-line-soft pl-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-signal/20 font-mono text-[11px] font-semibold text-signal">
            NO
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-[12px] text-ink">Naomi Opuni</p>
            <p className="text-[10px] text-ink-faint">SOC Analyst</p>
          </div>
        </div>
      </div>
    </header>
  )
}