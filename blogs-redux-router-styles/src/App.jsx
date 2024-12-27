import { useEffect } from 'react';
import './App.css';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { login } from './reducers/authReducer';
import { Route, Routes, useMatch } from 'react-router-dom';
import UserList from './components/UserList';
import User from './components/User';
import BlogList from './components/BlogList';
import Menu from './components/Menu';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    console.log('useEffect ejecutado');
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogappUser');
    console.log('loggedUserJSON', loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);

      dispatch(login(user));
    }
  }, []);

  // User match
  const userMatch = useMatch('/users/:id');
  console.log('userMatch in App.jsx', userMatch);
  const userMatched = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null;

  // Blog match
  const blogMatch = useMatch('/blogs/:id');
  const blogMatched = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null;

  return (
    <div className="content">
      {!user && <LoginForm />}
      {user && (
        <>
          <Menu />
          <>
            <h2>Blogs</h2>
            <Notification />
            <Routes>
              <Route path='/users/:id' element={<User user={userMatched} />} />
              <Route path='/users' element={<UserList />} />
              <Route path='/' element={<BlogList />} />
              <Route path='/blogs/:id' element={<Blog blog={blogMatched} user={user} />} />
            </Routes>
          </>
        </>
      )}
    </div>
  );
};

export default App;
