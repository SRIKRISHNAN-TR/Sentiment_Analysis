import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

export async function analyzeComment(comment) {
  const prompt = `
  Analyze this feedback: "${comment}"
  Return JSON with:
  - sentiment: positive | negative | neutral | mixed
  - summary: short 1-2 sentence summary
  - keywords: list of important words
  `;

  const response = await fetch(GEMINI_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  const data = await response.json();
  try {
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error("Error parsing Gemini response:", err);
    return { sentiment: "neutral", summary: comment, keywords: [] };
  }
}
