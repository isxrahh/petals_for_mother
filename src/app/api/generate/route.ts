// src/app/api/generate/route.ts
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json({
    quote: "This is a test quote. If you see this, the API route is working.",
    author: "Test Mode"
  }, {
    headers: { "Access-Control-Allow-Origin": "*" }
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: { "Access-Control-Allow-Origin": "*" }
  });
}