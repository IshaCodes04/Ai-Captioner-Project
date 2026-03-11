const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Tone-specific instructions for Gemini
const TONE_CONFIG = {
  casual: {
    systemInstruction: "You are a social media expert who writes fun, relatable, everyday captions. Write 4-5 short casual captions for the image. Use a friendly, conversational tone — like you're texting a friend. Add relevant emojis naturally. Keep each caption under 15 words. Format: **Casual Vibes**\n* caption1\n* caption2",
    userPrompt: "Write casual, relatable social media captions for this image.",
  },
  funny: {
    systemInstruction: "You are a witty comedian who writes hilarious, punny captions for social media. Write 4-5 funny captions for the image. Use humor, sarcasm, puns. Format: **Comedy Central**\n* caption1",
    userPrompt: "Write funny, witty, humorous captions for this image.",
  },
  professional: {
    systemInstruction: "You are a professional LinkedIn content creator. Write 4-5 polished, professional captions. No slang. Format: **Professional**\n* caption1",
    userPrompt: "Write professional, brand-ready captions for this image.",
  },
  poetic: {
    systemInstruction: "You are a creative poet. Write 4-5 poetic, lyrical captions. Use metaphors. Format: **Poetic**\n* caption1",
    userPrompt: "Write poetic, lyrical, and emotionally expressive captions for this image.",
  },
  hashtags: {
    systemInstruction: "You are an Instagram growth expert. Write 1 punchy caption followed by 15-20 hashtags. Format: **Caption**\n* text\n**Hashtags**\n* #tag1",
    userPrompt: "Generate a caption and a full set of relevant hashtags for this image.",
  },
};

async function generateCaptions(base64ImageFile, tone = "casual") {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

    const genAI = new GoogleGenAI(apiKey);
    const config = TONE_CONFIG[tone] || TONE_CONFIG.casual;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Combine instructions into one prompt to avoid SDK version issues
    const fullPrompt = `${config.systemInstruction}\n\n${config.userPrompt}`;

    const result = await model.generateContent([
      fullPrompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    if (!text) throw new Error("Empty response from AI");
    
    console.log("✅ AI Caption generated successfully");
    return text;

  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw new Error("AI Generation failed: " + error.message);
  }
}

module.exports = generateCaptions;