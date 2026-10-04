import { useState } from "react"
import { ArrowLeft, Siren, Mail, Loader2 } from "lucide-react"
import { useIncidentEngine } from "../state/IncidentEngine"
import { useAuth } from "../state/AuthContext"
import { SeverityBadge } from "./ui"
import { sendNotificationEmail } from "../lib/emailjs"

export default function ThreatFeed() {
  const { dispatch } = useIncidentEngine()
  const { user, profile } = useAuth()
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function generateAlert() {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch("/api/generate-incident", { method: "POST" })
      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()

      let emailSent = false
      if (data.severity === "high" || data.severity === "critical") {
        try {
          await sendNotificationEmail({
            toEmail: profile?.email || user?.email,
            toName: profile?.email ? profile.email.split("@")[0] : "Analyst",
            subjectLine: `URGENT: ${data.title}`,
            heading: data.title,
            message: `${data.summary}\n\nRecommended action: ${data.recommendedAction}`,
            severity: data.severity.toUpperCase(),
          })
          emailSent = true
        } catch (err) {
          emailSent = false
        }
      }

      setAlerts((prev) => [{ ...data, id: Date.now(), emailSent }, ...prev])
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

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

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Live Threat Feed</h1>
            <p className="mt-1 text-sm text-ink-dim">
              AI generated incident alerts. High and critical severity alerts send a real email to your inbox.
            </p>
          </div>
          <button
            onClick={generateAlert}
            disabled={loading}
            className="flex shrink-0 items-center gap-2 rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90 disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Siren size={14} />}
            {loading ? "Generating..." : "Generate Incoming Alert"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-critical">Could not generate an alert right now. Try again.</p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          {alerts.length === 0 && (
            <p className="text-sm text-ink-faint">No alerts yet. Generate one to see it appear here.</p>
          )}
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-lg border border-line bg-panel/70 p-5">
              <div className="flex items-center justify-between">
                <SeverityBadge level={alert.severity} />
                {alert.emailSent && (
                  <span className="flex items-center gap-1.5 text-[11px] text-ok">
                    <Mail size={12} />
                    Email sent
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-sm font-semibold text-ink">{alert.title}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-ink-faint">{alert.type}</p>
              <p className="mt-3 text-[13px] text-ink-dim">{alert.summary}</p>
              <p className="mt-3 text-[12px] text-ink-dim">
                <span className="font-semibold text-ink">Recommended action: </span>
                {alert.recommendedAction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}