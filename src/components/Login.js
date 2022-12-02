import React from 'react';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';
import classes from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(MyContext);

  const loginUser = (e) => {
    e.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get('token');
        localStorage.setItem('token', token);
        // console.log(token);
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          toast.success('Successfully logged In!');
          setUser(result.data);
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          toast.error(result.message);
        }
        // console.log(result);
      });
  };

  return (
    <div>
      <h1 className={classes.center}>Login</h1>
      <Toaster position="top-center" />
      <form className={classes.form} onSubmit={loginUser}>
        <label>
          Email:
          <input className={classes.input} type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:{' '}
          <input
            className={classes.input}
            type="password"
            name="password"
            required
          />
        </label>
        <br />
        <button className={classes.login}>Login</button>
      </form>
    </div>
  );
}
