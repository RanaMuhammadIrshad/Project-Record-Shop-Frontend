import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import classes from './Records.module.css';

export default function Records() {
  const { records, cart, setCart, user } = useContext(MyContext);

  const addItemToCart = (record) => {
    const foundItem = cart.find((item) => item._id === record._id);
    if (foundItem) {
      foundItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...record, quantity: 1 }]);
    }
  };

  return (
    <div>
      <h1 className={classes.center}>Records</h1>
      <div className={classes.main}>
        {records.map((record) => {
          return (
            <div className={classes.container} key={record._id}>
              <h2 className={classes.title}>{record.title}</h2>
              <img
                className={classes.images}
                src={record.img}
                alt={record.title}
              />
              <h3>{record.author}</h3>
              <p>{record.year}</p>
              <p>{record.price} $</p>
              <button
                className={classes.cart}
                onClick={() => addItemToCart(record)}
              >
                Add To Cart
              </button>
              {user && user.role === 'admin' && <button>delete</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
