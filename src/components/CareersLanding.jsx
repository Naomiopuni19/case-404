import { ArrowRight, Radio } from "lucide-react"

const PILLARS = [
  { title: "INVESTIGATE", desc: "Analyze alerts, logs, authentication activity, and network evidence." },
  { title: "DECIDE", desc: "Determine what is suspicious, what is legitimate, and what requires escalation." },
  { title: "RESPOND", desc: "Take action and see how your decisions affect the incident." },
]

const DUTIES = [
  "Investigate security alerts",
  "Analyze authentication and endpoint activity",
  "Identify suspicious behavior",
  "Build incident timelines",
  "Escalate confirmed threats",
  "Make decisions under pressure",
]

const TRAITS = [
  "Analytical thinking",
  "Cybersecurity fundamentals",
  "Problem solving",
  "Attention to detail",
  "Incident investigation",
]

const STEPS = [
  { n: "01", title: "Apply", desc: "Submit your candidate information." },
  { n: "02", title: "Assessment", desc: "Complete the 40 question assessment." },
  { n: "03", title: "Review", desc: "Your application is reviewed by the recruitment team." },
  { n: "04", title: "Security Operations", desc: "Successful candidates receive access to the SOC environment." },
]

export default function CareersLanding({ onApply, onLogin }) {
  return (
    <div className="min-h-screen bg-void text-ink">
      <header className="flex items-center justify-between border-b border-line px-6 py-5 md:px-16">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-base font-semibold tracking-[0.2em] text-ink">CASE 404</span>
          <span className="hidden text-[11px] tracking-[0.2em] text-ink-faint md:inline">SECURITY OPERATIONS</span>
        </div>
        <nav className="flex items-center gap-6 text-[13px] text-ink-dim">
          <span className="hidden sm:inline">Careers</span>
          <span className="hidden sm:inline">Security</span>
          <button onClick={onLogin} className="text-ink-dim transition hover:text-ink">
            Log In
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <p className="font-mono text-[11px] tracking-[0.3em] text-signal">JUNIOR SOC ANALYST</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Your next investigation
          <br />
          starts here.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink-dim">
          We are looking for analytical thinkers who can investigate suspicious activity,
          identify threats, and make decisions under pressure.
        </p>

        <div className="mt-6 flex flex-col items-center gap-1 font-mono text-[11px] tracking-[0.15em] text-ink-faint">
          <span>POSITION: JUNIOR SOC ANALYST</span>
          <span>DEPARTMENT: SECURITY OPERATIONS</span>
          <span>LOCATION: REMOTE</span>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onApply}
            className="flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90"
          >
            Apply for Position
            <ArrowRight size={15} />
          </button>
          <button
            onClick={onApply}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink-dim transition hover:text-ink"
          >
            View Role
          </button>
        </div>
      </main>

      <section className="border-t border-line px-6 py-16 md:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-semibold tracking-tight">Security operations, real decisions.</h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] text-ink-dim">
            Case 404 is an interactive security operations environment designed around the
            decisions analysts make every day.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-panel px-5 py-6 text-left">
                <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{p.title}</p>
                <p className="mt-2 text-[13px] text-ink-dim">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-ink-faint">SECURITY OPERATIONS DEPARTMENT</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Junior SOC Analyst</h2>

          <div className="mt-8">
            <p className="text-[12px] font-semibold tracking-wide text-ink-dim">WHAT YOU WILL DO</p>
            <ul className="mt-3 flex flex-col gap-2">
              {DUTIES.map((d) => (
                <li key={d} className="flex items-start gap-2 text-[13.5px] text-ink-dim">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-[12px] font-semibold tracking-wide text-ink-dim">WHAT WE ARE LOOKING FOR</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TRAITS.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-ink-dim">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onApply}
            className="mt-10 flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90"
          >
            Begin Application
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="border-t border-line px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] tracking-[0.2em] text-signal">THE ASSESSMENT</p>
          <p className="mx-auto mt-4 max-w-md text-[14px] text-ink-dim">
            Before joining the Security Operations team, candidates complete a technical
            assessment designed to evaluate how they think, investigate, and respond to
            security situations.
          </p>

          <div className="mx-auto mt-8 inline-block rounded-lg border border-line bg-panel/70 px-8 py-6 text-left">
            <p className="font-mono text-lg font-semibold text-ink">40 QUESTIONS</p>
            <div className="mt-2 h-px w-full bg-line-soft" />
            <p className="mt-3 text-[12px] text-ink-dim">Technical Knowledge</p>
            <p className="text-[12px] text-ink-dim">Security Reasoning</p>
            <p className="text-[12px] text-ink-dim">Incident Analysis</p>
            <p className="text-[12px] text-ink-dim">Problem Solving</p>
            <p className="mt-3 font-mono text-[10px] tracking-wide text-ink-faint">ESTIMATED TIME</p>
            <p className="text-[12px] text-ink-dim">30 to 40 minutes</p>
          </div>

          <div>
            <button
              onClick={onApply}
              className="mt-8 rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90"
            >
              Start Application
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-16 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold tracking-wide text-ink-dim">APPLICATION PROCESS</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="text-left">
                <p className="font-mono text-[11px] text-signal">{s.n}</p>
                <p className="mt-1 text-[13px] font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-[12px] text-ink-dim">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-panel/70 p-5 opacity-80">
            <div className="flex items-center gap-2 text-ink-dim">
              <Radio size={13} className="text-critical" />
              <p className="font-mono text-[10px] tracking-wide">SECURITY OPERATIONS</p>
            </div>
            <div className="mt-3 h-px bg-line-soft" />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[12px] font-semibold text-critical">CRITICAL ALERT</p>
              <p className="font-mono text-[11px] text-ink-faint">01</p>
            </div>
            <p className="mt-2 text-[12.5px] text-ink-dim">Multiple failed authentication attempts</p>
            <p className="mt-3 text-[10px] tracking-wide text-ink-faint">SOURCE</p>
            <p className="text-[12px] text-ink">185.xxx.xxx.xxx</p>
            <p className="mt-3 text-[10px] tracking-wide text-ink-faint">STATUS</p>
            <p className="text-[12px] text-ink">UNDER INVESTIGATION</p>
          </div>

          <div className="text-left">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight">
              Every alert tells a story.
              <br />
              Your job is to find it.
            </h2>
            <button
              onClick={onApply}
              className="mt-6 flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90"
            >
              Apply Now
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-10 text-center md:px-16">
        <p className="font-mono text-[12px] font-semibold tracking-[0.15em] text-ink">CASE 404</p>
        <p className="mt-1 text-[11px] text-ink-faint">Security Operations</p>
        <div className="mt-4 flex items-center justify-center gap-6 text-[12px] text-ink-dim">
          <span>Careers</span>
          <span>Security</span>
          <span>Contact</span>
        </div>
        <p className="mt-4 font-mono text-[10px] text-ink-faint">CASE ID: 404</p>
        <p className="mt-1 text-[10px] text-ink-faint">(c) 2026 Case 404</p>
      </footer>
    </div>
  )
}