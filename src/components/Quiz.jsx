import { useMemo, useState } from "react"
import { ShieldCheck, ShieldAlert, RotateCcw } from "lucide-react"
import { useAuth } from "../state/AuthContext"
import { questionBank } from "../data/questionBank"

const QUIZ_SIZE = 20
const PASS_PERCENT = 80

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildQuizSet() {
  const chosen = shuffle(questionBank).slice(0, QUIZ_SIZE)
  return chosen.map((q) => {
    const optionOrder = shuffle(q.options.map((opt, i) => ({ opt, i })))
    const options = optionOrder.map((o) => o.opt)
    const correctIndex = optionOrder.findIndex((o) => o.i === q.correctIndex)
    return { id: q.id, question: q.question, options, correctIndex }
  })
}

export default function Quiz() {
  const { passQuiz } = useAuth()
  const [attempt, setAttempt] = useState(0)
  const questions = useMemo(() => buildQuizSet(), [attempt])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)

  function selectAnswer(qId, optionIndex) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }))
  }

  async function handleSubmit() {
    const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length
    const percent = Math.round((correctCount / questions.length) * 100)
    const passed = percent >= PASS_PERCENT
    setResult({ correctCount, total: questions.length, percent, passed })
    setSubmitted(true)
    if (passed) {
      await passQuiz()
    }
  }

  function retry() {
    setAnswers({})
    setSubmitted(false)
    setResult(null)
    setAttempt((a) => a + 1)
  }

  const answeredCount = Object.keys(answers).length

  if (submitted && result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void px-6 text-ink">
        <div className="w-full max-w-md rounded-lg border border-line bg-panel/70 p-8 text-center">
          {result.passed ? (
            <ShieldCheck size={32} className="mx-auto text-ok" />
          ) : (
            <ShieldAlert size={32} className="mx-auto text-critical" />
          )}
          <h1 className="mt-4 text-xl font-semibold text-ink">
            {result.passed ? "Welcome to A.F.I.A." : "Not quite there yet"}
          </h1>
          <p className="mt-2 text-[13px] text-ink-dim">
            You scored {result.correctCount} out of {result.total} ({result.percent}%). You need {PASS_PERCENT}% to pass.
          </p>
          {result.passed ? (
            <p className="mt-4 text-[13px] text-ok">
              You have been hired as a Junior Analyst. Loading your console...
            </p>
          ) : (
            <button
              onClick={retry}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90"
            >
              <RotateCcw size={14} />
              Try Again with New Questions
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void px-6 py-10 text-ink">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.2em] text-signal">A.F.I.A. HIRING ASSESSMENT</p>
        <h1 className="mt-1.5 text-2xl font-semibold text-ink">Cybersecurity Fundamentals Quiz</h1>
        <p className="mt-2 text-[13px] text-ink-dim">
          Answer these questions to show you know the basics before stepping into the SOC. You need {PASS_PERCENT}% to pass. Questions are randomized every attempt.
        </p>
        <p className="mt-3 text-[12px] text-ink-faint">{answeredCount} of {questions.length} answered</p>

        <div className="mt-6 space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="rounded-lg border border-line bg-panel/70 p-4">
              <p className="text-[13px] font-medium text-ink">{idx + 1}. {q.question}</p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectAnswer(q.id, i)}
                    className={`block w-full rounded-md border px-3 py-2 text-left text-[13px] transition ${
                      answers[q.id] === i
                        ? "border-signal bg-signal/10 text-ink"
                        : "border-line-soft bg-panel text-ink-dim hover:bg-panel-raised hover:text-ink"
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
          onClick={handleSubmit}
          disabled={answeredCount < questions.length}
          className="sticky bottom-6 mt-6 w-full rounded-md bg-signal px-4 py-3 text-sm font-medium text-void transition hover:bg-signal/90 disabled:opacity-40"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  )
}