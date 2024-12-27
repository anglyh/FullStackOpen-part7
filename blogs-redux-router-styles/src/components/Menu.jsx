import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/authReducer';

const Menu = () => {
  const user = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser');
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <Link to={'/'}>blogs</Link>
      <Link to={'/users'}>users</Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Menu;