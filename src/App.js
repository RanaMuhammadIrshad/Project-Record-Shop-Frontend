import React from 'react';
import { useContext } from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Records from './components/Records';
import Signup from './components/Signup';
import { MyContext } from './context/MyContext';

function App() {
  const { cart } = useContext(MyContext);
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/records">Records</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              Cart <sup>{cart.length}</sup>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/records" element={<Records />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
