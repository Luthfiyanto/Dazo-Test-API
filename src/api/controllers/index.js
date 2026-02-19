import { chatAI } from "../services/gemini.js";
import { logProductToExcel } from "../services/excel.js";

export function ping(_req, res) {
  res.status(200).json({
    message: "Welcome!",
  });
}

export async function chat(req, res) {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({
      message: "Message required",
    });
  }
  try {
    const result = await chatAI(message);

    let parsed = JSON.parse(result.content);

    // logic excel
    if (parsed.interestedProduct) {
      const saved = await logProductToExcel({
        product: parsed.interestedProduct,
        userMessage: message,
        aiReply: parsed.reply,
      });
    }

    res.json({
      reply: parsed.reply,
    });
  } catch (e) {
    res.status(500).json({
      message: `AI processing failed: ${e}`,
    });
  }
}
