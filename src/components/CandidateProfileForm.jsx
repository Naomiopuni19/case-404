import { useState } from "react"
import { useAuth } from "../state/AuthContext"

const SKILL_OPTIONS = [
  "Network fundamentals",
  "SIEM tools",
  "Incident response",
  "Threat intelligence",
  "Scripting (Python/PowerShell)",
  "Cloud security",
]

export default function CandidateProfileForm() {
  const { user, saveCandidateProfile } = useAuth()
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
  }

  return (
    <div className="min-h-screen bg-void px-6 py-12 text-ink">
      <div className="mx-auto max-w-xl">
        <h1 className="text-xl font-semibold">Complete Your Candidate Profile</h1>
        <p className="mt-2 text-sm text-ink-dim">
          Welcome to A.F.I.A. Group, {user?.email}. Fill out your details to finish onboarding
          and gain access to the Security Operations Center.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
            className="w-full rounded-md bg-signal px-5 py-3 text-sm font-medium text-void transition hover:bg-signal/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Complete Onboarding"}
          </button>
        </form>
      </div>
    </div>
  )
}