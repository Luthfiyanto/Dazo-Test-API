import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { GEMINI_API_KEY } from "./env.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: GEMINI_API_KEY,
});

export async function chatAI(input) {
  const template = `
    Kamu adalah AI Customer Service profesional.

    Tugasmu:
    1. Jawab pertanyaan user dengan ramah.
    2. Jika user menunjukkan minat pada produk, identifikasi nama produknya.
    3. Output HARUS dalam format JSON:

      {
          "reply": "...",
          "interestedProduct": "Nama Produk" atau null
      }

    Produk tersedia:
    - Paket Basic
    - Paket Premium
    - Paket Enterprise

    Pertanyaan user: {user_input}
  `;

  const prompt = PromptTemplate.fromTemplate(template);
  const chain = prompt.pipe(model);

  return await chain.invoke({
    user_input: input,
  });
}
