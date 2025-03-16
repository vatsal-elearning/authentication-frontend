import { useSelector } from 'react-redux';
import { RootState } from './../redux/store';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (!user && loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full justify-center mt-10">
      <h2 className="text-2xl font-bold p-6">Profile</h2>
      <table className="flex justify-center">
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>{user?.firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{user?.lastName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{user?.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
