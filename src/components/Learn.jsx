import { useState } from 'react'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { useIncidentEngine } from '../state/IncidentEngine'
import { learnSections } from '../data/learnContent'

const allTopics = learnSections.flatMap((s) => s.topics.map((t) => ({ ...t, sectionTitle: s.title })))

export default function Learn() {
  const { dispatch } = useIncidentEngine()
  const [activeId, setActiveId] = useState(allTopics[0].id)
  const active = allTopics.find((t) => t.id === activeId) || allTopics[0]

  return (
    <div className="min-h-screen bg-void text-ink">
      <header className="flex items-center justify-between border-b border-line px-8 py-4 md:px-16">
        <div className="flex items-center gap-2.5">
          <BookOpen size={16} className="text-signal" />
          <span className="font-mono text-sm font-semibold tracking-[0.2em] text-ink">CASE:404 LEARN</span>
        </div>
        <button
          onClick={() => dispatch({ type: 'GO_TO', view: 'landing' })}
          className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs text-ink-dim transition hover:bg-panel hover:text-ink"
        >
          <ArrowLeft size={13} />
          Back
        </button>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:px-16">
        <aside className="space-y-5 md:w-64 md:shrink-0">
          {learnSections.map((section) => (
            <div key={section.id}>
              <p className="mb-1.5 font-mono text-[10px] tracking-[0.15em] text-ink-faint">{section.title.toUpperCase()}</p>
              <div className="space-y-0.5">
                {section.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveId(topic.id)}
                    className={`block w-full rounded-md px-2.5 py-1.5 text-left text-[13px] transition ${
                      activeId === topic.id ? 'bg-panel-raised text-ink' : 'text-ink-dim hover:bg-panel/60 hover:text-ink'
                    }`}
                  >
                    {topic.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <main className="min-w-0 flex-1 rounded-lg border border-line bg-panel/70 p-6 md:p-8">
          <p className="font-mono text-[10px] tracking-[0.15em] text-signal">{active.sectionTitle.toUpperCase()}</p>
          <h1 className="mt-1.5 text-2xl font-semibold text-ink">{active.title}</h1>
          <div className="mt-5 space-y-4">
            {active.body.map((para, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-ink-dim">{para}</p>
            ))}
          </div>
          {active.keyPoints && (
            <div className="mt-6 rounded-md border border-line-soft bg-panel px-4 py-3">
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink-faint">KEY POINTS</p>
              <ul className="space-y-1.5">
                {active.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-ink-dim">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}