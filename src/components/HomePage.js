import React from 'react';
import classes from './HomePage.module.css';

export default function HomePage() {
  return (
    <div>
      <h1 className={classes.center}>Home Page</h1>
      <h3 className={classes.text}>
        Welcome to our Record Shop. Login / Signup to explore our shop.
      </h3>
    </div>
  );
}
