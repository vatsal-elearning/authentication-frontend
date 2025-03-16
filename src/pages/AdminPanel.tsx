import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../redux/store';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      {user?.role === 'admin' ? (
        <p>You are accessible to view this page</p>
      ) : (
        <p>You are not authorized to access this page.</p>
      )}
    </div>
  );
};

export default AdminPanel;
