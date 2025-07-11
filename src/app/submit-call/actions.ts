"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured");
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function getSuggestions(description: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert at improving call for applications descriptions. Your task is to rewrite and enhance the given description to make it more professional, engaging, and clear.

Guidelines:
- Make the description professional and well-structured
- Maintain the core message and requirements
- Add relevant details that would attract good candidates
- Use clear, engaging language
- Keep it concise but informative
- Include call-to-action elements

Based on the description, also suggest:
1. The most appropriate call type (Speaker or Volunteer)
2. Relevant tags/tech stack (comma-separated, max 5 tags)

Original description: "${description}"

Please respond with only valid JSON in the following format (no markdown, no code blocks, no extra text):
{
  "suggestions": "improved description here",
  "callType": "Speaker or Volunteer",
  "tags": "tag1, tag2, tag3"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response text
    let cleanedText = text.trim();
    
    // Remove markdown code block markers
    cleanedText = cleanedText.replace(/```json\s*/, '');
    cleanedText = cleanedText.replace(/```\s*$/, '');
    cleanedText = cleanedText.trim();
    
    // Try to parse JSON response
    try {
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedResponse = JSON.parse(jsonMatch[0]);
        return parsedResponse;
      }
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      console.error("Raw response:", text);
    }

    // Fallback: return the text as suggestions
    return {
      suggestions: text,
      callType: "Speaker",
      tags: "",
    };
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return {
      error: "Failed to generate suggestions. Please try again.",
    };
  }
}