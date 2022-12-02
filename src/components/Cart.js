import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';
import toast, { Toaster } from 'react-hot-toast';
import classes from './Cart.module.css';

export default function Cart() {
  const { cart, setCart, user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const decrementQuantity = (id) => {
    const foundRecord = cart.find((item) => item._id === id);
    if (foundRecord.quantity === 1) {
      setCart(cart.filter((item) => item._id !== id));
    } else {
      foundRecord.quantity--;
      setCart([...cart]);
    }
  };

  const incrementQuantity = (id) => {
    const foundRecord = cart.find((item) => item._id === id);
    foundRecord.quantity++;
    setCart([...cart]);
  };

  const placeOrder = () => {
    // order => {}
    if (!user) {
      navigate('/login');
    } else {
      fetch('/orders', {
        method: 'POST',
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: cart.map((record) => record._id),
          totalPrice: cart.reduce(
            (acc, item) => (acc += item.price * item.quantity),
            0
          ),
          userId: user._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          if (result.success) {
            // console.log(result);
            setUser(result.data);
            setCart([]);
            toast.success('Your order is placed successfully!');
            setTimeout(() => {
              navigate('/orders');
            }, 2000);
          } else {
            toast.error(JSON.stringify(result.message));
          }
        });
    }
  };

  return (
    <div className={classes.center}>
      <h1>Cart</h1>
      <div>
        {cart.map((record) => {
          return (
            <div key={record._id}>
              <img
                className={classes.img}
                src={record.img}
                alt={record.title}
              />
              <p>{record.title}</p>
              <p>
                quantity:
                <button
                  className={classes.button}
                  onClick={() => decrementQuantity(record._id)}
                >
                  -
                </button>
                {record.quantity}
                <button
                  className={classes.button}
                  onClick={() => incrementQuantity(record._id)}
                >
                  +
                </button>
              </p>
              <h1>{record.price}</h1>
            </div>
          );
        })}
      </div>
      <h1>
        Total:
        {cart.reduce(
          (acc, item) => (acc += item.price * item.quantity),
          0
        )}{' '}
      </h1>
      <button className={classes.order} onClick={placeOrder}>
        Place Order
      </button>
      <Toaster position="top-center" />
    </div>
  );
}
