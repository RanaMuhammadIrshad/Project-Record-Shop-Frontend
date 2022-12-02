import React from 'react';
import { useContext } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import EditProfileUser from './components/EditProfileUser';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Records from './components/Records';
import Signup from './components/Signup';
import { MyContext } from './context/MyContext';
import classes from './App.module.css';
import AdminPanel from './components/AdminPanel';

function App() {
  const { cart, user } = useContext(MyContext);
  return (
    <div className={classes.body}>
      <ul className={classes.unorderedList}>
        <li className={classes.listItems}>
          <NavLink to="/">Home </NavLink>
        </li>
        <li>
          <NavLink to="/records">Records </NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/orders">Orders </NavLink>
            </li>
            <li>
              <NavLink to="/profile"> Profile</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login </NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup </NavLink>
            </li>
          </>
        )}

        {user && user.role === 'admin' && (
          <li>
            <NavLink to="/admin">Admin Panel</NavLink>
          </li>
        )}

        <li>
          <NavLink to="/cart">
            Cart <sup>{cart.length}</sup>{' '}
          </NavLink>
        </li>
      </ul>

      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/records" element={<Records />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofileuser" element={<EditProfileUser />} />
      </Routes>
    </div>
  );
}

export default App;
