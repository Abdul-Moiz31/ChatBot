import { google } from "@ai-sdk/google";
import { type CoreMessage, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: "Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable." },
      { status: 500 }
    );
  }

  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = await streamText({
      model: google("models/gemini-2.0-flash"),
      system: "You are a helpful assistant",
      messages,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to generate a response. Please try again later." },
      { status: 500 }
    );
  }
}
