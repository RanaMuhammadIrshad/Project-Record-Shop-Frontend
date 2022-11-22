import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      {user && (
        <>
          <h1>Profile</h1>
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          <img src={user.profileImage} width="300" alt={user.fullName} />
          <h2>User Orders</h2>
          <ul>
            {user.orders.map((order) => {
              return (
                <div key={order._id}>
                  <h3>{order._id}</h3>
                </div>
              );
            })}
          </ul>
          <button>Update Profile</button>
          <button onClick={logout}>logout</button>
          <button>Delete User</button>
        </>
      )}
    </div>
  );
}
