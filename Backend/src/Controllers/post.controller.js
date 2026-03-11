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

    // Pehle jaisa Simple sequential execution
    console.log("Generating caption with AI...");
    const caption = await generateCaptions(base64Image, tone);
    
    console.log("Uploading to ImageKit...");
    const uploadResult = await uploadFile(file.buffer, `${uuidv4()}`);

    console.log("Saving to DB...");
    const post = await postModel.create({
      caption: caption,
      image: uploadResult.url,
      tone: tone,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
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