import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { GEMINI_API_KEY } from "./../../libs/env.js";
import products from "./../../utils/product.json" assert { type: "json" };

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: GEMINI_API_KEY,
  maxRetries: 3,
  apiVersion: "v1",
  temperature: 0,
});

const productList = products.map((p) => `- ${p.name}`).join("\n");
const template = `
  Kamu adalah AI Customer Service profesional.

  Tugasmu:
  1. Jawab pertanyaan user dengan ramah.
  2. Jika user menunjukkan minat pada produk, identifikasi nama produknya.
  3. Output HARUS dalam format JSON:

    {{
        "reply": "...",
        "interestedProduct": "Nama Produk" atau null
    }}

  Produk tersedia:
  ${productList}

  Pertanyaan user: {user_input}
  JANGAN menambahkan teks selain JSON.
  JANGAN menggunakan markdown.
  Output hanya JSON valid.
`;

const prompt = PromptTemplate.fromTemplate(template);
const chain = prompt.pipe(model);

export async function chatAI(input) {
  return await chain.invoke({
    user_input: input,
  });
}
