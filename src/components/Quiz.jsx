import { useEffect, useMemo, useState } from "react"
import { ShieldCheck, Mail, RotateCcw } from "lucide-react"
import { useAuth } from "../state/AuthContext"
import { questionBank } from "../data/questionBank"
import { sendDecisionEmail } from "../lib/emailjs"

const QUIZ_SIZE = 20
const PASS_PERCENT = 80
const DECISION_DELAY_MS = 9000

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildQuizSet() {
  const picked = shuffle(questionBank).slice(0, QUIZ_SIZE)
  return picked.map((q) => {
    const optionOrder = shuffle(q.options.map((text, idx) => ({ text, idx })))
    return {
      id: q.id,
      category: q.category,
      question: q.question,
      options: optionOrder.map((o) => o.text),
      correctIndex: optionOrder.findIndex((o) => o.idx === q.correctIndex),
    }
  })
}

export default function Quiz() {
  const { user, profile, submitQuizResult } = useAuth()
  const [attempt, setAttempt] = useState(0)
  const [stage, setStage] = useState("quiz")
  const [answers, setAnswers] = useState({})
  const [passed, setPassed] = useState(false)

  const quizSet = useMemo(() => buildQuizSet(), [attempt])

  function selectAnswer(questionId, optionIndex) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  function submit() {
    const correctCount = quizSet.reduce(
      (sum, q) => (answers[q.id] === q.correctIndex ? sum + 1 : sum),
      0
    )
    const percent = Math.round((correctCount / quizSet.length) * 100)
    const didPass = percent >= PASS_PERCENT
    setPassed(didPass)
    setStage("submitted")
  }

  useEffect(() => {
    if (stage !== "submitted") return
    const timer = setTimeout(async () => {
      try {
        await sendDecisionEmail({
          toEmail: profile?.email || user?.email,
          toName: profile?.email ? profile.email.split("@")[0] : "Candidate",
          passed,
        })
      } catch (err) {
        console.error("Decision email failed to send", err)
      }
      setStage("decided")
    }, DECISION_DELAY_MS)
    return () => clearTimeout(timer)
  }, [stage])

  async function continueToProfile() {
    await submitQuizResult(true)
  }

  function tryAgain() {
    setAnswers({})
    setStage("quiz")
    setAttempt((a) => a + 1)
  }

  const answeredCount = Object.keys(answers).length

  if (stage === "submitted") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center text-ink">
        <Mail size={36} className="mb-5 text-signal" />
        <h1 className="text-2xl font-semibold">Application Received</h1>
        <p className="mt-3 max-w-md text-sm text-ink-dim">
          Thank you for completing the A.F.I.A. Group Security Operations Center Analyst
          assessment. Our recruitment team is reviewing your responses. You will receive an
          email with our decision shortly.
        </p>
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-panel">
          <div className="h-full w-1/3 animate-pulse bg-signal" />
        </div>
      </div>
    )
  }

  if (stage === "decided") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center text-ink">
        {passed ? (
          <>
            <ShieldCheck size={36} className="mb-5 text-ok" />
            <h1 className="text-2xl font-semibold">You have been selected to move forward</h1>
            <p className="mt-3 max-w-md text-sm text-ink-dim">
              Check your inbox for the official decision email. To finish onboarding, complete
              your candidate profile next.
            </p>
            <button
              onClick={continueToProfile}
              className="mt-8 rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90"
            >
              Continue to Candidate Profile
            </button>
          </>
        ) : (
          <>
            <RotateCcw size={36} className="mb-5 text-ink-dim" />
            <h1 className="text-2xl font-semibold">Not selected this time</h1>
            <p className="mt-3 max-w-md text-sm text-ink-dim">
              Check your inbox for the official decision email. After careful review, we are not
              moving forward with your application at this time. You are welcome to try again.
            </p>
            <button
              onClick={tryAgain}
              className="mt-8 rounded-md border border-line bg-panel px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-panel-raised"
            >
              Try Again with New Questions
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void px-6 py-10 text-ink">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-semibold">Security Operations Center Analyst Assessment</h1>
        <p className="mt-2 text-sm text-ink-dim">
          Answer all {quizSet.length} questions. {answeredCount}/{quizSet.length} answered.
        </p>

        <div className="mt-8 space-y-6">
          {quizSet.map((q, qi) => (
            <div key={q.id} className="rounded-lg border border-line bg-panel/70 p-5">
              <p className="text-sm font-medium text-ink">
                {qi + 1}. {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => selectAnswer(q.id, oi)}
                    className={`block w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                      answers[q.id] === oi
                        ? "border-signal bg-signal/10 text-ink"
                        : "border-line text-ink-dim hover:bg-panel-raised"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={submit}
          disabled={answeredCount < quizSet.length}
          className="mt-8 w-full rounded-md bg-signal px-5 py-3 text-sm font-medium text-void transition hover:bg-signal/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Application Assessment
        </button>
      </div>
    </div>
  )
}