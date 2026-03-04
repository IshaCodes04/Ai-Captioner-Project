const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Tone-specific instructions for Gemini
const TONE_CONFIG = {
  casual: {
    systemInstruction: `You are a social media expert who writes fun, relatable, everyday captions.
      Write 4-5 short casual captions for the image.
      Use a friendly, conversational tone — like you're texting a friend.
      Add relevant emojis naturally. Keep each caption under 15 words.
      Format your response as:
      **Casual Vibes**
      * <caption 1>
      * <caption 2>
      * <caption 3>
      * <caption 4>`,
    userPrompt: "Write casual, relatable social media captions for this image.",
  },
  funny: {
    systemInstruction: `You are a witty comedian who writes hilarious, punny captions for social media.
      Write 4-5 funny captions for the image.
      Use humor, sarcasm, puns, or relatable observations. Add funny emojis.
      Keep each caption punchy and under 20 words.
      Format your response as:
      **Comedy Central**
      * <caption 1>
      * <caption 2>
      * <caption 3>
      * <caption 4>`,
    userPrompt: "Write funny, witty, humorous captions for this image.",
  },
  professional: {
    systemInstruction: `You are a professional LinkedIn content creator and brand strategist.
      Write 4-5 polished, professional captions for the image.
      Use confident, inspiring language suitable for LinkedIn or a brand page.
      No slang. Use relevant professional hashtags. Keep each under 20 words.
      Format your response as:
      **Professional**
      * <caption 1>
      * <caption 2>
      * <caption 3>
      * <caption 4>`,
    userPrompt: "Write professional, brand-ready captions for this image.",
  },
  poetic: {
    systemInstruction: `You are a creative poet and writer who crafts beautiful, evocative captions.
      Write 4-5 poetic, lyrical captions for the image.
      Use metaphors, imagery, and emotional language. Add a poetic touch.
      Each caption should feel like a mini-poem or a quote. Under 20 words each.
      Format your response as:
      **Poetic**
      * <caption 1>
      * <caption 2>
      * <caption 3>
      * <caption 4>`,
    userPrompt: "Write poetic, lyrical, and emotionally expressive captions for this image.",
  },
  hashtags: {
    systemInstruction: `You are an Instagram growth expert who maximizes reach with optimized hashtags.
      For the image, write 1 short punchy caption followed by 15-20 highly relevant hashtags.
      Mix popular and niche hashtags. Group them naturally.
      Format your response as:
      **Caption**
      * <one punchy caption with emojis>
      **Hashtags**
      * #tag1 #tag2 #tag3 #tag4 #tag5
      * #tag6 #tag7 #tag8 #tag9 #tag10
      * #tag11 #tag12 #tag13 #tag14 #tag15`,
    userPrompt: "Generate a caption and a full set of relevant hashtags for this image.",
  },
};

async function generateCaptions(base64ImageFile, tone = "casual") {
  try {
    const config = TONE_CONFIG[tone] || TONE_CONFIG.casual;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest", // Switching to verified model identifier
      systemInstruction: config.systemInstruction,
      contents: [
        {
          parts: [
            { text: config.userPrompt },
            { inlineData: { mimeType: "image/jpeg", data: base64ImageFile } }
          ]
        }
      ]
    });

    // Unified SDK uses this structure for text extraction
    const captionText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return captionText;
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Failed to generate caption: " + error.message);
  }
}

module.exports = generateCaptions;