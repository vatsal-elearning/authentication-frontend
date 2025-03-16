import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link to="/dashboard">Home</Link>
      {user ? (
        <div className="flex gap-2">
          <Link to="/profile">Profile</Link>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
