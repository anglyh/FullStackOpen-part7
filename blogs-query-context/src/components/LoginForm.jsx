import PropTypes from 'prop-types';
import Notification from './Notification';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in to application</h2>
      <Notification />
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
          data-testid='username'
        />
      </div>

      <div>
        password
        <input
          type='text'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
          data-testid='password'
        />
      </div>

      <button type='submit'>Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
