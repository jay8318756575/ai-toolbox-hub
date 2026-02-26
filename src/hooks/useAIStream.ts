// AI streaming hook for content generation tools

type Message = { role: "user" | "assistant"; content: string };

interface StreamChatOptions {
  messages: Message[];
  type: "content-writer" | "paraphraser" | "summarizer" | "grammar-checker" | "translator" | "chatbot" | "keyword-research" | "page-speed" | "backlink-checker" | "house-planner";
  options?: {
    tone?: string;
    language?: string;
    targetLanguage?: string;
  };
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

const PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const CHAT_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`
  : PROJECT_REF
    ? `https://${PROJECT_REF}.supabase.co/functions/v1/ai-chat`
    : "";

const fetchWithRetry = async (body: string) => {
  const attempts = 2;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeout);
      return response;
    } catch (error) {
      clearTimeout(timeout);
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }

  throw new Error("Failed to connect to AI service");
};

export async function streamAIChat({
  messages,
  type,
  options,
  onDelta,
  onDone,
  onError,
}: StreamChatOptions): Promise<void> {
  try {
    if (!CHAT_URL) {
      onError("AI endpoint is not configured. Please refresh and try again.");
      return;
    }

    const response = await fetchWithRetry(JSON.stringify({ messages, type, options }));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `Error: ${response.status}`;
      
      if (response.status === 429) {
        onError("Rate limit exceeded. Please wait a moment and try again.");
        return;
      }
      if (response.status === 402) {
        onError("AI credits exhausted. Please try again later.");
        return;
      }
      
      onError(errorMessage);
      return;
    }

    if (!response.body) {
      onError("No response body received");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // Incomplete JSON, put it back
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream error:", error);
    onError(error instanceof Error ? error.message : "Failed to connect to AI service");
  }
}

// Non-streaming version for simpler use cases
export async function callAI(
  prompt: string,
  type: StreamChatOptions["type"],
  options?: StreamChatOptions["options"]
): Promise<string> {
  return new Promise((resolve, reject) => {
    let result = "";
    
    streamAIChat({
      messages: [{ role: "user", content: prompt }],
      type,
      options,
      onDelta: (delta) => { result += delta; },
      onDone: () => resolve(result),
      onError: reject,
    });
  });
}
