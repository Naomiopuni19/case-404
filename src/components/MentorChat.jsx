import { useState } from "react"
import { Bot, X, Send, Loader2 } from "lucide-react"
import { useIncidentEngine } from "../state/IncidentEngine"

export default function MentorChat() {
  const { state } = useIncidentEngine()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput("")
    const nextMessages = [...messages, { role: "user", content: text }]
    setMessages(nextMessages)
    setLoading(true)

    try {
      const res = await fetch("/api/mentor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
          caseContext: state.caseData?.incident?.title || state.caseId,
        }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "No response." }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "I could not reach the mentor service right now." }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-signal px-4 py-3 text-sm font-medium text-void shadow-lg transition hover:bg-signal/90"
      >
        <Bot size={16} />
        Senior Analyst
      </button>
    )
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[420px] w-80 flex-col rounded-lg border border-line bg-panel shadow-xl">
      <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot size={15} className="text-signal" />
          <p className="text-[13px] font-semibold text-ink">Senior Analyst</p>
        </div>
        <button onClick={() => setOpen(false)} className="text-ink-dim hover:text-ink">
          <X size={15} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <p className="text-[12px] text-ink-faint">
            Ask your senior analyst for a hint if you are stuck on this case.
          </p>
        )}
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-md px-3 py-2 text-[12.5px] ${
                m.role === "user"
                  ? "self-end bg-signal/15 text-ink"
                  : "self-start bg-panel-raised text-ink-dim"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 self-start text-[12px] text-ink-dim">
              <Loader2 size={12} className="animate-spin" />
              Thinking...
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line-soft p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask for a hint..."
          className="flex-1 rounded-md border border-line bg-void px-3 py-2 text-[12.5px] text-ink outline-none focus:border-signal/50"
        />
        <button
          onClick={send}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-signal text-void transition hover:bg-signal/90 disabled:opacity-50"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}