import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

  const loginForm = () => (
    <Toggleable buttonLabel="login">
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </Toggleable>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Notification message={errorMessage} />
      <Notification message={notificationMessage} />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setNotificationMessage(`A new blog '${blogObject.title}' added`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const updateBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    setNotificationMessage(`Blog '${blogObject.title}' updated`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const removeBlog = async (id) => {
    await blogService.remove(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    setNotificationMessage(`Blog removed`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const blogForm = () => (
    <Toggleable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Toggleable>
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

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}
      {user && <div>{blogForm()}</div>}
    </div>
  );
};

export default App;
