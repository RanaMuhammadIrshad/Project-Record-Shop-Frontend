import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import classes from './Orders.module.css';

export default function Orders() {
  const { user, setUser } = useContext(MyContext);

  const deleteOrder = (id) => {
    fetch(`/orders/${id}`, {
      method: 'DELETE',
      headers: { token: localStorage.getItem('token') },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.data);
        }
      });
  };

  return (
    <div>
      <h1 className={classes.center}>User Orders</h1>

      <div className={classes.main}>
        <ul>
          {user?.orders.map((order) => {
            return (
              <div className={classes.container}>
                <h3>{order._id}</h3>
                <h4>$ {order.totalPrice}</h4>
                <button
                  className={classes.delOrder}
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete Order
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
