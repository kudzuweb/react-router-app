import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type UIMessage, convertToModelMessages } from "ai";
import type { Route } from "./+types/ai"

const openai = createOpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
});

export async function action({ request }: Route.ActionArgs) {
    // POST JSON array
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
        model: openai("gpt-4.1-mini"),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}

