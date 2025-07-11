"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AIChatBox({
  onUseResult,
}: {
  onUseResult?: (text: string) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.result || "No response generated.");
    } catch (err) {
      console.error("Gemini error", err);
      setResponse("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded space-y-4 w-full max-w-md">
      <h3 className="font-semibold text-lg">AI Assistant</h3>
      <Textarea
        rows={4}
        placeholder="Ask Gemini to generate a description..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Thinking..." : "Generate"}
      </Button>

      {response && (
        <div className="space-y-2">
          <div className="p-3 bg-muted border rounded text-sm whitespace-pre-wrap">
            {response}
          </div>
          {onUseResult && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUseResult(response)}
            >
              Use as Description
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
