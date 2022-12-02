import React from 'react';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';
import classes from './EditProfileUser.module.css';

export default function EditProfileUser() {
  const { user, setUser } = useContext(MyContext);

  const navigate = useNavigate();

  const sendUpdateRequest = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(`/users/${user._id}`, {
      method: 'PATCH',
      headers: { token: localStorage.getItem('token') },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success('user profile updated !');
          setUser(result.data);
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div>
      <Toaster position="top-center" />
      <h1 className={classes.center}>Profile Editing</h1>
      <form className={classes.form} onSubmit={sendUpdateRequest}>
        <label>
          First Name:{' '}
          <input
            className={classes.input}
            type="text"
            name="firstName"
            defaultValue={user.firstName}
          />
        </label>
        <br />
        <label>
          Last Name:{' '}
          <input
            className={classes.input}
            type="text"
            name="lastName"
            defaultValue={user.lastName}
          />
        </label>
        <br />
        <label>
          Password:{' '}
          <input
            className={classes.input}
            type="password"
            name="password"
            placeholder={'*********'}
          />
        </label>
        <br />
        <label>
          Profile Image:{' '}
          <input className={classes.input} type="file" name="image" />
          <img
            className={classes.img}
            src={user.profileImage}
            alt="profileImage"
          />
        </label>
        <br />
        <button className={classes.save}>save</button>
      </form>
    </div>
  );
}
