import readline from "node:readline";
import type OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

export const getChatTerminal = async (client: OpenAI) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages: ChatCompletionMessageParam[] = [];

  function ask(prompt: string) {
    return new Promise((resolve) => rl.question(prompt, resolve));
  }

  while (true) {
    const userMessage = await ask("\nTú: ");

    if ((userMessage as string).toLowerCase() === "salir") {
      rl.close();
      break;
    }

    messages.push({ role: "user", content: userMessage as string });

    const completion = await client.chat.completions.create({
      model: "gpt-5.2",
      messages,
    });

    const reply = completion.choices[0]!.message.content;
    console.log(`\nAsistente: ${reply}`);

    messages.push({ role: "assistant", content: reply });
  }
};
