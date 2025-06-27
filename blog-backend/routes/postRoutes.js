const express = require("express");
const router = express.Router();
const Post = require("../models/post"); // import Post model

const authMiddleware = require("../middleware/authMiddleware"); // 👈 add this at the top


// ✅ Create post (only for logged-in users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId; // 👈 Get from JWT token

    const newPost = new Post({
      title,
      content,
      user: userId, // 👈 Save user ID with post
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});



// ✅ Get all posts (GET /api/posts)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username email"); // 👈 Add this
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


// ✅ Update post (PUT /api/posts/:id)
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // return updated document
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// ✅ Delete post (DELETE /api/posts/:id)
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
