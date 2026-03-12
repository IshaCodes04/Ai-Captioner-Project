require("dotenv").config();

const TONE_CONFIG = {
  casual: "Write 4-5 short, fun social media captions. Use a friendly tone and emojis.",
  funny: "Write 4-5 hilarious, witty captions with puns and humor.",
  professional: "Write 4-5 polished, professional captions for LinkedIn. No slang.",
  poetic: "Write 4-5 beautiful, lyrical captions using metaphors.",
  hashtags: "Write 1 punchy caption and 20 relevant hashtags."
};

async function generateCaptions(base64ImageFile, tone = "casual") {
  console.log("   [AI] Starting generateCaptions function using OpenRouter...");
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OPENROUTER_API_KEY is missing in .env file");

    const instruction = TONE_CONFIG[tone] || TONE_CONFIG.casual;
    const fullPrompt = `${instruction}\n\nFormat your response as a list with bullet points.`;

    console.log("   [AI] Requesting OpenRouter API...");
    
    // Fixing base64 URL format for OpenRouter
    let imageUrl = base64ImageFile;
    if (!imageUrl.startsWith("data:")) {
      imageUrl = `data:image/jpeg;base64,${base64ImageFile}`;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Gemma 3 27B IT is free and supports image+text for captions
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: fullPrompt
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("   [AI] OpenRouter error:", errorText);
      throw new Error(`OpenRouter API responded with status ${response.status}: ${errorText}`);
    }

    const json = await response.json();
    const text = json.choices[0].message.content;
    
    console.log("   [AI] Response received successfully!");
    return text;
  } catch (error) {
    console.error("   [AI] Error:", error.message);
    throw error;
  }
}

module.exports = generateCaptions;