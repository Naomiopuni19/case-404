export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" })
  }

  const prompt = `Generate one realistic but fictional cybersecurity incident alert for a corporate Security Operations Center, similar to what a SIEM system would surface. Vary the type of attack each time (phishing, ransomware, insider threat, brute force, DDoS, supply chain compromise, lateral movement, data exfiltration, misconfigured cloud storage, credential stuffing, etc).

Respond with ONLY valid JSON, no other text, in this exact shape:
{"title": "short alert title", "type": "attack category", "severity": "low|medium|high|critical", "summary": "two to three sentence description of what was detected", "recommendedAction": "one to two sentence next step for the analyst"}`

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
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      return res.status(502).json({ error: "Upstream error", detail: text })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ""
    const start = text.indexOf("{")
    const end = text.lastIndexOf("}")
    if (start === -1 || end === -1) {
      return res.status(502).json({ error: "Could not parse AI response" })
    }
    const parsed = JSON.parse(text.slice(start, end + 1))
    return res.status(200).json(parsed)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}