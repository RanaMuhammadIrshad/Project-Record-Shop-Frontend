import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function Cart() {
  const { cart, setCart } = useContext(MyContext);

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

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart.map((record) => {
          return (
            <div key={record._id}>
              <img src={record.img} alt={record.title} width="100" />
              <p>{record.title}</p>
              <p>
                quantity:
                <button onClick={() => decrementQuantity(record._id)}>
                  {' '}
                  -{' '}
                </button>{' '}
                {record.quantity}{' '}
                <button onClick={() => incrementQuantity(record._id)}>
                  {' '}
                  +{' '}
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
    </div>
  );
}
