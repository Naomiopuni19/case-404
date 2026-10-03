export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing ANTHROPIC_API_KEY" })
  }

  const { caseName, caseType, severity, reportFields, scoreOverall } = req.body || {}

  if (!reportFields || typeof reportFields !== "object") {
    return res.status(400).json({ error: "Missing reportFields" })
  }

  const fieldsText = Object.entries(reportFields)
    .map(([label, value]) => `${label}: ${value || "(left blank)"}`)
    .join("\n")

  const prompt = `You are a senior SOC analyst reviewing a junior analyst's written incident report after they handled a simulated security incident.

Incident: ${caseName || "Unknown case"} (${caseType || "unknown type"}, severity ${severity || "unknown"})
Their performance score on the technical investigation was ${scoreOverall ?? "unknown"} out of 100.

Here is their written incident report:
${fieldsText}

Review this the way a real senior analyst would review a junior's writeup. Respond with ONLY valid JSON, no other text, in this exact shape:
{"strengths": ["short point", "short point"], "gaps": ["short point", "short point"], "summary": "one or two sentence overall verdict, direct and specific, written to the analyst as you"}

Keep each strength and gap to one short sentence. Be specific to what they actually wrote, not generic. If a field was left blank, that is a gap. Keep the tone professional but direct, like real workplace feedback, not harsh and not flattering.`

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      return res.status(502).json({ error: "Claude API error", detail: errText })
    }

    const data = await response.json()
    const text = data?.content?.[0]?.text || ""

    let parsed
    try {
      const jsonStart = text.indexOf("{")
      const jsonEnd = text.lastIndexOf("}")
      parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1))
    } catch {
      return res.status(502).json({ error: "Could not parse AI response", raw: text })
    }

    return res.status(200).json(parsed)
  } catch (err) {
    return res.status(500).json({ error: "Request failed", detail: String(err) })
  }
}