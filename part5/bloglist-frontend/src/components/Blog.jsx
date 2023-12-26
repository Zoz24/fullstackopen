import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const showBlogDetails = { display: visible ? "" : "none" };
  const showBlogOnly = { display: visible ? "none" : "" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateBlogLikes = () => {
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });
  };

  const removeBlogFunc = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div style={showBlogOnly}>
        <span>Title: {blog.title}</span>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showBlogDetails}>
        <span>Title: {blog.title}</span>
        <br />
        <span>Author: {blog.author}</span>
        <br />
        <span>URL: {blog.url}</span>
        <br />
        <span>Likes: {blog.likes}</span>
        <button onClick={updateBlogLikes}>like</button>
        <br />
        <button onClick={toggleVisibility}>cancel</button>
        <br />
        {<button onClick={removeBlogFunc}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
