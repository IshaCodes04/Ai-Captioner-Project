const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);


async function generateCaptions(base64ImageFile) {
  try {
    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile, // base 64 ek format h or uss format m image ka data h
        },
      },
      { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config:{
        systemInstruction: `
        you are an expert in generating captions for images.
        you generate single caption for the image.
        your caption should be short and concise
        you used hashtags and emojis in the caption
        `

      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Failed to generate caption: " + error.message);
  }
}



module.exports = generateCaptions;