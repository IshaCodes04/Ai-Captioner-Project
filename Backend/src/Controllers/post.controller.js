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
    
    const [caption, uploadResult] = await Promise.all([
      generateCaptions(base64Image, tone),
      uploadFile(file.buffer, `${uuidv4()}`)
    ]);

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
    const fs = require('fs');
    const logMsg = `\n[${new Date().toISOString()}] Error: ${error.message}\nStack: ${error.stack}\n`;
    fs.appendFileSync('error_debug.log', logMsg);
    console.error("Detailed Error in createPostController:", error);
    res.status(500).json({
      message: "Error creating post",
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