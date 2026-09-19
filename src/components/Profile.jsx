import { ArrowLeft, ShieldAlert, LogOut, Briefcase, Wallet, CheckCircle2 } from "lucide-react"
import { useAuth } from "../state/AuthContext"
import { useIncidentEngine } from "../state/IncidentEngine"

const CASE_LABELS = {
  "INC-0042": "The Midnight Login",
  "INC-0043": "Silent Spread",
}

export default function Profile() {
  const { profile, logOut } = useAuth()
  const { dispatch } = useIncidentEngine()

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void text-sm text-ink-dim">
        Loading profile...
      </div>
    )
  }

  const solved = profile.casesSolved || []

  return (
    <div className="min-h-screen bg-void text-ink">
      <header className="flex items-center justify-between border-b border-line px-8 py-4 md:px-16">
        <div className="flex items-center gap-2.5">
          <ShieldAlert size={16} className="text-signal" />
          <span className="font-mono text-sm font-semibold tracking-[0.2em] text-ink">CASE:404 PROFILE</span>
        </div>
        <button
          onClick={() => dispatch({ type: "GO_TO", view: "landing" })}
          className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs text-ink-dim transition hover:bg-panel hover:text-ink"
        >
          <ArrowLeft size={13} />
          Back
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10 md:px-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{profile.email}</p>
        <h1 className="mt-1.5 text-2xl font-semibold text-ink">Analyst Profile</h1>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-panel/70 p-5">
            <div className="flex items-center gap-2 text-ink-faint">
              <Briefcase size={14} />
              <p className="text-[11px] font-semibold tracking-wide">ROLE</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-ink">{profile.role}</p>
          </div>

          <div className="rounded-lg border border-line bg-panel/70 p-5">
            <div className="flex items-center gap-2 text-ink-faint">
              <Wallet size={14} />
              <p className="text-[11px] font-semibold tracking-wide">BALANCE</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-ok">GHS {profile.balance.toLocaleString()}</p>
          </div>

          <div className="rounded-lg border border-line bg-panel/70 p-5">
            <div className="flex items-center gap-2 text-ink-faint">
              <CheckCircle2 size={14} />
              <p className="text-[11px] font-semibold tracking-wide">CASES SOLVED</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-ink">{solved.length}</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-line bg-panel/70 p-5">
          <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink-faint">CASE HISTORY</p>
          {solved.length === 0 ? (
            <p className="text-[13px] text-ink-dim">No cases solved yet. Head back to the SOC console to start your first incident.</p>
          ) : (
            <ul className="space-y-2">
              {solved.map((caseId) => (
                <li key={caseId} className="flex items-center justify-between rounded-md border border-line-soft bg-panel px-3 py-2">
                  <span className="text-[13px] text-ink">{CASE_LABELS[caseId] || caseId}</span>
                  <span className="font-mono text-[10px] text-ink-faint">{caseId}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={logOut}
          className="mt-8 flex items-center gap-2 rounded-md border border-line px-4 py-2 text-[13px] text-ink-dim transition hover:bg-panel hover:text-critical"
        >
          <LogOut size={14} />
          Log Out
        </button>
      </main>
    </div>
  )
}