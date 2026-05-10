// app/api/generate/route.ts
export const runtime = "edge";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { flowerName, history } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate one beautiful, emotional, short Mother's Day quote related to "${flowerName}".
Include a meaningful author (real or fitting like "A Loving Daughter").

PREVIOUS QUOTES (DO NOT REPEAT):
${history?.length > 0 ? history.join(" | ") : "None"}

Return ONLY valid JSON. No markdown, no extra text.
{
  "quote": "the quote here",
  "author": "Author Name"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean possible markdown
    text = text.replace(/```json|```/g, "").trim();

    let quoteData;
    try {
      quoteData = JSON.parse(text);
    } catch {
      // Fallback parsing
      quoteData = {
        quote: text.includes('"quote"') ? text : "A mother’s love is the most beautiful flower in the garden of life.",
        author: "For Mom"
      };
    }

    return NextResponse.json(
      {
        quote: quoteData.quote,
        author: quoteData.author || "— For Mom",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      {
        quote: "Her love blooms endlessly, like flowers in spring.",
        author: "— For Mom",
      },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}