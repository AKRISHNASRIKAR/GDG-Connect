// app/ai/route.ts (test-only log version)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

  const result =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No description generated";

  return NextResponse.json({ result });
}
