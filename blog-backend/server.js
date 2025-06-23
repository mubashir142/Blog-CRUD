const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Blog API is running 🚀");
});

// Connect to MongoDB and start server
mongoose
  .connect("mongodb://127.0.0.1:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));
