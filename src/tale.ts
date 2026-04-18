import type OpenAI from "openai";

export const getTale = async (client: OpenAI) => {
  const response = await client.responses.create({
    model: "gpt-5.2",
    input:
      "Escribe una pequena oracion en espanol sobre un nino que encuentra un dragon en el bosque.",
  });

  return response.output_text;
};