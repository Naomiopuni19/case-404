import { ArrowRight, Radio } from 'lucide-react'
import { useIncidentEngine } from '../state/IncidentEngine'

const flowSteps = ['THREAT DETECTED', 'INVESTIGATION', 'CONTAINMENT', 'RESPONSE']

export default function Landing() {
  const { dispatch } = useIncidentEngine()

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-ink">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #1C2532 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-lg font-semibold tracking-[0.2em] text-ink">CASE:404</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 sm:gap-2.5">
          <Radio size={15} className="text-ok" />
          <span className="text-sm tracking-wide text-ink-dim sm:text-base">
            <span className="font-semibold text-ink">A.F.I.A.</span> Group - Security Operations
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-8 pb-24 pt-16 text-center md:pt-24">
        <p className="mb-5 font-mono text-xs tracking-[0.3em] text-signal">CYBERSECURITY OPERATIONS SIMULATOR</p>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
          Think like an attacker.
          <br />
          Respond like a defender.
        </h1>
        <p className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-ink-dim">
          Sit down at a live SOC console with real telemetry, alerts, and an incident already
          in progress. Nobody tells you what happened. You have to find out.
        </p>

        <div className="mt-11 flex items-center gap-4">
          <button
            onClick={() => dispatch({ type: 'GO_TO', view: 'briefing' })}
            className="group flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal/90"
          >
            Enter the SOC
            <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-20 flex w-full items-center justify-center gap-3 md:gap-6">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3 md:gap-6">
              <div className="rounded-md border border-line bg-panel px-3 py-2 font-mono text-[10px] tracking-wide text-ink-dim md:px-4 md:text-[11px]">
                {step}
              </div>
              {i < flowSteps.length - 1 && <div className="h-px w-5 bg-line md:w-8" />}
            </div>
          ))}
        </div>

        <div className="mt-16 grid w-full grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line text-left">
          {[
            ['CASE 001', 'The Midnight Login', 'Credential compromise'],
            ['CASE 002', 'Ghost in the Network', 'Coming soon'],
            ['CASE 003', 'Blackout', 'Coming soon'],
          ].map(([tag, name, desc], i) => (
            <div key={tag} className={`bg-panel px-5 py-4 ${i > 0 ? 'opacity-40' : ''}`}>
              <p className="font-mono text-[10px] tracking-wide text-signal">{tag}</p>
              <p className="mt-1 text-sm font-medium text-ink">{name}</p>
              <p className="mt-0.5 text-xs text-ink-faint">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}