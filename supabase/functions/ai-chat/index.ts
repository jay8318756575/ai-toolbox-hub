import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ChatRequest {
  messages: Array<{ role: string; content: string }>;
  type: "content-writer" | "paraphraser" | "summarizer" | "grammar-checker" | "translator" | "chatbot";
  options?: {
    tone?: string;
    language?: string;
    targetLanguage?: string;
  };
}

const systemPrompts: Record<string, string> = {
  "content-writer": `You are an expert content writer. Create high-quality, engaging, and SEO-optimized content based on the user's topic. 
Include:
- Compelling headlines
- Well-structured paragraphs
- Relevant keywords naturally integrated
- Clear introduction and conclusion
Write in the language the user requests. If Hindi/Hinglish is requested, write naturally in that style.`,
  
  "paraphraser": `You are an expert paraphraser. Rewrite the given text while:
- Maintaining the original meaning
- Using different words and sentence structures
- Improving readability and flow
- Keeping the same tone unless asked otherwise
Return ONLY the paraphrased text without any explanations.`,
  
  "summarizer": `You are an expert summarizer. Create concise summaries that:
- Capture key points and main ideas
- Remove unnecessary details
- Maintain accuracy
- Are easy to understand
Return ONLY the summary without any explanations.`,
  
  "grammar-checker": `You are an expert grammar checker and editor. Analyze the text and:
- Fix all grammar, spelling, and punctuation errors
- Improve sentence structure
- Enhance clarity and readability
Return the corrected text followed by a brief list of changes made.`,
  
  "translator": `You are an expert translator. Translate the given text accurately while:
- Maintaining the original meaning and tone
- Using natural expressions in the target language
- Preserving formatting and structure
Return ONLY the translated text.`,
  
  "chatbot": `You are a helpful AI assistant for the AI Tools Hub website. 
- Answer questions about the tools available on the website
- Provide helpful tips and suggestions
- Be friendly and conversational
- Support Hindi, English, and Hinglish
- Keep responses concise but informative`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, type, options } = await req.json() as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let systemPrompt = systemPrompts[type] || systemPrompts["chatbot"];

    // Add options to system prompt if provided
    if (options?.tone) {
      systemPrompt += `\n\nTone: ${options.tone}`;
    }
    if (options?.language) {
      systemPrompt += `\n\nWrite in: ${options.language}`;
    }
    if (options?.targetLanguage && type === "translator") {
      systemPrompt += `\n\nTranslate to: ${options.targetLanguage}`;
    }

    console.log(`Processing ${type} request with ${messages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const errorText = await response.text();
      console.error(`AI Gateway error: ${status}`, errorText);

      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Stream the response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
