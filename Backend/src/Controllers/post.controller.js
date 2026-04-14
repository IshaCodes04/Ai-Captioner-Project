const postModel = require("../models/post.model");
const generateCaptions = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  console.log("\n--- NEW POST REQUEST RECEIVED ---");
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No image provided" });

    const tone = req.body.tone || "casual";
    console.log("STEP 1: Image received, converting to base64...");
    const base64Image = Buffer.from(file.buffer).toString("base64");

    console.log("STEP 2: Calling AI for captions...");
    const caption = await generateCaptions(base64Image, tone);
    console.log("✅ AI Step OK");

    console.log("STEP 3: Uploading to ImageKit...");
    const uploadResult = await uploadFile(file.buffer, `${uuidv4()}`);
    console.log("✅ ImageKit Step OK. URL:", uploadResult.url);

    console.log("STEP 4: Saving to Database...");
    const post = await postModel.create({
      caption: caption,
      image: uploadResult.url,
      tone: tone,
      user: req.user._id,
    });
    console.log("✅ Database Step OK. ID:", post._id);

    res.status(201).json({ message: "Post Created Successfully", post });
  } catch (error) {
    console.error("❌ ERROR AT STEP:", error.message);
    res.status(500).json({ 
        message: "Error creating post", 
        error: error.message,
        details: "Check backend terminal for step-by-step logs" 
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

async function deletePostController(req, res) {
  try {
    const { id } = req.params;
    const post = await postModel.findOneAndDelete({ _id: id, user: req.user._id });
    
    if (!post) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
}

async function bulkDeletePostsController(req, res) {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid post IDs provided" });
    }

    await postModel.deleteMany({
      _id: { $in: ids },
      user: req.user._id
    });

    res.status(200).json({ message: "Posts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting posts", error: error.message });
  }
}

module.exports = { createPostController, getUserPostsController, deletePostController, bulkDeletePostsController };