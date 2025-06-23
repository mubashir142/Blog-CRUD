import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null); // for edit mode

  // Fetch all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data.reverse()); // latest first
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Handle create and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPostId) {
        // Update
        const res = await axios.put(`http://localhost:5000/api/posts/${editingPostId}`, {
          title,
          content,
        });
        setPosts(posts.map((p) => (p._id === editingPostId ? res.data : p)));
        setEditingPostId(null);
      } else {
        // Create
        const res = await axios.post("http://localhost:5000/api/posts", {
          title,
          content,
        });
        setPosts([res.data, ...posts]);
      }

      // Clear form
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Handle edit
  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingPostId(post._id);
  };
// ...existing code...
return (
  <div className="container">
    <h2 className="blog-title">🚀 My Blog</h2>

    <h3 className="form-title">✍️ {editingPostId ? "Edit Post" : "Create a New Post"}</h3>
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        className="textarea"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <br />
      <button className="button" type="submit">{editingPostId ? "Update" : "Publish"}</button>
    </form>

    <h3 className="posts-title">📚 Blog Posts</h3>
    {posts.length === 0 ? (
      <p>No posts yet</p>
    ) : (
      posts.map((post) => (
        <div className="post" key={post._id}>
          <h4 className="post-title">{post.title}</h4>
          <p className="post-content">{post.content}</p>
          <p className="post-date">🕒 {new Date(post.createdAt).toLocaleString()}</p>
          <button className="button edit" onClick={() => handleEdit(post)}>✏️ Edit</button>
          <button className="button delete" onClick={() => handleDelete(post._id)}>🗑️ Delete</button>
        </div>
      ))
    )}
  </div>
);
// ...existing code...

};

export default PostList;
