exports.handler = async (event) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: "AI not configured. Add ANTHROPIC_API_KEY in Netlify env vars." }) };

  let prompt, type;
  try {
    const body = JSON.parse(event.body);
    prompt = body.prompt;
    type = body.type || "general";
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!prompt || typeof prompt !== "string") return { statusCode: 400, headers, body: JSON.stringify({ error: "Prompt is required" }) };
  if (prompt.length > 8000) prompt = prompt.substring(0, 8000);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
    });

    const data = await res.json();
    if (!res.ok) return { statusCode: res.status, headers, body: JSON.stringify({ error: data.error?.message || "API error" }) };

    const raw = (data.content || []).map(c => c.text || "").join("\n").trim();

    // Server-side JSON extraction with fallback
    let parsed = null;
    try {
      let clean = raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
      const match = clean.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
    } catch (e) { /* parsing failed, return raw */ }

    return { statusCode: 200, headers, body: JSON.stringify({ result: parsed ? JSON.stringify(parsed) : raw, parsed, raw }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error: " + err.message }) };
  }
};
