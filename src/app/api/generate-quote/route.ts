export const runtime = "edge";

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { flowerName, history } = await request.json();

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite", 
      contents: [{
        role: "user",
        parts: [{
          text: `Generate one beautiful, emotional, short Mother's Day quote related to "${flowerName}".
          Include a meaningful author (real, i.e mostly preferred or descriptive like "A Loving Daughter").
          
          PREVIOUS QUOTES (DO NOT REPEAT):
          ${history && history.length > 0 ? history.join(" | ") : "None"}

          IMPORTANT: Return ONLY a JSON object. No preamble.
          {
            "quote": "text",
            "author": "name of the author"
          }`
        }]
      }]
    });

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (!rawText) throw new Error("Empty response from AI");

    const cleanedText = rawText.replace(/```json|```/g, "").trim();
    const quoteData = JSON.parse(cleanedText);

    return NextResponse.json({
      quote: quoteData.quote || "A mother's love is the heart's garden.",
      author: quoteData.author || "Unknown"
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      quote: "Her love blooms endlessly, like flowers in spring.",
      author: "Heartfelt Moments"
    }, { status: 200 }); 
  }
}