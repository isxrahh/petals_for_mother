// src/app/api/generate/route.ts
export const runtime = "edge";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { flowerName, history } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate one beautiful, short, emotional Mother's Day quote related to "${flowerName}".

Previous quotes (do not repeat):
${history?.length ? history.join(" | ") : "None"}

Return ONLY valid JSON in this format:
{
  "quote": "the quote text here",
  "author": "Author Name"
}`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Clean the response
    const cleanedText = responseText.replace(/```json|```/g, "").trim();

    let quoteData;
    try {
      quoteData = JSON.parse(cleanedText);
    } catch {
      quoteData = {
        quote: "A mother's love is like a beautiful flower that blooms forever.",
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
    console.error("API Error:", error);

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

// Handle preflight requests (important for Capacitor)
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}