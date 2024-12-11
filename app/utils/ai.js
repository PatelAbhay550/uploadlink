import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.NEXT_PUBLIC_COHERE_API_KEY,
});

export async function generateSummary(text) {
  try {
    const response = await cohere.generate({
      model: 'command',
      prompt: `Please provide a concise summary of the following text: ${text}`,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.generations[0].text;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

export async function generateChatResponse(messages, pdfContext) {
  try {
    const conversation = messages.map(msg => ({
      role: msg.type === 'user' ? 'User' : 'Assistant',
      message: msg.content
    }));

    const response = await cohere.chat({
      model: 'command',
      message: messages[messages.length - 1].content,
      temperature: 0.7,
      chat_history: conversation.slice(0, -1),
      preamble: `You are an AI assistant analyzing a PDF document. Here's the context: ${pdfContext}`,
    });

    return response.text;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
} 