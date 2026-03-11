const postModel = require("../models/post.model");
const generateCaptions = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;

    console.log("--- START POST CREATION ---");
    console.log("Authenticated User ID:", req.user ? req.user._id : "NULL (Unauthorized)");
    
    if (!file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Read tone from request body (default to "casual")
    const tone = req.body.tone || "casual";
    console.log("File received:", file.originalname, "| Tone:", tone);

    const base64Image = Buffer.from(file.buffer).toString("base64");

    // Pehle jaisa Simple sequential execution
    console.log("--- START POST CREATION ---");
    console.log("1. AI Generation Starting...");
    const caption = await generateCaptions(base64Image, tone);
    console.log("✅ AI Caption generated:", caption.substring(0, 30) + "...");
    
    console.log("2. Image Upload Starting...");
    const uploadResult = await uploadFile(file.buffer, `${uuidv4()}`);
    console.log("✅ Image uploaded to URL:", uploadResult.url);

    console.log("3. Saving to MongoDB...");
    const post = await postModel.create({
      caption: caption,
      image: uploadResult.url,
      tone: tone,
      user: req.user._id,
    });
    console.log("✅ Post saved to DB ID:", post._id);

    console.log("--- POST CREATION SUCCESSFUL ---");

    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error("❌ CRITICAL ERROR IN POST CREATION:", error);
    
    // Log to file for persistent debugging
    const fs = require('fs');
    const logMsg = `\n[${new Date().toLocaleString()}] ERROR: ${error.message}\nSTACK: ${error.stack}\n`;
    fs.appendFileSync('error_debug.log', logMsg);

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