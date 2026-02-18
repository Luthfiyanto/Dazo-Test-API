import { chatAI } from "../services/gemini.js";

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
      let hore = "Horee";
    }

    res.json({
      reply: parsed,
    });
  } catch (e) {
    res.status(500).json({
      message: `AI processing failed`,
    });
  }
}
