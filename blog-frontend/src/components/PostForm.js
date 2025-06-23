import React, { useState } from "react";

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = { title, content };

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      const newPost = await response.json();
      onPostCreated(newPost);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button type="submit">Publish</button>
    </form>
  );
}

export default PostForm;
