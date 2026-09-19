import { useState } from "react"
import { ShieldAlert } from "lucide-react"
import { useAuth } from "../state/AuthContext"

export default function Auth() {
  const { signUp, logIn, error, setError } = useAuth()
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      if (mode === "signup") {
        await signUp(email, password)
      } else {
        await logIn(email, password)
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6 text-ink">
      <div className="w-full max-w-sm rounded-lg border border-line bg-panel/70 p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-signal/15">
            <ShieldAlert size={16} className="text-signal" />
          </div>
          <div>
            <p className="font-mono text-sm font-semibold tracking-[0.15em] text-ink">CASE:404</p>
            <p className="text-[10px] text-ink-faint">A.F.I.A. Group - Security Operations</p>
          </div>
        </div>

        <h1 className="text-lg font-semibold text-ink">
          {mode === "login" ? "Log in to your console" : "Apply for the analyst role"}
        </h1>
        <p className="mt-1 text-[13px] text-ink-dim">
          {mode === "login"
            ? "Enter your credentials to access your profile."
            : "Create your profile to start your career at A.F.I.A."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div>
            <label className="mb-1 block text-[11px] font-medium tracking-wide text-ink-faint">EMAIL</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink outline-none focus:border-signal"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium tracking-wide text-ink-faint">PASSWORD</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink outline-none focus:border-signal"
            />
          </div>

          {error && <p className="text-[12px] text-critical">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90 disabled:opacity-50"
          >
            {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Apply Now"}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError("") }}
          className="mt-4 w-full text-center text-[12px] text-ink-dim hover:text-ink"
        >
          {mode === "login" ? "New here? Apply for the role" : "Already have a profile? Log in"}
        </button>
      </div>
    </div>
  )
}