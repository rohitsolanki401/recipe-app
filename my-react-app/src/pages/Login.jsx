import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth-slice';
import classes from './Login.module.scss';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const endpoint = `${import.meta.env.VITE_API_URL}/api/auth/${
      isLogin ? 'login' : 'signup'
    }`;
    const userData = isLogin
      ? { email, password }
      : { email, password, username };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log('Response data:', data);

      if (!res.ok) throw new Error(data.message);

      if (isLogin) {
        localStorage.setItem('token', data.token);
        dispatch(
          authActions.login({
            token: data.token,
            username: data.username,
          })
        );
      }

      console.log('Toast Message:', data.message);

      toast(data.message);

      setTimeout(() => {
        if (isLogin) {
          navigate('/');
        } else {
          setIsLogin(true);
          // Clear the form
          setEmail('');
          setPassword('');
          setUsername('');
        }
      }, 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div
        className="container my-5 p-5"
        style={{
          width: '500px',
          border: '2px solid yellow',
          borderRadius: '10px',
        }}
      >
        <div className={classes.auth}>
          <form
            onSubmit={submitHandler}
            style={{ width: '420px', margin: 'auto' }}
            className="my-3 p-3"
          >
            <h2 className="text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>

            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                aria-describedby="passwordHelp"
              />
            </div>

            <div className="container d-grid col-6">
              <button
                type="submit"
                className="btn my-3"
                style={{
                  backgroundColor: '#ff9a9e',
                  color: 'black',
                  border: 'none',
                }}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>

            <p onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
