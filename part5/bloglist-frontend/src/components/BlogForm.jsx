import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
    });

    setBlogTitle("");
    setBlogUrl("");
    setBlogAuthor("");
  };

  return (
    <div>
      <h2>Create blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};
export default BlogForm;
