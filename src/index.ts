import "dotenv/config";
import OpenAI, { APIError } from "openai";
import { getTale } from "./tale.js";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("Falta OPENAI_API_KEY. Define la variable en tu entorno o en .env.");
  process.exitCode = 1;
} else {
  const client = new OpenAI({
    apiKey,
  });

  try {
    const tale = await getTale(client);
    console.log(tale);
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 429 && error.code === "insufficient_quota") {
        console.error(
          "OpenAI devolvio 429 (insufficient_quota): tu proyecto no tiene cuota disponible. Revisa billing/creditos del proyecto y vuelve a intentar."
        );
      } else {
        console.error(
          `OpenAI API error (${error.status ?? "unknown"}): ${error.message}`
        );
      }
    } else {
      console.error("Error inesperado al generar el cuento:", error);
    }

    process.exitCode = 1;
  }
}