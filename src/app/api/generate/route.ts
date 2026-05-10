// src/app/api/generate/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const fallbackQuotes = [
  {
    quote: "Her love blooms endlessly, like flowers in spring.",
    author: "— For Mom",
  },
  {
    quote: "A bouquet of gratitude for the woman who planted every hope in our hearts.",
    author: "A Loving Child",
  },
  {
    quote: "Each petal reflects the kindness she waters into our lives every day.",
    author: "With Love",
  },
];

const parseModelResponse = (raw: string) => {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");

  if (start >= 0 && end > start) {
    try {
      return JSON.parse(trimmed.slice(start, end + 1));
    } catch {
      // fall through to fallback parsing
    }
  }

  return {
    quote: trimmed,
    author: "— For Mom",
  };
};

const buildPrompt = (flowerName?: string) => {
  const flowerHint = flowerName ? `Use the flower motif "${flowerName}" in a loving, heartfelt quote.` : "Write a loving Mother's Day quote.";

  return `You are a creative quote writer for Mother's Day cards.
Write a short, sweet quote for a mother that feels warm, personal, and unique.
${flowerHint}
Respond with valid JSON only, using the exact shape:
{"quote":"...","author":"..."}
Do not include any extra explanation, markdown, or text outside the JSON object.`;
};

const createAiClient = () => {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const location = process.env.GOOGLE_CLOUD_LOCATION;
  const apiKey = process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY;

  if (project && location) {
    return new GoogleGenAI({ vertexai: true, project, location });
  }

  if (apiKey) {
    return new GoogleGenAI({ apiKey });
  }

  return null;
};

const selectFallbackQuote = () => {
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const flowerName = typeof body.flowerName === "string" ? body.flowerName : undefined;

  const prompt = buildPrompt(flowerName);
  const ai = createAiClient();

  if (!ai) {
    return NextResponse.json(selectFallbackQuote());
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        candidateCount: 1,
      },
    });

    const candidateContent = response.candidates?.[0]?.content;
    const rawText =
      typeof candidateContent === "string"
        ? candidateContent
        : candidateContent
        ? JSON.stringify(candidateContent)
        : "";
    const parsed = parseModelResponse(rawText);

    if (!parsed?.quote || typeof parsed.quote !== "string") {
      throw new Error("Invalid AI response");
    }

    return NextResponse.json({
      quote: parsed.quote.trim(),
      author: parsed.author?.trim() || "— For Mom",
    });
  } catch (error) {
    console.error("AI quote generation failed:", error);
    return NextResponse.json(selectFallbackQuote());
  }
}

export async function OPTIONS() {
  return NextResponse.json({});
}
