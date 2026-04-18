import type OpenAI from "openai";
import { APIError } from "openai";

export const getTale = async (client: OpenAI): Promise<string> => {
  try {
    const response = await client.responses.create({
      model: "gpt-5.2",
      input:
        "Escribe una pequena oracion en espanol sobre un nino que encuentra un dragon en el bosque.",
    });

    return response.output_text;
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 429 && error.code === "insufficient_quota") {
        return "OpenAI devolvio 429 (insufficient_quota): tu proyecto no tiene cuota disponible. Revisa billing/creditos del proyecto y vuelve a intentar.";
      } else {
        return `OpenAI API error (${error.status ?? "unknown"}): ${error.message}`;
      }
    } else {
      return `Error inesperado al generar el cuento: ${error}`;
    }
  }
};
