import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import classes from './Profile.module.css';

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const editProfile = () => {
    navigate('/editprofileuser');
  };

  const deleteUserAccount = () => {
    fetch(`/users/${user._id}`, {
      method: 'DELETE',
      headers: { token: localStorage.getItem('token') },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(null);
          localStorage.removeItem('token');
          navigate('/signup');
        }
      });
  };

  return (
    <div className={classes.center}>
      <h1>Profile</h1>
      {user && (
        <>
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          <img
            className={classes.img}
            src={user.profileImage}
            alt="profileImage"
          />

          <button className={classes.buttons} onClick={editProfile}>
            Update Profile
          </button>
          <button className={classes.buttons} onClick={logout}>
            Logout
          </button>
          <button className={classes.buttons} onClick={deleteUserAccount}>
            Delete User
          </button>
        </>
      )}
    </div>
  );
}
