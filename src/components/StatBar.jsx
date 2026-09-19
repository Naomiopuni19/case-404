import { ShieldAlert, AlertTriangle, Circle, Info, TrendingUp } from 'lucide-react'

const stats = [
  { icon: ShieldAlert, tone: 'text-critical', bg: 'bg-critical/10', value: '1', label: 'Critical Incidents' },
  { icon: AlertTriangle, tone: 'text-high', bg: 'bg-high/10', value: '7', label: 'High Priority' },
  { icon: Circle, tone: 'text-medium', bg: 'bg-medium/10', value: '12', label: 'Medium Priority' },
  { icon: Info, tone: 'text-signal', bg: 'bg-signal/10', value: '28', label: 'Low / Info' },
]

export default function StatBar() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <div key={s.label} className="flex items-center gap-3 rounded-lg border border-line bg-panel/70 px-4 py-3.5">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${s.bg}`}>
              <Icon size={16} className={s.tone} />
            </div>
            <div>
              <p className="text-xl font-semibold leading-none text-ink">{s.value}</p>
              <p className="mt-1 text-[11px] text-ink-dim">{s.label}</p>
            </div>
          </div>
        )
      })}
      <div className="col-span-2 flex items-center justify-between rounded-lg border border-line bg-panel/70 px-4 py-3.5 lg:col-span-1">
        <div>
          <p className="text-[11px] text-ink-dim">Total Events (24h)</p>
          <p className="mt-1 text-lg font-semibold leading-none text-ink">1,248,903</p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-ok">
          <TrendingUp size={13} />
          12%
        </div>
      </div>
    </div>
  )
}
