import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function Records() {
  const { records, cart, setCart } = useContext(MyContext);

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
      <h1>Records</h1>
      <div>
        {records.map((record) => {
          return (
            <div key={record._id}>
              <h2>{record.title}</h2>
              <img src={record.img} alt={record.title} width="300" />
              <h3>{record.author}</h3>
              <p>{record.year}</p>
              <p>{record.price}</p>
              <button onClick={() => addItemToCart(record)}>Add To Cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
