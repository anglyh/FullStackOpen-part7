import { useState, useEffect, useRef } from 'react';
import './App.css';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import { useSetNotification } from './context/NotificationContext';
import { useQuery } from 'react-query';
import { useUserDispatch, useUserValue } from './context/UserContext';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setNotification = useSetNotification();

  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const blogs = result.data || [];

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log('user', user);
      userDispatch({ type: 'SET_USER', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      console.log('user in handleLogin', user);

      localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);

      userDispatch({ type: 'SET_USER', payload: user });
      console.log('user context', user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotification('wrong username or password', false, 5);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR_USER' });
  };

  const loginForm = () => (
    <LoginForm
      handleSubmit={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      username={username}
      password={password}
    />
  );

  const blogFormRef = useRef();
  const toggleVisibility = () => blogFormRef.current.toggleVisibility();

  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      {!user && loginForm()}
      {user && (
        <>
          <h2>Blogs</h2>
          <Notification />
          {user.name} logged-in
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel='add blog' ref={blogFormRef}>
            <BlogForm toggleVisibility={toggleVisibility}/>
          </Togglable>

          <ul className="blogList">
            {blogsSortedByLikes.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default App;
