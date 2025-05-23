import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('token');
    navigate('/login'); // send back to login screen
  };

  return (
    <header>
      {/* your logo/nav links */}
      {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
    </header>
  );
}

export default Header;
