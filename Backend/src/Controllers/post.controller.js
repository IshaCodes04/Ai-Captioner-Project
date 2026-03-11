const postModel = require("../models/post.model");
const generateCaptions = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Read tone from request body (default to "casual")
    const tone = req.body.tone || "casual";
    console.log("File received:", file.originalname, "| Tone:", tone);

    const base64Image = Buffer.from(file.buffer).toString("base64");

    // Run AI Generation and Image Upload in PARALLEL to save time
    console.log("⚡ Starting AI generation and Image upload in parallel...");
    
    let caption, uploadResult;
    try {
      [caption, uploadResult] = await Promise.all([
        generateCaptions(base64Image, tone, file.mimetype).catch(err => { 
          console.error("❌ AI Error:", err.message);
          throw new Error("AI_FAILED: " + err.message); 
        }),
        uploadFile(file.buffer, `${uuidv4()}`).catch(err => { 
          console.error("❌ Upload Error:", err.message);
          throw new Error("UPLOAD_FAILED: " + err.message); 
        })
      ]);
    } catch (parallelError) {
      throw parallelError; // caught by outer catch
    }

    console.log("✅ AI & Upload completed!");

    console.log("Saving to DB...");
    const post = await postModel.create({
      caption: caption,
      image: uploadResult.url,
      tone: tone,
      user: req.user._id,
    });
    console.log("Post saved to DB.");

    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error("Detailed Error in createPostController:", error);
    
    // Log to file for persistent debugging
    const fs = require('fs');
    const logMsg = `\n[${new Date().toISOString()}] Error: ${error.message}\n`;
    fs.appendFileSync('error_debug.log', logMsg);

    let userMessage = "Error creating post";
    if (error.message.includes("AI_FAILED")) {
      userMessage = "AI Generation failed. Please check your Gemini API key or image format.";
    } else if (error.message.includes("UPLOAD_FAILED")) {
      userMessage = "Image upload failed. Please check your ImageKit credentials.";
    }

    res.status(500).json({
      message: userMessage,
      error: error.message,
    });
  }
}

async function getUserPostsController(req, res) {
  try {
    const posts = await postModel.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
}

module.exports = { createPostController, getUserPostsController };