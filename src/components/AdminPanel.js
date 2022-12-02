import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function AdminPanel() {
  const { setRecords, records } = useContext(MyContext);

  const addingNewRecord = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch('/records', {
      method: 'POST',
      headers: { token: localStorage.getItem('token') },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setRecords([...result.data, ...records]);
      });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={addingNewRecord}>
        <label>
          Title: <input type="text" name="title" />
        </label>
        <br />
        <label>
          Price: <input type="number" name="price" />
        </label>
        <br />
        <label>
          Author: <input type="text" name="author" />
        </label>
        <br />
        <label>
          Year: <input type="number" name="year" />
        </label>
        <br />
        <label>
          Record Image: <input type="file" name="image" />
        </label>
        <br />

        <button>Add New Record</button>
      </form>

      <h2>Show All Orders</h2>

      <h2>how All Users</h2>
    </div>
  );
}
