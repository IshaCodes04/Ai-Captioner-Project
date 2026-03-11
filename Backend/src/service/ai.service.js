const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const TONE_CONFIG = {
  casual: "Write 4-5 short, fun social media captions. Use a friendly tone and emojis.",
  funny: "Write 4-5 hilarious, witty captions with puns and humor.",
  professional: "Write 4-5 polished, professional captions for LinkedIn. No slang.",
  poetic: "Write 4-5 beautiful, lyrical captions using metaphors.",
  hashtags: "Write 1 punchy caption and 20 relevant hashtags."
};

async function generateCaptions(base64ImageFile, tone = "casual") {
  console.log("   [AI] Starting generateCaptions function...");
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key Missing");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const instruction = TONE_CONFIG[tone] || TONE_CONFIG.casual;
    const fullPrompt = `${instruction}\n\nFormat your response as a list with bullet points.`;

    console.log("   [AI] Requesting Gemini API...");
    const result = await model.generateContent([
      fullPrompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile
        }
      }
    ]);

    const text = result.response.text();
    console.log("   [AI] Response received successfully!");
    return text;
  } catch (error) {
    console.error("   [AI] Error:", error.message);
    throw error;
  }
}

module.exports = generateCaptions;