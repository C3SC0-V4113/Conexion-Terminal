import "dotenv/config";
import OpenAI from "openai";
import { getTale } from "./tale.js";
import { getStream } from "./stream.js";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error(
    "Falta OPENAI_API_KEY. Define la variable en tu entorno o en .env.",
  );
  process.exitCode = 1;
} else {
  const client = new OpenAI({
    apiKey,
  });

  const tale = await getTale(client);
  console.log(tale);

  console.log("Now Stream");
  await getStream(client);
}
