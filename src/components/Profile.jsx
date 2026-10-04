import { useState } from "react"
import { LogOut, ArrowLeft, Wallet, Award, User, Siren } from "lucide-react"
import { useAuth } from "../state/AuthContext"
import { useIncidentEngine } from "../state/IncidentEngine"

const CASE_LABELS = {
  "INC-0042": "The Midnight Login",
  "INC-0043": "Silent Spread",
}

const SKILL_OPTIONS = [
  "Network fundamentals",
  "SIEM tools",
  "Incident response",
  "Threat intelligence",
  "Scripting (Python/PowerShell)",
  "Cloud security",
]

function DetailsForm({ onSaved }) {
  const { saveCandidateProfile } = useAuth()
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    location: "",
    roleInterest: "SOC Analyst",
    education: "",
    fieldOfStudy: "",
    graduationYear: "",
    skills: [],
  })
  const [saving, setSaving] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleSkill(skill) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    await saveCandidateProfile(form)
    setSaving(false)
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-dim">Full Name</label>
          <input
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-dim">Phone Number</label>
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-dim">Location</label>
          <input
            required
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-dim">Role Interest</label>
          <select
            value={form.roleInterest}
            onChange={(e) => update("roleInterest", e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          >
            <option>SOC Analyst</option>
            <option>Incident Responder</option>
            <option>Threat Intelligence Analyst</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-dim">Highest Education</label>
          <input
            required
            value={form.education}
            onChange={(e) => update("education", e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-dim">Field of Study</label>
          <input
            required
            value={form.fieldOfStudy}
            onChange={(e) => update("fieldOfStudy", e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-dim">Graduation Year</label>
          <input
            required
            value={form.graduationYear}
            onChange={(e) => update("graduationYear", e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-dim">Skills</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SKILL_OPTIONS.map((skill) => (
            <button
              type="button"
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                form.skills.includes(skill)
                  ? "border-signal bg-signal/10 text-ink"
                  : "border-line text-ink-dim hover:bg-panel-raised"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Details"}
      </button>
    </form>
  )
}

export default function Profile() {
  const { profile, logOut } = useAuth()
  const { dispatch } = useIncidentEngine()
  const [editing, setEditing] = useState(false)

  if (!profile) return null

  const cp = profile.candidateProfile

  return (
    <div className="min-h-screen bg-void px-6 py-10 text-ink">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch({ type: "GO_TO", view: "landing" })}
            className="flex items-center gap-2 text-sm text-ink-dim transition hover:text-ink"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <button
            onClick={() => dispatch({ type: "GO_TO", view: "feed" })}
            className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 text-[13px] text-ink-dim transition hover:bg-panel-raised hover:text-ink"
          >
            <Siren size={14} className="text-signal" />
            Live Threat Feed
          </button>
        </div>

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

        <div className="mt-8 rounded-lg border border-line bg-panel/70 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-semibold tracking-wide text-ink-dim">EMPLOYEE DETAILS</h2>
            {cp && !editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-[11px] text-signal transition hover:underline"
              >
                Edit
              </button>
            )}
          </div>

          {cp && !editing ? (
            <>
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
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-ink-faint">
                {cp ? "Update your employee details below." : "No employee details on file yet. Add them below."}
              </p>
              <DetailsForm onSaved={() => setEditing(false)} />
            </>
          )}
        </div>

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