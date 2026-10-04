import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, RotateCcw, Wallet, Award, Bot, Loader2 } from "lucide-react"
import { Panel } from "./ui"
import { useIncidentEngine, computeScore } from "../state/IncidentEngine"
import { useAuth } from "../state/AuthContext"

const METRICS = [
  ["detection", "Detection"],
  ["investigation", "Investigation"],
  ["correlation", "Evidence Correlation"],
  ["response", "Response"],
  ["containment", "Containment"],
  ["documentation", "Documentation"],
]

function buildFeedback(state) {
  const good = []
  const missed = []
  const { feedbackTexts } = state.caseData

  if (state.investigated.emailInspected) good.push(feedbackTexts.emailGood)
  else missed.push(feedbackTexts.emailMissed)

  if (state.investigated.endpointInspected) good.push(feedbackTexts.endpointGood)
  else missed.push(feedbackTexts.endpointMissed)

  if (state.investigated.threatIntelLookups.length > 0) good.push(feedbackTexts.intelGood)
  else missed.push(feedbackTexts.intelMissed)

  if (state.investigated.evidencePinned.length >= 4) good.push("Reconstructed most of the attack chain on the evidence board.")
  else if (state.investigated.evidencePinned.length > 0) missed.push("The evidence board was only partially built out.")
  else missed.push("No evidence was pinned to reconstruct the attack chain.")

  if (state.contained) good.push("Contained the incident before the attacker reached the final stage.")
  else if (state.breached) missed.push("Containment actions came after the attack had already reached its final stage.")
  else missed.push("The incident was not fully contained, not all critical response actions were taken.")

  return { good, missed }
}

export default function PerformanceReport() {
  const { state, dispatch } = useIncidentEngine()
  const { recordCaseSolved } = useAuth()
  const score = computeScore(state)
  const { good, missed } = buildFeedback(state)
  const [payout, setPayout] = useState(null)
  const [promotion, setPromotion] = useState(null)
  const [alreadyLogged, setAlreadyLogged] = useState(false)
  const [aiFeedback, setAiFeedback] = useState(null)
  const [aiLoading, setAiLoading] = useState(true)
  const [aiError, setAiError] = useState(false)

  useEffect(() => {
    let cancelled = false
    recordCaseSolved(state.caseId, score.overall).then((result) => {
      if (cancelled) return
      if (result) {
        setPayout(result.pay)
        if (result.promoted) setPromotion(result.newRole)
      } else {
        setAlreadyLogged(true)
      }
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let cancelled = false

    async function fetchAiFeedback() {
      setAiLoading(true)
      setAiError(false)
      try {
        const res = await fetch("/api/report-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caseName: state.caseData?.incident?.title || state.caseId,
            caseType: state.caseData?.incident?.type || "Security Incident",
            severity: state.caseData?.incident?.severity || "Unknown",
            reportFields: state.report || {},
            scoreOverall: score.overall,
          }),
        })
        if (!res.ok) throw new Error("Request failed")
        const data = await res.json()
        if (!cancelled) setAiFeedback(data)
      } catch (err) {
        if (!cancelled) setAiError(true)
      } finally {
        if (!cancelled) setAiLoading(false)
      }
    }

    fetchAiFeedback()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-void px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <p className={`font-mono text-xs tracking-[0.3em] ${state.contained ? "text-ok" : "text-high"}`}>
            {state.contained ? "INCIDENT CONTAINED" : state.breached ? "INCIDENT RESOLVED - LATE CONTAINMENT" : "INCIDENT RESOLVED"}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Analyst Performance</h1>
        </div>

        {promotion && (
          <div className="mb-3 flex items-center justify-center gap-2 rounded-md border border-signal/30 bg-signal/10 px-4 py-2.5 text-[13px] text-signal">
            <Award size={14} />
            Promoted! You are now a {promotion}.
          </div>
        )}
        {payout && (
          <div className="mb-4 flex items-center justify-center gap-2 rounded-md border border-ok/30 bg-ok/10 px-4 py-2.5 text-[13px] text-ok">
            <Wallet size={14} />
            You earned GHS {payout.toLocaleString()} for this case. Check your profile balance.
          </div>
        )}
        {alreadyLogged && (
          <div className="mb-4 flex items-center justify-center gap-2 rounded-md border border-line bg-panel px-4 py-2.5 text-[13px] text-ink-dim">
            This case was already logged in your profile.
          </div>
        )}

        <Panel bodyClassName="p-5" className="mb-4">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-ink-dim">Overall Score</p>
              <p className="text-3xl font-semibold text-ink">{score.overall}%</p>
            </div>
            <span className="rounded-md border border-signal/30 bg-signal/10 px-3 py-1.5 text-[12px] font-medium text-signal">
              {score.rating}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {METRICS.map(([key, label]) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-ink-dim">{label}</span>
                  <span className="text-ink">{score[key]}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-line-soft">
                  <div className="h-1.5 rounded-full bg-signal" style={{ width: `${score[key]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="AI Senior Analyst Review" bodyClassName="p-5" className="mb-4">
          {aiLoading && (
            <div className="flex items-center gap-2 text-[12.5px] text-ink-dim">
              <Loader2 size={14} className="animate-spin" />
              Reviewing your report...
            </div>
          )}

          {!aiLoading && aiError && (
            <p className="text-[12.5px] text-ink-faint">
              AI review is unavailable right now. Your score and feedback above are still accurate.
            </p>
          )}

          {!aiLoading && !aiError && aiFeedback && (
            <div className="flex flex-col gap-4">
              {aiFeedback.summary && (
                <div className="flex items-start gap-2 rounded-md border border-signal/20 bg-signal/5 p-3">
                  <Bot size={14} className="mt-0.5 shrink-0 text-signal" />
                  <p className="text-[12.5px] text-ink-dim">{aiFeedback.summary}</p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink-dim">STRENGTHS</p>
                  <ul className="flex flex-col gap-2">
                    {(aiFeedback.strengths || []).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-ink-dim">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-ok" />
                        {s}
                      </li>
                    ))}
                    {(!aiFeedback.strengths || aiFeedback.strengths.length === 0) && (
                      <li className="text-[12px] text-ink-faint">Nothing flagged.</li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink-dim">GAPS</p>
                  <ul className="flex flex-col gap-2">
                    {(aiFeedback.gaps || []).map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-ink-dim">
                        <XCircle size={13} className="mt-0.5 shrink-0 text-critical" />
                        {g}
                      </li>
                    ))}
                    {(!aiFeedback.gaps || aiFeedback.gaps.length === 0) && (
                      <li className="text-[12px] text-ink-faint">Nothing flagged.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2">
          <Panel title="What you did well" bodyClassName="p-4">
            <ul className="flex flex-col gap-2">
              {good.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-ink-dim">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-ok" />
                  {g}
                </li>
              ))}
              {good.length === 0 && <li className="text-[12px] text-ink-faint">Nothing recorded yet.</li>}
            </ul>
          </Panel>
          <Panel title="What you missed" bodyClassName="p-4">
            <ul className="flex flex-col gap-2">
              {missed.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-ink-dim">
                  <XCircle size={13} className="mt-0.5 shrink-0 text-critical" />
                  {m}
                </li>
              ))}
              {missed.length === 0 && <li className="text-[12px] text-ink-faint">Nothing, full marks.</li>}
            </ul>
          </Panel>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mx-auto mt-8 flex items-center gap-2 rounded-md border border-line px-4 py-2 text-[12px] text-ink-dim hover:text-ink"
        >
          <RotateCcw size={13} /> Replay the case
        </button>
      </div>
    </div>
  )
}