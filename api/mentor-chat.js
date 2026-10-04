export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" })
  }

  const { message, history, caseContext } = req.body || {}
  if (!message) {
    return res.status(400).json({ error: "Missing message" })
  }

  const systemPrompt = `You are a senior SOC analyst at A.F.I.A. Group, mentoring a junior analyst who is working the case: ${caseContext || "a live incident"}. Give short, practical, encouraging guidance. Point them toward what to check next rather than handing over exact answers outright. Keep replies under 80 words.`

  const messages = [
    ...(Array.isArray(history) ? history : []),
    { role: "user", content: message },
  ]

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 250,
        system: systemPrompt,
        messages,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      return res.status(502).json({ error: "Upstream error", detail: text })
    }

    const data = await response.json()
    const reply = data.content?.[0]?.text || "I could not think of anything just now, try asking again."
    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}