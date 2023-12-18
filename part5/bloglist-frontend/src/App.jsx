import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Notification message={errorMessage} />
      <Notification message={notificationMessage} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const blogForm = () => (
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
      <button type="submit">save</button>
    </form>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user); // Set the user state correctly
      console.log("user", user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title: blogTitle,
        url: blogUrl,
      };

      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNotificationMessage(`A new blog '${blogTitle}' added`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      setBlogTitle("");
      setBlogUrl("");
    } catch (exception) {
      console.error(exception);
      setErrorMessage("Error adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}
      {user && blogForm()}
    </div>
  );
};

export default App;
