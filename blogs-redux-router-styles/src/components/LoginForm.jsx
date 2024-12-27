import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification';
import { loginUser } from '../reducers/authReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.Username.value;
    const password = event.target.Password.value;

    dispatch(loginUser({ username, password }));
  };

  return (
    <form className="form loginForm" onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification />
      <div className="formInput">
        username
        <input
          type='text'
          name='Username'
          data-testid='username'
        />
      </div>

      <div className="formInput">
        password
        <input
          type='password'
          name='Password'
          data-testid='password'
        />
      </div>

      <button className="button" type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
