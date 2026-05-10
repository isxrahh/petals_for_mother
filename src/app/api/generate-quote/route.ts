export const runtime = "edge";

import { GoogleGenerativeAI } from "@google/generative-ai"; // Note: standard package name
import { NextRequest, NextResponse } from "next/server";

// CHANGE: Use process.env.GEMINI_API_KEY (without NEXT_PUBLIC) 
// and set this in the Vercel Dashboard Settings
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { flowerName, history } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a standard model name

    const prompt = `Generate one beautiful, emotional, short Mother's Day quote related to "${flowerName}".
          Include a meaningful author (real preferred or descriptive like "A Loving Daughter").
          
          PREVIOUS QUOTES (DO NOT REPEAT):
          ${history && history.length > 0 ? history.join(" | ") : "None"}

          IMPORTANT: Return ONLY a JSON object. No markdown, no preamble.
          {
            "quote": "text",
            "author": "name of the author"
          }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
    
    const cleanedText = rawText.replace(/```json|```/g, "").trim();
    const quoteData = JSON.parse(cleanedText);

    // ADDED: CORS HEADERS
    return NextResponse.json({
      quote: quoteData.quote || "A mother's love is the heart's garden.",
      author: quoteData.author || "Unknown"
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      }
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      quote: "Her love blooms endlessly, like flowers in spring.",
      author: "Heartfelt Moments"
    }, { 
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" } 
    }); 
  }
}

// ADDED: Required for "Preflight" requests from the phone
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}