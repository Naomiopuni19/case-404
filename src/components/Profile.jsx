import { LogOut, ArrowLeft, Wallet, Award, User } from "lucide-react"
import { useAuth } from "../state/AuthContext"
import { useIncidentEngine } from "../state/IncidentEngine"

const CASE_LABELS = {
  "INC-0042": "The Midnight Login",
  "INC-0043": "Silent Spread",
}

export default function Profile() {
  const { profile, logOut } = useAuth()
  const { dispatch } = useIncidentEngine()

  if (!profile) return null

  const cp = profile.candidateProfile

  return (
    <div className="min-h-screen bg-void px-6 py-10 text-ink">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => dispatch({ type: "GO_TO", view: "landing" })}
          className="flex items-center gap-2 text-sm text-ink-dim transition hover:text-ink"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-signal/15">
            <User size={24} className="text-signal" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">{cp?.fullName || profile.email}</h1>
            <p className="text-sm text-ink-dim">{profile.role}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-line bg-panel/70 p-4">
            <div className="flex items-center gap-2 text-ink-dim">
              <Wallet size={14} />
              <span className="text-[11px] tracking-wide">BALANCE</span>
            </div>
            <p className="mt-2 text-lg font-semibold">GHS {profile.balance}</p>
          </div>
          <div className="rounded-lg border border-line bg-panel/70 p-4">
            <div className="flex items-center gap-2 text-ink-dim">
              <Award size={14} />
              <span className="text-[11px] tracking-wide">CASES SOLVED</span>
            </div>
            <p className="mt-2 text-lg font-semibold">{profile.casesSolved.length}</p>
          </div>
        </div>

        {cp && (
          <div className="mt-8 rounded-lg border border-line bg-panel/70 p-5">
            <h2 className="text-[11px] font-semibold tracking-wide text-ink-dim">EMPLOYEE DETAILS</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[11px] text-ink-faint">Phone</p>
                <p className="mt-0.5 text-ink">{cp.phone}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-faint">Location</p>
                <p className="mt-0.5 text-ink">{cp.location}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-faint">Role Interest</p>
                <p className="mt-0.5 text-ink">{cp.roleInterest}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-faint">Education</p>
                <p className="mt-0.5 text-ink">{cp.education}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-faint">Field of Study</p>
                <p className="mt-0.5 text-ink">{cp.fieldOfStudy}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-faint">Graduation Year</p>
                <p className="mt-0.5 text-ink">{cp.graduationYear}</p>
              </div>
            </div>
            {cp.skills?.length > 0 && (
              <div className="mt-4">
                <p className="text-[11px] text-ink-faint">Skills</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-dim"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 rounded-lg border border-line bg-panel/70 p-5">
          <h2 className="text-[11px] font-semibold tracking-wide text-ink-dim">CASE HISTORY</h2>
          {profile.casesSolved.length === 0 ? (
            <p className="mt-3 text-sm text-ink-faint">No cases solved yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {profile.casesSolved.map((caseId) => (
                <li key={caseId} className="flex items-center justify-between text-sm">
                  <span className="text-ink">{CASE_LABELS[caseId] || caseId}</span>
                  <span className="text-ink-dim">{profile.caseScores?.[caseId]}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={logOut}
          className="mt-8 flex items-center gap-2 rounded-md border border-line bg-panel px-4 py-2 text-sm text-ink-dim transition hover:bg-panel-raised hover:text-ink"
        >
          <LogOut size={14} />
          Log Out
        </button>
      </div>
    </div>
  )
}