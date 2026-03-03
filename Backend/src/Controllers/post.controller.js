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

    // Pass tone to AI service
    const caption = await generateCaptions(base64Image, tone);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
      caption: caption,
      image: result.url,
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

module.exports = { createPostController };