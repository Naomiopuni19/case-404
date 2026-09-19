export function Panel({ title, action, children, className = '', bodyClassName = '' }) {
  return (
    <section className={`flex flex-col rounded-lg border border-line bg-panel/70 backdrop-blur-sm ${className}`}>
      {title && (
        <header className="flex items-center justify-between border-b border-line-soft px-4 py-2.5 shrink-0">
          <h2 className="text-[11px] font-semibold tracking-wide text-ink-dim">{title}</h2>
          {action}
        </header>
      )}
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  )
}

const SEVERITY_STYLES = {
  CRITICAL: 'bg-critical/15 text-critical border-critical/30',
  critical: 'bg-critical/15 text-critical border-critical/30',
  HIGH: 'bg-high/15 text-high border-high/30',
  high: 'bg-high/15 text-high border-high/30',
  MEDIUM: 'bg-medium/15 text-medium border-medium/30',
  medium: 'bg-medium/15 text-medium border-medium/30',
  LOW: 'bg-low/15 text-ink-dim border-line',
  low: 'bg-low/15 text-ink-dim border-line',
}

export function SeverityBadge({ level, className = '' }) {
  const style = SEVERITY_STYLES[level] || SEVERITY_STYLES.LOW
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${style} ${className}`}>
      {level}
    </span>
  )
}

export function StatusDot({ tone = 'ok', pulse = false, className = '' }) {
  const colors = {
    ok: 'bg-ok',
    critical: 'bg-critical',
    high: 'bg-high',
    medium: 'bg-medium',
    signal: 'bg-signal',
  }
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors[tone]} ${pulse ? 'pulse-dot' : ''} ${className}`} />
}
