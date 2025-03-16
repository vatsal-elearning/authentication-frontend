import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>
        Welcome to your dashboard, {user?.firstName} {user?.lastName}!
      </p>
    </div>
  );
};

export default Dashboard;
