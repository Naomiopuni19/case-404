import {
  LayoutDashboard, Siren, Database, Network, Monitor, Mail,
  ShieldAlert, FolderClosed, FileBarChart, UserCircle,
} from "lucide-react"
import { useIncidentEngine } from "../state/IncidentEngine"

const NAV = [
  { id: "overview", label: "SOC Dashboard", icon: LayoutDashboard },
  { id: "incidents", label: "Incidents", icon: Siren, badge: 2 },
  { id: "siem", label: "SIEM", icon: Database },
  { id: "network", label: "Network Monitor", icon: Network },
  { id: "endpoints", label: "Endpoints", icon: Monitor },
  { id: "email", label: "Email Analysis", icon: Mail },
  { id: "intel", label: "Threat Intelligence", icon: ShieldAlert },
  { id: "files", label: "Case Files", icon: FolderClosed },
  { id: "reports", label: "Reports", icon: FileBarChart },
]

export default function Sidebar() {
  const { state, dispatch } = useIncidentEngine()

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-line bg-abyss px-3 py-4 md:flex">
      <div className="flex items-center gap-2 px-2 pb-6">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-signal/15">
          <ShieldAlert size={15} className="text-signal" />
        </div>
        <div>
          <p className="font-mono text-[13px] font-semibold tracking-[0.15em] text-ink">CASE:404</p>
          <p className="text-[9px] tracking-wide text-ink-faint">Cybersecurity Ops Simulator</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = state.activePanel === item.id
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: "SET_PANEL", panel: item.id })}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] transition ${
                active ? "bg-panel-raised text-ink" : "text-ink-dim hover:bg-panel/60 hover:text-ink"
              }`}
            >
              <Icon size={15} className={active ? "text-signal" : ""} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded bg-critical/20 px-1.5 py-0.5 text-[10px] font-semibold text-critical">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        <button
          onClick={() => dispatch({ type: "GO_TO", view: "profile" })}
          className="mt-1 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-ink-dim transition hover:bg-panel/60 hover:text-ink"
        >
          <UserCircle size={15} />
          <span className="flex-1">My Profile</span>
        </button>
      </nav>

      <div className="mt-6 border-t border-line-soft pt-4 px-2">
        <p className="font-mono text-sm font-semibold tracking-[0.1em] text-ink">A.F.I.A.</p>
        <p className="mt-1 text-[11px] leading-snug text-ink-dim">Advanced Financial Intelligence &amp; Analytics</p>
        <p className="mt-2 text-[10px] text-ink-faint">Secure today. Stronger tomorrow.</p>
      </div>
    </aside>
  )
}