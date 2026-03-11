const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Tone-specific instructions for Gemini
const TONE_CONFIG = {
  casual: {
    systemInstruction: "You are a social media expert who writes fun, relatable, everyday captions. Write 4-5 short casual captions for the image. Use a friendly, conversational tone. Add relevant emojis. Keep each under 15 words. Format: **Casual Vibes**\n* caption",
    userPrompt: "Write casual, relatable social media captions for this image.",
  },
  funny: {
    systemInstruction: "You are a witty comedian who writes hilarious captions. Use humor and puns. Format: **Comedy Central**\n* caption",
    userPrompt: "Write funny, witty, humorous captions for this image.",
  },
  professional: {
    systemInstruction: "You are a professional LinkedIn strategist. Write polished, professional captions. No slang. Use hashtags. Format: **Professional**\n* caption",
    userPrompt: "Write professional, brand-ready captions for this image.",
  },
  poetic: {
    systemInstruction: "You are a creative poet. Write beautiful, lyrical captions using metaphors. Format: **Poetic**\n* caption",
    userPrompt: "Write poetic, lyrical captions for this image.",
  },
  hashtags: {
    systemInstruction: "You are an Instagram expert. Write 1 caption and 15-20 hashtags. Format: **Caption**\n* text\n**Hashtags**\n* #tags",
    userPrompt: "Generate a caption and hashtags for this image.",
  },
};

async function generateCaptions(base64ImageFile, tone = "casual") {
  console.log("   --- [AI SERVICE] Inside generateCaptions ---");
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("   --- [AI SERVICE] ERROR: GEMINI_API_KEY is missing ---");
      throw new Error("GEMINI_API_KEY is missing from environment");
    }

    console.log("   --- [AI SERVICE] Initializing Gemini Model...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const config = TONE_CONFIG[tone] || TONE_CONFIG.casual;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: config.systemInstruction
    });

    console.log("   --- [AI SERVICE] Sending Request to Google Gemini API...");
    const result = await model.generateContent([
      { text: config.userPrompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile
        }
      }
    ]);

    console.log("   --- [AI SERVICE] Waiting for Response...");
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      console.warn("   --- [AI SERVICE] WARNING: Empty response body ---");
      throw new Error("AI returned an empty response");
    }
    
    console.log("   --- [AI SERVICE] SUCCESS: Received caption ---");
    return text;

  } catch (error) {
    console.error("   --- [AI SERVICE] CRITICAL API ERROR:", error.message);
    throw new Error("AI Generation failed: " + error.message);
  }
}

module.exports = generateCaptions;