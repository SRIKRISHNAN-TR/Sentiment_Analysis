// geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// TEMPORARY: hardcode API key for frontend testing only
const API_KEY = "AIzaSyCSWA4zUEWJEcBM65nLVqIZMSUBCps5gKQ";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeFeedback(comment) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this feedback text: "${comment}"
      Return JSON with:
      {
        "sentiment": "positive | negative | neutral",
        "summary": "short summary",
        "keywords": ["list of key terms"]
      }
    `;

    const result = await model.generateContent(prompt);

    const text =
      result?.response?.text || result?.output?.[0]?.content?.[0]?.text;

    // Safe parsing: fallback if Gemini response is not valid JSON
    let parsed = { sentiment: "neutral", summary: text || "", keywords: [] };
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.warn("Gemini returned non-JSON text, using raw text as summary.");
      parsed = { sentiment: "neutral", summary: text || "", keywords: [] };
    }

    return parsed;
  } catch (err) {
    console.error("Gemini API error:", err);
    return { sentiment: "neutral", summary: "Error analyzing feedback.", keywords: [] };
  }
}
